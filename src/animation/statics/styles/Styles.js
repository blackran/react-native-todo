import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        width: width,
        height: height,
        position: 'absolute',
        borderWidth: 1,
        marginBottom: height / 2
    },
    containerImageLogin: {
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 70,
        height: 70,
        width: 70,
        justifyContent: 'center',
        position: 'absolute',
        top: height / 5
    }
})
