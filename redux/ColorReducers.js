import { CHANGE_COLOR, ADD_COLOR, PUT_COLOR_USER } from './actions/ColorActions'
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
    fontColor: {
      light: '#eceff1', // 50
      dark: '#000000' // 900
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
    fontColor: {
      light: '#ffebee', // 50
      dark: '#b71c1c' // 900
    }
  }
}

const nameColor = 'gray'

const initState = {
  activeColor: listColor[nameColor],
  dataColor: [
    // {
    //   nameColor: 'gray',
    //   pseudoUtilisateur: 'blackran'
    // }
  ]
}

const reducers = (state = initState, action) => {
  let stock
  switch (action.type) {
  case CHANGE_COLOR:
    return Object.assign({}, state, { activeColor: listColor[action.data] })
  case ADD_COLOR:
    return Object.assign({}, state, { dataColor: [...state.dataColor, action.data] })
  case PUT_COLOR_USER:
    stock = state.dataColor.map((e) => {
      if (e.pseudoUtilisateur === action.data.lastPseudoUtilisateur) {
        return ({ ...e, pseudoUtilisateur: action.data.pseudoUtilisateur })
      }
      return e
    })
    return Object.assign({}, state, { dataColor: stock })
  default:
    return state
  }
}

export default reducers
