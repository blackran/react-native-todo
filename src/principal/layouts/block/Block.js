import React, { Component } from 'react'
import { View, Text, Image, Animated, Dimensions } from 'react-native'
import check from './statics/images/check.png'
import clock from './statics/images/clock.png'
import { connect } from 'react-redux'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
// import {
//     betweenTwoString,
//     convertArrayToString
// } from '../DatePicker/DatePicker'

import Chrono from './layouts/chrono/Chrono'
import Move from '../../../animation/Move'
const { width } = Dimensions.get('window')

class Block extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // date: this.props.datas.durationTasks,
            date: 1,
            stockInterval: null,
            finish: false
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
        this.setState({ finish: this.props.finish })
    }

    // secondToDate (e) {
    //     let response = '00:00:00'
    //     if (e > 0) {
    //         const oneHeure = (60 * 60 * 1000)
    //         const oneMinute = (60 * 1000)
    //         const oneSecond = 1000
    //
    //         const heure = Math.floor(e / oneHeure)
    //         const resteHeure = (e - (heure * oneHeure)) >= 0 ? (e - (heure * oneHeure)) : 0
    //         const minute = Math.floor(resteHeure / oneMinute)
    //         const resteMinute = (minute * oneMinute)
    //         const second = Math.abs(Math.floor((e - (e - resteMinute) - (resteHeure)) / oneSecond))
    //         response = (this.setDouble(heure) + ':' + this.setDouble(minute) + ':' + this.setDouble(second))
    //     }
    //
    //     return response
    // }

    // chrono () {
    //     if (this.props.task.idTaskActive === this.props.datas.idTasks) {
    //         const stock = setInterval(() => {
    //             const start = new Date()
    //             if (this.state.date > 0) {
    //                 this.setState((state) => {
    //                     const stock = betweenTwoString(
    //                         convertArrayToString(
    //                             [start.getHours(), start.getMinutes(), start.getSeconds()]
    //                         ), this.props.task.dateDebutAndFin[1]
    //                     )
    //                     return { date: stock > 0 ? stock : 0 }
    //                 })
    //             } else {
    //                 Vibration.vibrate([500, 1000, 1000], true)
    //                 setTimeout(() => {
    //                     Vibration.cancel()
    //                     this.setState({ date: 1 })
    //                 }, 2000)
    //                 this.props.initDataTasks()
    //             }
    //         }, 1000)
    //         this.setState({ stockInterval: stock })
    //     } else {
    //         this.setState({ date: betweenTwoString(this.props.task.dateDebutAndFin[0], this.props.task.dateDebutAndFin[1]) })
    //     }
    // }

    // UNSAFE_componentWillMount () {
    //     setTimeout(() => {
    //         return this.chrono()
    //     }, 2000)
    // }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    dateNowToString () {
        const date = new Date()
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    debut () {
        const { datas, debut, fin, finish } = this.props
        let db = fin
        if (!finish) {
            db = this.props.task.idTaskActive === datas.idTasks ? this.dateNowToString() : debut
        }
        return db
    }

    componentDidUpdate () {
        if (this.state.finish !== this.props.finish) {
            this.setState({ finish: this.props.finish })
        }
    }

    limiterWord (phrase, len) {
        return phrase.split(' ').slice(0, len).join(' ') + ' ...'
    }

    render () {
        const { datas, fin, start, i, finish, color } = this.props
        // const { finish } = this.state
        return (
            <Animated.View>
                <Move
                    delais={i * 100}
                    xD={width}
                    yD={0}
                    styles={{
                        flex: 1,
                        justifyContent: 'space-between',
                        margin: 2,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 5,
                        backgroundColor: finish
                            ? color.primary.light + '99'
                            : (start ? color.primary.dark + '55' : color.primary.dark + '33'),
                        opacity: finish ? 0.5 : 1,
                        padding: 10,
                        borderRadius: 5,
                        paddingBottom: 15
                        // boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
                        // transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0'
                    }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{
                                fontSize: 24,
                                textDecorationLine: finish ? 'line-through' : 'none',
                                color: finish ? color.fontColor.light : (start ? color.fontColor.light : color.fontColor.dark)
                            }}>{ datas.titleTasks }</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                            // borderWidth: 1
                        }}>
                            {
                                !finish
                                    ? <Chrono
                                        style={{
                                            fontSize: 24,
                                            textDecorationLine: finish ? 'line-through' : 'none',
                                            color: finish ? color.fontColor.light : (start ? color.fontColor.light : color.fontColor.dark)
                                        }}
                                        navigation={this.props.navigation}
                                        content={datas.contentTasks}
                                        debut={this.debut()}
                                        fin={fin}
                                        start={start}
                                    /> : null
                            }

                            <Image
                                source={finish ? check : clock}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginLeft: 5
                                }}/>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: finish
                                    ? color.fontColor.light
                                    : (start ? color.fontColor.light + 'aa' : color.fontColor.dark),
                                opacity: 0.8
                            }}
                        >{ start ? datas.contentTasks : this.limiterWord(datas.contentTasks, 3) }</Text>
                    </View>
                </Move>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return { other: state.Other, task: state.Tasks, color: state.Color }
}

const mapDispatchToProps = dispatch => {
    return {
        initDataTasks: () => {
            dispatch({ type: 'INIT_DATA_TASKS' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block)
