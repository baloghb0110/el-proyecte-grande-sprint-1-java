import {
  useEffect,
  useState,
} from 'react';
import {
  Income,
  Overview,
  Savings,
  Spendings,
  TrackNavigation,
} from '@src/components/track';
import { PageTitle } from '@src/components/form-related';
import { useGetMonthlyTransactions } from '@src/hooks';
import './Track.styles.css';

const Track = () => {
  const [currentTile, setCurrentTile] = useState('Overview');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const { transactionsData, isTransactionLoading, refetch } = useGetMonthlyTransactions(selectedYear, selectedMonth);

  useEffect(() => {
    refetch();
  }, [selectedYear, selectedMonth]);

  const componentRenderHandler = () => {
    switch (currentTile) {
    case 'Overview':
      return <Overview transactions={transactionsData} isLoading={isTransactionLoading} />;

    case 'Spendings':
      return <Spendings transactions={transactionsData} isLoading={isTransactionLoading} refetch={refetch} />;

    case 'Income':
      return <Income transactions={transactionsData} isLoading={isTransactionLoading} refetch={refetch}/>;

    case 'Savings':
      return <Savings transactions={transactionsData} isLoading={isTransactionLoading} refetch={refetch} />;

    default:
      return 'Error';
    }
  };

  const handleClick = (tileName) => {
    setCurrentTile(tileName);
  };

  // TODO - useState 'set' functions shouldn't be passed down as props write handleHelperMethods to do this.
  return (
    <div className={'track-page'}>
      <PageTitle title={'Track'} />
      <TrackNavigation
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
        handleClick={handleClick}
      />
      <div className={'track-content'}>
        {componentRenderHandler()}
      </div>
    </div>
  );
};

export default Track;
