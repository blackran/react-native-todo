export function convertArrayToString (date) {
  let heure = date[0] + ''
  let minute = date[1] + ''
  let second = date[2] + ''
  if (date[0] < 10) {
    heure = '0' + date[0]
  }

  if (date[1] < 10) {
    minute = '0' + date[1]
  }

  if (date[2] < 10) {
    second = '0' + date[2]
  }

  return heure + ':' + minute + ':' + second
}

export function isBetweenTwoNumber (debut, fin, numb) {
  if ((debut <= numb && numb <= fin) && debut && fin && numb) {
    return true
  }
  if ((debut > fin) && (debut < numb)) {
    return true
  }
  return false
}

export function convertStringToArray (date) {
  const [debut, fin, second] = date.split(':')
  return [parseInt(debut, 10), parseInt(fin, 10), parseInt(second, 10)]
}

export function convertStringNumber (date) {
  const [heure, minute, second] = date.split(':')
  return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
}

export function betweenTwoString (debut, fin) {
  if (debut && fin) {
    const stock = convertStringNumber(fin) - convertStringNumber(debut)
    if (stock < 0) {
      return stock + (24 * 60 * 60 * 1000)
    } else {
      return stock
    }
  } else {
    return 0
  }
}

export function convertDateToArray (seconds) {
  // var minute = second / 60 * 1000
  const heure = parseInt((Math.abs(seconds / (60 * 60 * 1000)) + '').split('.')[0], 10)
  const minute = Math.abs(Math.round((seconds - (heure * 60 * 60 * 1000)) / (60 * 1000)))
  const second = Math.abs(
    seconds - (heure * (60 * 60 * 1000)) - (minute * (60 * 1000))
  ) / 1000
  return [heure, minute, second]
}

// export function convertDateToString(second: number): string {
//      return convertArrayToString(convertDateToArray(second))
// }

// [0, 5, 10, 'Alatsinainy']
export function betweenTwoDate (begin, end) {
  const jours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
  ]

  const [beginD, beginH] = begin
  const [endD, endH] = end

  let betweenDay = (jours.indexOf(endD) - jours.indexOf(beginD))

  const start = new Date('1996-07-22T' + beginH)
  const finish = new Date('1996-07-22T' + endH)
  const between = finish - start

  // if (between < 0) {
  //   between += (12 * 60 * 60 * 1000)
  // }

  if (betweenDay < 0) {
    betweenDay += 7
  }

  // console.log({ beginH, endH, between, betweenDay: (betweenDay * (24 * 60 * 60 * 1000)) })

  return between + (betweenDay * (24 * 60 * 60 * 1000))
}

export function isBetweenTwoDate (debut, fin, date) {
  const secondDebut = convertStringNumber(debut)
  let secondFin = convertStringNumber(fin)
  const secondDate = convertStringNumber(date)

  if (secondFin <= secondDebut) {
    secondFin = secondFin + (24 * 60 * 60 * 1000)
  }

  return (secondDebut < secondDate && secondDate < secondFin)
}
