import { baseApi } from "./baseApi";

export const reviewsAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getAllReview: builder.query({
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
          url: `/admin/all-reviews?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["reviews"],
    }),
   
  
   
  }),
});

export const {
  useGetAllReviewQuery,

  
} = reviewsAPi;