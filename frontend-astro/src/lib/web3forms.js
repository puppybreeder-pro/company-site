const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function submitToWeb3Forms(data) {
  const accessKey =
    import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey || accessKey === 'your-access-key-here') {
    return {
      success: false,
      message:
        'Form is not configured. Please set PUBLIC_WEB3FORMS_ACCESS_KEY (or VITE_WEB3FORMS_ACCESS_KEY) in your .env file.',
    };
  }

  if (data.botcheck) {
    return { success: false, message: 'Bot submission detected.' };
  }

  const { botcheck, ...formData } = data;

  const payload = {
    access_key: accessKey,
    ...formData,
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
    return { success: true, message: result.message || 'Email sent successfully!' };
  }

  return { success: false, message: result.message || 'Submission failed. Please try again.' };
}