import { ADD_TASKS, REMOVE_TASKS, TOGGLE_CHECK, INIT_DATA_TASKS, CHANGE_SHOW_EDIT, CHANGE_SHOW_PUT, TASK_NOW } from '../actions/TasksActions'
// import shortid from 'shortid'
// import AsyncStorage from '@react-native-community/async-storage'
import { isBetweenTwoDate, convertArrayToString } from '../src/principal/layouts/DatePicker/DatePicker.ts'

const initState = {
    dataTasks: {
        Alahady: [
            {
                idTasks: 1,
                contentTasks: 'alahady',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Alatsinainy: [
            {
                idTasks: 1,
                contentTasks: 'alatsinainy',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Talata: [
            {
                idTasks: 1,
                contentTasks: 'talata',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Alarobia: [
            {
                idTasks: 1,
                contentTasks: 'alarabia',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Alakamisy: [
            {
                idTasks: 1,
                contentTasks: 'alakamisy',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Zoma: [
            {
                idTasks: 1,
                contentTasks: 'zoma',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            }
        ],
        Sabotsy: [
            {
                idTasks: 1,
                contentTasks: 'sabotsy',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '07:00',
                heureFin: '07:30',
                pseudoUtilisateur: 'blackran',
                rang: 1
            },
            {
                idTasks: 2,
                contentTasks: 'matory',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '09:00',
                heureFin: '10:30',
                pseudoUtilisateur: 'admin',
                rang: 2
            },
            {
                idTasks: 3,
                contentTasks: 'misakafo',
                durationTasks: 1800000,
                finish: true,
                heureDebut: '10:30',
                heureFin: '11:30',
                pseudoUtilisateur: 'admin',
                rang: 3
            }
        ]
    },
    showEdit: false,
    length: 0,
    showPut: false,
    idTaskActive: 2,
    dateDebutAndFin: []
}

function dateDAF (state, active) {
    var datenow = convertArrayToString([new Date().getHours(), new Date().getMinutes()])
    var response = []
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
        console.log(jour)
        active = 0

        for (var i = 0; i < state.dataTasks[jour].length; i++) {
            // console.log('=======================================')
            // console.log('i', i)
            var debut = state.dataTasks[jour][i].heureDebut
            var fin = null
            if (i === state.dataTasks[jour].length - 1) {
                fin = state.dataTasks[listJours[new Date().getDay() + 1]][0].heureDebut
            } else {
                fin = state.dataTasks[jour][i + 1].heureDebut
            }
            // console.log(debut, fin, datenow)
            if (isBetweenTwoDate(debut, fin, datenow)) {
                active = state.dataTasks[jour][i].idTasks
            }
        }

        active = 2

        var activeTask = state.dataTasks[jour].filter(value => {
            return value.idTasks === (active)
        })
        var nextActive = state.dataTasks[jour].filter(value => {
            return value.idTasks === (active + 1)
        })

        if (nextActive.length === 0) {
            var nameDay = listJours[new Date().getDay() + 1]
            nextActive = state.dataTasks[nameDay]
        }

        if (activeTask.length !== 0 && nextActive.length !== 0) {
            response = [activeTask[0].heureDebut, nextActive[0].heureDebut]
        }
    }
    return response
}

const TasksReducers = (state = initState, action) => {
    // state.length = state.dataTasks.filter(e => { return e.finishTasks === true }).length
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
        if (state) {
            return Object.assign({}, state, { dateDebutAndFin: dateDAF(state, state.idTaskActive) })
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
        return null
    case TASK_NOW:
        // var task_now = state.dataTasks[action.day]
        //     task_now.map(e=>{
        //         if(e.heureDebut)
        //     })

    default:
        return state
    }
}

export default TasksReducers
