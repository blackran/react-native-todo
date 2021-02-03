import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput
    // TouchableWithoutFeedback
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'

function Displays ({ days, datas, editP, OnPressSave, manindryAjanona, onClickBtnDelete }) {
    const dispatch = useDispatch()
    const [state, setStateTrue] = useState({
        idTasks: 0,
        titleTasks: '',
        contentTasks: '',
        heureDebut: new Date(),
        pseudoUtilisateur: 'blackran',
        edit: false
    })
    const oneDay = 24 * 60 * 60 * 1000

    const setState = useCallback((data) => {
        console.log('==============================================================')
        console.log('state', state)
        console.log('state', Object.assign({}, state, data))
        setStateTrue(Object.assign({}, state, data))
        console.log('state', state)
    }, []) // eslint-disable-line

    const convertStringNumber = (date) => {
        const [heure, minute, second] = date.split(':')
        return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
    }

    useEffect(() => {
        const { idTasks, titleTasks, contentTasks, heureDebut, pseudoUtilisateur } = datas
        setState({
            idTasks,
            titleTasks,
            contentTasks,
            heureDebut: heureDebut,
            pseudoUtilisateur,
            edit: editP
        })
    }, [datas, editP, setState])

    const limiterWord = (phrase, len) => {
        return phrase ? phrase.split(' ').slice(0, len).join(' ') + ' ...' : phrase
    }

    const OnChangeLohanteny = (e) => {
        setState({ titleTasks: e })
    }

    const OnChangeFanazavana = (e) => {
        setState({ contentTasks: e })
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
        const currentDate = selectedDate || state.heureDebut
        setState({ heureDebut: currentDate })
    }

    const onSave = () => {
        // console.log('OnPressSave')
        OnPressSave(days, {
            idTasks: (oneDay * day()) + convertStringNumber(taskReducer.heureDebut),
            titleTasks,
            contentTasks,
            heureDebut,
            pseudoUtilisateur
        }, state.idTasks)
        setState({
            edit: false
        })
    }

    const onPressAjanona = () => {
        console.log('ajanona')
        setState({ edit: false })
        manindryAjanona()
    }

    const { color, taskReducer } = useSelector(state => ({ color: state.Color, taskReducer: state.Tasks }))
    const { idTasks, titleTasks, contentTasks, heureDebut, edit, pseudoUtilisateur } = state
    return (
        <View style={{
            ...styles.body,
            // backgroundColor: color.primary.dark + '44',
            height: edit ? null : 50
        }}>
            <View style={{
                flex: 1,
                marginRight: 10
            }}>
                {
                    edit ? <View>
                        <TextInput
                            style={{
                                backgroundColor: color.activeColor.primary.dark + '33',
                                padding: 2,
                                margin: 2,
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
                                padding: 2,
                                margin: 2,
                                color: color.activeColor.fontColor.dark
                            }}
                            selectionColor={color.activeColor.fontColor.dark}
                            multiline={true}
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
                            }}>{titleTasks}</Text>
                            <Text style={{
                                color: color.activeColor.fontColor.dark + '55',
                                fontSize: 13
                            }}
                            >{limiterWord(contentTasks, 2)}</Text>
                        </View>
                }
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                {
                    edit 
                        ? <DateTimePicker
                            testID="dateTimePicker"
                            style={{ width: 100 }}
                            value={new Date()}
                            is24Hour={true}
                            mode="time"
                            showIcon={false}
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
                            open={true}
                            onChange={() => onChangeDate()}
                        />
                        :<Text style={{
                            ...styles.heures,
                            color: color.activeColor.fontColor.dark + 'aa'
                        }}>
                                test
                            {
                                // heureDebut.getTime()
                            }</Text>
                }

                {
                    edit ? <View>
                        <Button
                            onPress={() => onSave()}
                            title='tazomina'
                            color={color.activeColor.primary.default}
                        />
                        <Button
                            onPress={() => onPressAjanona()}
                            title='ajanona'
                            type='clear'
                        />

                    </View> : <View style={{ flexDirection: 'row' }}>
                        <Button
                            onPress={() => () => {
                                setState({ edit: true })
                                dispatch({ type: 'ON_CHANGE_DATE_PICKER', data: heureDebut })
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
                            onPress={() => () => {
                                onClickBtnDelete(days, idTasks)
                            }}
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
        alignItems: 'flex-start',
        padding: 10
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
