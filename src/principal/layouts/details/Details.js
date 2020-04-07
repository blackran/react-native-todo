import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import axios from 'axios'
import { Button, Icon } from 'react-native-elements'
import Move from '../../../animation/Move'
import email from 'react-native-email'
import { connect } from 'react-redux'

const {
    width
    // , height
} = Dimensions.get('window')

class Details extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: []
        }
        this.getFilterAnnonce()
    }

    getFilterAnnonce () {
        axios.get(this.props.other.ip_add + 'Annonce/get/' + this.props.navigation.state.params.id,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
                }
            }
        ).then(h => {
            this.setState({ data: h.data })
        }).catch(err => console.log('error parsing:\n', err))
    }

    getTitle (name) {
        return <Move delais={100} xD={0} yD={-300}><Text style={styles.titles}>{ name }</Text> </Move>
    }

    handleEmail = () => {
        const to = ['']
        // const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            bcc: this.state.data[0].mail, // string or array of email addresses
            subject: 'demande d\'employ',
            body: 'voici mon cv pour le post de travail que vous avez postuler'
        }).catch(console.error)
    }

    render () {
        const { data } = this.state
        const datas = data[0]
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#0a896b' }}>
                <View style={ styles.header }>
                    <TouchableWithoutFeedback style={{ alignItems: 'flex-start' }} onPress={() => this.props.navigation.pop()}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='chevron-thin-left'
                                size={23}
                                type='entypo'
                                color='white'
                                style={{ position: 'absolute', left: 0 }}
                            />
                            <Text style={{ color: 'white' }}>Retour</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Details</Text>
                    </View>
                    <View></View>
                </View>

                {
                    this.state.data.length !== 0
                        ? <View style={styles.body}>
                            {/* <Text> { datas.numAnnonce } </Text> */}
                            <Move delais={100} xD={0} yD={-300}>
                                <Text style={styles.post}> { datas.post } </Text>
                                <Text style={styles.dateAnnonce}>postuler les { datas.dateAnnonce } </Text>
                                <View>
                                    <Button
                                        title=" envoyer votre cv"
                                        onPress={this.handleEmail}
                                        icon={
                                            <Icon
                                                name='mail'
                                                size={20}
                                                type='antdesign'
                                                color="white"
                                            />
                                        }
                                    />
                                </View>
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                <Text style={styles.titles}>description de travail</Text>
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                <Text style={styles.desc}> { datas.desc } </Text>
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                <Text style={styles.titles}>competence requis</Text>
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                {
                                    datas.competence.split(',').map((e, i) => {
                                        return <View style={styles.list} key={i}>
                                            <Icon
                                                name='radio-button-unchecked'
                                                size={8}
                                                type='material'
                                                color='#242f1e'
                                            />
                                            <Text style={{ marginLeft: 5 }}>
                                                {e}
                                            </Text>
                                        </View>
                                    })
                                }
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                <Text style={styles.titles}>contacts</Text>
                            </Move>
                            <Move delais={100} xD={width} yD={0}>
                                <Text style={styles.mail}> { datas.mail } </Text>
                            </Move>
                            <View style={styles.align}>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text style={styles.titles}>type</Text>
                                </Move>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text> { datas.type } </Text>
                                </Move>
                            </View>
                            <View style={styles.align}>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text style={styles.titles}>class</Text>
                                </Move>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text> { datas.class } </Text>
                                </Move>
                            </View>
                            <View style={styles.align}>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text style={styles.titles}>niveau</Text>
                                </Move>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text> { datas.niveau } </Text>
                                </Move>
                            </View>
                            <View style={styles.align}>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text style={styles.titles}>domaine</Text>
                                </Move>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text> { datas.domaine } </Text>
                                </Move>
                            </View>
                            <View style={styles.align}>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text style={styles.titles}>valeur niveau</Text>
                                </Move>
                                <Move delais={100} xD={width} yD={0}>
                                    <Text> { datas.valNiveau } </Text>
                                </Move>
                            </View>
                        </View> : null
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 13,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {
        backgroundColor: '#0a896b',
        margin: 5
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    root: {
        margin: 5
    },
    post: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    desc: {
        marginBottom: 5
    },
    dateAnnonce: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 14,
        opacity: 0.5
    },
    mail: {
        marginBottom: 5
    },
    titles: {
        fontSize: 13,
        opacity: 0.5,
        marginLeft: 10,
        marginTop: 5
    },
    align: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

const mapStateToProps = state => {
    return { other: state.Other }
}

const mapDispatchToProps = dispatch => {
    return {
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
