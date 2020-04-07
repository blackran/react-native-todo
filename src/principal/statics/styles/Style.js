import { StyleSheet } from 'react-native'

const height = 50
const width = 300
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
        // borderWidth: 1,
        // borderColor: 'green',
        overflow: 'hidden',
        marginRight: 10,
        width: 200
    }
})
