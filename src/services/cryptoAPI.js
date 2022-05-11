import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "c91f5144dfmsh2c961bd5b306db3p181b9cjsnea4bd1b69f29",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

//we also have to pass headers when requesting data from third party API, below is utility function which accepts url and returns request object with headers
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/coins"),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
