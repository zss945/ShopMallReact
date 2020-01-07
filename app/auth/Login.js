import React from 'react';
import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import API from "../api/API";
import NetworkUtil from "../utils/NetworkUtil";
import StoreUtil from "../utils/StoreUtil";
import AppButton from "../view/AppButton";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Image source={require('../../assets/photo.png')} style={styles.userImage}/>
                </View>

                <TextInput
                    style={styles.styleInput}
                    placeholder="手机号码"
                    placeholderTextColor={'#999999'}
                    onChangeText={(text) => {
                        this.setState({mobile: text})
                    }}
                />
                <View style={styles.line}/>

                <TextInput

                    style={styles.styleInput}
                    placeholder="密码"
                    placeholderTextColor={'#999999'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({password: text})
                    }}/>
                <View style={styles.line}/>

                <Text style={styles.forgetText}>
                    忘记密码？
                </Text>

                <AppButton style={{marginLeft: 16, marginRight: 16}} title={'登录'} onPress={() => {
                    this.login();
                }}>
                </AppButton>
            </View>
        );
    }

    login() {
        const params = {mobile: this.state.mobile, password: this.state.password}
        NetworkUtil.post(API.login, params, (res) => {
            const data = res.data;
            const member = data.member;
            const saveData = {
                expire: data.expire,
                token: data.token,
                memberId: member.id,
                mobile: member.mobile,
                sn: member.sn
            }
            const cart = member.cart;
            const cartKey = cart.cartKey;
            const list = cart.list;
            let cartList = [];
            if(list != null && list.length > 0){
                list.map((item, index) => {
                    const cartItem = {
                        cartItemId: item.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        cartKey: cartKey,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        specificationValues: item.specificationValues,
                        isSelect: 1
                    }
                    cartList.push(cartItem);
                })
            }
            StoreUtil.setData("loginInfo", saveData);
            StoreUtil.setData("cartList", cartList);
            DeviceEventEmitter.emit('changeLogin', null);
            this.props.navigation.goBack();
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    userContainer: {
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImage: {
        width: 70,
        height: 70
    },
    styleInput: {
        height: 45,
        marginLeft: 16,
        marginRight: 16,
    },
    forgetText: {
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        margin: 10
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7',
        marginLeft: 16,
        marginRight: 16,
    },
});

export default Login;
