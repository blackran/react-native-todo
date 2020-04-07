import React, { Component } from 'react'
import { Animated, Dimensions, View, ScrollView } from 'react-native'
import styles from '../login/statics/styles/Styles'
import { Image } from 'react-native-elements'
import logo from '../statics/images/logo-universite-fianarantsoa.png'
import sign from '../statics/images/sign2.png'
import Scale from './Scale'

const { height, width } = Dimensions.get('window')

class AnimationLogin extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pan: new Animated.ValueXY({ x: this.props.xD, y: this.props.yD }),
            opacity: new Animated.Value(0),
            isLogin: true,
            border: new Animated.Value(0)
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
                        toValue: { x: 0, y: this.props.yD }
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
                        toValue: { x: 0, y: 0 }
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
                    toValue: { x: 0, y: 0 }
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
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#4a4949'
                    }}>
                    <Scale delais={height} styles={styles.containerImageLogin}>
                        <Image
                            source={this.state.isLogin ? logo : sign}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                    </Scale>
                    <Animated.View
                        style={{
                            transform: this.state.pan.getTranslateTransform(),
                            borderTopLeftRadius: this.state.border,
                            borderTopRightRadius: this.state.border,
                            ...this.props.styles
                        // opacity: this.state.opacity
                        }}>
                        { this.props.children }
                    </Animated.View>
                </View>
            </ScrollView>
        )
    }
}

export default AnimationLogin
