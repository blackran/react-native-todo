import { CHANGE_IS_AUTH } from '../actions/OtherActions'

const initState = {
    // ip_add: 'http://10.42.0.1/myprojects/hayzara/'
    ip_add: 'http://192.168.137.1/myprojects/hayzara/'
}

const CategoriesReducers = (state = initState, action) => {
    switch (action.type) {
    case CHANGE_IS_AUTH:
        return Object.assign({}, state, state.isAuth)
    default:
        return state
    }
}

export default CategoriesReducers
