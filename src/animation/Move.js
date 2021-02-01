import React, { useEffect, useRef, useCallback } from 'react'
import { Animated } from 'react-native'

function Move ({ xD, yD, change, styles, children, delais }) {
    const fadeAnim = useRef(new Animated.ValueXY({ x: xD, y: yD })).current
    // this.state = {
    //     pan: new Animated.ValueXY({ x: this.props.xD, y: this.props.yD }),
    //     // opacity: new Animated.Value(0)
    // }

    const fadeIn = useCallback(() => {
    // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: { x: 0, y: 0 },
            duration: delais
        }).start()
    }, [delais, fadeAnim])

    const fadeOut = useCallback(() => {
    // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: { x: 0, y: 0 },
            duration: delais
        }).start()
    }, [delais, fadeAnim, xD, yD])

    useEffect(() => {
        if (change) {
            fadeIn()
        } else {
            fadeOut()
        }
    }, [change, fadeIn, fadeOut])

    // activeAnimation () {
    //     Animated.parallel([
    //         Animated.delay(this.props.delais),
    //         Animated.spring(
    //             this.state.pan,
    //             {
    //                 friction: 30,
    //                 tension: 20,
    //                 toValue: { x: 0, y: 0 }
    //             }
    //         ),
    //         Animated.spring(this.state.opacity, {
    //             toValue: 1
    //         })
    //     ]).start()
    // }

    return (
        <Animated.View
            style={{
                transform: fadeAnim.getTranslateTransform(),
                // opacity: this.state.opacity,
                ...styles
            }}>
            { children }
        </Animated.View>
    )
}

export default Move
