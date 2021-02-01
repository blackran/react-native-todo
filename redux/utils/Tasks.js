import { convertStringNumber } from '../../src/principal/layouts/DatePicker/DatePicker'

export default function def () {
    return 'hello'
}

export function isBetweenTwoNumber (debut, fin, numb) {
    return (debut <= numb && numb <= fin) && debut && fin && numb
}

export const listJours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
]

export function dateDAF (state, active) {
    const oneDay = 24 * 60 * 60 * 1000
    const now = new Date()
    const datenow = (oneDay * now.getDay()) + convertStringNumber(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())
    let response = []
    if (state.dataTask.length > 0) {
        let jourPrev = null
        if (now.getDay() !== 0) {
            jourPrev = listJours[now.getDay() - 1]
        } else {
            jourPrev = listJours[listJours.length - 1]
        }
        const jourNow = listJours[now.getDay()]

        let jourNext = null
        if (now.getDay() !== listJours.length - 1) {
            jourNext = listJours[0]
        } else {
            jourNext = listJours[now.getDay() + 1]
        }
        active = 0

        const dataLastPrev = state.dataTask[jourPrev][state.dataTask[jourPrev].length - 1]
        const dataPrevNext = state.dataTask[jourNext][0]
        const newStock = [dataLastPrev, ...state.dataTask[jourNow], dataPrevNext]
        // console.log(newStock)

        for (let i = 0; i < newStock.length; i++) {
            let debut = newStock[i]
            if (debut) {
                debut = debut.idTasks
            }
            let fin = newStock[i + 1]
            if (fin) {
                fin = fin.idTasks
            }
            // console.log(debut, fin, datenow, isBetweenTwoNumber(debut, fin, datenow))

            // if (i === 0) {
            //     debut = state.dataTask[jourPrev].idTasks
            //     fin = state.dataTask[jourNow].idTasks
            //     if (i === state.dataTask[jourNow].length - 1) {
            //         debut = state.dataTask[jourNow][i].idTasks
            //         fin = state.dataTask[jourNext][0].idTasks
            //     }
            // } else {
            //     debut = state.dataTask[jourNow][i].idTasks
            //     fin = state.dataTask[jourNow][i + 1].idTasks
            // }
            if (isBetweenTwoNumber(debut, fin, datenow)) {
                active = newStock[i].idTasks
            }
        }
        state.idTaskActive = active
        const activeTask = state.dataTask[jourNow].filter(value => {
            return value.idTasks === (active)
        })
        let nextActive = state.dataTask[jourNow].filter(value => {
            return value.idTasks === (active + 1)
        })

        if (nextActive === undefined) {
            const nameDay = listJours[new Date().getDay() + 1]
            nextActive = state.dataTask[nameDay]
        }

        if (activeTask.length !== 0 && nextActive.length !== 0) {
            response = [activeTask[0].heureDebut, nextActive[0].heureDebut]
        }
    }
    return [response, active]
}
