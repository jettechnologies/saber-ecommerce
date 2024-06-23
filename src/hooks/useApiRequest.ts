import { useState } from 'react';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions<T> {
  url: string;
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: T;
}

interface ApiResponse<R, T> {
  response: R | null;
  error: string | null;
  loading: boolean;
  makeRequest: (body: T) => Promise<void>;
}

const useApiRequest = <T, R>({ url, method = 'POST', headers = {} }: ApiRequestOptions<T>): ApiResponse<R, T> => {
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async (body: T): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`, {
        method: method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data: R = await res.json();

      if (!res.ok) {
        throw new Error((data as any).message || 'Something went wrong');
      }

      setResponse(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, makeRequest };
};

export default useApiRequest;
