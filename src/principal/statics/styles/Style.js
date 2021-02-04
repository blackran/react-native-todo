import { StyleSheet } from 'react-native'

const height = 50
export default StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 5
        // backgroundColor: '#222222'
    },
    inputStyle: {
        flex: 2,
        fontSize: 18,
        height: height
    },
    myscroll: {
        overflow: 'hidden',
        marginRight: 10,
        width: 80,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: '#00ff0022'
    }
})
