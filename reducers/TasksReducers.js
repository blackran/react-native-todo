import { ADD_TASKS, REMOVE_TASKS, TOGGLE_CHECK, INIT_DATA_TASKS, CHANGE_SHOW_EDIT, CHANGE_SHOW_PUT, TASK_NOW } from '../actions/TasksActions'
// import shortid from 'shortid'
// import AsyncStorage from '@react-native-community/async-storage'
import { isBetweenTwoDate, convertArrayToString } from '../src/principal/layouts/DatePicker/DatePicker.ts'
// import { TASKS } from './data/task'
import Task from './data/Task'

const initState = {
    dataTasks: Task(),
    showEdit: false,
    length: 0,
    showPut: false,
    idTaskActive: 0,
    dateDebutAndFin: []
}

function dateDAF (state, active) {
    const now = new Date()
    const datenow = convertArrayToString([now.getHours(), now.getMinutes(), now.getSeconds()])
    let response = []
    if (state) {
        const listJours = [
            'Alahady',
            'Alatsinainy',
            'Talata',
            'Alarobia',
            'Alakamisy',
            'Zoma',
            'Sabotsy'
        ]
        const jour = listJours[new Date().getDay()]
        active = 0

        for (let i = 0; i < state.dataTasks[jour].length; i++) {
            const debut = state.dataTasks[jour][i].heureDebut
            let fin = null
            if (i === state.dataTasks[jour].length - 1) {
                // fin = state.dataTasks[listJours[new Date().getDay() + 1]][0].heureDebut
                fin = state.dataTasks[listJours[0]][0].heureDebut
            } else {
                fin = state.dataTasks[jour][i + 1].heureDebut
            }
            if (isBetweenTwoDate(debut, fin, datenow)) {
                active = state.dataTasks[jour][i].idTasks
            }
        }

        state.idTaskActive = active
        const activeTask = state.dataTasks[jour].filter(value => {
            return value.idTasks === (active)
        })
        let nextActive = state.dataTasks[jour].filter(value => {
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
    return [response, active ]
}

const TasksReducers = (state = initState, action) => {
    // state.length = state.dataTasks.filter(e => { return e.finishTasks === true }).length
    let date = null
    switch (action.type) {
    case ADD_TASKS:
        // var stock = [
        //     ...state.dataTasks,
        //     {
        //         idTasks: shortid.generate(),
        //         contentTasks: action.data,
        //         finishTasks: false,
        //         createAt: Date.now()
        //     }
        // ]
        // AsyncStorage.setItem('todoNante', JSON.stringify(stock))
        // return Object.assign(
        //     {}, state
        //     , { dataTasks: stock }
        // )
        return null
    case INIT_DATA_TASKS:
        // console.log(Task().Sabotsy)
        if (state) {
            date = dateDAF(state, state.idTaskActive)
            return Object.assign({}, state, { idTaskActive: date[1], dateDebutAndFin: date[0] })
        } else {
            return null
        }
        // state.dataTasks = []
        //
        // // AsyncStorage.removeItem('todoNante')
        // return Object.assign(
        //     {}, state
        //     , { dataTasks: action.data }
        // )
    case REMOVE_TASKS:
        return null
        // var stock = state.dataTasks.filter(e => {
        //     return e.finishTasks !== true
        // })
        // AsyncStorage.setItem('todoNante', JSON.stringify(stock))
        // return Object.assign({}, state, { dataTasks: stock })
    case CHANGE_SHOW_EDIT:
        // return Object.assign({}, state, { showEdit: action.data })
        return null

    case CHANGE_SHOW_PUT:
        // console.log('test')
        // return Object.assign({}, state, { showPut: action.data })
        return null

    case TOGGLE_CHECK:
        // var stock = state.dataTasks.filter(e => {
        //     return e.idTasks === action.id
        // })[0]
        // var stocknot = state.dataTasks.filter(e => {
        //     return e.idTasks !== action.id
        // })
        // var stocks = { idTasks: stock.idTasks, contentTasks: stock.contentTasks, finishTasks: !stock.finishTasks, createAt: stock.createAt }
        // AsyncStorage.setItem('todoNante', JSON.stringify([...stocknot, stocks]))
        // return Object.assign(
        //     {}, state
        //     , { dataTasks: [...stocknot, stocks] }
        // )
        break
    case TASK_NOW:
        // var task_now = state.dataTasks[action.day]
        //     task_now.map(e=>{
        //         if(e.heureDebut)
        //     })
        break
    default:
        return state
    }
}

export default TasksReducers
