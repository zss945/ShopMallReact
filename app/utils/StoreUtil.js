import AsyncStorage from '@react-native-community/async-storage';

class StoreUtil {

    setData = async (key, data) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
        }
    };

    getData = async (key, callback) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data != null) {
                callback(JSON.parse(data));
            } else {
                callback(null);
            }
        } catch (e) {
            callback(null);
        }
    };
}

export default new StoreUtil();
