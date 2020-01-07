
let BASE_URL='https://randomuser.me/api/';
let MALL_URL = "http://10.31.15.227:8088/app/api/v1/";
let FILE_URL = "http://10.31.15.227:8090/upload/files/";

class API {
    static BaseURL = BASE_URL;
    static FileURL = FILE_URL;
    static queryTreeCategory = MALL_URL + 'queryTreeCategory';
    static queryGoodsByCategory = MALL_URL + 'queryGoodsByCategory';
    static queryGoodsByLike = MALL_URL + 'queryGoodsByLike';
    static login = MALL_URL + 'login';
}

export default API;
