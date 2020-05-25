import { loopObject } from '../FilterData'
import Task from '../../../../../reducers/data/Task'

describe('FilterData', () => {
    it.skip('loopObject', () => {
        const stock = loopObject(Task())
        console.log(stock['rest'])
    })
})
