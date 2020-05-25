import { generetatePhrase } from '../Phrase'

describe('test of phrase', () => {
    it.skip('generatePhrase', () => {
        const stock = generetatePhrase(20)
        console.log(stock)
        expect(stock.length).toEqual(20)
    })
})
