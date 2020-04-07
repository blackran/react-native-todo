import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: 20,
        backgroundColor: '#222222',
        width: width,
        height: height,
        marginTop: height / 3,
        borderWidth: 1
    },
    containerImageLogin: {
        backgroundColor: '#fffedf',
        borderRadius: 70,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 75
    }
})
