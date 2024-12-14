import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Product {
    beanId: number;
    name: string;
    isLiked: boolean;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const product = state.products.find(item => item.beanId === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(item => item.beanId !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(item => item.beanId === action.payload.beanId);
            if (index !== -1) {
                state.products[index] = action.payload; 
            }
        },
    },
});


export const { setProducts, addProduct, toggleLike, removeProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;