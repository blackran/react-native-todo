import React, { useState, useEffect, useCallback } from 'react'
import { Dimensions, ScrollView, Text, View, StyleSheet, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { Icon, ThemeProvider, Card } from 'react-native-elements'
import Displays from '../display/Displays'
import { useSelector, useDispatch } from 'react-redux'
/* eslint-disable no-unused-vars */
import { loopObject, InverseLoopObject } from '../filterData/FilterData'
import { order } from '../array/Array'

import { Button } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const theme = {
  colors: {
    primary: '#607d8b'
  }
}

function Tasks (props) {
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
    console.log('PUT_ALL_DATA')
    console.log(InverseLoopObject(JSON.parse(JSON.stringify(dataLocal))))
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
    Keyboard.dismiss()
    // get all heure debut de task
    let heureRest = []
    Object.entries(dataLocal.rest).map(([key, subjects]) => {
      subjects.map(e => {
        if (e.heureDebut) {
          heureRest = [...heureRest, e.heureDebut]
        }
        return null
      })
      return null
    })
    // fusion de deux heure de debut
    const heures = [...dataLocal.finish.map(k => k.heureDebut), ...heureRest]
    // console.log({ heures, heureDebut: datas.heureDebut, inc: heures.includes(datas.heureDebut) })
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
          if (!heures.includes(datas.heureDebut)) {
            console.log('arive ici ........1')
            const mocks = [...dataLocal.finish, datas]
            console.log({ ...dataLocal, finish: order(mocks, 'idTasks') })
            // setState({ data: Object.assign({}, data, { finish: order(mocks, 'idTasks') }) })
            setDataLocal({ ...dataLocal, finish: order(mocks, 'idTasks') })
          } else {
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
              console.log('idTasks: ', e.idTasks, ', lastIdTasks: ', lastIdTasks)
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
              if (!heures.includes(datas.heureDebut)) {
                const stock = JSON.parse(JSON.stringify(dataLocal))
                const mocks = [...dataLocal.rest[key], datas]
                stock.rest[key] = order(mocks, 'idTasks')
                setDataLocal({ ...stock })
              } else {
                console.log('Alert ')
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
      setState({
        show: false,
        default: '00:00:00',
        showEdit: 'other'
      })
      setStateOther({ edit: false })
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
        <Button
          icon={
            <Icon
              name='chevron-left'
              size={20}
              type='MaterialIcons'
              color='white'
            />
          }
          onPress={() => props.navigation.navigate('Principal', { color: color })}
          buttonStyle={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: color.activeColor.primary.dark,
            marginLeft: 10
          }}
          titleStyle={{
            color: color.activeColor.fontColor.light
          }}
          type='clear'
        />
      </View>

      <View style={{
        height: height,
        justifyContent: 'flex-end'
      }}
      >
        <ScrollView>
          <View
            style={{
              ...styles.block,
              // height: height,
              // backgroundColor: color.activeColor.primary.default,
              flex: 1,
              flexDirection: 'column',
              paddingBottom: 80 + keyboardOpen
            }}
          >
            <Text style={{
              ...styles.title,
              color: color.activeColor.fontColor.dark
            }}
            >MIVERIMBERINA
            </Text>
            <Card titleStyle={{ textAlign: 'left' }} title='REHETRA'>
              <View>
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
                          pseudoUtilisateur: 'blackran'
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
                      key={key}
                      titleStyle={{ textAlign: 'left' }}
                      title={key.toUpperCase()}
                    >
                      <View>
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
                        {
                          state.showEdit === key
                            ? <Displays
                              key={dataLocal.finish.length + 1}
                              datas={{
                                idTasks: 0,
                                titleTasks: '',
                                contentTasks: '',
                                heureDebut: '00:00:00',
                                pseudoUtilisateur: 'blackran'
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
