import { order } from './array/Array'
function convertStringNumber (date) {
    const [heure, minute, second] = date.split(':')
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
}

export default function Tasks () {
    const listTasks = {
        Alahady: [],
        Alatsinainy: [],
        Talata: [],
        Alarobia: [],
        Alakamisy: [],
        Zoma: [],
        Sabotsy: []
    }

    const listJours = [
        'Alahady',
        'Alatsinainy',
        'Talata',
        'Alarobia',
        'Alakamisy',
        'Zoma',
        'Sabotsy'
    ]

    const oneDay = 24 * 60 * 60

    for (let i = 0; i < listJours.length; i++) {
        for (let j = 0; j < 5; j++) {
            const stock = {
                idTasks: (oneDay * i) + convertStringNumber('0' + j + ':00:00'),
                contentTasks: 'task' + i + j,
                heureDebut: '0' + j + ':00:00',
                pseudoUtilisateur: 'blackran',
                rang: j
            }
            listTasks[listJours[i]].push(stock)
        }

        const standartTask = [
            {
                idTasks: (oneDay * i) + convertStringNumber('22:00:00'),
                contentTasks: 'matory',
                heureDebut: '22:00:00',
                pseudoUtilisateur: 'blackran',
                rang: 0
            },
            {
                idTasks: (oneDay * i) + convertStringNumber('06:00:00'),
                contentTasks: 'sakafo maraina',
                heureDebut: '06:00:00',
                pseudoUtilisateur: 'blackran',
                rang: 0
            },
            {
                idTasks: (oneDay * i) + convertStringNumber('12:00:00'),
                contentTasks: 'sakafo atoandro',
                heureDebut: '12:00:00',
                pseudoUtilisateur: 'blackran',
                rang: 0
            },
            {
                idTasks: (oneDay * i) + convertStringNumber('19:00:00'),
                contentTasks: 'sakafo hariva',
                heureDebut: '19:00:00',
                pseudoUtilisateur: 'blackran',
                rang: 0
            }
        ]

        listTasks[listJours[i]].push(...standartTask)
    }

    for (let i = 0; i < listJours.length; i++) {
        listTasks[listJours[i]] = order(listTasks[listJours[i]], 'idTasks')
    }

    return listTasks
}
