export function convertArrayToString (date: Array<number>): string {
    var heure: string = date[0] + ''
    var minute: string = date[1] + ''
    if(date[0]<10) {
        heure = '0'+ date[0]
    }

    if(date[1]<10) {
        minute = '0'+ date[1]
    }

    return heure+ ':' +minute
}

export function convertStringToArray (date: string): Array<number> {
    const stock = date.split(':')
    return [parseInt(stock[0]), parseInt(stock[1])]
}

export function convertStringNumber(date:string): number {
    const [ heure, minute ]  = date.split(':')
    return (( parseInt(heure) * 60 * 60 * 1000  ) + ( parseInt(minute) * 60 * 1000  ) )
}

export function betweenTwoString(debut: string, fin: string): number {
    if(debut && fin){
        var stock = convertStringNumber(fin) - convertStringNumber(debut)
        if(stock < 0) {
            return stock + (24 * 60 * 60 * 1000)
        } else {
            return stock
        }
    } else {
        return 0
    }
}

export function convertDateToArray (second: number): Array<number> {
    // var minute = second / 60 * 1000
    var heure: number = parseInt((Math.abs(second / (60 * 60 * 1000)) + '').split('.')[0])
    var minute: number = Math.abs(Math.round((second - ( heure * 60 * 60 * 1000 ))/ (60 * 1000)))
    return [heure, minute]
}

// export function convertDateToString(second: number): string {
//      return convertArrayToString(convertDateToArray(second))
// }

export function betweenTwoDate (begin: Array<number>, end: Array<number>): Array<number> {
    var stock = convertStringNumber(convertArrayToString(end)) - convertStringNumber(convertArrayToString(begin))
    var day = '07'
    if (stock < 0) {
        day = '08'
    }
    var start: number = new Date('1996-07-22T' + convertArrayToString(begin) + ':00').valueOf()
    var finish: number = new Date('1996-'+day+'-22T'+ convertArrayToString(end) +':00').valueOf()
    var between: number = finish - start
    return convertDateToArray(between)
}

export function  isBetweenTwoDate(debut :string, fin: string, date: string): boolean {
    var secondDebut = convertStringNumber(debut)
    var secondFin = convertStringNumber(fin)
    var secondDate = convertStringNumber(date)

    if (secondFin < secondDebut) {
         secondFin = secondFin + (24 * 60 * 60 * 1000)
    }

    // if ()

    return (secondDebut< secondDate && secondDate < secondFin)
}


