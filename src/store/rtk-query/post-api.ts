import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: "/posts",
        params: {
          _limit: limit,
        },
      }),
    }),
    getPostById: build.query<IPost, number>({
      query: (id: number = 5) => ({
        url: `/posts/${id}`
      }),
    }),
  }),
});

export const { useGetPostsQuery , useGetPostByIdQuery} = postApi;
