import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@src/config';

const getProfileData = (url) => {
  const query = useQuery({
    queryKey:['getProfileData', url],
    queryFn: async () => {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: `/api/${url}`,
      });

      return data;
    },
  });

  return {
    data: query.data,
    isDataLoading: query.isFetching,
    isDataError: query.isError,
    refetch: query.refetch,
  };
};

export default getProfileData;
