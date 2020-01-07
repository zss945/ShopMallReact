import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

class AppButton extends Component {

    render() {
        let {style, bgColor, textColor, fontSize, borderRadius, title} = this.props
        return (
            <TouchableOpacity style={{
                backgroundColor: bgColor,
                borderRadius: borderRadius,
                ...style
            }} onPress={this.props.onPress}>
                <Text style={{
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    fontSize: fontSize,
                    textAlign: 'center',
                    color: textColor,
                }}
                >{title}</Text>
            </TouchableOpacity>
        )
    }
}

AppButton.defaultProps = {
    bgColor: '#f4511e',
    textColor: '#ffffff',
    fontSize: 15,
    borderRadius: 5,
    title: '',
}

AppButton.propTypes={
    style: PropTypes.object,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
}

export default AppButton;
