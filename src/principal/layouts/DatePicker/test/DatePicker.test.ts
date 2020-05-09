import {
    convertArrayToString,
    convertStringToArray,
    convertDateToArray,
    betweenTwoDate,
    betweenTwoString,
    convertStringNumber,
    isBetweenTwoDate
} from '../DatePicker'

test('convert', () => {
    const begin = [7, 1]
    const stock = convertArrayToString(begin)
    expect(stock).toEqual('07:01')
})

describe('DatePicker', () => {
    it('convertArrayToString', () => {
        const begin = [7, 1]
        const stock = convertArrayToString(begin)
        expect(stock).toEqual('07:01')
    })

    it('convertStringToArray', () => {
        const begin = '09:31'
        const stock = convertStringToArray(begin)
        expect(stock).toEqual([9, 31])
    })

    it.skip('convertDateToArray', () => {
        const begin = 900000
        const stock = convertDateToArray(begin)
        expect(stock).toEqual([3, 15])
    })

    it.skip('betweenTwoDate', () => {
        const begin = [7, 0]
        const end = [9, 30]
        const stock = betweenTwoDate(begin, end)
        expect(stock).toEqual([2, 30])
    })

    it.skip('betweenTwoString', () => {
        const begin1 = '23:00'
        const end1 = '01:00'
        let stock2 = (convertStringNumber(end1) - convertStringNumber(begin1))
        console.log(stock2)
        console.log(stock2 + (24 * 60 * 60 * 1000))
        const stock1 = betweenTwoString(begin1, end1)
        expect(stock1).toEqual(7200000)
    })

    it('isBetweenTwoDate', () => {
        const begin2 = '09:00'
        const end2 = '11:00'
        const begin3 = '22:00'
        const end3 = '01:00'
        const date1 = '10:00'
        const date2 = '11:01'
        const date3 = '23:00'
        expect(isBetweenTwoDate(begin2, end2, date1)).toEqual(true)
        expect(isBetweenTwoDate(begin2, end2, date2)).toEqual(false)
        expect(isBetweenTwoDate(begin3, end3, date3)).toEqual(true)
    })
})
