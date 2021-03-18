import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Dialog from 'react-native-dialog'
import IconIonic from 'react-native-ionicons'
import { useSelector } from 'react-redux'

function Categories ({ categorie, onChangeCategorieTasks }) {
  const [active, setActive] = useState([])
  const [visible, setVisible] = useState(false)
  const { color, tasks } = useSelector(state => ({ color: state.Color, tasks: state.Tasks }))
  const Icons = tasks.dataIcons
  const [iconActive, setIconActive] = useState([])

  const findIcon = (e) => {
    const sto = Icons
      .filter(h => e.includes(h.name))
      .map(h => h.icon)
    if (sto) {
      setActive(e)
      setIconActive(sto)
    }
  }

  useEffect(() => {
    if (categorie) {
      findIcon(categorie)
    } else {
      setActive([])
    }
  }, [categorie, Icons]) //eslint-disable-line

  const changeIcon = (e) => {
    if (active.includes(e)) {
      const newActive = active.filter(k => k !== e)
      findIcon(newActive)
      onChangeCategorieTasks(newActive)
    } else {
      findIcon([...active, e])
      onChangeCategorieTasks([...active, e])
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          marginTop: 3,
          borderRadius: 10,
          height: 33,
          padding: 0,
          marginRight: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.activeColor.primary.dark + '33'
        }}
      >
        {
          iconActive.length > 0
            ? iconActive.map(e => {
              return (
                <IconIonic
                  key={e}
                  name={e}
                  color={color.activeColor.fontColor.dark}
                  size={20}
                  style={{ margin: 2 }}
                />
              )
            }) : <Text>karazana</Text>
        }
      </TouchableOpacity>
      {visible &&
        <Dialog.Container visible={visible}>
          <Dialog.Title style={{ textAlign: 'center' }}>Karazana</Dialog.Title>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {
              Icons && Icons.map(({ name, icon }) => {
                const dark = color.activeColor.fontColor.dark
                const light = color.activeColor.fontColor.light
                const transparent = 'transparent'
                return (
                  <Button
                    key={name}
                    icon={
                      <IconIonic
                        name={icon}
                        color={active.includes(name) ? light : dark}
                        size={20}
                      />
                    }
                    buttonStyle={{
                      backgroundColor: active.includes(name) ? dark : transparent,
                      borderRadius: 10,
                      width: 33,
                      height: 33,
                      padding: 0,
                      marginRight: 5
                    }}
                    color={color.activeColor.primary.dark + '77'}
                    type='outline'
                    onPress={() => changeIcon(name)}
                  />
                )
              })
            }
          </View>
          <Dialog.Button label='Ajanona' onPress={() => setVisible(!visible)} />
        </Dialog.Container>}
    </View>
  )
}

export default Categories
