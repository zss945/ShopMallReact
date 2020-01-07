import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import OrderUnPay from "./OrderUnPay";
import OrderUnSend from "./OrderUnSend";
import OrderUnReceive from "./OrderUnReceive";
import OrderFinished from "./OrderFinished";

class Order extends React.Component {

    render() {
        return <ScrollableTabView
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar/>}>
            <View
                style={styles.container}
                tabLabel='待付款'>
                <OrderUnPay/>
            </View>
            <View
                style={styles.container}
                tabLabel='待发货'>
                <OrderUnSend/>
            </View>
            <View
                style={styles.container}
                tabLabel='待收货'>
                <OrderUnReceive/>
            </View>
            <View
                style={styles.container}
                tabLabel='已完成'>
                <OrderFinished/>
            </View>
        </ScrollableTabView>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Order;
