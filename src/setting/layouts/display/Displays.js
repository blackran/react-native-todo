import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput
  // TouchableWithoutFeedback
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function Displays ({ days, datas, editP, OnPressSave, manindryAjanona, onClickBtnDelete }) {
  const [state, setStateTrue] = useState({
    idTasks: 0,
    titleTasks: '',
    contentTasks: '',
    heureDebut: '00:00:00',
    pseudoUtilisateur: 'blackran',
    edit: false,
    showTime: false
  })
  // const [showTime, setShowTime] = useState(false)
  const oneDay = 24 * 60 * 60 * 1000

  const setState = (data) => {
    // console.log('setState ++============================================================================')
    // console.log(data)
    setStateTrue(prev => {
      const stock1 = prev
      const stock2 = data
      const reunion = Object.assign({}, stock1, stock2)
      return reunion
    })
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
        const { idTasks, titleTasks, contentTasks, heureDebut, pseudoUtilisateur } = datas
        const s = {
          idTasks,
          titleTasks,
          contentTasks,
          heureDebut,
          pseudoUtilisateur,
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
    // console.log('OnChangeLohanteny')
    setState({ titleTasks: e })
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

  const onSave = () => {
    // console.log('onSave')
    const { idTasks, titleTasks, contentTasks, heureDebut, pseudoUtilisateur } = state
    OnPressSave(days, {
      idTasks: (oneDay * day()) + convertStringNumber(heureDebut),
      titleTasks,
      contentTasks,
      heureDebut,
      pseudoUtilisateur
    }, idTasks, setState)
  }

  const onPressAjanona = () => {
    // console.log('onPressAjanona')
    setState({ edit: false })
    manindryAjanona()
  }

  const setSHowTime = () => {
    // console.log('setSHowTime')
    setState({ showTime: true })
  }

  const { color } = useSelector(state => ({ color: state.Color, taskReducer: state.Tasks }))
  const { idTasks, titleTasks, contentTasks, heureDebut, edit } = state
  return (
    <View style={{
      ...styles.body,
      // backgroundColor: color.primary.dark + '44',
      height: edit ? null : 50
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
              style={{
                backgroundColor: color.activeColor.primary.dark + '33',
                paddingLeft: 10,
                padding: 2,
                marginBottom: 2,
                color: color.activeColor.fontColor.dark
              }}
              selectionColor={color.activeColor.fontColor.dark}
              placeholder='lohanteny'
              onChangeText={(e) => OnChangeLohanteny(e)}
              value={titleTasks}
            />
            <TextInput
              style={{
                backgroundColor: color.activeColor.primary.dark + '33',
                paddingLeft: 10,
                padding: 2,
                marginTop: 2,
                color: color.activeColor.fontColor.dark
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
                fontSize: 17
              }}
              >{titleTasks}
              </Text>
              <Text style={{
                color: color.activeColor.fontColor.dark + '55',
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
              <Button
                buttonStyle={{
                  backgroundColor: color.activeColor.primary.dark + '33',
                  marginRight: 3,
                  height: 34
                }}
                titleStyle={{
                  color: color.activeColor.fontColor.dark
                }}
                title={heureDebut}
                onPress={() => setSHowTime()}
              />
              {
                //  is24Hour
              }
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
            : <Text style={{
              ...styles.heures,
              color: color.activeColor.fontColor.dark + 'aa'
            }}>
              {
                heureDebut
              }
            </Text>
        }

        {
          edit ? <View>

            <Button
              onPress={() => onSave()}
              icon={
                <FontAwesomeIcon
                  icon={faCheck}
                  color={color.activeColor.fontColor.light}
                  size={20}
                />
              }
              buttonStyle={{
                backgroundColor: color.activeColor.primary.dark,
                height: 40,
                width: 40,
                marginLeft: 5
              }}
              color={color.activeColor.primary.dark + '77'}
              type='outline'
            />
            <Button
              onPress={() => onPressAjanona()}
              icon={
                <FontAwesomeIcon
                  icon={faTimes}
                  color={color.activeColor.primary.dark}
                  size={20}
                />
              }
              buttonStyle={{
                backgroundColor: color.activeColor.secondary.dark,
                marginTop: 5,
                height: 40,
                width: 40,
                marginLeft: 5
              }}
              color={color.activeColor.primary.dark}
              type='outline'
            />
          </View> : <View style={{ flexDirection: 'row' }}>
            <Button
              onPress={() => {
                // console.log('button edit')
                setState({ edit: true })
              }}
              icon={
                <Icon
                  name='edit'
                  size={25}
                  type='MaterialIcons'
                  color='white'
                />
              }
              buttonStyle={{
                backgroundColor: color.activeColor.primary.dark
              }}
              color={color.activeColor.primary.dark + '77'}
              type='outline'
            />
            <Button
              onPress={() => onClickBtnDelete(days, idTasks)}
              icon={
                <Icon
                  name='delete'
                  size={25}
                  type='MaterialIcons'
                  color={color.activeColor.primary.dark}
                />
              }
              buttonStyle={{
                backgroundColor: color.activeColor.secondary.dark,
                marginLeft: 5
              }}
              color={color.activeColor.primary.dark}
              type='outline'
            />
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 'bold'
  },
  heures: {
    marginRight: 10,
    width: 70,
    height: 35,
    paddingTop: 5
  }
})

export default Displays
