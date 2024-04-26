import { useState } from 'react';
import { serialiseFormData } from '@src/utilities';
import { useUser } from '@src/context/UserContext.jsx';

const useHandlePasswordUpdate = (onSubmit) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = serialiseFormData(event.target);
      console.log(payload);
      const response = await fetch(`/api/users/password-reset/${user.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.errorMessage);
      }

      if (response.ok) {
        onSubmit();
      }

      setLoading(false);
    } catch (error) {
      setError('An unexpected error has happened. We kindly ask you to refresh your browser and try again.');
      setLoading(false);
    }
  };

  return {
    handlePasswordUpdate,
    error,
    loading,
  };
};

export {
  useHandlePasswordUpdate,
};
