import { productConstants } from "../actions/constant";

const initialState = {
    products: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCT_DATA_SUCCESS:
            state = {
                ...state, 
                products: action.payload.products
            }
            break;
    }
    return state;
}