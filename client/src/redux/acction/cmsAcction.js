export const getListCmsTable = (data) => ({
    type: 'GETLIST',
    payload: data,
});
export const toggleModalFun = (item) => ({
    type: 'TOGGELMODAL',
    payload: item,
});
export const deatilDataFun = (item) => ({
    type: 'DATADEAITL',
    payload: item,
});

export const totalFun = (item) => ({
    type: 'TOTAL',
    payload: item,
});
export const pageNowFun = (item) => ({
    type: 'PAGENOW',
    payload: item,
});
export const limitFun = (item) => ({
    type: 'LIMIT',
    payload: item,
});
export const pageFun = (item) => ({
    type: 'PAGE',
    payload: item,
});
export const updateNameExcelFun = (item) => ({
    type: 'UPDATEFILENANMEXCEL',
    payload: item,
});
export const getProductTable = (data) => ({
    type: 'GETLISTPRODUCT',
    payload: data,
});


export const totalProductFun = (item) => ({
    type: 'TOTALPRODUCT',
    payload: item,
});
export const pageNowProductFun = (item) => ({
    type: 'PAGEPRODUCT',
    payload: item,
});
export const limitProductFun = (item) => ({
    type: 'LIMITPRODUCT',
    payload: item,
});
export const pageProductFun = (item) => ({
    type: 'PAGEPRODUCT',
    payload: item,
});