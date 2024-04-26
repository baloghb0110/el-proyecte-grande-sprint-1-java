import './Title.styles.css';

const Title = ({ title }) => {
  return (
    <h1 className={'home-title-element'}>
      {title}
    </h1>
  );
};

export default Title;
