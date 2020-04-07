import React, { Component } from 'react'
import {
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native'
import styles from '../statics/styles/DefaultStyles'
import { Button, Icon, Image } from 'react-native-elements'
import logo from '../statics/images/sign3.png'
import { connect } from 'react-redux'
import axios from 'axios'
import Move from '../animation/Move'
import Scale from '../animation/Scale'

const {
    width
} = Dimensions.get('window')

class Sign extends Component {
    constructor (props) {
        super(props)
        this.state = {
            login: '',
            pass: '',
            confirm: '',
            domaine: '',
            valNiveau: 0,
            competence: '',
            loading: false
        }
    }

    OnSubmit () {
        if (this.state.pass === this.state.confirm) {
            const stock = {
                login: this.state.login,
                pass: this.state.pass,
                access: 1,
                domaine: this.state.domaine,
                valNiveau: this.state.valNiveau,
                competence: this.state.competence
            }
            axios.post(this.props.other.ip_add + 'Etudiant/post', stock,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
                    }
                }
            ).then(h => {
                this.props.addEtutiant(h.data)
                this.props.navigation.navigate('Login')
                Alert.alert(
                    'Information',
                    'Inscription reussi',
                    { cancelable: false }
                )
            }).catch(err => console.log('error parsing:\n', err))
        }
        return null
    }


    OnClickLogin () {
        // this.props.navigation.pop()
        this.props.navigation.navigate('Login')
        return null
    }

    OnChangeLogin (value) {
        this.setState({ login: value })
    }

    OnChangePass (value) {
        this.setState({ pass: value })
    }

    OnChangeConfirm (value) {
        this.setState({ confirm: value })
    }

    OnChangeDomaine (value) {
        this.setState({ domaine: value })
    }

    OnChangeValNiveau (value) {
        this.setState({ valNiveau: value })
    }

    OnChangeCompetence (value) {
        this.setState({ competence: value })
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a896b' }}>
                    <Move delais={600} xD={0} yD={-200} style={ styles.containerImages }>
                        <View style={styles.containerImage}>
                            <Image
                                source={logo}
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                            />
                        </View>
                    </Move>
                    <View style={{ flex: 4, justifyContent: 'space-between', paddingBottom: 20, marginTop: 20 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Move delais={100} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Pseudo'
                                    onChangeText={this.OnChangeLogin.bind(this)}
                                    style={styles.textinput}
                                />
                            </Move>
                            <Move delais={200} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Password'
                                    onChangeText={this.OnChangePass.bind(this)}
                                    style={styles.textinput}
                                    secureTextEntry={true}
                                />
                            </Move>
                            <Move delais={300} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Confirmer'
                                    onChangeText={this.OnChangeConfirm.bind(this)}
                                    style={styles.textinput}
                                    secureTextEntry={true}
                                />
                            </Move>
                            <Move delais={400} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Domaine'
                                    onChangeText={this.OnChangeDomaine.bind(this)}
                                    style={styles.textinput}
                                />
                            </Move>
                            <Move delais={500} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Niveau'
                                    onChangeText={this.OnChangeValNiveau.bind(this)}
                                    style={styles.textinput}
                                />
                            </Move>
                            <Move delais={600} xD={width} yD={0}>
                                <TextInput
                                    placeholder='Competence'
                                    onChangeText={this.OnChangeCompetence.bind(this)}
                                    style={styles.textinput}
                                />
                            </Move>
                            <Move delais={600} xD={0} yD={200}>
                                <Button
                                    icon={
                                        this.state.loading
                                            ? <ActivityIndicator color='white'/>
                                            : <Icon
                                                name='ios-send'
                                                size={25}
                                                type='ionicon'
                                                color="white"
                                            />
                                    }
                                    buttonStyle={styles.buttonReactNativeElement}
                                    onPress={this.OnSubmit.bind(this)}
                                    title=" Inscrire"
                                />
                            </Move>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>vous avez deja une compte? </Text>
                            <TouchableWithoutFeedback
                                onPress={this.OnClickLogin.bind(this)}
                            >
                                <View style={{ padding: 10 }}>
                                    <Text style={{ color: '#ffe90f', fontSize: 16 }}>s'indentifier</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return { etudiant: state.Etudiant, other: state.Other }
}

const mapDispatchToProps = dispatch => {
    return {
        addEtutiant: (data) => {
            dispatch({ type: 'ADD_ETUDIANT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign)
