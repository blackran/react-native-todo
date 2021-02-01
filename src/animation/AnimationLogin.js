import React, { Component } from 'react'
import { Animated, Dimensions, View, StatusBar, Image } from 'react-native'
import styles from './statics/styles/Styles'
import login from './statics/images/marcus/hiditra.png'
import sign from './statics/images/marcus/hanamboatra.png'
// import Scale from './Scale'

const { height, width } = Dimensions.get('window')

class AnimationLogin extends Component {
    constructor (props) {
        super(props)
        this.marginTop = height * (40 / 100)
        this.state = {
            pan: new Animated.ValueXY({
                x: 0,
                y: -this.marginTop
            }),
            opacity: new Animated.Value(0),
            isLogin: true,
            border: new Animated.Value(0),
            keyboardOpen: false
        }
    }

    componentDidMount () {
        setTimeout(() => this.activeAnimation(), 200)
    }

    slideAnimation () {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(
                    this.state.pan,
                    {
                        friction: 50,
                        tension: 0,
                        toValue: {
                            x: 0,
                            y: -this.marginTop
                        }
                    }
                ),
                Animated.spring(this.state.border, {
                    toValue: 0
                })
            ]),
            Animated.delay(100),
            Animated.parallel([
                Animated.spring(
                    this.state.pan,
                    {
                        friction: 3,
                        tension: 1,
                        toValue: {
                            x: 0,
                            y: 0
                        }
                    }
                ),
                Animated.spring(this.state.border, {
                    toValue: 20
                })
            ]),
            Animated.spring(this.state.opacity, {
                toValue: 1
            })
        ]).start()
        setTimeout(() => this.setState({
            isLogin: this.props.isLogin
        }), 200)
    }

    componentDidUpdate () {
        if (this.props.isLogin !== this.state.isLogin) {
            this.slideAnimation()
        }
    }

    activeAnimation () {
        Animated.parallel([
            // Animated.delay(this.props.delais),
            Animated.spring(
                this.state.pan,
                {
                    friction: 3,
                    tension: 1,
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }
            ),
            // Animated.spring(this.state.opacity, {
            //     toValue: 1
            // }),
            Animated.spring(this.state.border, {
                toValue: 20
            })
        ]).start()

        // Animated.parallel([
        //     Animated.delay(this.props.delais),
        //     Animated.spring(
        //         this.state.pan,
        //         {
        //             toValue: { x: 0, y: 0 }
        //         }
        //     )
        // ]).start()
        // Animated.spring(
        //     this.state.pan,
        //     {
        //         toValue: { x: 0, y: 0 }
        //     }
        // ).start()
    }

    render () {
        return (
            <View
                style={{
                    height: height - StatusBar.currentHeight,
                    alignItems: 'center',
                    backgroundColor: this.props.headerBackgroundColor
                }}
            >
                <View
                    style={{
                        width,
                        height: this.marginTop,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View
                        delais={height}
                        styles={styles.containerImageLogin}
                    >
                        <Image
                            source={this.state.isLogin ? login : sign}
                            style={{
                                width: 70,
                                height: 200
                            }}
                            transition={true}
                        />
                    </View>
                </View>
                <Animated.View
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        // transform: this.state.pan.getTranslateTransform(),
                        // borderTopLeftRadius: this.state.border,
                        // borderTopRightRadius: this.state.border,
                        top: this.marginTop,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 12
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,

                        elevation: 24,
                        ...styles.body
                    }}>
                    <View style={{
                        height: (height - this.marginTop),
                        justifyContent: 'center'
                    }}>
                        <View>
                            {this.props.children}
                        </View>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

export default AnimationLogin
