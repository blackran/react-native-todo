import { convertStringNumber, isBetweenTwoNumber } from '../../src/principal/layouts/DatePicker/DatePicker'

export default function def () {
  return 'hello'
}

export function order (data, column) {
  if (data) {
    return data.map(value => {
      return value
    }).sort(function (a, b) {
      return a[column] - b[column]
    })
  }
  return []
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

export function dateDAF ({ dataTask, idTaskActive }, active) {
  const newDataTask = order(dataTask, 'idTasks')
  const oneDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const datenow = (oneDay * now.getDay()) +
      convertStringNumber(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds())
  let response = []

  if (newDataTask) {
    let indexActive = null
    for (let i = 0; i < newDataTask.length; i++) {
      let debut = newDataTask[i]
      let fin = newDataTask[i + 1]
      if (debut) {
        debut = newDataTask[i].idTasks
      }
      if (fin) {
        fin = newDataTask[i + 1].idTasks
      } else {
        fin = newDataTask[0].idTasks
      }
      if (isBetweenTwoNumber(debut, fin, datenow) || newDataTask.length === 1) {
        active = newDataTask[i].idTasks
        indexActive = i
      }
    }
    idTaskActive = active
    const activeTask = newDataTask[indexActive]
    let nextActive = newDataTask[indexActive + 1]
    if (!nextActive) {
      nextActive = newDataTask[0]
    }

    if (activeTask && nextActive) {
      response = [activeTask.heureDebut, nextActive.heureDebut]
    }
  }
  // console.log({ dataTask, active })
  return [response, active]
}
