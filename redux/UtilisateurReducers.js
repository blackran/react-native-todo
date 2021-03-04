import { ADD_UTILISATEUR, INIT_UTILISATEUR } from './actions/UtilisateurActions'

const initState = {
    dataUtilisateur: [
        // {
        //     pseudoUtilisateur: 'blackran',
        //     imageUtilisateur: '',
        //     passwordUtilisateur: 'password'
        // }
    ],
    connecterUtilisateur: {}
}

const UtilisateurReducers = (state = initState, action) => {
    switch (action.type) {
    case INIT_UTILISATEUR:
        return Object.assign({}, state, { connecterUtilisateur: action.data })
    case ADD_UTILISATEUR:
        // console.log(Object.assign({}, state, { dataUtilisateur: [...state.dataUtilisateur, action.data] }))
        return Object.assign({}, state, { dataUtilisateur: [...state.dataUtilisateur, action.data] })
    default:
        return state
    }
}

export default UtilisateurReducers
