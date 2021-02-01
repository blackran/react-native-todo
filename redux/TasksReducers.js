import {
    INIT_DATA_TASKS,
    DATA_FILTER,
    ON_CHANGE_DATE_PICKER,
    DATA_ACTIVE,
    PUT_ALL_DATA
} from './actions/TasksActions'
// import shortid from 'shortid'
// import AsyncStorage from '@react-native-community/async-storage'
// import { TASKS } from './data/task'
import {
    listJours,
    dateDAF
} from './utils/Tasks'

const initState = {
    dataTask: {},
    dataTasks: [
        {
            pseudoUtilisateur: 'blackran',
            data: {
                Alahady: [],
                Alatsinainy: [],
                Talata: [],
                Alarobia: [],
                Alakamisy: [],
                Zoma: [],
                Sabotsy: []
            }
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

const TasksReducers = (state = initState, action) => {
    let date = null
    let stock = null
    let dataLastPrev = []
    let response = state
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
            date = dateDAF(state, state.idTaskActive)
            return Object.assign({}, state, {
                idTaskActive: date[1],
                dateDebutAndFin: date[0]
            })
        }
        return date

    case DATA_FILTER:
        dataLastPrev = state.dataTask[listJours[listJours.length - 1]]
        if (action.active !== 0) {
            dataLastPrev = state.dataTask[listJours[action.active - 1]]
        }
        stock = [dataLastPrev[dataLastPrev.length - 1], ...state.dataTask[listJours[action.active]]]
        return Object.assign({}, state, { dataFilter: stock })

    case ON_CHANGE_DATE_PICKER:
        return Object.assign({}, state, { heureDebut: action.data })

    case PUT_ALL_DATA:
        stock = state.dataTasks.map((e) => {
            if (e.pseudoUtilisateur === action.user.pseudoUtilisateur) {
                return { data: action.data, pseudoUtilisateur: e.pseudoUtilisateur }
            }
            return e
        })
        console.log(stock)
        return Object.assign({}, state, { dataTasks: stock })

    default:
        return state
    }
}

export default TasksReducers
