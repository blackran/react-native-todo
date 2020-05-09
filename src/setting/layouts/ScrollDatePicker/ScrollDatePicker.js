import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import styles from '../../../principal/statics/styles/Style'

class ScrollDatePicker extends Component {
    componentDidMount () {
        this.props.initDataTasks()
        setTimeout(() => this.listView.scrollTo({
            x: 0,
            y: (new Date().getDay() * this.height),
            animated: true
        }), 1)
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
        this.filterByDay()
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
                                                padding: 0,
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
                </View>
                <View>
                    <ScrollView></ScrollView>
                </View>
                <View>
                    <ScrollView></ScrollView>
                </View>
            </View>
        )
    }
}

export default ScrollDatePicker
