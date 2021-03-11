import { StyleSheet } from 'react-native'

const height = 50
export default StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 5
  },
  flex: 2,
  inputStyle: {
    fontSize: 18,
    height: height
  },
  myscroll: {
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#00ff0022',
    borderRadius: 10
  }
})
