// General fetch function
export async function dataFetch<T>(endpoint: string, method?: ReqType, body?: T) {
  const reqProperties: RequestInit = {
    method: method ??  ReqType.get,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    reqProperties.body = JSON.stringify(body);
  }

  const response = await fetch(
    import.meta.env.VITE_API_URL + endpoint,
    reqProperties,
  );

  // DELETE is the only method where the API does not return a body
  if (method === "DELETE") {
    return response;
  }

  return await response.json();
}

export type DataFetch = typeof dataFetch;

export enum ReqType {
  post = "POST",
  put = "PUT",
  get = "GET",
  del = "DELETE"
}