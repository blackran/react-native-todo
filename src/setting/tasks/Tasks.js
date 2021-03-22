import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Dimensions, ScrollView, Text, View, StyleSheet, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { Icon, ThemeProvider, Card } from 'react-native-elements'
import Displays from './layouts/displays/Displays'
import { useSelector, useDispatch } from 'react-redux'
/* eslint-disable no-unused-vars */
import { loopObject, InverseLoopObject } from '../filterData/FilterData'
import { order } from '../array/Array'

import IonicIcon from 'react-native-ionicons'


const { width, height } = Dimensions.get('window')

const theme = {
  colors: {
    primary: '#607d8b'
  }
}

function Tasks (props) {
  const listView = useRef()
  const dispatch = useDispatch()
  const { other, task, color, utilisateur } = useSelector(state => ({ other: state.Other, task: state.Tasks, color: state.Color, utilisateur: state.Utilisateur }))
  const [state, setStateTrue] = useState({
    show: false,
    focus: false,
    default: '00:00:00',
    showEdit: 'other'
  })

  const [dataLocal, setDataLocal] = useState({
    finish: [],
    rest: []
  })

  const [keyboardOpen, setKeyboardOpen] = useState(0)

  const setState = useCallback((data) => {
    setStateTrue((e) => Object.assign({}, e, data))
  }, []) // eslint-disable-line

  const setDouble = (e) => {
    let resp = ''
    if (parseInt(e, 10) < 10) {
      resp = '0' + parseInt(e, 10)
    } else {
      resp = parseInt(e, 10)
    }
    return resp
  }

  const filterAffiche = (datas) => {
    const newdata = {
      Alahady: [],
      Alatsinainy: [],
      Talata: [],
      Alarobia: [],
      Alakamisy: [],
      Zoma: [],
      Sabotsy: []
    }
    datas && datas.map(e => {
      if (e.day) {
        newdata[e.day] = [...newdata[e.day], e]
      }
      return null
    })
    return newdata
  }

  let keyboardDidShowListener
  let keyboardDidHideListener

  const _keyboardDidShow = (e) => {
    const { height, screenX, screenY, width } = e.endCoordinates
    setKeyboardOpen(height)
  }

  const _keyboardDidHide = () => {
    setKeyboardOpen(0)
  }

  useEffect(() => {
    const stock = JSON.parse(JSON.stringify(task.dataTask))
    setDataLocal(loopObject(filterAffiche(stock)))

    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [setState, task.dataTask])

  const updateStock = useCallback(() => {
    // save all modification
    dispatch({
      type: 'PUT_ALL_DATA',
      data: InverseLoopObject(JSON.parse(JSON.stringify(dataLocal))),
      user: utilisateur.connecterUtilisateur
    })
  }, [dataLocal, dispatch, utilisateur.connecterUtilisateur])

  useEffect(() => {
    updateStock()
  }, [dispatch, dataLocal, updateStock, utilisateur.connecterUtilisateur])

  const OnPressSave = (days, datas, lastIdTasks, setStateOther) => {
    let isDisableEdit = true
    Keyboard.dismiss()
    // get all heure debut de task
    let isExistHeure = true
    Object.entries(dataLocal.rest).map(([key, subjects]) => {
      if (key === days || days === 'unknown') {
        subjects.map(e => {
          if (e.heureDebut === datas.heureDebut) {
            isExistHeure = false
          }
          return null
        })
      }
      return null
    })
    // fusion de deux heure de debut
    dataLocal.finish.map(k => {
      if (k.heureDebut === datas.heureDebut) {
        isExistHeure = false
      }
    })
    if (datas.title !== '' && datas.heureDebut !== '00:00:00') {
      if (days === 'unknown' && dataLocal.finish !== undefined) {
        let exist = true
        let rep = null
        JSON.parse(JSON.stringify(dataLocal)).finish.map((e, i) => {
          if (e.idTasks === lastIdTasks) {
            exist = false
            rep = i
          }
          return null
        })
        if (exist) {
          if (isExistHeure) {
            const mocks = [...dataLocal.finish, datas]
            // setState({ data: Object.assign({}, data, { finish: order(mocks, 'idTasks') }) })
            setDataLocal({ ...dataLocal, finish: order(mocks, 'idTasks') })
          } else {
            isDisableEdit = false
            Alert.alert(
              'Misy olana',
              'Azafady efa misy io ora io',
              [
                {
                  text: 'Ankatona',
                  onPress: () => null
                }
              ],
              { cancelable: false }
            )
          }
        } else {
          const stock = JSON.parse(JSON.stringify(dataLocal))
          stock.finish.splice(rep, 1)
          const mocks = [...stock.finish, datas]
          setDataLocal({ ...stock, finish: order(mocks, 'idTasks') })
        }
      } else {
        Object.entries(dataLocal.rest).map(([key, subjects]) => {
          if (key === days) {
            let exist = true
            subjects.map((e, i) => {
              if (e.idTasks === lastIdTasks) {
                exist = false
                const stock = JSON.parse(JSON.stringify(dataLocal))
                stock.rest[key].splice(i, 1)
                // const mocks = [...data.rest[key], datas]
                const mocks = dataLocal.rest[key].map(dt => {
                  if (dt.idTasks === lastIdTasks) {
                    return datas
                  }
                  return dt
                })
                stock.rest[key] = order(mocks, 'idTasks')
                setDataLocal({ ...stock })
              }
              return null
            })
            if (exist) {
              if (isExistHeure) {
                const stock = JSON.parse(JSON.stringify(dataLocal))
                const mocks = [...dataLocal.rest[key], datas]
                stock.rest[key] = order(mocks, 'idTasks')
                setDataLocal({ ...stock })
              } else {
                isDisableEdit = false
                Alert.alert(
                  'Misy olana',
                  'Azafady efa misy io ora io',
                  [
                    {
                      text: 'Ankatona',
                      onPress: () => null
                    }
                  ],
                  { cancelable: false }
                )
              }
            }
          }
          return null
        })
      }
      if (isDisableEdit) {
        setState({
          show: false,
          default: '00:00:00',
          showEdit: 'other'
        })
        setStateOther()
      }
    }
  }

  const manindryAjanona = () => {
    setState({
      show: false,
      default: '00:00:00',
      showEdit: 'other'
    })
  }

  const ManindryTazomina = () => {
    setState({
      show: false
    })
  }

  const OnFocusHeureDebut = (heureDebut) => {
    setState({
      show: true,
      default: heureDebut
    })
  }

  const onClickBtnDelete = (days, idTasks) => {
    Alert.alert(
      'Hafatrafatra',
      'Tena ho fafana ve?',
      [
        {
          text: 'Ajanona',
          onPress: () => {
            return null
          }
        },
        {
          text: 'Manaiky',
          onPress: () => {
            if (days === 'unknown' && dataLocal.finish !== undefined) {
              JSON.parse(JSON.stringify(dataLocal)).finish.map((e, i) => {
                if (e.idTasks === idTasks) {
                  const stock = JSON.parse(JSON.stringify(dataLocal))
                  stock.finish.splice(i, 1)
                  setDataLocal({ ...stock, finish: [...stock.finish] })
                }
                return null
              })
            } else {
              Object.entries(dataLocal.rest).map(([key, subjects]) => {
                if (key === days) {
                  subjects.map((e, i) => {
                    if (e.idTasks === idTasks) {
                      const stock = JSON.parse(JSON.stringify(dataLocal))
                      stock.rest[key].splice(i, 1)
                      setDataLocal(Object.assign({}, stock))
                    }
                    return null
                  })
                }
                return null
              })
            }
          }
        }
      ],
      { cancelable: false }
    )
  }

  const [isShowButton, setIsShowButton] = useState(false)
  const OnEndScroll = (e, listView) => {
    setIsShowButton(e.nativeEvent.contentOffset.y > 0)
  }

  const onClickButtonRunTop = () => {
    if (listView.current.scrollTo) {
      listView.current.scrollTo({
        y: 0,
        animated: true
      })
      setIsShowButton(false)
    }
  }

  return (
    <ThemeProvider
      ThemeProvider={theme}
    >
      <View
        style={{
          backgroundColor: '#0c0c0c',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          height: 60
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Principal', { color: color })}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: color.activeColor.primary.dark,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}
        >
          <Icon
            name='chevron-left'
            size={20}
            type='MaterialIcons'
            color='white'
          />
        </TouchableOpacity>
      </View>

      <View style={{
        height: height,
        justifyContent: 'flex-end'
      }}
      >
        <ScrollView
          ref={listView}
          onMomentumScrollEnd={(e) => {
            OnEndScroll(e, listView)
          }}
        >
          <View
            style={{
              ...styles.block,
              // height: height,
              // backgroundColor: color.activeColor.primary.default,
              flex: 1,
              flexDirection: 'column',
              paddingBottom: 100 + keyboardOpen
            }}
          >
            <Text style={{
              ...styles.title,
              color: color.activeColor.fontColor.dark
            }}
            >MIVERIMBERINA
            </Text>
            <Card containerStyle={{ borderRadius: 10 }} titleStyle={{ textAlign: 'left' }} title='REHETRA'>
              <View>
                {
                  state.showEdit === 'unknown'
                    ? (
                      <Displays
                        key={dataLocal.finish.length + 1}
                        datas={{
                          idTasks: 0,
                          titleTasks: '',
                          contentTasks: '',
                          heureDebut: '00:00:00',
                          pseudoUtilisateur: utilisateur.connecterUtilisateur.pseudoUtilisateur,
                          categorieTasks: []
                        }}
                        days='unknown'
                        OnPressSave={OnPressSave}
                        editP
                        onClickBtnDelete={onClickBtnDelete}
                        manindryAjanona={manindryAjanona}
                        OnFocusHeureDebut={OnFocusHeureDebut}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => setState({ showEdit: 'unknown' })}
                        style={{ position: 'absolute', right: 10, top: -55 }}
                      >
                        <Icon
                          name='add'
                          size={30}
                          type='MaterialIcons'
                          color={color.activeColor.fontColor.dark}
                        />
                      </TouchableOpacity>
                    )
                }
                {
                  dataLocal.finish.map(e => {
                    return (
                      <Displays
                        key={e.idTasks}
                        datas={e}
                        days='unknown'
                        manindryAjanona={manindryAjanona}
                        OnPressSave={OnPressSave}
                        editP={false}
                        onClickBtnDelete={onClickBtnDelete}
                        OnFocusHeureDebut={OnFocusHeureDebut}
                      />
                    )
                  })
                }
              </View>
            </Card>
            <View style={styles.block}>
              <Text style={{
                ...styles.title,
                color: color.activeColor.fontColor.dark
              }}
              >TSY MIVERIMBERINA
              </Text>
              {
                Object.entries(dataLocal.rest).map(([key, subject]) => {
                  return (
                    <Card
                      containerStyle={{ borderRadius: 10 }}
                      key={key}
                      titleStyle={{ textAlign: 'left' }}
                      title={key.toUpperCase()}
                    >
                      <View>
                        {
                          state.showEdit === key
                            ? <Displays
                              key={dataLocal.finish.length + 1}
                              datas={{
                                idTasks: 0,
                                titleTasks: '',
                                contentTasks: '',
                                heureDebut: '00:00:00',
                                pseudoUtilisateur: utilisateur.connecterUtilisateur.pseudoUtilisateur,
                                categorieTasks: []
                              }}
                              days={key}
                              onClickBtnDelete={onClickBtnDelete}
                              manindryAjanona={manindryAjanona}
                              OnPressSave={OnPressSave}
                              editP
                              OnFocusHeureDebut={OnFocusHeureDebut}
                            />
                            : <TouchableOpacity
                              onPress={() => setState({ showEdit: key })}
                              style={{ position: 'absolute', right: 10, top: -55 }}
                            >
                              <Icon
                                name='add'
                                size={30}
                                type='MaterialIcons'
                                color={color.activeColor.fontColor.dark}
                              />
                            </TouchableOpacity>
                        }
                        {
                          subject.map(e => {
                            return (
                              <Displays
                                key={e.idTasks}
                                days={key}
                                datas={e}
                                editP={false}
                                onClickBtnDelete={onClickBtnDelete}
                                manindryAjanona={manindryAjanona}
                                OnPressSave={OnPressSave}
                                OnFocusHeureDebut={OnFocusHeureDebut}
                              />
                            )
                          })
                        }
                      </View>
                    </Card>
                  )
                })
              }
            </View>
          </View>

        </ScrollView>
        {/* <ScrollDatePicker */}
        {/*     style={{ */}
        {/*         width: width, */}
        {/*         position: 'absolute', */}
        {/*         // top: this.state.focus? 0: null, */}
        {/*         // bottom: this.state.focus ? null : 0, */}
        {/*         right: 0, */}
        {/*         bottom: 75, */}
        {/*         backgroundColor: color.activeColor.primary.dark */}
        {/*     }} */}
        {/*     ManindryAjanona={this.manindryAjanona} */}
        {/*     ManindryTazomina={this.ManindryTazomina} */}
        {/*     fontColor={color.activeColor.fontColor.dark} */}
        {/*     default={this.state.default} */}
        {/*     show={this.state.show} */}
        {/*     // show={true} */}
        {/*     onChange={this.onChangeScrollDatePicker} */}
        {/* /> */}

        {
          isShowButton &&
              <TouchableOpacity
                onPress={onClickButtonRunTop}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
                  backgroundColor: 'red',
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  borderRadius: 60,
                  width: 60,
                  height: 60,
                  opacity: 0.8
                }}
              >
                <IonicIcon
                  name='arrow-up'
                  size={30}
                  color='white'
                />
              </TouchableOpacity>
        }
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 0,
    marginTop: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  btnAdd: {
    width: 200,
    justifyContent: 'center'
  }
})

export default Tasks
