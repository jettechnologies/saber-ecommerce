// useGetRequest.ts
import { useState, useEffect } from 'react';

interface UseSearchQueryOptions {
  headers?: HeadersInit;
}

type UseSearchQueryResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useSearchQuery = <T>(url: string, options?: UseSearchQueryOptions, fetchFlag = true): UseSearchQueryResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(options)

  useEffect(() => {
    const fetchData = async () => {

      if(!fetchFlag) return;

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`, {
          headers: options?.headers,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options?.headers, fetchFlag]);

  return { data, error, loading };
};

export default useSearchQuery;
