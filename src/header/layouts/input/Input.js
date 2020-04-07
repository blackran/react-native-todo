import React, { Component } from 'react'
import {TextInput, StyleSheet, View, Keyboard, Alert, Text} from 'react-native'
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { connect } from "react-redux";
import {ADD_TASKS} from "../../../../actions/TasksActions";

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            maxLength: 20,
            edit: false
        }
    }

    addTask () {
        if( this.state.value.length !== 0){
            Keyboard.dismiss()
            this.props.changeShowEdit(false)
            this.props.addTasks(this.state.value)
        }
    }

    annullerTask () {
        Keyboard.dismiss()
        this.props.changeShowEdit(false)
    }

    OnChange (text) {
        if(this.state.value.length <= this.state.maxLength){
            this.setState({ value: text })
        }
    }

    filterEdit() {
        return this.state.edit ?
            <View>
            <Text>{ this.state.value.length } /{ this.state.maxLength }</Text>
            <View>
                <TextInput
                    placeholder='enter our tasks'
                    onChangeText={this.OnChange.bind(this)}
                    maxLength={this.state.maxLength}
                    onKeyUp={(e) => {
                        if (e.nativeEvent.key === 'Backspace') {
                            // Return if duration between previous key press and backspace is less than 20ms
                            if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) <= 20) return;
                            this.setState({value: this.state.value.pop()})

                        } else {
                            // Record non-backspace key event time stamp
                            this.lastKeyEventTimestamp = e.timeStamp;
                        }
                    }}
                    style={styles.textinput}/>
                <View style={styles.buttonsInput}>
                    <View style={styles.buttonInput}>
                        <Button
                            icon={
                                <Icon
                                    name='cancel'
                                    size={25}
                                    type='MaterialIcons'
                                    color="white"
                                />
                            }
                            buttonStyle={{ backgroundColor: 'red' }}
                            onPress={this.annullerTask.bind(this)}
                            title=" Annuler"
                        />
                    </View>
                    <View style={styles.buttonInput}>
                        <Button
                            icon={
                                <Icon
                                    name='save'
                                    size={25}
                                    type='entypo'
                                    color="white"
                                />
                            }
                            onPress={this.addTask.bind(this)}
                            title=" Enregistrer"
                        />
                    </View>
                </View>
            </View>
        </View>

        :<View>
            <Text>{ this.state.value.length } /{ this.state.maxLength }</Text>
            <View>
                <TextInput
                    placeholder='enter our tasks'
                    onChangeText={this.OnChange.bind(this)}
                    maxLength={this.state.maxLength}
                    onKeyUp={(e) => {
                        if (e.nativeEvent.key === 'Backspace') {
                            // Return if duration between previous key press and backspace is less than 20ms
                            if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) <= 20) return;
                            this.setState({value: this.state.value.pop()})

                        } else {
                            // Record non-backspace key event time stamp
                            this.lastKeyEventTimestamp = e.timeStamp;
                        }
                    }}
                    style={styles.textinput}/>
                <View style={styles.buttonsInput}>
                    <View style={styles.buttonInput}>
                        <Button
                            icon={
                                <Icon
                                    name='cancel'
                                    size={25}
                                    type='MaterialIcons'
                                    color="white"
                                />
                            }
                            buttonStyle={{ backgroundColor: 'red' }}
                            onPress={this.annullerTask.bind(this)}
                            title=" Annuler"
                        />
                    </View>
                    <View style={styles.buttonInput}>
                        <Button
                            icon={
                                <Icon
                                    name='save'
                                    size={25}
                                    type='entypo'
                                    color="white"
                                />
                            }
                            onPress={this.addTask.bind(this)}
                            title=" Enregistrer"
                        />
                    </View>
                </View>
            </View>
        </View>
    }



    render () {
        return (
            <View style={{ height: 120, marginBottom: 5 }}>
                {
                    this.filterEdit()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 5,
        fontSize: 25,
        marginBottom: 3
    },
    button: {
        margin: '3px 0'
    },
    add: {
        width: 30,
        height: 30,
        fontSize: 40
    },
    buttonsInput: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonInput: {
         flex: 1,
        height: 50,
        padding: 5
    }
})


const mapStateToProps = state => {
    return {  tasks: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks: (data) => {
            dispatch({ type: 'ADD_TASKS', data })
        },
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
