import React, {Component} from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import * as PropTypes from "prop-types";

class ListItem extends Component {

    render() {
        let {title} = this.props
        return (
            <TouchableOpacity style={{flexDirection: 'row', padding: 12, alignItems: 'center'}}
                              onPress={this.props.onPress}>
                <Text style={{fontSize: 16, color: '#515151'}}>{title}</Text>
                <View style={{flex: 1}}/>
                <Image source={require('../../assets/icon_right.png')}
                       style={{ width: 22, height: 22}}/>
            </TouchableOpacity>
        )
    }
}


ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}

export default ListItem;
