# Web3Forms Integration Guide

This document explains how to use [Web3Forms](https://web3forms.com) to receive contact and quote form submissions via email — no backend required.

## Overview

Web3Forms is a free form backend service that forwards form submissions to your email. It works with static sites (Vite/React, Astro, etc.) because it uses a third-party API endpoint instead of your own server.

The H&B Security Centre site uses Web3Forms for both the Contact form and the Quote/Assessment form.

---

## Quick Start

### 1. Get an Access Key

1. Go to [web3forms.com](https://web3forms.com/#start)
2. Enter the email address where you want to receive submissions (e.g., `marvin@hbsecurity.com` or `service@hbsecurity.com`)
3. Submit the form — you'll receive your **Access Key** by email
4. Copy the key (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2. Configure the Project

1. Copy `.env.example` to `.env` in the project root:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and replace `your-access-key-here` with your actual key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
3. _(Optional — PRO)_ Add a Cloudflare Turnstile site key for enhanced bot detection:
   ```
   VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA_your_site_key_here
   ```
4. **Important:** `.env` is in `.gitignore` — never commit your access key.

### 3. Deploy (Vercel, Netlify, etc.)

Add the environment variable in your hosting dashboard:

- **Vercel:** Project → Settings → Environment Variables → Add `VITE_WEB3FORMS_ACCESS_KEY`
- **Netlify:** Site settings → Environment variables → Add `VITE_WEB3FORMS_ACCESS_KEY`

### 4. Test

Submit the contact form or quote form on your site. You should receive an email with the submitted data.

---

## Reserved Fields (Optional)

These field names have special behavior. Use them as needed:

| Field        | Type   | Description                                                               |
| ------------ | ------ | ------------------------------------------------------------------------- |
| `access_key` | string | **Required.** Your Web3Forms access key.                                  |
| `email`      | string | User email. Used as the Reply-To address in your notification email.      |
| `subject`    | string | Email subject. Can be user-filled or a hidden default.                    |
| `from_name`  | string | Name shown as sender (default: "Notifications").                          |
| `redirect`   | string | URL to redirect to after success (for non-JavaScript submissions).        |
| `botcheck`   | hidden | Honeypot for spam protection. Add as hidden checkbox with `display:none`. |
| `replyto`    | string | Override Reply-To if you don't want to use the `email` field.             |
| `ccemail`    | string | _(PRO)_ CC another email address.                                         |
| `webhook`    | string | _(PRO)_ Webhook URL for integrations (Zapier, Notion, etc.).              |

Any other field names are sent through as custom data and appear in your email.

---

## Project Integration

### Helper: `src/lib/web3forms.ts`

The `submitToWeb3Forms()` function handles the API call:

- POSTs to `https://api.web3forms.com/submit` with `Content-Type: application/json`
- Sets `access_key` from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`
- Returns `{ success, message }` for UI feedback
- Skips submission if `botcheck` is filled (honeypot anti-spam)
- Returns an error message if the access key is missing or still the placeholder

### Contact Form (`Contact.tsx`)

The contact form sends these fields:

- **User-visible:** `name`, `email`, `phone` (optional), `inquiry_type` (select: general, investment, operators, technology, media, other), `message`
- **Web3Forms:** `subject` (fixed: "New contact — H&B Security website"), `from_name` (same as `name`)
- **Honeypot:** `botcheck` (hidden checkbox)

### Quote/Assessment Form (`Quote.tsx`)

The quote form sends these fields:

- **User-visible:** `name`, `email`, `phone`, plus assessment quiz results (business type, concerns, location)
- **Web3Forms:** `subject` (fixed: "New quote request — H&B Security website"), `from_name` (same as `name`)
- **Honeypot:** `botcheck` (hidden checkbox)

### Spam Protection

Both forms include a honeypot `botcheck` checkbox that is hidden via CSS (`display: none`). Bots tend to fill all form fields, so if `botcheck` has a value, the submission is silently skipped without being sent to Web3Forms.

### Cloudflare Turnstile (Optional — PRO Feature)

[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) is an invisible bot-detection challenge. It is a **Web3Forms PRO** feature — the free tier only supports the honeypot.

**How it works with Web3Forms:**
- Web3Forms PRO can verify the Turnstile token server-side automatically when you include `cf-turnstile` in your form payload
- The `TurnstileWidget` React component renders the Cloudflare challenge and provides a token on success
- The token is sent as `cf-turnstile` in the Web3Forms payload
- If the Turnstile site key is not configured, the component renders nothing and the form falls back to honeypot-only protection

**Setup:**
1. Get a Turnstile site key at [dash.cloudflare.com](https://dash.cloudflare.com/?to=/:account/turnstile) (free, unlimited verifications)
2. Add to `.env`:
   ```
   VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA_your_site_key_here
   ```
3. Upgrade to Web3Forms PRO to enable server-side Turnstile verification
4. The `TurnstileWidget` component auto-detects the env var — no code changes required

**Behavior without VITE_TURNSTILE_SITE_KEY:**
- The `TurnstileWidget` renders `null` — no visual output, no script loaded
- Forms submit with honeypot protection only (the existing `botcheck` field)
- Everything works exactly as before

**Important:** A Turnstile site key is public (used client-side) and is safe to commit. The secret key stays in Cloudflare/W3F dashboard — never in your code.

---

## Optional Enhancements

### Custom Subject Line

Add a hidden field to override the default subject:

```html
<input type="hidden" name="subject" value="New Contact from H&B Security" />
```

### Success Redirect (No JavaScript)

For plain HTML form posts (no JS):

```html
<input type="hidden" name="redirect" value="https://hbsecurity.com/thank-you" />
```

### Custom From Name

```html
<input type="hidden" name="from_name" value="H&B Security Website" />
```

---

## API Reference

- **Endpoint:** `POST https://api.web3forms.com/submit`
- **Alternative:** `POST https://api.web3forms.com/submit/YOUR_ACCESS_KEY` (access key in URL, no hidden field needed)

### Response Codes

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 200  | Success (JSON response)                  |
| 303  | Success with redirect                    |
| 400  | Client error (invalid data, missing key) |
| 429  | Too many requests (rate limit)           |
| 500  | Server error                             |

### Success Response (200)

```json
{
  "success": true,
  "body": {
    "data": {
      "name": "...",
      "email": "...",
      "phone": "...",
      "inquiry_type": "general",
      "message": "..."
    },
    "message": "Email sent successfully!"
  }
}
```

---

## Troubleshooting

| Issue                    | Possible cause / fix                                         |
| ------------------------ | ------------------------------------------------------------ |
| No email received        | Check spam folder; verify access key and recipient email.    |
| 400 error                | Ensure `access_key` is present and valid.                    |
| 429 error                | Rate limit hit; wait and retry.                              |
| Form submits but no JSON | Form may be doing a full-page POST; check `action`/`method`. |
| "Form is not configured" | The `VITE_WEB3FORMS_ACCESS_KEY` env var is missing or still set to the placeholder. |

---

## Resources

- [Web3Forms](https://web3forms.com)
- [Documentation](https://docs.web3forms.com)
- [API Reference](https://docs.web3forms.com/getting-started/api-reference)