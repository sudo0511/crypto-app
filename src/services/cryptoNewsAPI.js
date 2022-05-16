import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url, newsCategory, count) => ({
  url,
  params: {
    q: newsCategory,
    freshness: "Day",
    textFormat: "Raw",
    safeSearch: "Off",
    count,
  },
  headers: cryptoNewsApiHeaders,
});

export const cryptoNewsAPI = createApi({
  reducerPath: "cryptoNewsAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/news/search`, newsCategory, count),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsAPI;
