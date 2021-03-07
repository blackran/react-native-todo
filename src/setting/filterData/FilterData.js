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

export function loopObject (copyData) {
  const stockFinish = copyData[listJours[0]] && copyData[listJours[0]].filter(e => {
    const stock = Object.entries(copyData).map(([key, subject]) => {
      const d = subject
      const h = e
      h.idTasks = 0
      h.day = ''
      const w = d.filter(m => {
        m.idTasks = 0
        m.day = ''
        return JSON.stringify(m) === JSON.stringify(h)
      })
      return w.length > 0
    })
    return stock.indexOf(false) < 0
  })

  const stockRest = JSON.parse(JSON.stringify(copyData))
  Object.entries(copyData).map(([key, subject]) => {
    let r = subject
    stockFinish.map(e => {
      r = r.filter(o => {
        const d = o
        d.idTasks = 0
        d.day = ''
        // console.log('=================================================================================')
        // console.log(d, e)
        return (JSON.stringify(d) !== JSON.stringify(e))
      })
      return null
    })

    stockRest[key] = r
    return null
  })
  return setTrueIdTasks(stockFinish, stockRest)
}

function convertStringNumber (date) {
  const [heure, minute, second] = date.split(':')
  return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
}

export function InverseLoopObject (data) {
  const finish = data.finish
  const rest = data.rest
  let listTasks = []

  const oneDay = 24 * 60 * 60 * 1000

  Object.entries(rest).map(([key, subjects], i) => {
    // console.log('===============================================================================================')
    // @ts-ignore
    subjects.map(subject => {
      subject.idTasks = (oneDay * i) + convertStringNumber(subject.heureDebut)
      subject.day = listJours[i]
      subject.type = 'kirairay'
      listTasks = [...listTasks, subject]
      return null
    })
    return null
  })

  let newFinish = []
  finish.map(h => {
    listJours.map((k, i) => {
      h.idTasks = (oneDay * i) + convertStringNumber(h.heureDebut)
      h.day = k
      h.type = 'miverimberina'
      newFinish = [...newFinish, JSON.parse(JSON.stringify(h))]
      return null
    })
    return null
  })

  listTasks = [...JSON.parse(JSON.stringify(listTasks)), ...newFinish]
  // console.log({ listTasks })
  // Object.entries(listTasks).map((data, i) => {
  //     let subject = data[1]
  //     subject = order(subject, 'idTasks')
  // })

  return listTasks
}

export function setTrueIdTasks (finish, rest) {
  const response = { finish: [], rest: [] }

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
    const subject = data[1]
    const su = subject.map((sub) => {
      sub.idTasks = (oneDay * i) + convertStringNumber(sub.heureDebut)
      return sub
    })
    stockRest[data[0]] = [...stockRest[data[0]], ...su]
    return null
  })

  const newFinish = finish.map(h => {
    h.idTasks = (oneDay * 7) + convertStringNumber(h.heureDebut)
    return h
  })

  // Object.entries(stockRest).map((data, i) => {
  //     const subject = order(data[1], 'idTasks')
  // })

  const stockFinish = order(newFinish, 'idTasks')
  //
  response.finish = stockFinish
  response.rest = stockRest

  return response
}
