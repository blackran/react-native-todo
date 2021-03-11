import { ADD_UTILISATEUR, INIT_UTILISATEUR, PUT_UTILISATEUR } from './actions/UtilisateurActions'

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
  let stock
  switch (action.type) {
  case INIT_UTILISATEUR:
    return Object.assign({}, state, { connecterUtilisateur: action.data })
  case ADD_UTILISATEUR:
    // console.log(Object.assign({}, state, { dataUtilisateur: [...state.dataUtilisateur, action.data] }))
    return Object.assign({}, state, { dataUtilisateur: [...state.dataUtilisateur, action.data], connecterUtilisateur: action.data })
  case PUT_UTILISATEUR:
    console.log('PUT_UTILISATEUR')
    stock = { ...state }
    stock.connecterUtilisateur = action.data
    stock.dataUtilisateur = stock.dataUtilisateur.map(e => {
      if (e.pseudoUtilisateur === action.data.pseudoUtilisateur) {
        return action.data
      }
      return e
    })
    return Object.assign({}, state, stock)
  default:
    return state
  }
}

export default UtilisateurReducers
