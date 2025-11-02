/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const BASE_URL = 'http://localhost:3000/api';

let getTokenFn = null;

export function setTokenGetter(fn) {
  getTokenFn = fn;
}

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

async function apiRequest(endpoint, options = {}) {
  const token = getTokenFn ? getTokenFn() : null;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    return handleResponse(response);
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

export const api = {
  get: (endpoint) => apiRequest(endpoint),
  
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};