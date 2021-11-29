import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface CheckoutState {
  id: string|number|undefined;
  name: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  city: string | undefined;
  district: string | undefined;
  ward: string | undefined;
  fee: number | undefined;
}
export interface InfoOrder {
  info: CheckoutState;
}
const initialState: InfoOrder = {
  info: {
    id:undefined,
    name: undefined,
    address: undefined,
    phone: undefined,
    city: undefined,
    district: undefined,
    ward: undefined,
    fee : 0,
  },
};

const checkoutSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCheckoutInfo(state, action: PayloadAction<CheckoutState>) {
      state.info = action.payload;
    },
  },
});

// Actions
export const checkoutActions = checkoutSlice.actions;

// Selectors
export const selectCheckoutInfo = (state: RootState) => state.checkout.info;
// Reducer
const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
