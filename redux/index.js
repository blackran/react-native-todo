import { combineReducers } from 'redux'
import TasksReducers from './TasksReducers'
import UtilisateurReducers from './UtilisateurReducers'
import ColorReducers from './ColorReducers'

export default combineReducers(
    {
        Tasks: TasksReducers,
        Utilisateur: UtilisateurReducers,
        Color: ColorReducers
    }
)
