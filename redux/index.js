import { combineReducers } from 'redux'
import TasksReducers from './TasksReducers'
import UtilisateurReducers from './UtilisateurReducers'
import ColorReducers from './ColorReducers'
import AlertReducers from './AlertReducers'

export default combineReducers(
  {
    Tasks: TasksReducers,
    Utilisateur: UtilisateurReducers,
    Color: ColorReducers,
    Alert: AlertReducers
  }
)
