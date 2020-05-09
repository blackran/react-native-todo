export function convertArrayToString (date: Array<number>): string {
    let heure: string = date[0] + ''
    let minute: string = date[1] + ''
    let second: string = date[2] + ''
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

export function convertStringToArray (date: string): Array<number> {
    let [debut , fin, second] = date.split(':')
    return [parseInt(debut, 10), parseInt(fin, 10), parseInt(second, 10)]
}

export function convertStringNumber (date: string): number {
    const [ heure, minute, second ] = date.split(':')
    return ((parseInt(heure, 10) * 60 * 60 * 1000) + (parseInt(minute, 10) * 60 * 1000) + (parseInt(second, 10) * 1000))
}

export function betweenTwoString (debut: string, fin: string): number {
    if (debut && fin) {
        let stock = convertStringNumber(fin) - convertStringNumber(debut)
        if (stock < 0) {
            return stock + (24 * 60 * 60 * 1000)
        } else {
            return stock
        }
    } else {
        return 0
    }
}

export function convertDateToArray (seconds: number): Array<number> {
    // var minute = second / 60 * 1000
    const heure: number = parseInt((Math.abs(seconds / (60 * 60 * 1000)) + '').split('.')[0], 10)
    const minute: number = Math.abs(Math.round((seconds - (heure * 60 * 60 * 1000)) / (60 * 1000)))
    const second: number = Math.abs(
        seconds - (heure * (60 * 60 * 1000)) - (minute * (60 * 1000))
    )
    return [heure, minute, second]
}

// export function convertDateToString(second: number): string {
//      return convertArrayToString(convertDateToArray(second))
// }

export function betweenTwoDate (begin: Array<number>, end: Array<number>): Array<number> {
    const stock = convertStringNumber(convertArrayToString(end)) - convertStringNumber(convertArrayToString(begin))
    let day = '07'
    if (stock < 0) {
        day = '08'
    }
    const start: number = new Date('1996-07-22T' + convertArrayToString(begin) + ':00').valueOf()
    const finish: number = new Date('1996-' + day + '-22T' + convertArrayToString(end) + ':00').valueOf()
    const between: number = finish - start
    return convertDateToArray(between)
}

export function isBetweenTwoDate (debut: string, fin: string, date: string): boolean {
    const secondDebut = convertStringNumber(debut)
    let secondFin = convertStringNumber(fin)
    const secondDate = convertStringNumber(date)

    if (secondFin < secondDebut) {
         secondFin = secondFin + (24 * 60 * 60 * 1000)
    }

    // if ()

    return (secondDebut < secondDate && secondDate < secondFin)
}
