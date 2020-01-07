import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomeList from "./HomeList";
import API from "../api/API";
import NetworkUtil from "../utils/NetworkUtil";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleList: [],
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
        const url = API.queryTreeCategory + `?parentId=1`;
        NetworkUtil.get(url, (res) => {
            this.setState({
                titleList: res.data.list,
            });
        })
    }

    render() {
        return <ScrollableTabView
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar activeTextColor={'#f4511e'} underlineStyle={{backgroundColor: '#f4511e'}}/>}>
            {
                this.state.titleList.map((item, index) => {
                    return (
                        <View tabLabel={item.name} key={index} style={styles.container}>
                            <HomeList categoryItem={item} navigation={this.props.navigation}/>
                        </View>
                    )
                })
            }
        </ScrollableTabView>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

export default Home;
