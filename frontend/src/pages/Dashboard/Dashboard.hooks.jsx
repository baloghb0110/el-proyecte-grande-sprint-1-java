import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@src/config';
import { getLocalStorageItem } from '@src/utilities';

const fetchDashboardData = async () => {
  try {
    const { data } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: '/api/dashboard',
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

const useGetDashboardData = () => {
  const token = getLocalStorageItem('token');

  const query = useQuery({
    queryKey: ['fetchDashboardData'],
    queryFn:() => fetchDashboardData(),
    enabled: token !== null,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export {
  useGetDashboardData,
};
