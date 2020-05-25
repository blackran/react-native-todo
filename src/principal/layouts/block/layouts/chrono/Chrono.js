import React, { Component } from 'react'
import { Text, Vibration } from 'react-native'
import { betweenTwoString } from '../../../DatePicker/DatePicker'
import { connect } from 'react-redux'
import Notification from '../../../notification/Notification'

class Chrono extends Component {
    constructor (props) {
        super(props)
        this.state = {
            date: 1,
            stockInterval: null,
            start: false,
            style: {}
        }
    }

    chrono () {
        const stock = setInterval(() => {
            if (this.state.date > 0) {

                this.setState((state) => {
                    return { date: state.date - 1000 }
                })
            } else {
                clearInterval(this.state.stockInterval)
                Vibration.vibrate([500, 1000, 1000], true)
                setTimeout(() => {
                    Vibration.cancel()
                    this.setState({ date: 0 })
                }, 2000)
                this.props.initDataTasks()
                this.props.navigation.navigate('Notification', { lastTask: this.props.content })
            }
        }, 1000)

        this.setState({ stockInterval: stock })
    }

    componentDidMount () {
        const { debut, fin } = this.props
        stock = betweenTwoString(debut, fin)
        if(debut === fin){
            stock = 0
        }
        this.setState({
            date: stock
        })
        this.setState({ style: this.props.style })
    }



    setDouble (e) {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
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

    componentDidUpdate () {
        if (this.state.start !== this.props.start) {
            this.setState({ start: this.props.start })
            if (this.props.start) {
                this.chrono()
            } else {
                clearInterval(this.state.stockInterval)
            }
        }

        if (this.state.style !== this.props.style) {
            this.setState({ style: this.props.style })
        }

    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }


    render () {
        return <Text style={{ ...this.state.style }}>{ this.secondToDate(this.state.date) }</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chrono)
