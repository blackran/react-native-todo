import { ADD_ANNONCE } from '../actions/AnnonceActions'

const initState = {
    dataAnnonce: [
        {
            numAnnonce: 1,
            post: 'Assistant juridique',
            desc: 'Une société chèrche un assistant juridique, maitrisant le droit publique.',
            competence: 'droit des affaires, droit penale',
            mail: '',
            dateAnnonce: '20 juillet',
            type: 'Offre d',
            class: 1,
            niveau: 'M1',
            domaine: 'juridique',
            valNiveau: 4
        }
    ]
}

const AnnonceReducers = (state = initState, action) => {
    switch (action.type) {
    case ADD_ANNONCE:
        var stock = [...state.dataAnnonce, action.data]
        return Object.assign({}, state, { dataAnnonce: stock })
    default:
        return state
    }
}

export default AnnonceReducers
