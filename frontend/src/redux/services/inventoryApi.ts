import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Inventory, Item, Unit } from "@/shared/types/inventory";
import { API_URL, authHeader } from "@/lib/constans";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", authHeader() || "");
      return headers;
    },
  }),
  tagTypes: ["Inventory", "Item", "Unit"],
  endpoints: (builder) => ({
    getInventories: builder.query<Inventory[], void>({
      query: () => "inventories",
      providesTags: ["Inventory"],
    }),

    getInventory: builder.query<Inventory, string>({
      query: (id) => `inventories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Inventory", id }],
    }),

    createInventory: builder.mutation<Inventory, Partial<Inventory>>({
      query: (newInventory) => ({
        url: "inventories",
        method: "POST",
        body: newInventory,
      }),
      invalidatesTags: ["Inventory"],
    }),

    updateInventory: builder.mutation<
      Inventory,
      Partial<Inventory> & Pick<Inventory, "_id">
    >({
      query: ({ _id, ...patch }) => ({
        url: `inventories/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: "Inventory", id: _id },
      ],
    }),

    deleteInventory: builder.mutation<{ success: boolean; id: string }, string>(
      {
        query: (id) => ({
          url: `inventories/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Inventory"],
      }
    ),

    getItems: builder.query<Item[], string>({
      query: (inventoryId) => `items/inventories/${inventoryId}/items`,

      providesTags: (_result, _error, inventoryId) => [
        { type: "Item", id: inventoryId },
      ],
    }),

    createItem: builder.mutation<
      Item,
      Partial<Item> & Pick<Item, "inventoryId">
    >({
      query: ({ inventoryId, ...newItem }) => ({
        url: `items/inventories/${inventoryId}/items`,
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: (_result, _error, { inventoryId }) => [
        { type: "Item", id: inventoryId },
      ],
    }),
    updateItem: builder.mutation<
      Item,
      Partial<Item> & Pick<Item, "_id" | "inventoryId">
    >({
      query: ({ _id, inventoryId, ...patch }) => ({
        url: `items/inventories/${inventoryId}/items/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { inventoryId }) => [
        { type: "Item", id: inventoryId },
      ],
    }),

    deleteItem: builder.mutation<
      { success: boolean; id: string },
      Pick<Item, "_id" | "inventoryId">
    >({
      query: ({ _id, inventoryId }) => ({
        url: `items/inventories/${inventoryId}/items/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { inventoryId }) => [
        { type: "Item", id: inventoryId },
      ],
    }),
    getUnits: builder.query<Unit[], void>({
      query: () => "units",
      providesTags: ["Unit"],
    }),
    createUnit: builder.mutation<Unit, Partial<Unit>>({
      query: (newUnit) => ({
        url: "units",
        method: "POST",
        body: newUnit,
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useGetInventoryQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetUnitsQuery,
  useCreateUnitMutation,
} = inventoryApi;
