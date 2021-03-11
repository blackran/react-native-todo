import {
  INIT_DATA_ALERT,
  ADD_DATA_ALERT,
  PUT_ALERT_USER,
  ON_CHANGE_SLIDER
} from './actions/AlertActions'

const initState = {
  nameSong: [
    { indice: 'Lord of the rings', name: 'lordoftherings' },
    { indice: 'Christmas ringtone', name: 'christmasringtone' },
    { indice: 'Clock alarm classicalStyle', name: 'clockalarmclassicalstyle' },
    { indice: 'Imany', name: 'imany' },
    { indice: 'Lovely mix ringtone', name: 'lovelymixringtone' },
    { indice: 'Mario fanfare', name: 'mariofanfare' },
    { indice: 'Super tone', name: 'supertone' },
    { indice: 'Wet, wet, wet', name: 'wetwetwet' }
  ],
  dataAlert: null,
  dataAlerts: [
    {
      pseudoUtilisateur: 'blackran',
      data:
        {
          idAlert: 80040000,
          dureeAlert: 60,
          vibreurAlert: true,
          songUrl: 'lordoftherings',
          dureeVibreurAlert: 5
        }
    }
  ]
}

const reducers = (state = initState, action) => {
  let stock
  let response = state
  switch (action.type) {
  case INIT_DATA_ALERT:
    if (action.data) {
      response = Object.assign({}, state, {
        dataAlert: action.data
      })
    }
    return response

  case ADD_DATA_ALERT:
    if (action.data) {
      response = Object.assign({}, state, {
        dataAlerts: [...state.dataTask, action.data]
      })
    }
    return response

  case PUT_ALERT_USER:
    response = state.dataAlerts.map((e) => {
      if (e.pseudoUtilisateur === action.data.lastPseudoUtilisateur) {
        return { ...e, pseudoUtilisateur: action.data.pseudoUtilisateur }
      }
      return null
    })
    return Object.assign({}, state, { dataAlerts: response })

  case ON_CHANGE_SLIDER:
    response = state.dataAlerts.map((e) => {
      if (e.pseudoUtilisateur === action.pseudoUtilisateur) {
        e.data = {
          ...e.data,
          dureeAlert: parseInt(action.duree * 60),
          dureeVibreurAlert: parseInt(action.vibreur * 60),
          vibreurAlert: action.isVibreur,
          songUrl: action.song
        }
        return e
      }
      return null
    })
    return Object.assign({}, state, { dataAlerts: response, dataAlert: stock })

  default:
    return state
  }
}

export default reducers
