import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import Dialog from 'react-native-dialog'
import IconIonic from 'react-native-ionicons'
import { useSelector } from 'react-redux'
const IconsComp = lazy(() => import('./Icons'))

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
            <Suspense fallback={<Text style={{ textAlign: 'center', marginTop: 30 }}>Miandry kely ...</Text>}>
              <IconsComp
                {...{
                  color,
                  Icons,
                  changeIcon,
                  active
                }}
              />
            </Suspense>
          </ScrollView>
          <Dialog.Button label='Akatona' onPress={() => setVisible(!visible)} />
        </Dialog.Container>}
    </View>
  )
}

export default Categories
