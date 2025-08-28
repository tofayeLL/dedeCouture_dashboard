import { baseApi } from "./baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getAllBrands: builder.query({
      query: ({ page, limit, search }) => {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        // Add search parameter if provided
        if (search && search.trim() !== '') {
          params.append('search', search.trim());
        }
        
        return {
          url: `/admin/all-brands?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["brand"],
    }),
   
   /*  getSingleUser: builder.query({
      query: () => ({      
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["brand"],
    }), */
   
   
  }),
});

export const {
  useGetAllBrandsQuery,
//   useGetSingleUserQuery,
  
} = brandApi;