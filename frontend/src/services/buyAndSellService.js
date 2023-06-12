import httpService from "./httpService";

function getProducts(page, limit, categories, sortBy, order) {
    return httpService.get(`/get-products?page=${page}&limit=${limit}${categories ? `&categories=${categories}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${order ? `&order=${order}` : ''}`);
}

function getProduct(id) {
    return httpService.get(`/get-products/${id}`);
}

function getProductMe(id){
    return httpService.get(`/get-products-me/${id}`);
}

function getProductEnquire(id){
    return httpService.get(`/get-product/phone-number/${id}`);
}



function myProducts() {
    return httpService.get(`/get-products-me`);   
}

function postProducts(data) {

    let postData = {
        iteminfo: {
            ...data
        }
    };

    return httpService.post('/add-product', postData);
}

function updateProduct(id, data) {

    let updateData = {
        productid: id,
        iteminfo: {
            ...data
        }
    };
    
    return httpService.put(`/update-product`, updateData);
}

function deleteProduct(data) {
    return httpService.delete(`/delete-product`, {data : data});
}

const buyAndSellService = { getProducts, getProduct, getProductMe, getProductEnquire, myProducts, postProducts, updateProduct, deleteProduct };

export default buyAndSellService;