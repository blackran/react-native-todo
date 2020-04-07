import React, { Component } from 'react'
import { View, Text, Image, Vibration } from 'react-native'
import check from './statics/images/check.png'
import clock from './statics/images/clock.png'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

class Block extends Component {
    constructor (props) {
        super(props)
        this.state = {
            date: this.props.datas.durationTasks,
            stockInterval: null,
            finishAt: Date.now() + this.props.datas.durationTasks
        }
    }

    setDouble (e) {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
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

    UNSAFE_componentWillMount () {
        this.chrono()
    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    render () {
        const { datas } = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 2,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 2,
                backgroundColor: datas.finish ? '#4a4949' : '#716e6e',
                padding: 10,
                borderRadius: 5
            }}>
                <View>
                    <Text style={{
                        fontSize: 24,
                        textDecorationLine: datas.finish ? 'line-through' : 'none',
                        color: datas.finish ? '#716e6e' : '#222222'
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
                        textDecorationLine: datas.finish ? 'line-through' : 'none',
                        color: datas.finish ? '#716e6e' : '#222222'
                    }}>
                        { datas.finish ? '00:00:00' : this.secondToDate(this.state.date) }
                    </Text>
                    <Image
                        source={datas.finish ? check : clock}
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

export default Block
