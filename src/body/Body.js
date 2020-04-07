import React, {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { CheckBox, Icon, ButtonGroup } from 'react-native-elements'
import {ScrollView, StyleSheet, View, Alert} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            selectedIndex: 0
        }
    }

    OnCheck (id) {
        this.props.toggleChech(id)
    }

    componentDidMount () {
        this.getData()
    }

    getData = async () => {
        var todo = await AsyncStorage.getItem('todoNante')
        if(todo !== null){
            console.log(JSON.parse(todo))
            this.props.initData(JSON.parse(todo))
        }
    }

    sortByDate () {
        return this.props.tasks.dataTasks.sort((a, b) => {
            return new Date(a.createAt) - new Date(b.createAt);
        });
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        this.filterData()
    }

    filterData () {
        var response = []
        var stock = this.props.tasks.dataTasks
        switch (this.state.selectedIndex) {
            case 0:
                return stock
            case 1:
                return stock.filter(e=>{
                    return e.finishTasks === true
                })
            case 2:
                return stock.filter(e=>{
                    return e.finishTasks === false
                })
            default:
                return stock
        }
    }

    deleteTask () {
        Alert.alert(
            'Affirmation',
            'vous voulez suprimer les taches terminer',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.props.removeTask()},
            ],
            {cancelable: false},
        );
    }

    ChangeShowPut () {
        this.props.changeShowPut(true)
    }


    render() {
        this.sortByDate()
        const buttons = ['Tous', 'finis', 'en cours']
        console.log(this.props.etudiant.dataEtudiant)
        return (
            <View>

                <View style={styles.root}>
                    {
                        this.props.tasks.dataTasks.filter(e => { return e.finishTasks === true }).length === 1 ?
                            <Icon
                                raised
                                name='edit'
                                type='AntDesign'
                                // color='#9b9b9b'
                                color='#517fa4'
                                size={20}
                                onPress={ this.ChangeShowPut.bind(this) }
                            /> : null
                    }

                    {
                        this.props.tasks.dataTasks.filter(e => { return e.finishTasks === true }).length > 0 ?
                            <Icon
                                reverse
                                name='delete'
                                type='AntDesign'
                                color='#f50'
                                size={20}
                                onPress={this.deleteTask.bind(this)}
                            /> : null
                    }


                </View>
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex.bind(this)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 30}}
                    />
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    {
                        this.filterData().map((e)=>{
                            return <View  key={e.idTasks}>
                                <CheckBox
                                    title={e.contentTasks}
                                    checked={e.finishTasks}
                                    onPress={ () => this.OnCheck(e.idTasks) }
                                />

                            </View>
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    scrollView: {
        backgroundColor: Colors.lighter,
        padding: 5,
        marginBottom: 35
    }
});

const mapStateToProps = state => {
    return {  tasks: state.Tasks, etudiant: state.Etudiant }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleChech: (id) => {
            dispatch({ type: 'TOGGLE_CHECK', id })
        },
        initData: (data) => {
            dispatch({ type: 'INIT_DATA', data })
        },
        removeTask: () => {
            dispatch({ type: 'REMOVE_TASKS'})
        },
        changeShowPut: (data) => {
            dispatch({ type: 'CHANGE_SHOW_PUT', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
