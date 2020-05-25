import React, { Component } from 'react'
import { Dimensions, View, Text, TouchableWithoutFeedback } from 'react-native'
import OneScroll from './layouts/oneScroll/OneScroll'

const { width } = Dimensions.get('window')

class ScrollDatePicker extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false,
            h: 0,
            m: 0,
            s: 0,
            default: '00:00:00'
        }
    }

    componentDidMount () {
        const [ h, m, s ] = this.props.default.split(':')
        this.setState({
            show: this.props.show,
            h,
            m,
            s
        })
    }

    componentDidUpdate () {
        const [ h, m, s ] = this.props.default.split(':')
        if (this.state.show !== this.props.show) {
            this.setState({
                show: this.props.show
            })
        }
        if (this.state.default !== this.props.default) {
            this.setState({
                default: this.props.default,
                h,
                m,
                s
            })
        }
    }

    onChangeH = (e) => {
        this.props.onChange(e, this.state.m, this.state.s)
        this.setState({ h: e })
    }

    onChangeM = (e) => {
        this.props.onChange(this.state.h, e, this.state.s)
        this.setState({ m: e })
    }

    onChangeS = (e) => {
        this.setState({ s: e })
        this.props.onChange(this.state.h, this.state.m, e)
    }

    render () {
        const [heure, minute, second] = this.state.default.split(':')
        const { fontColor } = this.props
        return (this.state.show
            ? <View style={{ ...this.props.style }}>
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 10
                    }}
                >
                    <TouchableWithoutFeedback onPress={this.props.ManindryAjanona}>
                        <Text
                            style={{
                                color: fontColor + 'aa',
                                borderWidth: 1,
                                padding: 5,
                                borderColor: fontColor + 'bb',
                                borderRadius: 3
                            }}>ajanona</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.ManindryTazomina}>
                        <Text
                            style={{
                                color: fontColor + 'cc',
                                borderWidth: 1,
                                padding: 5,
                                borderColor: fontColor,
                                borderRadius: 3
                            }}>tazomina</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View
                    style={{
                        opacity: this.state.show ? 1 : 0,
                        flex: 1,
                        flexDirection: 'row',
                        width: width,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingBottom: 20
                    }}>
                    <OneScroll fontColor={fontColor} length='24' value={heure} onChange={this.onChangeH}/>
                    <OneScroll fontColor={fontColor} length='60' value={minute} onChange={this.onChangeM}/>
                    <OneScroll fontColor={fontColor} length='60' value={second} onChange={this.onChangeS}/>
                </View>
            </View> : null
        )
    }
}

export default ScrollDatePicker
