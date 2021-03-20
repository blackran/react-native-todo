import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput
  // TouchableWithoutFeedback
} from 'react-native'
import { Button, Icon, ThemeProvider } from 'react-native-elements'
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
// import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import IconIonic from 'react-native-ionicons'

import Categories from '../categories/Categories'

function Displays ({ days, datas, editP, OnPressSave, manindryAjanona, onClickBtnDelete }) {
  const { icons } = useSelector(state => ({ icons: state.Tasks.dataIcons }))
  const [iconActive, setIconActive] = useState([])
  const [state, setStateTrue] = useState({
    idTasks: 0,
    titleTasks: '',
    contentTasks: '',
    heureDebut: '00:00:00',
    pseudoUtilisateur: 'blackran',
    edit: false,
    showTime: false,
    categorieTasks: []
  })
  // const [showTime, setShowTime] = useState(false)
  const oneDay = 24 * 60 * 60 * 1000

  const setState = (data) => {
    // console.log('setState ++============================================================================')
    // console.log('displays', data)
    setStateTrue(prev => Object.assign({}, prev, data))
  } // eslint-disable-line

  const convertStringNumber = (date) => {
    const [heure, minute, second] = date.split(':')
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
  }

  const convertDate = (e) => new Date('1996-07-22T' + e)

  useEffect(() => {
    // console.log('useEffect');
    (async () => {
      try {
        const {
          idTasks,
          categorieTasks,
          titleTasks,
          contentTasks,
          heureDebut,
          pseudoUtilisateur
        } = datas
        const s = {
          idTasks,
          titleTasks,
          contentTasks,
          heureDebut,
          pseudoUtilisateur,
          categorieTasks,
          edit: editP
        }
        setState(s)
      } catch {}
    })(datas)
    }, []) // eslint-disable-line

  const limiterWord = (phrase, len) => {
    return phrase ? phrase.split(' ').slice(0, len).join(' ') + ' ...' : phrase
  }

  const OnChangeLohanteny = (e) => {
    // const toUppercase = e.toUpperCase()
    const toUppercase = e
    setState({ titleTasks: toUppercase })
  }

  const onChangeCategorieTasks = (e) => {
    setState({ categorieTasks: e })
  }

  const OnChangeFanazavana = (e) => {
    // console.log('OnChangeFanazavana')
    setState({ contentTasks: e })
  }

  const setDouble = (e) => {
    let stock = e + ''
    if (parseInt(e) < 10) {
      stock = '0' + stock
    }
    return stock
  }

  const formatDate = (e) => {
    const heure = setDouble(e.getHours())
    const minute = setDouble(e.getMinutes())
    const second = setDouble(e.getSeconds())
    const stock = heure + ':' + minute + ':' + second
    if (stock !== 'NaN:NaN:NaN') {
      return stock
    }
    return '00:00:00'
  }

  const day = () => {
    const listJours = [
      'Alahady',
      'Alatsinainy',
      'Talata',
      'Alarobia',
      'Alakamisy',
      'Zoma',
      'Sabotsy',
      'unknown'
    ]
    return listJours.indexOf(days)
  }

  const onChangeDate = (event, selectedDate) => {
    // console.log('onChangeDate')
    if (selectedDate === undefined) {
      return setState({ showTime: false })
    }
    const currentDate = selectedDate || state.heureDebut
    if (formatDate(currentDate) !== '00:00:00') {
      setState({ heureDebut: formatDate(currentDate), showTime: false })
    }
  }

  const onPressAjanona = () => {
    // console.log('onPressAjanona')
    setState({ edit: false })
    manindryAjanona()
  }

  const onSave = () => {
    // console.log('onSave')
    const { idTasks, categorieTasks, titleTasks, contentTasks, heureDebut, pseudoUtilisateur } = state
    OnPressSave(days, {
      idTasks: (oneDay * day()) + convertStringNumber(heureDebut),
      titleTasks,
      contentTasks,
      heureDebut,
      pseudoUtilisateur,
      categorieTasks
    }, idTasks, onPressAjanona)
  }

  const setSHowTime = () => {
    // console.log('setSHowTime')
    setState({ showTime: true })
  }

  const { color } = useSelector(state => ({ color: state.Color, taskReducer: state.Tasks }))
  const { idTasks, titleTasks, categorieTasks, contentTasks, heureDebut, edit } = state

  const theme = {
    colors: {
      primary: color.activeColor.primary.dark
    }
  }

  useEffect(() => {
    let sto
    if (categorieTasks) {
      sto = icons
        .filter(h => categorieTasks.includes(h.name))
        .map(h => h.icon)
    }
    if (sto) {
      setIconActive(sto)
    }
  }, [state.categorieTasks]) //eslint-disable-line

  return (
    <KeyboardAwareScrollView
      onKeyboardWillShow={(frames) => {
      }}
    >
      <ThemeProvider theme={theme}>
        <View style={{
          ...styles.body,
          // height: edit ? null : 50,
          marginBottom: 10
        }}
        >
          <View style={{
            flex: 1,
            marginRight: 10
          }}
          >
            {
              edit ? <View>
                <TextInput
                  placeholder='lohanteny'
                  onChangeText={OnChangeLohanteny}
                  value={titleTasks}
                  style={{
                    backgroundColor: color.activeColor.primary.dark + '33',
                    paddingLeft: 10,
                    padding: 2,
                    marginBottom: 2,
                    color: color.activeColor.fontColor.dark,
                    borderRadius: 10
                  }}
                  selectionColor={color.activeColor.fontColor.dark}
                />
                <TextInput
                  style={{
                    backgroundColor: color.activeColor.primary.dark + '33',
                    paddingLeft: 10,
                    padding: 2,
                    marginTop: 2,
                    color: color.activeColor.fontColor.dark,
                    borderRadius: 10
                  }}
                  selectionColor={color.activeColor.fontColor.dark}
                  multiline
                  numberOfLines={2}
                  row={3}
                  placeholder='fanazavana'
                  onChangeText={(e) => OnChangeFanazavana(e)}
                  value={contentTasks}
                />
              </View>
                : <View>
                  <Text style={{
                    ...styles.title,
                    color: color.activeColor.fontColor.dark + 'aa',
                    height: 33,
                    padding: 4,
                    fontSize: 17
                  }}
                  >{titleTasks}
                  </Text>
                  <Text style={{
                    color: color.activeColor.fontColor.dark + '55',
                    height: 33,
                    padding: 4,
                    fontSize: 13
                  }}
                  >{limiterWord(contentTasks, 2)}
                  </Text>
                </View>
            }
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}
          >
            {
              edit
                ? <View>
                  <View>
                    <Button
                      buttonStyle={{
                        backgroundColor: color.activeColor.primary.dark + '33',
                        marginRight: 3,
                        height: 34,
                        borderRadius: 10
                      }}
                      titleStyle={{
                        color: color.activeColor.fontColor.dark
                      }}
                      title={heureDebut}
                      onPress={() => setSHowTime()}
                    />
                    {
                      state.showTime &&
                        <DateTimePicker
                          testID='dateTimePicker'
                          style={{ width: 100 }}
                          value={convertDate(heureDebut)}
                          mode='time'
                          locale='fr-FR'
                          showIcon={false}
                          display='clock'
                          customStyles={{
                            dateInput: {
                              marginRight: 10,
                              backgroundColor: color.activeColor.primary.dark + '33',
                              padding: 2,
                              margin: 2,
                              color: color.activeColor.fontColor.dark,
                              borderWidth: 0,
                              height: 33
                            }
                          }}
                          open
                          onChange={onChangeDate}
                        />
                    }
                  </View>
                  <Categories
                    categorie={categorieTasks}
                    onChangeCategorieTasks={onChangeCategorieTasks}
                  />

                </View>
                : <View>
                  <Text style={{
                    ...styles.heures,
                    color: color.activeColor.fontColor.dark
                  }}
                  >
                    {
                      heureDebut
                    }
                  </Text>
                  <View
                    style={{
                      borderRadius: 10,
                      height: 33,
                      padding: 0,
                      marginRight: 5,
                      marginLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row'
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
                              style={{ marginRight: 3 }}
                            />
                          )
                        }) : <Text>karazana</Text>
                    }
                  </View>
                </View>
            }

            {
              edit ? <View style={{ flexDirection: 'row' }}>
                <Button
                  onPress={() => onSave()}
                  icon={
                    <IconIonic
                      name='checkmark'
                      color={color.activeColor.fontColor.light}
                      size={20}
                    />
                  }
                  buttonStyle={{
                    backgroundColor: color.activeColor.primary.dark,
                    height: 33,
                    width: 33,
                    borderRadius: 10,
                    marginLeft: 5
                  }}
                  color={color.activeColor.primary.dark + '77'}
                  type='outline'
                />
                <Button
                  onPress={() => onPressAjanona()}
                  icon={
                    <IconIonic
                      name='close'
                      color={color.activeColor.primary.dark}
                      size={20}
                    />
                  }
                  buttonStyle={{
                    backgroundColor: color.activeColor.secondary.dark,
                    marginLeft: 5,
                    height: 33,
                    width: 33,
                    borderRadius: 10
                  }}
                  color={color.activeColor.primary.dark}
                  type='outline'
                />
              </View>
                : <View style={{ flexDirection: 'row' }}>
                  <Button
                    onPress={() => {
                      // console.log('button edit')
                      setState({ edit: true })
                    }}
                    icon={
                      <Icon
                        name='edit'
                        size={20}
                        type='MaterialIcons'
                        color='white'
                      />
                    }
                    buttonStyle={{
                      backgroundColor: color.activeColor.primary.dark,
                      borderRadius: 10,
                      width: 33,
                      height: 33,
                      padding: 0,
                      marginLeft: 5
                    }}
                    color={color.activeColor.primary.dark + '77'}
                    type='outline'
                  />
                  <Button
                    onPress={() => onClickBtnDelete(days, idTasks)}
                    icon={
                      <IconIonic
                        name='trash'
                        size={20}
                        color={color.activeColor.primary.dark}
                      />
                    }
                    buttonStyle={{
                      backgroundColor: color.activeColor.secondary.dark,
                      marginLeft: 5,
                      marginRight: 2,
                      height: 33,
                      width: 33,
                      borderRadius: 10
                    }}
                    color={color.activeColor.primary.dark}
                    type='outline'
                  />
                </View>
            }
          </View>
        </View>
      </ThemeProvider>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // borderColor: 'green',
    // borderWidth: 1
  },
  title: {
    fontWeight: 'bold'
  },
  heures: {
    marginRight: 5,
    width: 70,
    height: 35,
    paddingTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default Displays
