import { CHANGE_COLOR } from '../actions/ColorActions'
import invert from 'invert-color'

const listColor = {
    gray: {
        primary: {
            light: '#cfd8dc', // 100
            default: '#607d8b', // 500
            dark: '#37474f' // 800
        },
        secondary: {
            light: invert('#cfd8dc', true), // 100
            default: invert('#607d8b', true), // 500
            dark: invert('#37474f', true) // 800
        },
        // secondary: {
        //     light: '#ffcdd2', // 100
        //     default: '#f44336', // 500
        //     dark: '#c62828' // 800
        // },
        fontColor: {
            light: '#eceff1', // 50
            dark: '#263238' // 900
        }
    },
    red: {
        primary: {
            light: '#ffcdd2', // 100
            default: '#f44336', // 500
            dark: '#c62828' // 800
        },
        secondary: {
            light: invert('#ffcdd2'), // 100
            default: invert('#f44336'), // 500
            dark: invert('#c62828') // 800
        },
        // secondary: {
        //     light: '#bbdefb', // 100
        //     default: '#2196f3', // 500
        //     dark: '#1565c0' // 800
        // },
        fontColor: {
            light: '#ffebee', // 50
            dark: '#b71c1c' // 900
        }
    }
}

const nameColor = 'gray'

const initState = {
    ...listColor[nameColor]
}

const ColorReducers = (state = initState, action) => {
    switch (action.type) {
    case CHANGE_COLOR:
        return Object.assign({}, state, listColor[action.data])
    default:
        return state
    }
}

export default ColorReducers
