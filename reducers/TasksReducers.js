import {
    INIT_DATA_TASKS,
    DATA_FILTER,
    ON_CHANGE_DATE_PICKER,
    DATA_ACTIVE
} from '../actions/TasksActions'
// import shortid from 'shortid'
// import AsyncStorage from '@react-native-community/async-storage'
import { convertStringNumber } from '../src/principal/layouts/DatePicker/DatePicker'
// import { TASKS } from './data/task'

const initState = {
    dataTasks: {},
    showEdit: false,
    length: 0,
    showPut: false,
    idTaskActive: 0,
    dateDebutAndFin: [],
    heureDebut: '00:00:00',
    dataFilter: []
}

export function isBetweenTwoNumber (debut, fin, numb) {
    return (debut <= numb && numb <= fin) && debut && fin && numb
}
const listJours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
]

function dateDAF (state, active) {
    const oneDay = 24 * 60 * 60 * 1000
    const now = new Date()
    const datenow = (oneDay * now.getDay()) + convertStringNumber(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())
    let response = []
    if (state) {
        let jourPrev = null
        if (now.getDay() !== 0) {
            jourPrev = listJours[now.getDay() - 1]
        } else {
            jourPrev = listJours[listJours.length - 1]
        }
        const jourNow = listJours[now.getDay()]

        let jourNext = null
        if (now.getDay() !== listJours.length - 1) {
            jourNext = listJours[0]
        } else {
            jourNext = listJours[now.getDay() + 1]
        }
        active = 0

        const dataLastPrev = state.dataTasks[jourPrev][state.dataTasks[jourPrev].length - 1]
        const dataPrevNext = state.dataTasks[jourNext][0]
        const newStock = [dataLastPrev, ...state.dataTasks[jourNow], dataPrevNext]
        // console.log(newStock)

        for (let i = 0; i < newStock.length; i++) {
            let debut = newStock[i]
            if (debut) {
                debut = debut.idTasks
            }
            let fin = newStock[i + 1]
            if (fin) {
                fin = fin.idTasks
            }
            // console.log(debut, fin, datenow, isBetweenTwoNumber(debut, fin, datenow))

            // if (i === 0) {
            //     debut = state.dataTasks[jourPrev].idTasks
            //     fin = state.dataTasks[jourNow].idTasks
            //     if (i === state.dataTasks[jourNow].length - 1) {
            //         debut = state.dataTasks[jourNow][i].idTasks
            //         fin = state.dataTasks[jourNext][0].idTasks
            //     }
            // } else {
            //     debut = state.dataTasks[jourNow][i].idTasks
            //     fin = state.dataTasks[jourNow][i + 1].idTasks
            // }
            if (isBetweenTwoNumber(debut, fin, datenow)) {
                active = newStock[i].idTasks
            }
        }
        state.idTaskActive = active
        const activeTask = state.dataTasks[jourNow].filter(value => {
            return value.idTasks === (active)
        })
        let nextActive = state.dataTasks[jourNow].filter(value => {
            return value.idTasks === (active + 1)
        })

        if (nextActive === undefined) {
            const nameDay = listJours[new Date().getDay() + 1]
            nextActive = state.dataTasks[nameDay]
        }

        if (activeTask.length !== 0 && nextActive.length !== 0) {
            response = [activeTask[0].heureDebut, nextActive[0].heureDebut]
        }
    }
    return [response, active]
}

const TasksReducers = (state = initState, action) => {
    // state.length = state.dataTasks.filter(e => { return e.finishTasks === true }).length
    let date = null
    let stock = null
    let dataLastPrev = null
    let response = state
    switch (action.type) {
    case INIT_DATA_TASKS:
        if (action.data) {
            response = Object.assign({}, state, {
                dataTasks: action.data
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
        dataLastPrev = state.dataTasks[listJours[listJours.length - 1]]
        if (action.active !== 0) {
            dataLastPrev = state.dataTasks[listJours[action.active - 1]]
        }
        stock = [dataLastPrev[dataLastPrev.length - 1], ...state.dataTasks[listJours[action.active]]]
        return Object.assign({}, state, { dataFilter: stock })
    case ON_CHANGE_DATE_PICKER:
        return Object.assign({}, state, { heureDebut: action.data })

    default:
        return state
    }
}

export default TasksReducers
