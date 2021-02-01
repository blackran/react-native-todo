import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'

class Displays extends Component {
    constructor (props) {
        super(props)
        this.state = {
            idTasks: 0,
            titleTasks: '',
            contentTasks: '',
            heureDebut: '00:00:00',
            pseudoUtilisateur: 'blackran',
            edit: false
        }
        this.oneDay = 24 * 60 * 60 * 1000
    }

    convertStringNumber (date) {
        const [heure, minute, second] = date.split(':')
        return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
    }

    componentDidMount () {
        const { idTasks, titleTasks, contentTasks, heureDebut, pseudoUtilisateur } = this.props.datas
        this.setState({
            idTasks,
            titleTasks,
            contentTasks,
            heureDebut,
            pseudoUtilisateur,
            edit: this.props.edit
        })
    }

    componentDidUpdate () {
        if (JSON.stringify(this.state.datas) !== JSON.stringify(this.props.datas)) {
            this.setState({
                datas: this.props.datas
            })
        }
    }

    limiterWord (phrase, len) {
        return phrase ? phrase.split(' ').slice(0, len).join(' ') + ' ...' : phrase
    }

    OnChangeLohanteny (e) {
        this.setState({
            titleTasks: e
        })
    }

    OnChangeFanazavana (e) {
        this.setState({
            contentTasks: e
        })
    }

    day () {
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
        return listJours.indexOf(this.props.days)
    }

    render () {
        const { color, days } = this.props
        const { idTasks, titleTasks, contentTasks, heureDebut, edit, pseudoUtilisateur } = this.state
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
                                    backgroundColor: color.activeColor.primary.light + '33',
                                    padding: 2,
                                    margin: 2,
                                    color: color.activeColor.fontColor.light
                                }}
                                placeholder='lohanteny'
                                onChangeText={this.OnChangeLohanteny.bind(this)}
                                value={titleTasks}
                            />
                            <TextInput
                                style={{
                                    backgroundColor: color.activeColor.primary.light + '33',
                                    padding: 2,
                                    margin: 2,
                                    color: color.activeColor.fontColor.light
                                }}
                                multiline={true}
                                numberOfLines={2}
                                row={3}
                                placeholder='fanazavana'
                                onChangeText={this.OnChangeFanazavana.bind(this)}
                                value={contentTasks}
                            />
                        </View>
                            : <View>
                                <Text style={{
                                    ...styles.title,
                                    color: color.activeColor.fontColor.light + 'aa',
                                    fontSize: 17
                                }}>{titleTasks}</Text>
                                <Text style={{
                                    color: color.activeColor.fontColor.light + '55',
                                    fontSize: 13
                                }}
                                >{this.limiterWord(contentTasks, 2)}</Text>
                            </View>
                    }
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    {
                        edit
                            ? <TouchableWithoutFeedback
                                onPress={() => this.props.OnFocusHeureDebut(heureDebut)}
                            >
                                <Text style={{
                                    ...styles.heures,
                                    backgroundColor: color.activeColor.primary.light + '33',
                                    padding: 2,
                                    color: color.activeColor.fontColor.light,
                                    textAlign: 'center'
                                }}

                                >{this.props.task.heureDebut}</Text>
                            </TouchableWithoutFeedback>
                            : <Text style={{
                                ...styles.heures,
                                color: color.activeColor.fontColor.light + 'aa'
                            }}>{heureDebut}</Text>
                    }

                    {
                        edit ? <View>
                            <Button
                                onPress={() => {
                                    this.props.OnPressSave(days, {
                                        idTasks: (this.oneDay * this.day()) + this.convertStringNumber(this.props.task.heureDebut),
                                        titleTasks,
                                        contentTasks,
                                        heureDebut: JSON.parse(JSON.stringify(this.props.task.heureDebut)),
                                        pseudoUtilisateur
                                    }, this.state.idTasks)
                                    this.setState({
                                        edit: false
                                    })
                                }}
                                title='tazomina'
                                color={color.activeColor.primary.default}
                            />
                            <Button
                                onPress={() => {
                                    this.setState({ edit: false })
                                    this.props.manindryAjanona()
                                }
                                }
                                title='ajanona'
                                type='clear'
                            />

                        </View> : <View style={{ flexDirection: 'row' }}>
                            <Button
                                onPress={() => {
                                    this.setState({ edit: true })
                                    this.props.onChangeDatePicker(heureDebut)
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
                                    backgroundColor: color.activeColor.primary.dark + '44'
                                }}
                                // title='ovaina'
                                color={color.activeColor.primary.dark + '77'}
                                type='outline'
                            />
                            <Button
                                onPress={() => {
                                    this.props.onClickBtnDelete(days, idTasks)
                                }}
                                icon={
                                    <Icon
                                        name='delete'
                                        size={25}
                                        type='MaterialIcons'
                                        color='white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: color.activeColor.secondary.dark + 'aa'
                                }}
                                // title='fafana'
                                color={color.activeColor.primary.dark + '77'}
                                type='outline'
                            />
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // margin: 5,
        padding: 10
        // borderBottomWidth: 1
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

const mapStateToProps = state => {
    return {
        other: state.Other,
        task: state.Tasks,
        color: state.Color
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
        initDataTasks: () => {
            dispatch({ type: 'INIT_DATA_TASKS' })
        },
        onChangeDatePicker: (data) => {
            dispatch({
                type: 'ON_CHANGE_DATE_PICKER',
                data
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Displays)
