import './SingleCheckbox.styles.css';

const SingleCheckbox = ({ id, labelContent }) => {
  return (
    <article className={'single-checkbox-component-container'}>
      <input
        type={'checkbox'}
        id={id}
        name={id}
      />
      <label htmlFor={id}>{labelContent}</label>
    </article>
  );
};

export default SingleCheckbox;
