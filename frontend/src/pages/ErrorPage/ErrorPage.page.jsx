import { useRouteError } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibraryConfig } from '@src/config';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id={'error-page'}>
      <h1>Oops!</h1>
      <p><FontAwesomeIcon icon={iconLibraryConfig.faCircleExclamation} />Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
