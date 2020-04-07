import { ADD_ETUDIANT } from '../actions/EtudiantActions'

const initState = {
    dataEtudiant: [
        {
            numEtudiant: 1,
            login: 'blackran',
            pass: 'password',
            access: 1,
            domaine: 'Informatique',
            valNiveau: 10,
            competence: 'react native, sql, java'
        }
    ]
}

const EtudiantReducers = (state = initState, action) => {
    switch (action.type) {
    case ADD_ETUDIANT:
        var stock = [...state.dataEtudiant, action.data]
        return Object.assign({}, state, { dataEtudiant: stock })
    default:
        return state
    }
}

export default EtudiantReducers
