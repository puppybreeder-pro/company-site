import { useState } from 'react';
import { toast } from 'sonner';
import { submitToWeb3Forms } from '../lib/web3forms';

export const useFormSubmission = (initialValues, successMessage, errorMessage, options = {}) => {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const extraFields = {};
    if (options.subject) extraFields.subject = options.subject;
    if (options.fromNameField && values[options.fromNameField]) {
      extraFields.from_name = values[options.fromNameField];
    }

    try {
      const result = await submitToWeb3Forms({ ...values, ...extraFields });
      if (result.success) {
        toast.success(successMessage.title, {
          description: successMessage.description || result.message,
        });
        setValues(initialValues);
      } else {
        toast.error(errorMessage.title, {
          description: result.message || errorMessage.description,
        });
      }
    } catch {
      toast.error(errorMessage.title, {
        description: errorMessage.description,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { values, submitting, handleChange, handleSubmit, setValues };
};