import Toast from "react-native-root-toast";

export const formatPhone = (phone) => {
    const start = phone.substring(0, 3);
    const end = phone.substring(phone.length - 4);
    return start +`****` + end;
};

export const fromRMB = (amount) => {
    const exp = 10000;
    return  amount * exp;
};

export const toRMB = (amount) => {
    const exp = 10000;
    let result =  amount / exp;
    return result.toFixed(2);
};

export const toRMBFormat = (amount) => {
    return `￥`+toRMB(amount)
}

export const showToast = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
};
