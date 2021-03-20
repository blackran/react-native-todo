import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import Dialog from 'react-native-dialog'
import IconIonic from 'react-native-ionicons'
import { useSelector } from 'react-redux'
import Opacitys from '../../../../animation/Opacitys'

function Categories ({ categorie, onChangeCategorieTasks }) {
  const [active, setActive] = useState([])
  const [visible, setVisible] = useState(false)
  const { color, tasks } = useSelector(state => ({ color: state.Color, tasks: state.Tasks }))
  const [Icons, setIcons] = useState([])
  const [iconActive, setIconActive] = useState([])
  const [loading, setLoading] = useState(false)

  const timer = useRef(null)

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
    setLoading(true)
    timer.current = setTimeout(() => {
      setIcons(tasks.dataIcons)
      setLoading(false)
    }, 10000)
    return () => clearInterval(timer.current)
  }, []) //eslint-disable-line

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
      if (active.length < 3) {
        findIcon([...active, e])
        onChangeCategorieTasks([...active, e])
      }
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
          <Text style={{ textAlign: 'right' }}>{active.length}/3</Text>
          <Dialog.Title style={{ textAlign: 'center' }}>Karazana</Dialog.Title>
          <ScrollView style={{ width: '100%' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {
                loading ? <Text style={{ textAlign: 'center', marginTop: 30 }}>Miandry kely ...</Text>
                  : Icons.length > 0 && Icons?.map(({ name, icon }, i) => {
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
          </ScrollView>
          <Dialog.Button label='Akatona' onPress={() => setVisible(!visible)} />
        </Dialog.Container>}
    </View>
  )
}

export default Categories
