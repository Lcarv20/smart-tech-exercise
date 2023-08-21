// General fetch function
export async function dataFetch<T>(endpoint: string, method = "GET", body?: T) {
  const reqProperties: RequestInit = {
    method: method,
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
