import React from "react";
import {View, FlatList, ActivityIndicator, StyleSheet} from "react-native";
import {ListItem, SearchBar} from "react-native-elements";
import NetworkUtil from "../../utils/NetworkUtil";
import API from "../../api/API";

class OrderUnPay extends React.Component {

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
        const {page, seed} = this.state;
        const url = API.BaseURL + `?seed=${seed}&page=${page}&results=20`;
        this.setState({loading: true});
        NetworkUtil.get(url, (res) => {
            this.setState({
                data: page === 1 ? res.results : [...this.state.data, ...res.results],
                error: res.error || null,
                loading: false,
                refreshing: false
            });
        })

    };

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

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round/>;
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

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                    <ListItem
                        roundAvatar
                        title={`${item.name.first} ${item.name.last}`}
                        subtitle={item.email}
                        avatar={{uri: item.picture.thumbnail}}
                        containerStyle={{borderBottomWidth: 0}}
                    />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
            />
        );
    }
}

export default OrderUnPay;
