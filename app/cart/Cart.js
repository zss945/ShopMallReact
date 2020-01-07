import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    DeviceEventEmitter,
} from "react-native";
import NetworkUtil from "../utils/NetworkUtil";
import API from "../api/API";
import StoreUtil from "../utils/StoreUtil";
import {toRMBFormat} from "../utils/AppUtil";
import AppButton from "../view/AppButton";

const screenWidth = Dimensions.get('window').width;

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cartData: [],
            goodsData: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            isSelectAll: false
        };
    }

    componentDidMount() {
        this.loadData();
        StoreUtil.getData("cartList", (data) => {
            this.setState({
                cartData: data,
            });
        });
        //添加广播
        this.listener = DeviceEventEmitter.addListener('changeLogin', () => {
            StoreUtil.getData("cartList", (data) => {
                this.setState({
                    cartData: data,
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

    loadData() {
        const {page} = this.state;
        const url = API.queryGoodsByLike + `?page=${page}&limit=20`;
        NetworkUtil.get(url, (res) => {
            this.setState({
                goodsData: page === 1 ? res.data.page.list : [...this.state.goodsData, ...res.data.page.list],
                error: res.error || null,
                loading: false,
                refreshing: false
            });
        })
    }

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.loadData();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.loadData();
            }
        );
    };

    cartRenderItem = ({index, item}) => {
        return (
            <View style={styles.cartContainer}>
                <TouchableOpacity onPress={this.cartSelect.bind(this, item, index)}>
                    <Image
                        source={item.isSelect === 1 ? require('../../assets/check_pressed.png') : require('../../assets/check_normal.png')}
                        style={styles.selectImage}/>
                </TouchableOpacity>
                <Image source={{uri: API.FileURL + item.image}} style={styles.cartImage}/>
                <View>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#515151',
                            marginTop: 5,
                        }}>{item.name}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#515151',
                            marginTop: 5,
                        }}
                    >{this.getSpecValue(item.specificationValues)}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#f00',
                            marginTop: 10,
                        }}>{toRMBFormat(item.price)}</Text>
                </View>
            </View>
        );
    }

    getSpecValue(values) {
        let array = JSON.parse(values);
        let specValues = "";
        array.map((item, index) => {
            specValues = specValues + `,` + item.value;
        })
        return specValues.substring(1, specValues.length);
    }

    cartSelect(item, index) {
        if (item.isSelect == 1) {
            item.isSelect = 0;
        } else {
            item.isSelect = 1;
        }
        const replaceItem = this.state.cartData;
        replaceItem.splice(index, 1, item); //删除一项,插入一项
        this.setState({
            cartData: replaceItem,
        });
        this.calcTotal();
    }

    guessLike = () => {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <View style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#f4f4f4',
                }}/>
                <Text
                    style={{
                        fontSize: 12,
                        color: '#515151',
                        marginTop: 16,
                        marginBottom: 16,
                    }}>猜你喜欢</Text>
            </View>
        );
    }

    renderHeader = () => {
        return (
            <FlatList
                data={this.state.cartData}
                renderItem={this.cartRenderItem}
                ListFooterComponent={this.guessLike}
                ListEmptyComponent={
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200
                    }}>
                        <Image source={require('../../assets/empty_cart.png')} style={styles.emptyCartImage}/>
                        <Text>
                            购物车是空的
                        </Text>
                    </View>
                }
                keyExtractor={item => `${item.productId}`}
            />
        );
    };

    renderItem = ({index, item}) => {
        return (
            <TouchableOpacity style={styles.goodsContainer} onPress={this.itemClick.bind(this, item, index)}>
                <Image source={{uri: API.FileURL + item.image}} style={styles.goodsImage}/>
                <View>
                    <Text style={styles.goodsCaption}>{item.caption}</Text>
                    <Text style={styles.goodsName}>{item.name}</Text>
                    <Text style={styles.goodsPrice}>{toRMBFormat(item.price)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    itemClick(item, index) {
        this.props.navigation.navigate('GoodsDetails', {
            goods: item,
        });
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    render() {
        let mTotalBar = null;
        if (this.state.cartData != null && this.state.cartData.length > 0) {
            mTotalBar = (
                <View style={styles.rowStyle}>
                    <TouchableOpacity style={styles.rowStyle} onPress={() => {
                        this.selectAll()
                    }}>
                        <Image
                            source={this.state.isSelectAll === 1 ? require('../../assets/check_pressed.png') : require('../../assets/check_normal.png')}
                            style={styles.selectImage}/>
                        <Text style={{fontSize: 14, color: '#717171', marginLeft: 4}}>全选</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 15, color: '#515151', marginLeft: 12}}>合计：{this.calcTotal()}</Text>
                    <View style={styles.fillSpaceStyle}/>
                    <AppButton style={{margin: 10}} title={'去结算'} onPress={() => {
                        alert('1')
                    }}/>
                </View>
            );
        }
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.goodsData}
                    renderItem={this.renderItem}
                    numColumns={2}
                    keyExtractor={item => `${item.id}`}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                    columnWrapperStyle={styles.columnWrapperStyle}
                />
                {mTotalBar}
            </SafeAreaView>
        );
    }

    calcTotal() {
        let total = 0;
        let selectCount = 0;
        this.state.cartData.map((item, index) => {
            if (item.isSelect === 1) {
                total = total + Number(item.price);
                selectCount++;
            }
        })
        if (selectCount === this.state.cartData.length) {
            this.state.isSelectAll = 1;
        } else {
            this.state.isSelectAll = 0;
        }
        return toRMBFormat(total);
    }

    selectAll() {
        let isSelect;
        if (this.state.isSelectAll === 1) {
            isSelect = 0;
        } else {
            isSelect = 1
        }
        this.state.cartData.map((item, index) => {
            item.isSelect = isSelect;
            const replaceItem = this.state.cartData;
            replaceItem.splice(index, 1, item); //删除一项,插入一项
            this.setState({
                cartData: replaceItem,
            });
        })
        this.calcTotal()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    cartContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
    },
    selectImage: {
        marginLeft: 10,
        width: 20,
        height: 20
    },
    emptyCartImage: {
        margin: 12,
        width: 40,
        height: 40
    },
    cartImage: {
        backgroundColor: '#f4f4f4',
        marginLeft: 10,
        marginRight: 10,
        width: 60,
        height: 60
    },
    goodsContainer: {
        width: screenWidth * 0.5 - 5,
        height: 300,
    },
    columnWrapperStyle: {
        marginLeft: 10,
    },
    goodsImage: {
        backgroundColor: '#f4f4f4',
        width: screenWidth * 0.5 - 15,
        height: 200
    },
    goodsCaption: {
        height: 25,
        padding: 4,
        backgroundColor: '#f0ece1',
        width: screenWidth * 0.5 - 15,
        fontSize: 12,
        color: '#515151'
    },
    goodsName: {
        paddingTop: 5,
        width: screenWidth * 0.5 - 15,
        height: 40,
        fontSize: 14,
        color: '#515151'
    },
    goodsPrice: {
        width: screenWidth * 0.5 - 15,
        color: '#f00'
    },
    rowStyle: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fillSpaceStyle: {
        flex: 1
    },
});

export default Cart;
