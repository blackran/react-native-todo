import React, { Component } from 'react'
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native'

class Loading extends Component {
    componentDidMount () {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 1000)
    }

    render () {
        return (
            <View>
                <ActivityIndicator color='black' size={50}/>
            </View>
        )
    }
}

export default Loading
