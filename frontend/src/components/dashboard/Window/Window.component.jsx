import './Window.styles.css';

const Window = ({ title, text, button, children }) => {
  return (
    <div className={'window'}>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
      {button}
    </div>
  );
};

export default Window;
