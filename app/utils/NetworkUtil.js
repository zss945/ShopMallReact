import {showToast} from "./AppUtil";

let NetworkUtil = {
    //get请求
    get(url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('------responseText = ' + responseText);
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
    //post请求
    post(url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('------responseText = ' + responseText);
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
}

export default NetworkUtil;
