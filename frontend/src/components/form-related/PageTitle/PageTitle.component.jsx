import './PageTitle.styles.css';

const PageTitle = ({ title }) => {
  return (
    <div className={'page-title'}>
      <h1>{title}</h1>
      <hr />
    </div>
  );
};

export default PageTitle;
