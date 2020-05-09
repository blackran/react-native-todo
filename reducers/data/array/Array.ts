export function removeJump(data: Array<object>): Array<object> {
    var loop = true
    while (loop) {
        loop = false
        for(var i = 0; i<data.length; i++){
            if(data[i]['rang'] !== i){
                data[i]['rang'] = i
                loop = true
            }
        }
    }
    return data
}

export function moveTo(data: Array<object>, column: string, value:number, to: number): Array<object> {
    for(var i = 0; i< data.length; i++) {
        if(data[i][column] === value){
            data[i][column] = to
        } else if (data[i][column] >= to) {
            data[i][column] = data[i][column] + 1
        }
    }
   return data
}

export function order (data, column): Array<object> {
    let copy = data.map(value => {
        return value[column]
    }).sort(function (a, b) {
        return a - b
    })

    let newData = []

    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length; j++) {
            if (data[j][column] === copy[i]) {
                newData.push(data[j])
            }
        }
    }

    return newData
}



