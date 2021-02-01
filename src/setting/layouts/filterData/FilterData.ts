import { order } from './array/Array'

const listJours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
]

interface InterfaceData {
    idTasks: number,
    titleTasks: string,
    contentTasks: string,
    heureDebut: string,
    pseudoUtilisateur: string
}

export function loopObject (copyData: object): object {
    const stockFinish = copyData[listJours[0]] && copyData[listJours[0]].filter(e => {
        const stock = Object.entries(copyData).map(([key, subject]) => {
            const d = subject
            const h = e
            h.idTasks = 0
            const w = d.filter(m => {
                m.idTasks = 0
                return JSON.stringify(m) === JSON.stringify(h)
            })
            return w.length > 0
        })
        return stock.indexOf(false) < 0
    })

    const stockRest = JSON.parse(JSON.stringify(copyData))
    Object.entries(copyData).map(([key, subject]) => {
        let r = subject
        const stock = stockFinish.map(e => {
            r = r.filter(o => {
                const d = o
                d.idTasks = 0
                // console.log('=================================================================================')
                // console.log(d, e)
                return (JSON.stringify(d) !== JSON.stringify(e))
            })
        })

        stockRest[key] = r
        return null
    })
    // console.log(setTrueIdTasks(stockFinish, stockRest))
    return setTrueIdTasks(stockFinish, stockRest)
}

function convertStringNumber (date) {
    const [heure, minute, second] = date.split(':')
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
}

export function InverseLoopObject (data: object) {
    const finish = data.finish
    const rest = data.rest
    const listTasks = {
        Alahady: [],
        Alatsinainy: [],
        Talata: [],
        Alarobia: [],
        Alakamisy: [],
        Zoma: [],
        Sabotsy: []
    }

    const oneDay = 24 * 60 * 60 * 1000

    Object.entries(rest).map((data, i) => {
        // console.log('===============================================================================================')
        // @ts-ignore
        const subject: Array<InterfaceData> = data[1]
        for (let j = 0; j < subject.length; j++) {
            subject[j].idTasks = (oneDay * i) + convertStringNumber(subject[j].heureDebut)
            listTasks[listJours[i]].push(subject[j])
        }

        finish.map(h => {
            h.idTasks = (oneDay * i) + convertStringNumber(h.heureDebut)
        })

        listTasks[listJours[i]].push(...finish)
    })

    Object.entries(listTasks).map((data, i) => {
        let subject: object[] = data[1]
        subject = order(subject, 'idTasks')
    })

    return listTasks
}

export function setTrueIdTasks (finish: Array<InterfaceData>, rest: object) {
    const response: object = { finish: [], rest: [] }

    const stockRest = {
        Alahady: [],
        Alatsinainy: [],
        Talata: [],
        Alarobia: [],
        Alakamisy: [],
        Zoma: [],
        Sabotsy: []
    }

    const oneDay = 24 * 60 * 60 * 1000

    Object.entries(rest).map((data, i) => {
        // console.log('===============================================================================================')
        // @ts-ignore
        const subject: Array<InterfaceData> = data[1]
        for (let j = 0; j < subject.length; j++) {
            subject[j].idTasks = (oneDay * i) + convertStringNumber(subject[j].heureDebut)
            stockRest[listJours[i]].push(subject[j])
        }
    })

    finish.map(h => {
        h.idTasks = (oneDay * 7) + convertStringNumber(h.heureDebut)
    })

    Object.entries(stockRest).map((data, i) => {
        let subject: object[] = data[1]
        subject = order(subject, 'idTasks')
    })

    const stockFinish = order(finish, 'idTasks')
    //
    response.finish = stockFinish
    response.rest = stockRest

    return response
}
