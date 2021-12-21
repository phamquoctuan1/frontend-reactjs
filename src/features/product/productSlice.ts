import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Product } from 'models';

export interface ProductState {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  product: Product;
  value: string;
  className: string;
}

const initialState: ProductState = {
  loading: false,
  list: [],
  filter: {
    name: undefined,
    _page: 1,
    _limit: 30,
    color: [],
    size: [],
    categoryId: undefined,
    price: undefined,
  },
  product: {
    name: '',
    imageInfo: [],
    slug: '',
    discount_percentage: '',
    sizeInfo: [],
    colorInfo: [],
    promoteInfo: [],
    quantity: 0,
    price: 0,
    description: '',
  },
  value: '',
  className: '',
};
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    fetchProductList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProductListSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.list = action.payload.data;
      state.loading = false;
    },
    fetchProductListFailed(state) {
      state.loading = false;
    },
    fetchProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    set(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    remove(state) {
      state.value = '';
    },
    setClassName(state, action: PayloadAction<string>) {
      state.className = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//Actions
export const productActions = productSlice.actions;
//Selector
export const selectClassName = (state: RootState) => state.product.className;
export const selectValueSlug = (state: RootState) => state.product.value;
export const selectProductList = (state: RootState) => state.product.list;
export const selectProduct = (state: RootState) => state.product.product;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
//Reducer
const productReducer = productSlice.reducer;
export default productReducer;
