function getRandomArbitrary (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

export function generetatePhrase (len: number): string {
    const maxWordLen = 5
    let response = ''
    const codeAscii = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y' , 'z']
    let j = 0
    let k = getRandomArbitrary(1, maxWordLen - 1)
    for (let i = 0; i < len; i++) {
        if (j > k) {
            response += ' '
            j = 0
            k = getRandomArbitrary(1, maxWordLen)
        } else {
            response += codeAscii[getRandomArbitrary(0, codeAscii.length - 1)]
            j++
        }
    }
    return response
}
