import './InputField.styles.css';

const InputField = ({ id, labelContent, type, defaultValue, placeholder }) => {
  return (
    <article className={'input-component-container'}>
      <label htmlFor={id}>{labelContent}</label>
      <input
        className={'default-input-field-style'}
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder ?? ''}
      />
    </article>
  );
};

export default InputField;
