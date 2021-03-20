import React from 'react'
import backgroundImage from '../statics/images/IMG_80411.jpg'
import me from '../statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import IconIonic from 'react-native-ionicons'

import { useSelector } from 'react-redux'

export default function ContentDrawer (props) {
  const { color, utilisateur } = useSelector(state => ({ other: state.Other, task: state.Tasks, color: state.Color, utilisateur: state.Utilisateur.connecterUtilisateur }))
  // const { color } = props.navigation.state.params
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
        {
          utilisateur.imageUtilisateur
            ? <Image
              source={{ uri: utilisateur.imageUtilisateur }}
              style={{
                height: 110,
                width: 110,
                borderRadius: 10
              }}
            />
            : <Image
              source={me}
              style={{
                height: 110,
                width: 110,
                borderRadius: 10
              }}
            />
        }
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
          margin: 10,
          fontWeight: 'bold',
          color: color ? color.activeColor.fontColor.light : '#ffb21d',
          textAlign: 'center'
        }}
        >
          {utilisateur.pseudoUtilisateur}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer()
              props.navigation.navigate('Principal', { color })
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <IconIonic
                name='list'
                color={color ? color.activeColor.fontColor.light : '#ffb21d'}
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
              props.navigation.navigate('Tasks', { color })
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <IconIonic
                name='options'
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
              props.navigation.navigate('Songs', { color })
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20
            }}
            >
              <IconIonic
                name='paper'
                color={color ? color.activeColor.fontColor.light : '#ffb21d'}
                size={24}
              />
              <Text style={{
                margin: 16,
                fontWeight: 'bold',
                color: color ? color.activeColor.fontColor.light : '#ffb21d'
              }}
              >Mailo
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
              <IconIonic
                name='log-out'
                color={color ? color.activeColor.fontColor.light : '#ffb21d'} size={24}
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
