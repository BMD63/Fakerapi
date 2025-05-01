import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PersonData, PersonsResponse} from '../types/persons';
import { BASE_API_URL } from '../constants';

export const personsApi = createApi({
  reducerPath: 'personsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getPerson: builder.query<PersonData, void>({
      query: () => '/persons?_id=1',
      transformResponse: (response: PersonsResponse) => response.data[0],
    }),
  }),
});

export const { useGetPersonQuery } = personsApi;
