"""Contact form endpoint: accepts lead info and sends an email via SendGrid."""
import os
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)

contact_router = APIRouter(prefix="/api")


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    breed: str = Field(..., min_length=1, max_length=200)
    message: str = Field(default="", max_length=5000)


class LeadRequest(BaseModel):
    """Lightweight top-of-funnel capture: hero email, lead-magnet, callback request."""
    email: EmailStr
    source: str = Field(..., min_length=1, max_length=64)
    name: str = Field(default="", max_length=200)
    phone: str = Field(default="", max_length=64)
    message: str = Field(default="", max_length=2000)
    callback_time: str = Field(default="", max_length=200)


class ContactResponse(BaseModel):
    status: str
    message: str


def _build_html(payload: ContactRequest) -> str:
    safe_message = (payload.message or "").replace("\n", "<br>")
    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #1f2937;">
        <h2 style="color: #111827;">New PuppyBreeder.PRO Lead</h2>
        <p>A new inquiry just came in from the website contact form.</p>
        <table cellpadding="8" style="border-collapse: collapse; background: #f9fafb;">
          <tr><td><strong>Name</strong></td><td>{payload.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>{payload.email}</td></tr>
          <tr><td><strong>Breed(s)</strong></td><td>{payload.breed}</td></tr>
          <tr><td valign="top"><strong>Message</strong></td><td>{safe_message or '<em>(none)</em>'}</td></tr>
        </table>
        <p style="margin-top: 16px; font-size: 12px; color: #6b7280;">
          Sent from the PuppyBreeder.PRO landing page.
        </p>
      </body>
    </html>
    """


@contact_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest):
    api_key = os.environ.get("SENDGRID_API_KEY", "")
    sender = os.environ.get("SENDER_EMAIL", "hello@puppybreeder.pro")
    recipient = os.environ.get("CONTACT_RECIPIENT_EMAIL", "hello@puppybreeder.pro")

    message = Mail(
        from_email=sender,
        to_emails=recipient,
        subject=f"New PuppyBreeder.PRO Lead from {payload.name}",
        html_content=_build_html(payload),
        plain_text_content=(
            f"New lead from PuppyBreeder.PRO\n\n"
            f"Name: {payload.name}\n"
            f"Email: {payload.email}\n"
            f"Breed(s): {payload.breed}\n"
            f"Message: {payload.message or '(none)'}\n"
        ),
    )
    message.reply_to = payload.email

    # Placeholder-key mode: don't call SendGrid, just log and return success so the
    # form works end-to-end until a real key is provided.
    if not api_key or api_key.startswith("SG.placeholder"):
        logger.info(
            "[CONTACT][PLACEHOLDER MODE] Would send email to %s from %s. Payload: %s",
            recipient, sender, payload.model_dump()
        )
        return ContactResponse(
            status="success",
            message="Thanks! Your message was received. We'll be in touch within 24 hours.",
        )

    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        if response.status_code not in (200, 202):
            logger.error("SendGrid returned status %s", response.status_code)
            raise HTTPException(status_code=502, detail="Email service rejected the request.")
    except HTTPException:
        raise
    except Exception as exc:  # noqa: BLE001
        logger.exception("SendGrid send failed: %s", exc)
        raise HTTPException(status_code=502, detail="Failed to send email. Please try again.")

    return ContactResponse(
        status="success",
        message="Thanks! Your message was received. We'll be in touch within 24 hours.",
    )


def _build_lead_html(payload: LeadRequest) -> str:
    safe_message = (payload.message or "").replace("\n", "<br>")
    rows = [
        ("Source", payload.source),
        ("Email", payload.email),
    ]
    if payload.name:
        rows.append(("Name", payload.name))
    if payload.phone:
        rows.append(("Phone", payload.phone))
    if payload.callback_time:
        rows.append(("Best time to call", payload.callback_time))
    if payload.message:
        rows.append(("Message", safe_message))

    rows_html = "".join(
        f"<tr><td><strong>{label}</strong></td><td>{value}</td></tr>"
        for label, value in rows
    )

    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #1f2937;">
        <h2 style="color: #111827;">New PuppyBreeder.PRO Lead</h2>
        <p>A new lead just came in.</p>
        <table cellpadding="8" style="border-collapse: collapse; background: #f9fafb;">
          {rows_html}
        </table>
      </body>
    </html>
    """


@contact_router.post("/lead", response_model=ContactResponse)
async def submit_lead(payload: LeadRequest):
    """Top-of-funnel capture for hero email, lead-magnet PDF, and callback requests."""
    api_key = os.environ.get("SENDGRID_API_KEY", "")
    sender = os.environ.get("SENDER_EMAIL", "hello@puppybreeder.pro")
    recipient = os.environ.get("CONTACT_RECIPIENT_EMAIL", "hello@puppybreeder.pro")

    subject = f"[PuppyBreeder.PRO] New lead from {payload.source}"
    plain = (
        f"New PuppyBreeder.PRO lead\n\n"
        f"Source: {payload.source}\n"
        f"Email: {payload.email}\n"
        f"Name: {payload.name or '(none)'}\n"
        f"Phone: {payload.phone or '(none)'}\n"
        f"Best time to call: {payload.callback_time or '(none)'}\n"
        f"Message: {payload.message or '(none)'}\n"
    )

    message = Mail(
        from_email=sender,
        to_emails=recipient,
        subject=subject,
        html_content=_build_lead_html(payload),
        plain_text_content=plain,
    )
    message.reply_to = payload.email

    if not api_key or api_key.startswith("SG.placeholder"):
        logger.info(
            "[LEAD][PLACEHOLDER MODE] Source=%s, Email=%s, payload=%s",
            payload.source, payload.email, payload.model_dump(),
        )
        return ContactResponse(
            status="success",
            message="Thanks! Check your email — we'll be in touch shortly.",
        )

    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        if response.status_code not in (200, 202):
            logger.error("SendGrid returned status %s for lead", response.status_code)
            raise HTTPException(status_code=502, detail="Email service rejected the request.")
    except HTTPException:
        raise
    except Exception as exc:  # noqa: BLE001
        logger.exception("SendGrid lead send failed: %s", exc)
        raise HTTPException(status_code=502, detail="Failed to send. Please try again.")

    return ContactResponse(
        status="success",
        message="Thanks! Check your email — we'll be in touch shortly.",
    )
