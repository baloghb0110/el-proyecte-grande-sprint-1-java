import './SelectField.styles.css';

const SelectField = ({ id, options, labelContent, defaultValue }) => {
  return (
    <article className={'select-component-container'}>
      <label htmlFor={id}>{labelContent}</label>
      <select
        className={'default-select-field-style'}
        id={id}
        name={id}
        defaultValue={defaultValue}
      >
        <option disabled value={defaultValue}>select an option</option>
        {options.map((element) => <option key={element.id} value={element.id}>{element.name}</option>)}
      </select>
    </article>
  );
};

export default SelectField;
