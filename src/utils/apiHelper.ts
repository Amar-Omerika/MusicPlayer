import axios, { AxiosResponse, AxiosError } from 'axios';

const baseURL = 'https://api.spotify.com/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type HttpMethod = 'get' | 'post' | 'patch'; // Define the supported HTTP methods

type SendRequestResponse<T> = {
  data: T;
  response: AxiosResponse<T>;
};
const handleRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: Record<string, any>,
  params?: Record<string, any>,
  token?: string // Bearer token
): Promise<SendRequestResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await api.request<T>({
      method, // Specify the HTTP method
      url,
      data, // Request data for POST or PATCH
      params, // Query parameters for GET requests
      headers,
    });

    return {
      data: response.data,
      response,
    };
  } catch (error) {
    throw error as AxiosError;
  }
};

export default handleRequest;


//usage 

// const fetchData = async () => {
//   try {
//     // Replace 'yourBearerToken' with the actual token retrieved from local storage
//     const token = 'yourBearerToken';

//     const result = await sendRequest<string>('get', '/data', undefined, undefined, token); // GET request with Bearer token
//     console.log('GET Request Result:', result.data);

//     const postData = { key: 'value' };
//     const postResult = await sendRequest<number>('post', '/create', postData, undefined, token); // POST request with Bearer token
//     console.log('POST Request Result:', postResult.data);

//     const patchData = { key: 'updatedValue' };
//     const patchResult = await sendRequest<boolean>('patch', '/update/1', patchData, undefined, token); // PATCH request with Bearer token
//     console.log('PATCH Request Result:', patchResult.data);
//   } catch (error) {
//     console.error('Request Error:', error);
//   }
// };

// fetchData();



