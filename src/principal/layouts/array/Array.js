export function removeJump (data) {
  let loop = true
  while (loop) {
    loop = false
    for (let i = 0; i < data.length; i++) {
      if (data[i].rang !== i) {
        data[i].rang = i
        loop = true
      }
    }
  }
  return data
}

export function moveTo (data, column, value, to) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][column] === value) {
      data[i][column] = to
    } else if (data[i][column] >= to) {
      data[i][column] = data[i][column] + 1
    }
  }
  return data
}

export function order (data, column) {
  const copy = data.map(value => {
    return value[column]
  }).sort(function (a, b) {
    return a - b
  })

  const newData = []

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length; j++) {
      if (data[j][column] === copy[i]) {
        newData.push(data[j])
      }
    }
  }

  return newData
}
