import { ADD_UTILISATEUR } from '../actions/UtilisateurActions'

const initState = {
    dataUtilisateur: {}
}

const UtilisateurReducers = (state = initState, action) => {
    switch (action.type) {
    case ADD_UTILISATEUR:
        return Object.assign({}, state, { dataUtilisateur: action.data })
    default:
        return state
    }
}

export default UtilisateurReducers
