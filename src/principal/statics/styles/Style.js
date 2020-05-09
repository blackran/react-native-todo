import { Dimensions, StyleSheet, } from 'react-native'

const height = 50
const { width } = Dimensions.get('window')
export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#222222'
    },
    inputStyle: {
        flex: 2,
        fontSize: 18,
        height: height
    },
    myscroll: {
        overflow: 'hidden',
        marginRight: 10,
        width: 100
    }
})
