import { StyleSheet } from 'react-native'

const height = 50
const width = 280
export default StyleSheet.create({
    textinput: {
        // backgroundColor: '#575656',
        borderRadius: 25,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 20,
        marginBottom: 15,
        width: width,
        height: height,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3

    },
    containerImage: {
        // backgroundColor: '#fffedf',
        borderRadius: 70,
        // height: 70,
        width: 60,
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
        // backgroundColor: '#222222',
        width: width,
        height: height,
        borderRadius: 25,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3

    }
})
