import './TrackComponentSelector.styles.css';

const TrackComponentSelector = ({ buttonLabel, clickHandler }) => {
  return (
    <button
      className={'track-page-selector'}
      onClick={() => clickHandler(buttonLabel)}
      type={'button'}
    >
      {buttonLabel}
    </button>
  );
};

export default TrackComponentSelector;
