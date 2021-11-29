import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
const items: any[] =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [];

export interface ValueCart {
  productId: string | number;
  image: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  id?: string | number;
}
export interface Value {
  value: ValueCart[];
}
const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.value = [];
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e: ValueCart) =>
          e.productId === newItem.productId &&
          e.slug === newItem.slug &&
          e.color === newItem.color &&
          e.size === newItem.size &&
          e.name === newItem.name &&
          e.image === newItem.image
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e: ValueCart) =>
            e.productId !== newItem.productId ||
            e.slug !== newItem.slug ||
            e.color !== newItem.color ||
            e.size !== newItem.size
        );
        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            slug: newItem.slug,
            color: newItem.color,
            size: newItem.size,
            name: newItem.name,
            image: newItem.image,
            price: newItem.price,
            productId: newItem.productId,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = state.value.filter(
        (e: ValueCart) =>
          e.productId === newItem.productId &&
          e.slug === newItem.slug &&
          e.color === newItem.color &&
          e.size === newItem.size &&
          e.image === newItem.image &&
          e.name === newItem.name
      );
      if (item.length > 0) {
        state.value = state.value.filter(
          (e: ValueCart) =>
            e.productId !== newItem.productId ||
            e.slug !== newItem.slug ||
            e.color !== newItem.color ||
            e.size !== newItem.size ||
            e.image !== newItem.image ||
            e.name !== newItem.name
        );
        state.value = [
          ...state.value,
          {
            id: item[0].id,
            slug: newItem.slug,
            color: newItem.color,
            name: newItem.name,
            image: newItem.image,
            size: newItem.size,
            price: newItem.price,
            productId: newItem.productId,
            quantity: newItem.quantity,
          },
        ];
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter(
        (e: ValueCart) =>
          e.slug !== item.slug || e.color !== item.color || e.size !== item.size
      );
      localStorage.setItem(
        'cartItems',
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const cartActions = cartItemsSlice.actions;
///
export const selectValueCart = (state: RootState) => state.cart.value;
///
const cartReducer = cartItemsSlice.reducer;
export default cartReducer;
