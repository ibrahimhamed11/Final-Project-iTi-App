import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetProducts = createAsyncThunk('product/getproducts', async () => {
  let response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
});

export const loadCartFromStorage = createAsyncThunk('product/loadCartFromStorage', async () => {
  try {
    const cartString = await AsyncStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    return cart;
  } catch (error) {
    console.error(error);
    return [];
  }
});

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        // Alert.alert('حضرتك ضيفته قبل كدا !هزودلك الكميه');
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
        // Alert.alert('تمت الاضافة للسله ياغالي ..يكش تشتري');
      }

      AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity === 1) {
          state.cart.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }

      AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity === 1) {
          state.cart.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
  },
  extraReducers: {
    [GetProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [loadCartFromStorage.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
  }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = ProductSlice.actions;

export default ProductSlice.reducer;
