import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from "../keys"

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ 
      baseUrl: BACKEND_URL
    }),
    tagTypes: ['Slides'], 
    endpoints: (builder) => ({
      getSLides: builder.query({
        query: () => 'slider',
        providesTags: ['Slides']       
      }),
      getNewsEditorial: builder.query({
          query: () => 'editorial'
      }),
      getNewsAll: builder.query({
          query: payload => `all/${payload}`
      }),
      getNewsRegions: builder.query({
         query:() => 'regions'
      }),
      getNewsVideo: builder.query({
        query: payload => `video/${payload}`
      }),
      getNewsColumns: builder.query({
        query:() => 'columns'
      }),
      getNewsSection: builder.query({
        query: id => `section/${id}`
      }),
      getPromotion: builder.query({
        query: () => "promotion"
      }),
      createSlide: builder.mutation({
        query: slide => ({
          url: 'slider',
          method: 'POST',
          body: slide,
        }),
        invalidatesTags: ['Slides']
      }),
      editSlide: builder.mutation({
        query: slide => ({
          url: `slider/edit/${slide.get('_id')}`,
          method: 'POST',
          body: slide,
        }),
        invalidatesTags: ['Slides']
      }),
      deleteSlide: builder.mutation({
        query: slide => ({
          url: `slider/remove`,
          method: 'POST',
          body: slide
        })  ,
        invalidatesTags: ['Slides']
      })
    }),
  })

export const { 
  useGetSLidesQuery, 
  useGetNewsEditorialQuery,
  useGetNewsAllQuery,
  useGetNewsRegionsQuery,
  useGetNewsVideoQuery,
  useGetNewsColumnsQuery,
  useGetNewsSectionQuery,
  useGetPromotionQuery,
  useCreateSlideMutation, 
  useEditSlideMutation,
  useDeleteSlideMutation 
} = apiSlice