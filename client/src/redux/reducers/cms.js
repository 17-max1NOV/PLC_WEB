const initialState = {
  listTable: null,
  toggleModal: false,
  dataDeatil: null,
  pageNow: 1,
  page: 1,
  limit: 10,
  total: 0,
  fileNameExcel: null,
  listTableProduct: null,
  toggleModalProduct: false,
  dataDeatilProduct: null,
  pageProduct: 1,
  pageNowProduct: 1,
  totalProduct: 0,
  limitProduct: 10,

};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLIST':
      return {
        ...state,
        listTable: action.payload,
      };
    case 'GETLISTPRODUCT':
      return {
        ...state,
        listTableProduct: action.payload,
      };
    case 'TOGGELMODAL':
      return {
        ...state,
        toggleModal: action.payload,
      };
    case 'DATADEAITL':
      return {
        ...state,
        dataDeatil: action.payload,
      };
    case 'TOTAL':
      return {
        ...state,
        total: action.payload,
      };
    case 'PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'PAGENOW':
      return {
        ...state,
        pageNow: action.payload,
      };
    case 'LIMIT':
      return {
        ...state,
        limit: action.payload,
      };
    case 'TOTALPRODUCT':
      return {
        ...state,
        total: action.payload,
      };
    case 'PAGEPRODUCT':
      return {
        ...state,
        pageProduct: action.payload,
      };
    case 'PAGENOWPRODUCT':
      return {
        ...state,
        pageNowProduct: action.payload,
      };
    case 'LIMITPRODUCT':
      return {
        ...state,
        limitProduct: action.payload,
      };
    case 'UPDATEFILENANMEXCEL':
      return {
        ...state,
        fileNameExcel: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
