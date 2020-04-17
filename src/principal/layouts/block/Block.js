import React, { Component } from 'react'
import { View, Text, Image, Vibration } from 'react-native'
import check from './statics/images/check.png'
import clock from './statics/images/clock.png'
import { connect } from 'react-redux'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { betweenTwoString } from '../DatePicker/DatePicker'
import { INIT_DATA_TASKS } from '../../../../actions/TasksActions'

class Block extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // date: this.props.datas.durationTasks,
            date: betweenTwoString(this.props.datas.heureDebut, this.props.datas.heureFin),
            stockInterval: null,
            // finishAt: Date.now() + this.props.datas.durationTasks
            finishAt: Date.now() + betweenTwoString(this.props.datas.heureDebut, this.props.datas.heureFin)
        }
    }

    setDouble (e) {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
    }

    componentDidMount () {
        this.props.initDataTasks()
    }

    secondToDate (e) {
        var oneHeure = (60 * 60 * 1000)
        var oneMinute = (60 * 1000)
        var oneSecond = 1000

        var heure = Math.floor(e / oneHeure)
        var resteHeure = (e - (heure * oneHeure)) >= 0 ? (e - (heure * oneHeure)) : 0
        var minute = Math.floor(resteHeure / oneMinute)
        var resteMinute = (minute * oneMinute)
        var second = Math.abs(Math.floor((e - (e - resteMinute) - (resteHeure)) / oneSecond))
        return (this.setDouble(heure) + ':' + this.setDouble(minute) + ':' + this.setDouble(second))
    }

    chrono () {
        if (this.props.task.idTaskActive === this.props.datas.idTasks) {
            var stock = setInterval(() => {
                // var start = new Date()
                if (this.state.date > 0) {
                    this.setState((state) => {
                        return { date: state.finishAt - Date.now() > 0 ? state.finishAt - Date.now() : 0 }
                    })
                } else {
                    Vibration.vibrate([500, 1000, 1000], true)

                    setTimeout(() => {
                        Vibration.cancel()
                    }, 10000)

                    clearInterval(this.state.stockInterval)
                }
                // console.log(new Date() - start)
            }, 1000)
            this.setState({ stockInterval: stock })
        }
    }

    UNSAFE_componentWillMount () {
        this.chrono()
    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    dateDAF (state, active) {
        var response = []
        if (state) {
            const listJours = [
                'Alahady',
                'Alatsinainy',
                'Talata',
                'Alarobia',
                'Alakamisy',
                'Zoma',
                'Sabotsy'
            ]
            const jour = listJours[new Date().getDay()]
            var activeTask = state.dataTasks[jour].filter(value => {
                return value.idTasks === (active)
            })

            var nextActive = state.dataTasks[jour].filter(value => {
                return value.idTasks === (active + 1)
            })

            if (nextActive.length === 0) {
                var nameDay = listJours[new Date().getDay() + 1]
                nextActive = [state.dataTasks[nameDay][0]]
            }

            if (activeTask.length !== 0 && nextActive.length !== 0) {
                response = [activeTask[0].heureDebut, nextActive[0].heureDebut]
            }
        }
        return response
    }

    render () {
        const [debut, fin] = this.dateDAF(this.props.task, this.props.datas.idTasks)
        const { datas, task } = this.props
        const finish = datas.idTasks < task.idTaskActive
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 2,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 2,
                backgroundColor: finish ? '#4a4949' : '#716e6e',
                padding: 10,
                borderRadius: 5
            }}>
                <View>
                    <Text style={{
                        fontSize: 24,
                        textDecorationLine: finish ? 'line-through' : 'none',
                        color: finish ? '#716e6e' : '#222222'
                    }}>{ datas.contentTasks }</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                    // borderWidth: 1
                }}>
                    <Text style={{
                        fontSize: 24,
                        textDecorationLine: finish ? 'line-through' : 'none',
                        color: finish ? '#716e6e' : '#222222'
                    }}>
                        { finish ? '00:00:00' : this.secondToDate(betweenTwoString(debut, fin)) }
                    </Text>
                    <Image
                        source={finish ? check : clock}
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 5
                        }}/>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return { other: state.Other, task: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        initDataTasks: () => {
            dispatch({ type: 'INIT_DATA_TASKS' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block)
