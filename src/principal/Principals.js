import React, { Component } from 'react'
import {
    // PanResponder, TouchableHighlight,
    ScrollView,
    View,
    Dimensions,
    Text
} from 'react-native'
import styles from './statics/styles/Style'
import { connect } from 'react-redux'
// import { Icon } from 'react-native-elements'
// import axios from 'axios'
// import Move from '../animation/Move'
import Block from './layouts/block/Block'
// import OrderBy from './OrderBy'
// import MovableView from 'react-native-movable-view'
const { width } = Dimensions.get('window')

class Principals extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: [],
            searchValue: '',
            active: new Date().getDay(),
            page: 0,
            now: new Date().getDay(),
            fontSize: [12, 12, 12, 12, 12, 12, 12],
            date: '00:00:00',
            stockInterval: null,
            lengthTaskFinish: 0
        }

        this.height = 40
        this.jours = [
            'Alahady',
            'Alatsinainy',
            'Talata',
            'Alarobia',
            'Alakamisy',
            'Zoma',
            'Sabotsy'
        ]
    }

    componentDidMount () {
        this.props.initDataTasks()
        setTimeout(() => this.listView.scrollTo({
            x: 0,
            y: (new Date().getDay() * this.height),
            animated: true
        }), 1)
        this.filterByDay()
        this.chonoHorloge()
        setTimeout(() =>
            this.lengthTaskFinish(),
        1)
    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    OnScroll (e) {
        // console.log('===========================================================\n')
        // console.log(e.nativeEvent.velocity.y > 0)
        // console.log(Math.round(e.nativeEvent.contentOffset.y+60 / 60))
        // console.log('===========================================================\n')
        if (this.state.value !== Math.round(e.nativeEvent.contentOffset.y / this.height)) {
            this.fontSizeAnimation(e)
            this.setState({ active: Math.round(e.nativeEvent.contentOffset.y / this.height) })
        }
    }

    fontSizeAnimation (event) {
        const scrollValue = (Math.abs(
            (Math.round(event.nativeEvent.contentOffset.y / this.height) * this.height) -
            event.nativeEvent.contentOffset.y) % 14
        )

        if (this.state.value !== Math.round(event.nativeEvent.contentOffset.y / this.height)) {
            const stocks = this.state.fontSize.map((e, i) => {
                let sign = -1
                if (event.nativeEvent.velocity.y > 0) {
                    sign = 1
                }
                const defaultFontSize = 14
                let stock = defaultFontSize

                if (i === (this.state.active - 1 + sign)) {
                    stock = Math.abs(e + (sign * scrollValue))
                }
                if (i === (this.state.active + sign)) {
                    stock = Math.abs(e - (Math.abs(sign) * scrollValue))
                }
                if (i === (this.state.active + 1 + sign)) {
                    stock = Math.abs(e + (-1 * sign * scrollValue))
                }

                // limitation on range 14 and (width/10)
                if (stock < defaultFontSize) {
                    stock = defaultFontSize
                }
                if (stock > (width / 11)) {
                    stock = (width / 11)
                }
                return stock
            })
            // console.log(stocks)
            this.setState({ fontSize: stocks })
        }
    }

    OnEndScroll (e) {
        if (this.state.value !== Math.round(e.nativeEvent.contentOffset.y / this.height)) {
            this.listView.scrollTo({
                x: 0,
                y: (Math.round(e.nativeEvent.contentOffset.y / this.height) * this.height),
                animated: true
            })
            this.setState({
                active: Math.round(e.nativeEvent.contentOffset.y / this.height)
            })
            this.fontSizeAnimation(e)
        }
        this.props.dataFilter(Math.round(e.nativeEvent.contentOffset.y / this.height))
        setTimeout(() =>
            this.lengthTaskFinish(),
        1)
    }

    nextData (i, datas) {
        const datanow = this.props.task.dataTasks[this.jours[this.state.active]]
        let stock = datanow[i + 1]
        if (datanow.length === i + 1) {
            let active = this.state.active + 1
            if (this.state.active === 6) {
                active = 0
            }
            const datatomorow = datas[this.jours[active]]
            stock = datatomorow[0]
        }
        if (stock) {
            return stock.heureDebut
        } else {
            return '00:00:00'
        }
    }

    setDouble (e) {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
    }

    dateNowToString () {
        const date = new Date()
        return this.setDouble(date.getHours()) + ':' + this.setDouble(date.getMinutes()) + ':' + this.setDouble(date.getSeconds())
    }

    chonoHorloge () {
        const stock = setInterval(() => {
            this.setState((state) => {
                return { date: this.dateNowToString() }
            })
        }, 1000)
        this.setState({ stockInterval: stock })
    }

    lengthTaskFinish () {
        if (this.props.task.dataFilter.length > 0) {
            const stock = this.props.task.dataFilter.filter(e => {
                if (this.state.active < this.state.now) {
                    return true
                } else {
                    return e.idTasks < this.props.task.idTaskActive
                }
            })
            this.setState({ lengthTaskFinish: stock.length })
        }
    }

    render () {
        const { color, task } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: color.primary.default
                }}>
                <View
                    style={{
                        backgroundColor: color.primary.default,
                        height: 40,
                        width: width,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 5,
                        paddingRight: 5
                    }}>
                    <Text style={{ color: 'white' }}>navigation</Text>
                    <Text style={{ color: 'white' }}>recheche</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: 10
                    }}>
                    <ScrollView
                        style={{ ...styles.myscroll, height: this.height * 3 }}
                        showsVerticalScrollIndicator={false}
                        onScroll={ this.OnScroll.bind(this) }
                        // onScrollEndDrag={ this.OnEndScroll.bind(this) }
                        onMomentumScrollEnd={ this.OnEndScroll.bind(this) }
                        centerContent={false}
                        ref={e => {
                            this.listView = e
                            return null
                        }}
                    >
                        {/* <View style={styles.myscroll}> */}
                        <View
                            style={{
                                height: this.height * (this.jours.length + 2),
                                width: 210
                            }}>
                            <View
                                style={{
                                    height: this.height,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12
                                    }}>  </Text>
                            </View>

                            {
                                this.jours.map((e, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                height: this.height,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 0
                                                // width: width
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    // fontSize: this.state.fontSize[index],
                                                    fontSize: this.state.active === index ? (width / 10) : 14,
                                                    opacity: this.state.now === index ? 1 : (this.state.now === index ? 0.9 : 0.5)
                                                }}> {e} </Text>
                                        </View>)
                                })
                            }

                            <View
                                style={{
                                    height: this.height,
                                    // borderWidth: 1,
                                    // borderColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12
                                    }}> </Text>
                            </View>

                        </View>
                        {/* </View> */}
                    </ScrollView>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            Vita { this.setDouble(this.state.lengthTaskFinish) }/{ this.setDouble(task.dataFilter.length) }
                        </Text>
                        <Text style={{ color: 'white' }}>{ this.state.date }</Text>
                    </View>
                </View>

                {/* body of application */}

                <ScrollView style={{ width: width, ...styles.root }}>
                    {
                        task.dataFilter.length > 0
                            ? task.dataFilter.map((e, i) => {
                                const stock = this.state.active === this.state.now
                                return (
                                    <Block
                                        key={e.idTasks}
                                        i={i}
                                        finish={
                                            (this.state.active < this.state.now) ? true
                                                : (e.idTasks < this.props.task.idTaskActive)
                                        }
                                        datas={e}
                                        start={ (this.props.task.idTaskActive === e.idTasks) && stock }
                                        now = { stock }
                                        debut={
                                            ((this.state.active < this.state.now) ? true
                                                : e.idTasks < this.props.task.idTaskActive)
                                                ? this.nextData(i, this.props.task.dataTasks)
                                                : e.heureDebut
                                        }
                                        navigation = {this.props.navigation}
                                        fin={this.nextData(i, this.props.task.dataTasks)}/>

                                )
                            }) : null
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { other: state.Other, task: state.Tasks, color: state.Color }
}

const mapDispatchToProps = dispatch => {
    return {
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        },
        initDataTasks: () => {
            dispatch({ type: 'INIT_DATA_TASKS' })
        },
        dataFilter: (active) => {
            dispatch({ type: 'DATA_FILTER', active })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principals)
