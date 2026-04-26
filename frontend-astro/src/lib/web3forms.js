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

  let result;
  try {
    result = await response.json();
  } catch {
    return {
      success: false,
      message: 'Could not read the form service response. Please try again.',
    };
  }

  if (!response.ok) {
    const msg =
      result && typeof result.message === 'string'
        ? result.message
        : `The form service returned an error (${response.status}). Please try again.`;
    return { success: false, message: msg };
  }

  if (result && result.success === true) {
    return { success: true, message: result.message || 'Email sent successfully!' };
  }

  const errMsg =
    result && typeof result.message === 'string'
      ? result.message
      : 'Submission failed. Please try again.';
  return { success: false, message: errMsg };
}