import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import NetworkUtil from "../utils/NetworkUtil";
import API from "../api/API";
import {toRMBFormat} from "../utils/AppUtil";

const screenWidth = Dimensions.get('window').width;

class HomeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };

    }

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        //防止内存泄漏
        this.setState = () => {
            return;
        };
    }

    loadData() {
        const {page} = this.state;
        const {categoryItem} = this.props
        const url = API.queryGoodsByCategory + `?page=${page}&limit=20&level=${categoryItem.level}&categoryId=${categoryItem.id}`;
        NetworkUtil.get(url, (res) => {
            this.setState({
                data: page === 1 ? res.data.page.list : [...this.state.data, ...res.data.page.list],
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

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                numColumns={2}
                keyExtractor={item => `${item.id}`}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
                columnWrapperStyle={styles.columnWrapperStyle}
            />
        );
    }
}


const styles = StyleSheet.create({
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
});

HomeList.defaultProps = {
    categoryItem: null,
    navigation: null
}

export default HomeList;
