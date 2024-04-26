import './FormSwapButton.styles.css';

const FormSwapButton = ({ buttonName, buttonContent, clickHandler }) => {
  return (
    <button
      className={'form-swap-button'}
      type={'button'}
      onClick={() => clickHandler(buttonName)}
    >
      {buttonContent}
    </button>
  );
};

export default FormSwapButton;
