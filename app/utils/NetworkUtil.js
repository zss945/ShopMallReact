import {showToast} from "./AppUtil";
import StoreUtil from "./StoreUtil";

let NetworkUtil = {

    //get请求
    get(url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('------url = ' + url);
                // console.log('------responseText = ' + responseText);
                const result = JSON.parse(responseText);
                if (result.code === 0) {
                    callback(result);
                } else {
                    showToast(result.error);
                }
            }).catch(error => {
            console.log("----网络连接异常");
        });
    },

    //get请求
    getNoCode(url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('------responseText = ' + responseText);
                callback(JSON.parse(responseText));
            }).catch(error => {
            console.log("----网络连接异常");
        });
    },

    //post请求
    post(url, params, callback) {
        StoreUtil.getData("loginInfo", (data) => {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if (data != null) {
                headers = Object.assign(headers, {token: data.token})
            }
            const fetchOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(params)
            };
            fetch(url, fetchOptions)
                .then((response) => response.text())
                .then((responseText) => {
                    console.log('------url = ' + url);
                    // console.log('------responseText = ' + responseText);
                    const result = JSON.parse(responseText);
                    if (result.code === 0) {
                        callback(result);
                    } else {
                        showToast(result.error);
                    }
                }).catch(error => {
                console.log("----网络连接异常");
            });
        });
    }

}

export default NetworkUtil;
