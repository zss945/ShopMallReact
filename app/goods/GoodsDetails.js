import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import API from "../api/API";
import {toRMBFormat} from "../utils/AppUtil";
import AppButton from "../view/AppButton";
const {screenWidth} = Dimensions.get('window');

const renderPagination = (index, total) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={styles.text}>
                {index + 1}/{total}
            </Text>
        </View>
    );
}

class GoodsDetails extends Component {

    constructor(props) {
        super(props);
        const goods = props.navigation.getParam('goods');
        const goodsImages = JSON.parse(goods.goodsImages);
        this.state = {
            goods: goods,
            goodsImages: goodsImages
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imagesContainer}>
                    <Swiper
                        renderPagination={renderPagination}
                        autoplay={true}
                        loop={true}>
                        {
                            this.state.goodsImages.map((item, index) => {
                                return (
                                    <View
                                        key={'key' + index}
                                        style={styles.slide}>
                                        <Image
                                            resizeMode='stretch'
                                            style={styles.image}
                                            source={{uri: API.FileURL + item.url}}
                                        />
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>
                <Text style={styles.priceText}>{toRMBFormat(this.state.goods.price)}</Text>
                <Text style={styles.goodsText}>{this.state.goods.name}</Text>
                <View style={styles.space}/>
                <View style={styles.rowStyle}>
                    <Text style={styles.rowTitle}>选择</Text>
                    <Text style={styles.rowValue}>请选择主要颜色,尺码</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.rowStyle}>
                    <Text style={styles.rowTitle}>送至</Text>
                    <Text style={styles.rowValue}>请选择地址</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.rowStyle}>
                    <Text style={styles.rowTitle}>运费</Text>
                    <Text style={styles.rowValue}>免运费</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.fillSpaceStyle}/>
                <View style={styles.bottomStyle}>
                    <TouchableOpacity style={styles.imageTextContainer} onPress={() => {
                        alert('1')
                    }}>
                        <Image source={require('../../assets/icon_customer.png')} style={styles.imageItem}/>
                        <Text style={styles.textItem}>联系客服</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageTextContainer} onPress={() => {
                        this.props.navigation.push('Cart');
                    }}>
                        <Image source={require('../../assets/icon_cart.png')} style={styles.imageItem}/>
                        <Text style={styles.textItem}>购物车</Text>
                    </TouchableOpacity>
                    <View style={styles.fillSpaceStyle}/>

                    <AppButton style={{marginLeft: 10}} title={'加入购物车'} borderRadius={20} fontSize={14} onPress={() => {
                        alert('3')
                    }}/>

                    <AppButton style={{marginLeft: 10, marginRight: 10}} title={'立即购买'} borderRadius={20} fontSize={14}
                               onPress={() => {
                                   alert('4')
                               }}/>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imagesContainer: {
        height: 300,
        width: screenWidth
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#515151',
    },
    image: {
        flex: 1,
        width: screenWidth,
        backgroundColor: '#f4f4f4',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    priceText: {
        color: '#f00',
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
    },
    goodsText: {
        color: '#515151',
        fontSize: 18,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
    },
    space: {
        height: 10,
        backgroundColor: '#f4f4f4',
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7',
    },
    rowStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    rowTitle: {
        color: '#515151',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
    },
    rowValue: {
        color: '#515151',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
    },
    fillSpaceStyle: {
        flex: 1
    },
    bottomStyle: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTextContainer: {
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageItem: {
        width: 25,
        height: 25
    },
    textItem: {
        paddingTop: 4,
        color: '#313131',
        fontSize: 12,
    }
});
export default GoodsDetails;
