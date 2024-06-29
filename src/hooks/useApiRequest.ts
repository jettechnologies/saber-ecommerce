// import { useState } from 'react';

// type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// interface ApiRequestOptions<T> {
//   url: string;
//   method?: HttpMethod;
//   headers?: HeadersInit;
//   body?: T;
// }

// interface ApiResponse<R, T> {
//   response: R | null;
//   error: string | null;
//   loading: boolean;
//   makeRequest: (body: T, url:string, headersOverride?:HeadersInit) => Promise<void>;
// }

// const useApiRequest = <R, T>({ method = 'POST', headers = {} }: ApiRequestOptions<T>): ApiResponse<R, T> => {
//   const [response, setResponse] = useState<R | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const makeRequest = async (body: T, url: string, headersOverride?: HeadersInit): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`, {
//         method: method,
//         headers: {
//           ...headers,
//           ...headersOverride,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const data: R = await res.json();

//       if (!res.ok) {
//         throw new Error((data as any).message || 'Something went wrong');
//       }

//       setResponse(data);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { response, error, loading, makeRequest };
// };

// export default useApiRequest;

import { useState } from 'react';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions<T> {
  method?: HttpMethod;
  body?: T;
}

interface ApiResponse<R, T> {
  response: R | null;
  error: string | null;
  loading: boolean;
  makeRequest: (body: T, url: string, headers?: HeadersInit) => Promise<void>;
}

const useApiRequest = <R, T>({ method = 'POST' }: ApiRequestOptions<T>): ApiResponse<R, T> => {
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async (body: T, url: string, headers?: HeadersInit): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`, {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        // if(res.status === 400){
        //   const errorResponse = await res.json();
        //   console.error("Error 404:", errorResponse);
        //   throw new Error(`${errorResponse.message || "Resource not found"}`);
        // }
        // else if(res.status === 404){
        //   const errorResponse = await res.json();
        //   console.error("Error 404:", errorResponse);
        //   throw new Error(`${errorResponse.message || "Resource not found"}`);
        // }
        const errorResponse = await res.json();
        console.error(errorResponse);
        throw new Error(`${errorResponse.message || "Resource not found"}`);
        // throw new Error((data as any).message || 'Something went wrong');
      }

      const data: R = await res.json();
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
