import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, View, StyleSheet, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { Icon, ThemeProvider, Card } from 'react-native-elements'
import Displays from '../display/Displays'
import { connect } from 'react-redux'
/* eslint-disable no-unused-vars */
import { loopObject, InverseLoopObject } from '../filterData/FilterData'
import { order } from '../array/Array'

const { width, height } = Dimensions.get('window')

const theme = {
  colors: {
    primary: '#607d8b'
  }
}

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      data: {
        finish: [],
        rest: []
      },
      focus: false,
      default: '00:00:00',
      showEdit: 'other',
      keyboardOpen: 0 
    }
  }

  static setDouble (e) {
    let resp = ''
    if (parseInt(e, 10) < 10) {
      resp = '0' + parseInt(e, 10)
    } else {
      resp = parseInt(e, 10)
    }
    return resp
  }

  filterAffiche (datas) {
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

  componentDidMount () {
    const stock = JSON.parse(JSON.stringify(this.props.task.dataTask))
    this.setState({
      data: loopObject(this.filterAffiche(stock))
    })

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow (e) {
    const { height, screenX, screenY, width } = e.endCoordinates
    this.setState({ keyboardOpen: height })
  }

  _keyboardDidHide () {
    this.setState({ keyboardOpen: 0 })
  }

  OnPressSave (days, datas, lastIdTasks, setState) {
    Keyboard.dismiss()
    const { data } = this.state
    // get all heure debut de task
    let heureRest = []
    Object.entries(data.rest).map(([key, subjects]) => {
      subjects.map(e => {
        if (e.heureDebut) {
          heureRest = [...heureRest, e.heureDebut]
        }
        return null
      })
      return null
    })
    // fusion de deux heure de debut
    const heures = [...data.finish.map(k => k.heureDebut), ...heureRest]
    // console.log({ heures, heureDebut: datas.heureDebut, inc: heures.includes(datas.heureDebut) })
    if (datas.title !== '' && datas.heureDebut !== '00:00:00') {
      if (days === 'unknown' && data.finish !== undefined) {
        let exist = true
        let rep = null
        JSON.parse(JSON.stringify(data)).finish.map((e, i) => {
          if (e.idTasks === lastIdTasks) {
            exist = false
            rep = i
          }
          return null
        })
        if (exist) {
          if (!heures.includes(datas.heureDebut)) {
            const mocks = [...data.finish, datas]
            this.setState({ data: Object.assign({}, data, { finish: order(mocks, 'idTasks') }) })
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
        } else {
          const stock = JSON.parse(JSON.stringify(data))
          stock.finish.splice(rep, 1)
          const mocks = [...stock.finish, datas]
          this.setState({ data: Object.assign({}, stock, { finish: order(mocks, 'idTasks') }) })
        }
      } else {
        Object.entries(data.rest).map(([key, subjects]) => {
          if (key === days) {
            let exist = true
            subjects.map((e, i) => {
              console.log('idTasks: ', e.idTasks, ', lastIdTasks: ', lastIdTasks)
              if (e.idTasks === lastIdTasks) {
                exist = false
                const stock = JSON.parse(JSON.stringify(data))
                stock.rest[key].splice(i, 1)
                // const mocks = [...data.rest[key], datas]
                const mocks = data.rest[key].map(dt => {
                  if (dt.idTasks === lastIdTasks) {
                    return datas
                  }
                  return dt
                })
                stock.rest[key] = order(mocks, 'idTasks')
                this.setState({ data: Object.assign({}, stock) })
              }
              return null
            })
            if (exist) {
              if (!heures.includes(datas.heureDebut)) {
                const stock = JSON.parse(JSON.stringify(data))
                const mocks = [...data.rest[key], datas]
                stock.rest[key] = order(mocks, 'idTasks')
                this.setState({ data: Object.assign({}, data, stock) })
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
      this.setState({
        show: false,
        default: '00:00:00',
        showEdit: 'other'
      })
      setState({ edit: false })

      // save all modification
      setTimeout(() => {
      this.props.putAllData(
        InverseLoopObject(JSON.parse(JSON.stringify(this.state.data))),
        this.props.utilisateur.connecterUtilisateur
      )
      }, 100)
    }
  }

  manindryAjanona = () => {
    this.setState({
      show: false,
      default: '00:00:00',
      showEdit: 'other'
    })
  }

  ManindryTazomina = () => {
    this.setState({
      show: false
    })
  }

  OnFocusHeureDebut = (heureDebut) => {
    this.setState({
      show: true,
      default: heureDebut
    })
  }

  onClickBtnDelete = (days, idTasks) => {
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
            const { data } = this.state
            if (days === 'unknown' && data.finish !== undefined) {
              JSON.parse(JSON.stringify(data)).finish.map((e, i) => {
                if (e.idTasks === idTasks) {
                  const stock = JSON.parse(JSON.stringify(data))
                  stock.finish.splice(i, 1)
                  this.setState({ data: Object.assign({}, stock, { finish: [...stock.finish] }) })
                }
                return null
              })
            } else {
              Object.entries(data.rest).map(([key, subjects]) => {
                if (key === days) {
                  subjects.map((e, i) => {
                    if (e.idTasks === idTasks) {
                      const stock = JSON.parse(JSON.stringify(data))
                      stock.rest[key].splice(i, 1)
                      this.setState({ data: Object.assign({}, stock) })
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

  render () {
    const { color } = this.props
    return (
      <ThemeProvider
        ThemeProvider={theme}
      >
        <View style={{
          height: height,
          justifyContent: 'flex-end'
        }}>
          <ScrollView >
            <View
              style={{
                ...styles.block,
                // height: height,
                // backgroundColor: color.activeColor.primary.default,
                flex: 1,
                flexDirection: 'column',
                paddingBottom: 80 + this.state.keyboardOpen
              }}
            >
              <Text style={{
                ...styles.title,
                color: color.activeColor.fontColor.dark
              }}>MIVERIMBERINA</Text>
              <Card titleStyle={{ textAlign: 'left' }} title="REHETRA" >
                <View>
                  {
                    this.state.data.finish.map(e => {
                      return <Displays
                        key={e.idTasks}
                        datas={e}
                        days='unknown'
                        manindryAjanona={this.manindryAjanona}
                        OnPressSave={this.OnPressSave.bind(this)}
                        editP={false}
                        onClickBtnDelete={this.onClickBtnDelete}
                        OnFocusHeureDebut={this.OnFocusHeureDebut}
                      />
                    })
                  }
                  {
                    this.state.showEdit === 'unknown'
                      ? <Displays
                        key={this.state.data.finish.length + 1}
                        datas={{
                          idTasks: 0,
                          titleTasks: '',
                          contentTasks: '',
                          heureDebut: '00:00:00',
                          pseudoUtilisateur: 'blackran'
                        }}
                        days='unknown'
                        OnPressSave={this.OnPressSave.bind(this)}
                        editP={true}
                        onClickBtnDelete={this.onClickBtnDelete}
                        manindryAjanona={this.manindryAjanona}
                        OnFocusHeureDebut={this.OnFocusHeureDebut}
                      />
                      : <TouchableOpacity
                        onPress={() => this.setState({ showEdit: 'unknown' })}
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
              <View style={styles.block}>
                <Text style={{
                  ...styles.title,
                  color: color.activeColor.fontColor.dark
                }}>TSY MIVERIMBERINA</Text>
                {
                  Object.entries(this.state.data.rest).map(([key, subject]) => {
                    return <Card
                      key={key}
                      titleStyle={{ textAlign: 'left' }}
                      title={key.toUpperCase()} >
                      <View>
                        {
                          subject.map(e => {
                            return <Displays
                              key={e.idTasks}
                              days={key}
                              datas={e}
                              editP={false}
                              onClickBtnDelete={this.onClickBtnDelete}
                              manindryAjanona={this.manindryAjanona}
                              OnPressSave={this.OnPressSave.bind(this)}
                              OnFocusHeureDebut={this.OnFocusHeureDebut}
                            />
                          })
                        }
                        {
                          this.state.showEdit === key
                            ? <Displays
                              key={this.state.data.finish.length + 1}
                              datas={{
                                idTasks: 0,
                                titleTasks: '',
                                contentTasks: '',
                                heureDebut: '00:00:00',
                                pseudoUtilisateur: 'blackran'
                              }}
                              days={key}
                              onClickBtnDelete={this.onClickBtnDelete}
                              manindryAjanona={this.manindryAjanona}
                              OnPressSave={this.OnPressSave.bind(this)}
                              editP={true}
                              OnFocusHeureDebut={this.OnFocusHeureDebut}
                            />
                            : <TouchableOpacity
                              onPress={() => this.setState({ showEdit: key })}
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

// Tasks.propTypes = {}
const mapStateToProps = state => {
  return {
    other: state.Other,
    task: state.Tasks,
    color: state.Color,
    utilisateur: state.Utilisateur
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeShowEdit: (data) => {
      dispatch({
        type: 'CHANGE_SHOW_EDIT',
        data
      })
    },
    onChangeDatePicker: (data) => {
      dispatch({
        type: 'ON_CHANGE_DATE_PICKER',
        data
      })
    },
    initDataTasks: () => {
      dispatch({ type: 'INIT_DATA_TASKS' })
    },
    putAllData: (data, user) => {
      dispatch({ type: 'PUT_ALL_DATA', data, user })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
