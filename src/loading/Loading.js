import React, { Component } from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

class Loading extends Component {
    componentDidMount () {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 1000)
    }

    render () {
        return (
            <View style={styles.body}>
                <ActivityIndicator color='black' size={50}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
