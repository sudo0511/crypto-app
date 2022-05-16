import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
};

export const baseUrl = "https://coinranking1.p.rapidapi.com";

//we also have to pass headers when requesting data from third party API, below is utility function which accepts url and returns request object with headers
export const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const createHistoryRequest = (url, timePeriod) => ({
  url,
  params: {
    timePeriod,
  },
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`), // get all coins based on limit number of coins to be fetched
    }),
    getCoin: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`), //to get particular coin and its details
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createHistoryRequest(`/coin/${coinId}/history`, timePeriod),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCoinQuery, useGetCoinHistoryQuery } =
  cryptoApi;
