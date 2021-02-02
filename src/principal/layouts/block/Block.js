import React, { Component } from 'react'
import { View, Text, Image, Animated, Dimensions } from 'react-native'
import check from './statics/images/check_cool.png'
import clock from './statics/images/clock.png'
import wait from './statics/images/wait.png'
import { connect } from 'react-redux'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
// import {
//     betweenTwoString,
//     convertArrayToString
// } from '../DatePicker/DatePicker'

import Chrono from './layouts/chrono/Chrono'
import Move from '../../../animation/Move'
const { height } = Dimensions.get('window')

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
        return phrase && phrase.split(' ').slice(0, len).join(' ') + ' ...'
    }

    render () {
        const { datas, fin, start, i, finish, color } = this.props
        return (
            <Animated.View>
                <Move
                    delais={i * 10}
                    xD={0}
                    yD={(i + 1) * height}
                    styles={{
                        flex: 1,
                        justifyContent: 'space-between',
                        margin: 2,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 5,
                        backgroundColor: finish
                            ? color.activeColor.primary.light + '99'
                            : (start ? color.activeColor.primary.dark + '55' : color.activeColor.primary.dark + '33'),
                        opacity: finish ? 0.5 : 1,
                        padding: 10,
                        borderRadius: 5,
                        paddingBottom: 15
                    }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{
                                fontSize: 24,
                                textDecorationLine: finish ? 'line-through' : 'none',
                                color: finish
                                    ? color.activeColor.fontColor.light
                                    : (start
                                        ? color.activeColor.fontColor.light
                                        : color.activeColor.fontColor.dark)
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
                                            color: finish
                                                ? color.activeColor.fontColor.light
                                                : (start
                                                    ? color.activeColor.fontColor.light
                                                    : color.activeColor.fontColor.dark)
                                        }}
                                        navigation={this.props.navigation}
                                        content={datas.contentTasks}
                                        debut={this.debut()}
                                        fin={fin}
                                        start={start}
                                    /> : null
                            }

                            <Image
                                source={finish ? check : (start ? clock : wait)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginLeft: 5,
                                    opacity: start ? 1 : 0.6
                                }}/>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: finish
                                    ? color.activeColor.fontColor.light
                                    : (start ? color.activeColor.fontColor.light + 'aa' : color.activeColor.fontColor.dark),
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
