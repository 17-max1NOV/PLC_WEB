const initialState = {
    modalProduct: false,
  };
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          modalProduct: true,
          product_id: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  