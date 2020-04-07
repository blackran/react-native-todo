import { ADD_TASKS, REMOVE_TASKS, TOGGLE_CHECK, INIT_DATA_TASKS, CHANGE_SHOW_EDIT, CHANGE_SHOW_PUT } from '../actions/TasksActions'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'

const initState = {
    dataTasks: [
        {
            idTasks: 1,
            contentTasks: 'matory',
            durationTasks: 1800000,
            finish: true,
            pseudoUtilisateur: 'blackran',
            dayTasks: 5
        },
        {
            idTasks: 2,
            contentTasks: 'matory',
            durationTasks: 1800000,
            finish: true,
            pseudoUtilisateur: 'admin',
            dayTasks: 5
        },
        {
            idTasks: 3,
            contentTasks: 'matory',
            durationTasks: 1800000,
            finish: false,
            pseudoUtilisateur: 'admin',
            dayTasks: 5
        },
        {
            idTasks: 4,
            contentTasks: 'matory',
            durationTasks: 10000,
            finish: false,
            pseudoUtilisateur: 'blackran',
            dayTasks: 6
        },
        {
            idTasks: 5,
            contentTasks: 'matory',
            durationTasks: 10000,
            finish: false,
            pseudoUtilisateur: 'blackran',
            dayTasks: 6
        },
        {
            idTasks: 6,
            contentTasks: 'matory',
            durationTasks: 10000,
            finish: false,
            pseudoUtilisateur: 'blackran',
            dayTasks: 6
        }
    ],
    showEdit: false,
    length: 0,
    showPut: false
}

const TasksReducers = (state = initState, action) => {
    state.length = state.dataTasks.filter(e => { return e.finishTasks === true }).length
    switch (action.type) {
    case ADD_TASKS:
        var stock = [
            ...state.dataTasks,
            {
                idTasks: shortid.generate(),
                contentTasks: action.data,
                finishTasks: false,
                createAt: Date.now()
            }
        ]
        AsyncStorage.setItem('todoNante', JSON.stringify(stock))
        return Object.assign(
            {}, state
            , { dataTasks: stock }
        )
    case INIT_DATA_TASKS:
        state.dataTasks = []

        // AsyncStorage.removeItem('todoNante')
        return Object.assign(
            {}, state
            , { dataTasks: action.data }
        )
    case REMOVE_TASKS:
        var stock = state.dataTasks.filter(e => {
            return e.finishTasks !== true
        })
        AsyncStorage.setItem('todoNante', JSON.stringify(stock))
        return Object.assign({}, state, { dataTasks: stock })
    case CHANGE_SHOW_EDIT:
        return Object.assign({}, state, { showEdit: action.data })

    case CHANGE_SHOW_PUT:
        console.log('test')
        return Object.assign({}, state, { showPut: action.data })

    case TOGGLE_CHECK:
        var stock = state.dataTasks.filter(e => {
            return e.idTasks === action.id
        })[0]
        var stocknot = state.dataTasks.filter(e => {
            return e.idTasks !== action.id
        })
        var stocks = { idTasks: stock.idTasks, contentTasks: stock.contentTasks, finishTasks: !stock.finishTasks, createAt: stock.createAt }
        AsyncStorage.setItem('todoNante', JSON.stringify([...stocknot, stocks]))
        return Object.assign(
            {}, state
            , { dataTasks: [...stocknot, stocks] }
        )
    default:
        return state
    }
}

export default TasksReducers
