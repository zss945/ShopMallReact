import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import Icon from 'react-native-vector-icons/Entypo';
import Cart from "./cart/Cart";
import User from "./user/User";
import Home from "./home/Home";
import Login from "./auth/Login";
import Order from "./user/order/Order";
import HomeList from "./home/HomeList";
import GoodsDetails from "./goods/GoodsDetails";

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {tabBarLabel: '首页'},
        },
        Cart: {
            screen: Cart,
            navigationOptions: {tabBarLabel: '购物车'},
        },
        User: {
            screen: User,
            navigationOptions: {tabBarLabel: '我的'},
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    let IconComponent;
    let iconName;
    if (routeName === 'Home') {
        iconName = `home`;
        IconComponent = Icon;
    } else if (routeName === 'Cart') {
        iconName = `shopping-cart`;
        IconComponent = Icon;
    } else if (routeName === 'User') {
        IconComponent = Icon;
        iconName = `user`;
    }
    return <IconComponent name={iconName} size={25} color={tintColor}/>;
};

const StackTabNavigator = createStackNavigator({
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: {title: '商城'},
        },
        Login: {
            screen: Login,
            navigationOptions: {title: '登录'},
        },
        Order: {
            screen: Order,
            navigationOptions: {title: '我的订单'},
        },
        HomeList: {
            screen: HomeList
        },
        GoodsDetails: {
            screen: GoodsDetails,
            navigationOptions: {title: '商品详情'},
        },
        Cart: {
            screen: Cart,
            navigationOptions: {title: '购物车'},
        },

    },
    {
        initialRouteName: 'TabNavigator',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

export default createAppContainer(StackTabNavigator);
