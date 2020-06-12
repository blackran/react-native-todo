import { StyleSheet } from 'react-native'

const height = 50
const width = 300
export default StyleSheet.create({
    textinput: {
        backgroundColor: '#575656',
        borderRadius: 5,
        paddingLeft: 25,
        fontSize: 20,
        marginBottom: 15,
        width: width,
        height: height
    },
    containerImage: {
        backgroundColor: '#fffedf',
        borderRadius: 70,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    containerImages: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsInputs: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonInput: {
        flex: 1,
        height: 50,
        padding: 5
    },
    buttonReactNativeElement: {
        backgroundColor: '#222222',
        width: width,
        height: height,
        marginTop: 20
    }
})
