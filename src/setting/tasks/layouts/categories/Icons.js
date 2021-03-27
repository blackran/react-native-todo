import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Opacitys from '../../../../animation/Opacitys'
import IconIonic from 'react-native-ionicons'

function Icons ({ color, Icons, active, changeIcon }) {
  return (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
      {
        Icons?.map(({ name, icon }, i) => {
          const dark = color.activeColor.fontColor.dark
          const light = color.activeColor.fontColor.light
          const transparent = 'transparent'
          return (
            <Opacitys delais={(i + 1) * 100} key={name}>
              <TouchableOpacity
                style={{
                  backgroundColor: active.includes(name) ? dark : transparent,
                  borderRadius: 10,
                  width: 33,
                  height: 33,
                  padding: 0,
                  marginRight: 5,
                  marginBottom: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => changeIcon(name)}
              >
                <IconIonic
                  name={icon}
                  color={active.includes(name) ? light : dark}
                  size={20}
                />
              </TouchableOpacity>
            </Opacitys>
          )
        })
      }
    </View>
  )
}

export default Icons
