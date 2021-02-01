import React, { useEffect, useState, useCallback } from 'react'
import {
    // PanResponder, TouchableHighlight,
    ScrollView,
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import styles from './statics/styles/Style'
import { useDispatch, useSelector } from 'react-redux'
// import { Icon } from 'react-native-elements'
import Block from './layouts/block/Block'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Avatar } from 'react-native-elements'
import userDefault from './statics/images/user.png'

const { width } = Dimensions.get('window')

function Principals (props) {
    const dispatch = useDispatch()
    const { color, tasks, utilisateur } = useSelector(state => {
        return { color: state.Color, utilisateur: state.Utilisateur.connecterUtilisateur, tasks: state.Tasks }
    })

    const [state, setStateTrue] = useState({
        data: [],
        searchValue: '',
        active: new Date().getDay(),
        page: 0,
        now: new Date().getDay(),
        fontSize: [12, 12, 12, 12, 12, 12, 12],
        lengthTaskFinish: 0
    })

    const [datenow, setDateNow] = useState('00:00:00')

    let listView

    const height = 40
    const jours = [
        'Alahady',
        'Alatsinainy',
        'Talata',
        'Alarobia',
        'Alakamisy',
        'Zoma',
        'Sabotsy'
    ]

    const setState = useCallback((data) => {
        setStateTrue(Object.assign({}, state, data))
    }, []) // eslint-disable-line

    const dateNowToString = useCallback(() => {
        const date = new Date()
        return setDouble(date.getHours()) + ':' + setDouble(date.getMinutes()) + ':' + setDouble(date.getSeconds())
    }, [])

    const lengthTaskFinish = useCallback(() => {
        if (tasks.dataFilter.length > 0) {
            const stock = tasks.dataFilter.filter(e => {
                if (e) {
                    if (state.active < state.now) {
                        return true
                    } else {
                        return e.idTasks < tasks.idTaskActive
                    }
                } else {
                    return false
                }
            })
            setState({ lengthTaskFinish: stock.length })
        }
    }, [tasks.dataFilter]) // eslint-disable-line

    useEffect(() => {
        console.log('init data', new Date())
        dispatch({
            type: 'DATA_FILTER',
            active: state.active
        })
        dispatch({ type: 'INIT_DATA_TASKS' })
        dispatch({ type: 'DATA_ACTIVE' })

        lengthTaskFinish()
    }, [ props.dataTasks]) // eslint-disable-line

    useEffect(() => {
        props.navigation.navigate('Principal',
            {
                user: utilisateur.connecterUtilisateur,
                color: color
            }
        )

        const stock = setInterval(() => {
            setDateNow(dateNowToString())
        }, 1000)
        return () => clearInterval(stock)
    }, []) // eslint-disable-line

    useEffect(() => {
        if (listView.scrollTo()) {
            setTimeout(() => listView.scrollTo({
                x: 0,
                y: (new Date().getDay() * height),
                animated: true
            }), 1)
        }
    }, [listView])

    const OnScroll = (e) => {
        if (state.value !== Math.round(e.nativeEvent.contentOffset.y / height)) {
            fontSizeAnimation(e)
            setState({ active: Math.round(e.nativeEvent.contentOffset.y / height) })
        }
    }

    const fontSizeAnimation = (event) => {
        const scrollValue = (Math.abs(
            (Math.round(event.nativeEvent.contentOffset.y / height) * height) -
                event.nativeEvent.contentOffset.y) % 14
        )

        if (state.value !== Math.round(event.nativeEvent.contentOffset.y / height)) {
            const stocks = state.fontSize.map((e, i) => {
                let sign = -1
                if (event.nativeEvent.velocity.y > 0) {
                    sign = 1
                }
                const defaultFontSize = 14
                let stock = defaultFontSize

                if (i === (state.active - 1 + sign)) {
                    stock = Math.abs(e + (sign * scrollValue))
                }
                if (i === (state.active + sign)) {
                    stock = Math.abs(e - (Math.abs(sign) * scrollValue))
                }
                if (i === (state.active + 1 + sign)) {
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
            setState({ fontSize: stocks })
        }
    }

    const OnEndScroll = (e) => {
        if (state.value !== Math.round(e.nativeEvent.contentOffset.y / height)) {
            const lengthStock = Math.round(e.nativeEvent.contentOffset.y / height)
            listView.scrollTo({
                x: 0,
                y: lengthStock * height,
                animated: true
            })
            setState({
                active: lengthStock
            })
            fontSizeAnimation(e)
            dispatch({
                type: 'DATA_FILTER',
                active: lengthStock
            })
            // setTimeout(() =>
            //     lengthTaskFinish(),
            // 1)
            dispatch({ type: 'DATA_ACTIVE' })
            console.log('OnEndScroll: ', lengthStock)
        }
    }

    const nextData = (i, datas) => {
        let dayPrev = null
        // let mocks = null
        if (state.active === 0) {
            dayPrev = jours[jours.length - 1]
        } else {
            dayPrev = jours[state.active - 1]
        }
        const dataLastPrev = tasks.dataTasks[dayPrev]
        const stock = [dataLastPrev[dataLastPrev.length - 1], ...tasks.dataTasks[jours[state.active]]]
        let mocks = stock[i + 1]
        if (stock.length === i + 1) {
            let active = state.active + 1
            if (state.active === 6) {
                active = 0
            }
            const datatomorow = datas[jours[active]]
            mocks = datatomorow[0]
        }
        if (mocks) {
            return mocks.heureDebut
        } else {
            return '00:00:00'
        }
    }

    const setDouble = (e) => {
        if (e < 10) {
            return '0' + e
        } else {
            return e
        }
    }

    const textColor = color.activeColor.primary.dark

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: color.activeColor.primary.light
            }}>
            <View
                style={{
                    backgroundColor: color.activeColor.primary.light,
                    height: 40,
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,

                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3

                }}>

                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <FontAwesomeIcon
                        icon={faBars}
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Avatar
                    rounded
                    title={utilisateur.pseudoUtilisateur[0].toUpperCase()}
                    source={utilisateur.imageUtilisateur ? utilisateur.imageUtilisateur : userDefault}
                />
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
                    style={{
                        ...styles.myscroll,
                        height: height * 3
                    }}
                    showsVerticalScrollIndicator={false}
                    onScroll={(e) => OnScroll(e)}
                    // onScrollEndDrag={ OnEndScroll() }
                    onMomentumScrollEnd={(e) => OnEndScroll(e)}
                    centerContent={false}
                    ref={e => {
                        listView = e
                        return null
                    }}
                >
                    {/* <View style={styles.myscroll}> */}
                    <View
                        style={{
                            height: height * (jours.length + 2),
                            width: 210
                        }}>
                        <View
                            style={{
                                height: height,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    color: textColor,
                                    fontSize: 12
                                }}> </Text>
                        </View>

                        {
                            jours.map((e, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            height: height,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 0
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: textColor,
                                                fontSize: state.active === index ? (width / 10) : 14,
                                                opacity: state.now === index ? 1 : (state.now === index ? 0.9 : 0.5)
                                            }}
                                        > {e} </Text>
                                    </View>)
                            })
                        }

                        <View
                            style={{
                                height: height,
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
                    <Text style={{ color: textColor }}>
                            Vita {setDouble(state.lengthTaskFinish)}/{setDouble(tasks.dataFilter.length)}
                    </Text>
                    <Text style={{ color: textColor }}>{datenow}</Text>
                </View>
            </View>

            {/* body of application */}

            <ScrollView style={{ width: width, ...styles.root }}>
                {
                    tasks.dataFilter && tasks.dataFilter.length > 0
                        ? tasks.dataFilter.map((e, i) => {
                            if (e) {
                                const stock = state.active === state.now
                                return (
                                    <Block
                                        key={i}
                                        i={i}
                                        finish={
                                            (state.active < state.now) ? false
                                                : (e.idTasks < props.task.idTaskActive)
                                        }
                                        datas={e}
                                        start={(props.task.idTaskActive === e.idTasks) && stock}
                                        now={stock}
                                        debut={
                                            ((state.active === state.now) &&
                                            // ? true :
                                                  e.idTasks < props.task.idTaskActive
                                            )
                                                ? nextData(i, props.task.dataTasks)
                                                : e.heureDebut
                                        }
                                        navigation={props.navigation}
                                        fin={nextData(i, props.task.dataTasks)}/>

                                )
                            }
                        }) : null
                }
            </ScrollView>
        </View>
    )
}

export default Principals
