import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Dimensions, ScrollView, Text, View, StyleSheet, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { Button, Icon, ThemeProvider, Card } from 'react-native-elements'
import ScrollDatePicker from '../scrollDatePicker/ScrollDatePicker'
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
            showEdit: 'other'
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

    onChangeScrollDatePicker = (h, m, s) => {
        this.props.onChangeDatePicker(Tasks.setDouble(h) + ':' + Tasks.setDouble(m) + ':' + Tasks.setDouble(s))
        return null
    }

    componentDidMount () {
        const stock = JSON.parse(JSON.stringify(this.props.task.dataTask))
        this.setState({
            data: loopObject(stock)
        })
    }

    onClickSaveAll () {
        console.log('onClickSaveAll ', this.state.data)
        Alert.alert(
            'Fanotaniana',
            'Tena ho hotahirizina ve?',
            [
                {
                    text: 'Ajanona',
                    onPress: () => null
                },
                {
                    text: 'Manaiky',
                    onPress: () => {
                        this.props.putAllData(
                            InverseLoopObject(JSON.parse(JSON.stringify(this.state.data))),
                            this.props.utilisateur.connecterUtilisateur
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    OnPressSave = (days, datas, lastIdTasks) => {
        Keyboard.dismiss()
        const { data } = this.state
        console.log({ datas })
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
                    const mocks = [...data.finish, datas]
                    this.setState({ data: Object.assign({}, data, { finish: order(mocks, 'idTasks') }) })
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
                            if (e.idTasks === lastIdTasks) {
                                exist = false
                                const stock = JSON.parse(JSON.stringify(data))
                                stock.rest[key].splice(i, 1)
                                const mocks = [...data.rest[key], datas]
                                stock.rest[key] = order(mocks, 'idTasks')
                                this.setState({ data: Object.assign({}, stock) })
                            }
                            return null
                        })
                        if (exist) {
                            const stock = JSON.parse(JSON.stringify(data))
                            const mocks = [...data.rest[key], datas]
                            stock.rest[key] = order(mocks, 'idTasks')
                            this.setState({ data: Object.assign({}, data, stock) })
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
            this.props.onChangeDatePicker('00:00:00')
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
                    <View
                        style={{
                            backgroundColor: color.activeColor.primary.default,
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3
                        }}
                    >
                        <Button
                            icon={
                                <Icon
                                    name='chevron-left'
                                    size={30}
                                    type='MaterialIcons'
                                    color='white'
                                />
                            }
                            title='HIVERINA'
                            onPress={() => this.props.navigation.navigate('Principal', { color: color })}
                            style={{
                                width: 10
                            }}
                            titleStyle={{
                                color: color.activeColor.fontColor.light
                            }}
                            type='clear'
                        />
                        <Button
                            icon={
                                <Icon
                                    name='save'
                                    size={25}
                                    type='MaterialIcons'
                                    color='white'
                                />
                            }
                            title='AMPIRIMINA'
                            onPress={this.onClickSaveAll.bind(this)}
                            style={{
                                width: 10
                            }}
                            titleStyle={{
                                color: color.activeColor.fontColor.light
                            }}
                            type='clear'
                        />
                    </View>
                    <ScrollView
                        style={{
                            height: height,
                            // backgroundColor: color.activeColor.primary.default,
                            flexDirection: 'column'
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
                                            OnPressSave={this.OnPressSave}
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
                                            OnPressSave={this.OnPressSave}
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
                                                        OnPressSave={this.OnPressSave}
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
                                                        OnPressSave={this.OnPressSave}
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
                    </ScrollView>
                    <ScrollDatePicker
                        style={{
                            width: width,
                            position: 'absolute',
                            // top: this.state.focus? 0: null,
                            // bottom: this.state.focus ? null : 0,
                            right: 0,
                            bottom: 75,
                            backgroundColor: color.activeColor.primary.dark
                        }}
                        ManindryAjanona={this.manindryAjanona}
                        ManindryTazomina={this.ManindryTazomina}
                        fontColor={color.activeColor.fontColor.dark}
                        default={this.state.default}
                        show={this.state.show}
                        // show={true}
                        onChange={this.onChangeScrollDatePicker}
                    />

                </View>
            </ThemeProvider>
        )
    }
}

const styles = StyleSheet.create({
    block: {
        marginBottom: 0
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
