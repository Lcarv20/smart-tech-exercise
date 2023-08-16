export async function fetchData(endpoint: string, errorMsg: string) {
  const data = await fetch(import.meta.env.VITE_API_URL + endpoint);
  try {
    const json = await data.json();
    return json;
  } catch (error) {
    // Here add error to state and use crumbs to annouce the error
    console.log(error);
    return errorMsg;
  }
}
