import { useState } from 'react';
import { toast } from 'sonner';
import { submitToWeb3Forms } from '../lib/web3forms';

export const useFormSubmission = (initialValues, successMessage, errorMessage, options = {}) => {
  const [values, setValues] = useState(() => ({ ...initialValues }));
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let pendingTab = null;
    // Do not pass noopener/noreferrer here: with those flags, window.open returns null
    // (see MDN Window.open / noopener), so we could never assign the PDF URL to the tab.
    if (options.openUrlOnSuccess) {
      pendingTab = window.open('about:blank', '_blank');
    }

    const extraFields = {};
    if (options.subject) extraFields.subject = options.subject;
    if (options.fromNameField && values[options.fromNameField]) {
      extraFields.from_name = values[options.fromNameField];
    }

    const closePendingTab = () => {
      if (!pendingTab || pendingTab.closed) return;
      try {
        pendingTab.close();
      } catch {
        /* Some browsers throw if the tab is already closing */
      }
    };

    try {
      const result = await submitToWeb3Forms({ ...values, ...extraFields });
      if (result.success) {
        let openedTargetUrl = false;
        if (options.openUrlOnSuccess && pendingTab && !pendingTab.closed) {
          try {
            pendingTab.location.assign(options.openUrlOnSuccess);
            openedTargetUrl = true;
          } catch {
            closePendingTab();
          }
        }

        let description = successMessage.description || result.message;
        if (options.openUrlOnSuccess && !openedTargetUrl) {
          const direct = new URL(options.openUrlOnSuccess, window.location.href).href;
          // Single-line: Sonner descriptions use normal white-space, so newlines collapse poorly.
          description = `${description} · Direct link: ${direct}`;
        }

        toast.success(successMessage.title, { description });
        setValues({ ...initialValues });
      } else {
        closePendingTab();
        toast.error(errorMessage.title, {
          description: result.message || errorMessage.description,
        });
      }
    } catch {
      closePendingTab();
      toast.error(errorMessage.title, {
        description: errorMessage.description,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { values, submitting, handleChange, handleSubmit, setValues };
};