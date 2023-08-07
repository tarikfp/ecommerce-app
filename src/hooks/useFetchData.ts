import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type FetchResult<T> = {
  data: T[];
  loading: boolean;
  error: AxiosError | Error | null | any;
  refetch: () => Promise<void>;
};

/**
 * The `useDataFetching` function is a custom hook that fetches data asynchronously and
 * returns the data, loading state, and error state.
 * @param fetchFn - The `fetchFn` parameter is a function that returns a promise. This function is
 * responsible for fetching the data from an external source, such as an API. It should return a
 * promise that resolves to an array of type `T`.
 * @returns The `useDataFetching` function returns an object with three properties: `data`, `loading`,
 * and `error`.
 */
export const useDataFetching = <T>(
  fetchFn: () => Promise<T[]>
): FetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
