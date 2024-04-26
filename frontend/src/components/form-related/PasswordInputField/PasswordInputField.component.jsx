import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { iconLibraryConfig } from '@src/config';
import './PasswordInputField.styles.css';

const PasswordInputField = ({ id, labelContent, defaultValue, placeholder }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOnClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <article className={'password-input-component-container'}>
      <label htmlFor={id}>{labelContent}</label>
      <div>
        <input
          className={'default-input-field-style'}
          type={isRevealed ? 'text' : 'password'}
          id={id}
          name={id}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder ?? ''}
        />
        <div>
          <FontAwesomeIcon
            className={'reveal-icon'}
            onClick={handleOnClick}
            icon={isRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
          />
        </div>
      </div>
    </article>
  );
};

export default PasswordInputField;
