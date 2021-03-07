import React, { Component } from 'react'
import { View, ScrollView, Text, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

class OneScroll extends Component {
    constructor (props) {
        super(props)
        this.state = {
            active: 0,
            fontSize: [12, 12, 12, 12, 12, 12, 12],
            default: 0
        }
        this.height = 40
        this.datas = this.ranger(parseInt(this.props.length, 10))
    }

    ranger (len) {
        const stock = []
        for (let i = 0; i < len + 1; i++) {
            stock.push(i)
        }
        return stock
    }

    componentDidMount () {
        this.setState({ default: this.props.value, active: this.props.value })
        setTimeout(() => this.listView.scrollTo({
            x: 0,
            y: (this.props.length * this.height),
            animated: true
        }), 1)
        setTimeout(() => this.listView.scrollTo({
            x: 0,
            y: (this.props.value * this.height),
            animated: true
        }), 2)
    }

    componentDidUpdate () {
        if (this.state.default !== this.props.value && this.listView !== null) {
            this.listView.scrollTo({
                x: 0,
                y: (this.props.value * this.height),
                animated: true
            })
            this.setState({ default: this.props.value, active: this.props.value })
        }
    }

    OnScroll (e) {
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
            // this.props.onChange.onChange(Math.round(e.nativeEvent.contentOffset.y / this.height))
            this.props.onChange(Math.round(e.nativeEvent.contentOffset.y / this.height))
        }
    }

    setDouble (e) {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
    }

    render () {
        return (
            <View>
                <View>
                    <ScrollView
                        style={{ height: this.height * 3 }}
                        showsVerticalScrollIndicator={false}
                        onScroll={this.OnScroll.bind(this)}
                        // onScrollEndDrag={ this.OnEndScroll.bind(this) }
                        onMomentumScrollEnd={this.OnEndScroll.bind(this)}
                        centerContent={false}
                        ref={e => {
                            this.listView = e
                            return null
                        }}
                    >
                        <View
                            style={{
                                height: this.height * (this.datas.length + 2),
                                width: 70
                            }}>
                            <View
                                style={{
                                    height: this.height,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        color: this.props.fontColor,
                                        fontSize: 12
                                    }}> </Text>
                            </View>

                            {
                                this.datas.map((e, index) => {
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
                                                    color: this.props.fontColor,
                                                    // fontSize: this.state.fontSize[index],
                                                    fontSize: this.state.active === index ? (width / 10) : 14,
                                                    opacity: this.state.now === index ? 1 : (this.state.now === index ? 0.9 : 0.5)
                                                }}> {this.setDouble(e)} </Text>
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
                                        color: this.props.fontColor,
                                        fontSize: 12
                                    }}> </Text>
                            </View>

                        </View>
                        {/* </View> */}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default OneScroll
