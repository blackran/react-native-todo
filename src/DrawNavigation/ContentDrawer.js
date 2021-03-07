import React from 'react'
import backgroundImage from '../statics/images/IMG_80411.jpg'
import me from '../statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { faSignOutAlt, faCog, faTasks, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function ContentDrawer (props) {
  const { color } = props.navigation.state.params
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: color ? color.activeColor.primary.default : 'white'
        backgroundColor: '#0c0c0c'
      }}
    >
      <View style={{
        height: 200,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 5,
        borderColor: color ? color.activeColor.primary.dark : 'white',
        marginBottom: 20
      }}
      >
        <Image
          source={backgroundImage} style={{
            height: 200,
            width: '100%',
            position: 'absolute'
          }}
        />
        <Image
          source={me} style={{
            height: 110,
            width: 110,
            borderRadius: 10
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 30
        }}
      >
        <Text style={{
          margin: 16,
          fontWeight: 'bold',
          color: color ? color.activeColor.fontColor.light : '#ffb21d'
        }}
        >Blackran
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer()
              props.navigation.navigate('Principal',
                {
                  color: color
                }
              )
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <FontAwesomeIcon
                icon={faTasks}
                color={
                  color ? color.activeColor.fontColor.light : '#ffb21d'
                }
                size={24}
              />
              <Text style={{
                margin: 16,
                fontWeight: 'bold',
                color: color ? color.activeColor.fontColor.light : '#ffb21d'
              }}
              >Asako
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer()
              props.navigation.navigate('Tasks',
                {
                  color: color
                }
              )
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <FontAwesomeIcon
                icon={faCog}
                color={color ? color.activeColor.fontColor.light : '#ffb21d'}
                size={24}
              />
              <Text style={{
                margin: 16,
                fontWeight: 'bold',
                color: color ? color.activeColor.fontColor.light : '#ffb21d'
              }}
              >Fanamboarana
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer()
              props.navigation.navigate('Songs',
                {
                  color: color
                }
              )
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <FontAwesomeIcon
                icon={faMusic}
                color={color ? color.activeColor.fontColor.light : '#ffb21d'}
                size={24}
              />
              <Text style={{
                margin: 16,
                fontWeight: 'bold',
                color: color ? color.activeColor.fontColor.light : '#ffb21d'
              }}
              >Hira
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() =>
            Alert.alert(
              'Deconection',
              'Voulez-vous vous déconnecter?',
              [
                {
                  text: 'Annuler',
                  onPress: () => {
                    return null
                  }
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    props.navigation.navigate('Login')
                  }
                }
              ],
              { cancelable: false }
            )}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt} color={color ? color.activeColor.fontColor.light : '#ffb21d'} size={24}
              />
              <Text style={{
                margin: 16,
                fontWeight: 'bold',
                color: color ? color.activeColor.fontColor.light : '#ffb21d'
              }}
              >Deconection
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
