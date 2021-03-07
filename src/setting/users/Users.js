import React from 'react'
import { View, Text } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

function Users (props) {
  const color = useSelector(state => state.Color)
  return (
    <View>
      <View
        style={{
          backgroundColor: '#0c0c0c',
          flexDirection: 'row',
          justifyContent: 'space-between',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3
        }}
      >
        <Button
          icon={
            <Icon
              name='chevron-left'
              size={40}
              type='MaterialIcons'
              color='white'
            />
          }
          onPress={() => props.navigation.navigate('Principal', { color: color })}
          buttonStyle={{
            width: 60,
            height: 60
          }}
          titleStyle={{
            color: color.activeColor.fontColor.light
          }}
          type='clear'
        />
        {/* <Button */}
        {/*   icon={ */}
        {/*     <Icon */}
        {/*       name='save' */}
        {/*       size={30} */}
        {/*       type='MaterialIcons' */}
        {/*       color='white' */}
        {/*     /> */}
        {/*   } */}
        {/*   onPress={this.onClickSaveAll.bind(this)} */}
        {/*   buttonStyle={{ */}
        {/*     width: 100, */}
        {/*     height: 60 */}
        {/*   }} */}
        {/*   titleStyle={{ */}
        {/*     color: color.activeColor.fontColor.light */}
        {/*   }} */}
        {/*   type='clear' */}
        {/* /> */}
      </View>
      <Text>user</Text>
    </View>
  )
}

export default Users
