import { baseApi } from "./baseApi";

export const CategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
                method: 'GET',
            }),
            providesTags: ['category']
        }),
        
    }),
})

export const { useGetAllCategoryQuery } = CategoryApi;