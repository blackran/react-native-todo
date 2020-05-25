import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        // paddingBottom: 20,
        // backgroundColor: '#222222',
        width: width,
        height: height,
        top: height / 3,
        position: 'absolute'
    },
    containerImageLogin: {
        // borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
        // backgroundColor: '#fffedf',
        borderRadius: 70,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 75
    }
})
