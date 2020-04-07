import { ADD_ANNONCE_ETUDIANT } from '../actions/AnnonceEtudiantActions'

const initState = {
    dataAnnonceEtudiant: [
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

const AnnonceEtudiantReducers = (state = initState, action) => {
    switch (action.type) {
    case ADD_ANNONCE_ETUDIANT:
        var stock = [...state.dataAnnonceEtudiant, action.data]
        return Object.assign({}, state, { dataAnnonceEtudiant: stock })
    default:
        return state
    }
}

export default AnnonceEtudiantReducers
