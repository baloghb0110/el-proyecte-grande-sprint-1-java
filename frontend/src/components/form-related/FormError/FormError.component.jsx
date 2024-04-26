import './FormError.styles.css';

const FormError = ({ errorMessage }) => {
  return (
    <p className={'form-error-message'}>
      {errorMessage}
    </p>
  );
};

export default FormError;
