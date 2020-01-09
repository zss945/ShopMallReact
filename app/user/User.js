import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import StoreUtil from "../utils/StoreUtil";
import {formatPhone} from "../utils/AppUtil";
import ListItem from "../view/ListItem";

class User extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loginInfo: null,
        }
    }

    componentDidMount() {
        StoreUtil.getData("loginInfo", (data) => {
            this.setState({
                loginInfo: data,
            });
        });
        //添加广播
        this.listener = DeviceEventEmitter.addListener('changeLogin', () => {
            StoreUtil.getData("loginInfo", (data) => {
                this.setState({
                    loginInfo: data,
                });
            });
        });
    }


    componentWillUnmount() {
        //防止内存泄漏
        this.setState = () => {
            return;
        };
        //移除广播
        if (this.listener) {
            this.listener.remove();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Image source={require('../../assets/photo.png')} style={styles.userImage}/>
                    <TouchableOpacity onPress={() => {
                        if (this.state.loginInfo != null) {
                            this.props.navigation.navigate('Login');
                        } else {
                            this.props.navigation.navigate('Login');
                        }
                    }}>
                        <Text>{this.state.loginInfo != null ? formatPhone(this.state.loginInfo.mobile) : "登录/注册>"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.space}/>
                <Text style={{margin: 16}}>我的订单</Text>

                <View style={styles.orderContainer}>
                    <TouchableOpacity style={styles.orderItemContainer} onPress={() => {
                        this.props.navigation.navigate('Order');
                    }}>
                        <Image source={require('../../assets/me_unpay.png')} style={styles.orderImage}/>
                        <Text>待付款</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderItemContainer} onPress={() => {
                        this.props.navigation.navigate('Order');
                    }}>
                        <Image source={require('../../assets/me_unsend.png')} style={styles.orderImage}/>
                        <Text>待发货</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderItemContainer} onPress={() => {
                        this.props.navigation.navigate('Order');
                    }}>
                        <Image source={require('../../assets/me_unreceive.png')} style={styles.orderImage}/>
                        <Text>待收货</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderItemContainer} onPress={() => {
                        this.props.navigation.navigate('Order');
                    }}>
                        <Image source={require('../../assets/me_finished.png')} style={styles.orderImage}/>
                        <Text>已完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.space}/>
                <ListItem title={'地址管理'} onPress={() => {

                }}>
                </ListItem>
                <View style={styles.line}/>
                <ListItem title={'帮助与客服'} onPress={() => {

                }}>
                </ListItem>
                <View style={styles.line}/>
                <ListItem title={'设置'} onPress={() => {
                    this.props.navigation.navigate('Settings');
                }}>
                </ListItem>
                <View style={styles.line}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    userContainer: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    userImage: {
        margin: 10,
        width: 50,
        height: 50
    },
    userButton: {
        fontSize: 14,
        color: '#515151'
    },
    orderContainer: {
        flexDirection: 'row',
    },
    orderItemContainer: {
        flex: 1,
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
    },
    orderImage: {
        margin: 5,
        width: 25,
        height: 25
    },
    space: {
        height: 10,
        backgroundColor: '#f4f4f4',
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7',
    },
});

export default User;
