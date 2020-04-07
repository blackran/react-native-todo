import React, { Component } from 'react'
import {
    // PanResponder, TouchableHighlight,
    ScrollView,
    View,
    Animated,
    Dimensions,
    Text,
    // DatePickerAndroid
} from 'react-native'
import styles from './statics/styles/Style'
import { connect } from 'react-redux'
// import { Icon } from 'react-native-elements'
import axios from 'axios'
import Move from '../animation/Move'
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
            dataFilter: [],
            fontSize: [12, 12, 12, 12, 12, 12, 12]
        }

        this.height = 40
    }

    componentDidMount () {
        setTimeout(() => this.listView.scrollTo({
            x: 0,
            y: (new Date().getDay() * this.height),
            animated: true
        }), 1)
        this.filterByDay()
    }

    getFilterAnnonce (value) {
        axios.get(this.props.other.ip_add + 'Annonce/recherche/' + value,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
                }
            }
        ).then(h => {
            this.setState({ data: h.data })
        }).catch(err => console.log('error parsing:\n', err))
    }

    OnChangeSearch (value) {
        this.getFilterAnnonce(value)
        this.setState({ searchValue: value })
    }

    OnClickDetails (id, h) {
        this.props.navigation.push('Details', { id: id })
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
        var scrollValue = (Math.abs(
            (Math.round(event.nativeEvent.contentOffset.y / this.height) * this.height) -
            event.nativeEvent.contentOffset.y) % 14
        )

        if (this.state.value !== Math.round(event.nativeEvent.contentOffset.y / this.height)) {
            var stocks = this.state.fontSize.map((e, i) => {
                var sign = -1
                if (event.nativeEvent.velocity.y > 0) {
                    sign = 1
                }
                var defaultFontSize = 14
                var stock = defaultFontSize

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
        this.filterByDay()
    }

    filterByDay () {
        if (this.props.task.dataTasks.length > 0) {
            this.setState({
                dataFilter: this.props.task.dataTasks.filter(e => {
                    return e.dayTasks === this.state.active
                })
            })
        }
    }

    render () {
        const jours = [
            'Alahady',
            'Alatsinainy',
            'Talata',
            'Alarobia',
            'Alakamisy',
            'Zoma',
            'Sabotsy'
        ]
        // console.log(this.props.navigation.state.params)
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#222222'
                }}>
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
                                height: this.height * (jours.length + 2)
                            }}>
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
                                    }}>  </Text>
                            </View>
                            <DatePickerAndroid/>

                            {
                                jours.map((e, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                height: this.height,
                                                // borderWidth: 1,
                                                // borderColor: 'red',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 0,
                                                width: 180
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
                    <View>
                        <Text style={{ color: 'white' }}>Vita 11/17</Text>
                        <Text style={{ color: 'white' }}>11:31:02</Text>
                    </View>
                </View>

                <ScrollView style={{ width: width, ...styles.root }}>
                    {
                        this.state.dataFilter.length > 0
                            ? this.state.dataFilter.map((e, i) => {
                                return (
                                    <Animated.View key={e.idTasks}>
                                        <Move delais={i * 100} xD={width} yD={0} key={e.numAnnonce}>
                                            {/* <MovableView onMove={ values => console.warn(values) }> */}
                                            <Block datas={e} />
                                            {/* </MovableView> */}
                                        </Move>
                                    </Animated.View>
                                )
                            }) : null
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { other: state.Other, task: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principals)
