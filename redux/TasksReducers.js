import {
  INIT_DATA_TASKS,
  DATA_FILTER,
  ON_CHANGE_DATE_PICKER,
  DATA_ACTIVE,
  PUT_ALL_DATA
} from './actions/TasksActions'
import {
  listJours,
  dateDAF
} from './utils/Tasks'

const initState = {
  dataTask: null,
  dataTasks: [
    {
      pseudoUtilisateur: 'blackran',
      data: [
        // {
        //   idTasks: 80040000,
        //   titleTasks: 'hyt',
        //   contentTasks: 'Ty',
        //   heureDebut: '22:14:00',
        //   day: 'Alahady',
        //   type: 'miverimberina'
        // }
      ]
    }
  ],
  showEdit: false,
  length: 0,
  showPut: false,
  idTaskActive: 0,
  dateDebutAndFin: [],
  heureDebut: '00:00:00',
  dataFilter: []
}

function FilterAffiche (datas) {
  const newdata = {
    Alahady: [],
    Alatsinainy: [],
    Talata: [],
    Alarobia: [],
    Alakamisy: [],
    Zoma: [],
    Sabotsy: []
  }
  datas && datas.map(e => {
    if (e.day) {
      newdata[e.day] = [...newdata[e.day], e]
    }
    return null
  })
  return newdata
}

const TasksReducers = (state = initState, action) => {
  const date = null
  let stock = null
  let dataLastPrev = []
  let response = state
  let st = {}
  let stockDataFilter = []
  switch (action.type) {
  case INIT_DATA_TASKS:
    if (action.data) {
      response = Object.assign({}, state, {
        dataTask: action.data
      })
    }
    return response

  case DATA_ACTIVE:
    if (state) {
      const [response, active] = dateDAF(state, state.idTaskActive)
      return Object.assign({}, state, {
        idTaskActive: active,
        dateDebutAndFin: response
      })
    }
    return date

  case DATA_FILTER:
    // console.log('============================================================')
    st = FilterAffiche(state.dataTask)
    if (st) {
      dataLastPrev = st[listJours[listJours.length - 1]]
      if (action.active !== 0) {
        dataLastPrev = st[listJours[action.active - 1]]
      }
      if (dataLastPrev[dataLastPrev.length - 1]) {
        stockDataFilter = [dataLastPrev[dataLastPrev.length - 1], ...st[listJours[action.active]]]
      } else {
        stockDataFilter = [...st[listJours[action.active]]]
      }
    }
    return Object.assign({}, state, { dataFilter: stockDataFilter })

  case ON_CHANGE_DATE_PICKER:
    return Object.assign({}, state, { heureDebut: action.data })

  case PUT_ALL_DATA:
    stock = state.dataTasks.map((e) => {
      if (e.pseudoUtilisateur === action.user.pseudoUtilisateur) {
        return { data: action.data, pseudoUtilisateur: e.pseudoUtilisateur }
      }
      return e
    })
    return Object.assign({}, state, { dataTasks: stock })

  default:
    return state
  }
}

export default TasksReducers
