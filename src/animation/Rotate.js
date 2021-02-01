import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'

function Rotate (props) {
    const [rotate, setRotate] = useState(new Animated.Value(360))
    let change

    useEffect(() => {
        console.log(props.change)
        if (props.change !== change) {
            setRotate(new Animated.Value(!change ? 0 : 360))
            Animated.spring(rotate, {
                toValue: change ? 0 : 360,
                useNativeDriver: false
            }).start()
            change = props.change
        }
    }, [props.change, rotate])

    return (
        <Animated.View
            style={{ ...props.styles, transform: [{ rotateY: rotate }] }}
        >
            { console.log({ rotate }) }
            { props.children }
        </Animated.View>
    )
}

export default Rotate
