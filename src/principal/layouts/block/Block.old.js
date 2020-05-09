import React, { Component } from 'react'
import { View, Text, Image, Vibration } from 'react-native'
import check from './statics/images/check.png'
import clock from './statics/images/clock.png'
import { connect } from 'react-redux'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import {
    betweenTwoString,
    convertArrayToString
} from '../DatePicker/DatePicker'

import Chrono from './layouts/chrono/Chrono'

class BlockOld extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // date: this.props.datas.durationTasks,
            date: 1,
            stockInterval: null
            // finishAt: Date.now() + betweenTwoString(this.props.datas.heureDebut, this.props.datas.heureFin)
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
        let response = '00:00:00'
        if (e > 0) {
            const oneHeure = (60 * 60 * 1000)
            const oneMinute = (60 * 1000)
            const oneSecond = 1000

            const heure = Math.floor(e / oneHeure)
            const resteHeure = (e - (heure * oneHeure)) >= 0 ? (e - (heure * oneHeure)) : 0
            const minute = Math.floor(resteHeure / oneMinute)
            const resteMinute = (minute * oneMinute)
            const second = Math.abs(Math.floor((e - (e - resteMinute) - (resteHeure)) / oneSecond))
            response = (this.setDouble(heure) + ':' + this.setDouble(minute) + ':' + this.setDouble(second))
        }

        return response
    }

    chrono () {
        if (this.props.task.idTaskActive === this.props.datas.idTasks) {
            const stock = setInterval(() => {
                const start = new Date()
                if (this.state.date > 0) {
                    this.setState((state) => {
                        const stock = betweenTwoString(
                            convertArrayToString(
                                [start.getHours(), start.getMinutes(), start.getSeconds()]
                            ), this.props.task.dateDebutAndFin[1]
                        )
                        return { date: stock > 0 ? stock : 0 }
                    })
                } else {
                    Vibration.vibrate([500, 1000, 1000], true)
                    setTimeout(() => {
                        Vibration.cancel()
                        this.setState({ date: 1 })
                    }, 2000)
                    this.props.initDataTasks()
                }
            }, 1000)
            this.setState({ stockInterval: stock })
        } else {
            this.setState({ date: betweenTwoString(this.props.task.dateDebutAndFin[0], this.props.task.dateDebutAndFin[1]) })
        }
    }

    UNSAFE_componentWillMount () {
        setTimeout(() => {
            return this.chrono()
        }, 2000)
    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    render () {
        const { datas, task, nextDatas } = this.props
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
                    <Chrono
                        style={{
                            fontSize: 24,
                            textDecorationLine: finish ? 'line-through' : 'none',
                            color: finish ? '#716e6e' : '#222222'
                        }}
                        // contents = {
                        //     finish ? '00:00:00' : (
                        //         this.props.task.idTaskActive === this.props.datas.idTasks
                        //             ? this.secondToDate(this.state.date)
                        //             : this.secondToDate(betweenTwoString(datas.heureDebut, nextDatas.heureDebut))
                        //     )
                        // }
                        duration = {
                            finish ? 0 : (
                                this.props.task.idTaskActive === this.props.datas.idTasks
                                    ? this.state.date
                                    : betweenTwoString(datas.heureDebut, nextDatas.heureDebut)
                            )
                        }
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockOld)
