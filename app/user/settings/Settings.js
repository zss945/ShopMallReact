import React from 'react';
import {DeviceEventEmitter, StyleSheet, View} from "react-native";
import ListItem from "../../view/ListItem";
import AppButton from "../../view/AppButton";
import StoreUtil from "../../utils/StoreUtil";

class Settings extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.space}/>
                <ListItem title={'修改密码'} onPress={() => {
                    this.props.navigation.navigate('Login');
                }}>
                </ListItem>
                <View style={styles.line}/>
                <ListItem title={'帮助与客服'} onPress={() => {
                    this.props.navigation.navigate('Login');
                }}>
                </ListItem>
                <View style={styles.line}/>
                <ListItem title={'关于我们'} onPress={() => {
                    this.props.navigation.navigate('Login');
                }}>
                </ListItem>
                <View style={styles.line}/>

                <AppButton style={{ marginTop: 25, marginLeft: 16, marginRight: 16}} title={'退出登录'} onPress={() => {
                    StoreUtil.setData("loginInfo", null);
                    StoreUtil.setData("cartList", null);
                    DeviceEventEmitter.emit('changeLogin', null);
                    this.props.navigation.goBack();
                }}>
                </AppButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7',
    },
});

export default  Settings;
