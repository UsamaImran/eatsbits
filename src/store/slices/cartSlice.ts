import { FoodItem, FoodItemOption } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem extends FoodItem {
  quantity: number;
  uniqueId: string;
}

export type OrderType = { title: string; value: string };

export interface CartFoodItemOption extends FoodItemOption {
  itemCorrelationId: string;
}

interface CartState {
  items: CartItem[];
  comment: string;
  isOpenCart: boolean;
  cutlery: number;
  orderType: OrderType;
}

const initialState: CartState = {
  items: [],
  isOpenCart: false,
  cutlery: 0,
  comment: '',
  orderType: { title: 'To go', value: 'PICK_UP' },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { correlationId, itemOptions } = action.payload;

      const uniqueId = `${correlationId}-${itemOptions
        ?.map(
          (option) =>
            `${option.correlationId}-${option.itemOptionElements
              ?.map((element) => element.correlationId)
              .join('-')}`
        )
        .join('-')}`;

      const existingItem = state.items.find(
        (item) => item.uniqueId === uniqueId
      );

      // getting item options

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.itemOptions = itemOptions;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
          uniqueId,
          itemOptions: itemOptions,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.isOpenCart = false;
      state.comment = '';
      state.cutlery = 0;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.findIndex(
        (item) => item.uniqueId === action.payload
      );

      if (existingItem !== -1) {
        state.items[existingItem].quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.findIndex(
        (item) => item.uniqueId === action.payload
      );

      if (existingItem !== -1 && state.items[existingItem].quantity > 1) {
        state.items[existingItem].quantity -= 1;
      }
    },

    openCart: (state) => {
      state.isOpenCart = true;
    },
    closeCart: (state) => {
      state.isOpenCart = false;
    },

    setOderType: (state, action: PayloadAction<CartState['orderType']>) => {
      state.orderType = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  openCart,
  closeCart,
  setOderType,
  setComment,
} = cartSlice.actions;

export default cartSlice.reducer;
