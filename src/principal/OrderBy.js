// import React, { Component } from 'react'
// import { View, Text } from 'react-native'
//
// class OrderBy extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             data: [
//                 {
//                     id: 1,
//                     content: 'nantenaina'
//                 },
//                 {
//                     id: 3,
//                     content: 'finiavana'
//                 },
//                 {
//                     id: 4,
//                     content: 'ravaka'
//                 },
//                 {
//                     id: 2,
//                     content: 'sitraka'
//                 }
//             ]
//         }
//     }
//
//
//     render () {
//         this.order(this.state.data, 'id')
//         return (
//             <View>
//
//                 {
//                     this.order(this.state.data, 'id').map(e => {
//                         return <Text key={e.id} style={{ color: 'white' }}>{ e.content }</Text>
//                     })
//                 }
//
//             </View>
//         )
//     }
// }
//
// export default OrderBy

export default function order (data, column) {
    var copy = data.map(value => {
        return value[column]
    }).sort()

    var newData = []

    for (var i = 0; i < copy.length; i++) {
        for (var j = 0; j < copy.length; j++) {
            if (data[j][column] === copy[i]) {
                newData.push(data[j])
            }
        }
    }

    return newData
}
