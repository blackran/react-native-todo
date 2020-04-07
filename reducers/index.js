import { combineReducers } from 'redux'
import EtudiantReducers from './EtudiantReducers'
import TasksReducers from './TasksReducers'
import AnnonceReducers from './AnnonceReducers'
import AnnonceEtudiantReducers from './AnnonceEtudiantReducers'
import UtilisateurReducers from './UtilisateurReducers'
import OtherReducers from './OtherReducers'

export default combineReducers(
    {
        Tasks: TasksReducers,
        Etudiant: EtudiantReducers,
        Annonce: AnnonceReducers,
        AnnonceEtudiant: AnnonceEtudiantReducers,
        Utilisateur: UtilisateurReducers,
        Other: OtherReducers
    }
)
