import {
  ADD_MEMO,
  SET_OFF_MEMO
} from './actions/MemoActions'

const initState = {
  dataMemo: [
    // {
    //     pseudoUtilisateur: 'blackran',
    //     imageUtilisateur: '',
    //     passwordUtilisateur: 'password'
    // }
  ],
  lastUtilisateur: {}
}

const Reducers = (state = initState, action) => {
  let stock
  let isExist
  switch (action.type) {
  case ADD_MEMO:
    stock = state.dataMemo
    isExist = state.dataMemo.find((e) => {
      return e.pseudoUtilisateur === action.data.pseudoUtilisateur
    })
    if (!isExist) {
      stock = [...state.dataMemo, action.data]
    }
    return Object.assign({}, state, { dataMemo: stock, lastUtilisateur: action.data })
  case SET_OFF_MEMO:
    stock = state.dataMemo.filter(e => e.pseudoUtilisateur !== action.data.pseudoUtilisateur)
    return Object.assign({}, state, { dataMemo: stock, lastUtilisateur: {} })
  default:
    return state
  }
}

export default Reducers
