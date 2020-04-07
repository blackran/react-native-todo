import { ADD_UTILISATEUR } from '../actions/UtilisateurActions'

const initState = {
    dataUtilisateur: [
        {
            pseudoUtilisateur: 'admin',
            passwordUtilisateur: 'admin'
        },
        {
            pseudoUtilisateur: 'blackran',
            passwordUtilisateur: 'iloveyou'
        }
    ]
}

const UtilisateurReducers = (state = initState, action) => {
    switch (action.type) {
    case ADD_UTILISATEUR:
        var stock = [...state.dataUtilisateur, action.data]
        return Object.assign({}, state, { dataUtilisateur: stock })
    default:
        return state
    }
}

export default UtilisateurReducers
