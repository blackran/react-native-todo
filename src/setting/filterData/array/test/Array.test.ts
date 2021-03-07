import { moveTo, removeJump, order } from '../Array'

describe('Array', () => {
    it('order', async () => {
        const test = await order(data1, 'rang')
        expect(test).toEqual(data2)
    })

    it('removeJump', async () => {
        const stock = await removeJump(data3)
        expect(stock).toEqual(data2)
    })

    it('moveTo', () => {
        const stock = moveTo(data1, 'rang', 3, 1)
        expect(stock).toEqual(dataMove)
    })
})

const data1 = [
    {
        idTasks: 1,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'blackran',
        rang: 0
    },
    {
        idTasks: 2,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 2
    },
    {
        idTasks: 3,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 1
    },
    {
        idTasks: 4,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 3
    }
]

const dataMove = [
    {
        idTasks: 1,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'blackran',
        rang: 0
    },
    {
        idTasks: 2,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 3
    },
    {
        idTasks: 3,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 2
    },
    {
        idTasks: 4,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 1
    }
]

const data2 = [
    {
        idTasks: 1,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'blackran',
        rang: 0
    },
    {
        idTasks: 3,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 1
    },
    {
        idTasks: 2,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 2
    },
    {
        idTasks: 4,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 3
    }
]

const data3 = [
    {
        idTasks: 1,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'blackran',
        rang: 1
    },
    {
        idTasks: 3,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 3
    },
    {
        idTasks: 2,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 5
    },
    {
        idTasks: 4,
        contentTasks: 'matory',
        durationTasks: 1800000,
        finish: true,
        pseudoUtilisateur: 'admin',
        rang: 10
    }
]
