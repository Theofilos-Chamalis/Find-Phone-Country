import {Button, Icon, Text} from 'native-base';
import React, {Component} from 'react';
import {Alert, Image, Keyboard, PermissionsAndroid, StatusBar, StyleSheet, TextInput, View} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';
import SplashScreen from 'react-native-splash-screen';

import fetchNumberInfo from '../../api/fetchNumberInfo';
import capitalizeFirstLetter from '../../utils/stringUtils';
import {saveRecord} from '../../db/asyncStorageProvider';

export default class HomeTab extends Component {
    state = {
        keyboardActive: false
    };

    constructor(props) {
        super(props);
        this.state = {
            keyboardActive: false,
            phone: '',
            carrier: '',
            countryOfOrigin: '',
            phoneType: ''
        };
    }

    _keyboardDidShow = () => {
        this.setState({keyboardActive: true});
    };

    _keyboardDidHide = () => {
        this.setState({keyboardActive: false});
    };

    requestContactsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                Alert.alert(
                    'Permission Denied',
                    'Please accept the "READ CONTACTS" permissions in order to use the "LOAD" function'
                );
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.willBlurSubscription.remove();
        this.willFocusSubscription.remove();
        this.setState({keyboardActive: false});
    };

    componentDidMount = () => {
        SplashScreen.hide();

        this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide
            );
            this.setState({keyboardActive: false});
        });

        this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
            this.setState({keyboardActive: false});
        });
    };

    onChangeFormNumber = (text) => {
        this.setState({
            phone: text.replace(/[^0-9+]/g, '')
        });
    };

    onClearFormNumber = () => {
        this.setState({
            phone: '',
            carrier: '',
            countryOfOrigin: '',
            phoneType: ''
        });
    };

    onLoadContacts = async () => {
        const hasPermissions = await this.requestContactsPermission();
        return hasPermissions
            ? selectContactPhone().then((selection) => {
                if (!selection) {
                    return null;
                }

                let {selectedPhone} = selection;
                let selectedPhoneNumber = selectedPhone.number;

                this.setState({
                    phone: selectedPhoneNumber.toString()
                });
                return selectedPhone.number;
            })
            : null;
    };

    onSubmitFormNumber = () => {
        if (this.state.phone.length > 5) {
            fetchNumberInfo(this.state.phone).then((apiResponse) => {
                if (apiResponse === 'error') {
                    Alert.alert('Error', 'Please check your internet connection!');
                } else {
                    if (apiResponse.valid) {
                        this.setState(
                            {
                                carrier: apiResponse.carrier
                                    ? capitalizeFirstLetter(apiResponse.carrier)
                                    : 'Not Available',
                                countryOfOrigin: apiResponse.location
                                    ? capitalizeFirstLetter(apiResponse.location) +
                                    ', ' +
                                    capitalizeFirstLetter(apiResponse.country_name)
                                    : capitalizeFirstLetter(apiResponse.country_name),
                                phoneType: capitalizeFirstLetter(apiResponse.line_type)
                            },
                            () => {
                                saveRecord({
                                    phone: this.state.phone,
                                    carrier: this.state.carrier,
                                    countryOfOrigin: this.state.countryOfOrigin,
                                    phoneType: this.state.phoneType
                                });
                            }
                        );
                    } else {
                        Alert.alert(
                            'Error',
                            'Please enter a valid phone number with the appropriate country code!'
                        );
                    }
                }
            });
        } else {
            Alert.alert(
                'Error',
                'Please enter a valid phone number with the appropriate country code!'
            );
        }
    };

    render() {
        const buttonGroup = this.state.keyboardActive ? null : (
            <View style={styles.buttonGroup}>
                <Button
                    iconLeft
                    light
                    onPress={() => {
                        this.onLoadContacts();
                    }}>
                    <Icon name="people-outline"/>
                    <Text>LOAD</Text>
                </Button>
                <Button
                    iconLeft
                    light
                    onPress={() => {
                        this.onSubmitFormNumber();
                    }}>
                    <Icon name="search"/>
                    <Text>FIND</Text>
                </Button>
                <Button
                    iconLeft
                    light
                    onPress={() => {
                        this.onClearFormNumber();
                    }}>
                    <Icon name="trash"/>
                    <Text>CLEAR</Text>
                </Button>
            </View>
        );

        return (
            <View style={styles.containerStyle}>
                <StatusBar backgroundColor="#B71C1C"/>

                <Image
                    source={require('../../assets/globenphone.png')}
                    style={
                        this.state.keyboardActive
                            ? styles.imageStyleKeyboardUp
                            : styles.imageStyle
                    }
                />

                <View
                    style={
                        this.state.keyboardActive
                            ? styles.formStyleKeyboardUp
                            : styles.formStyle
                    }>
                    <TextInput
                        style={styles.inputFormNumberStyle}
                        keyboardType="numeric"
                        onChangeText={(enteredNumber) =>
                            this.onChangeFormNumber(enteredNumber)
                        }
                        placeholder="Enter Phone Number"
                        autoCapitalize={'none'}
                        placeholderTextColor="#dedede"
                        onSubmitEditing={() => this.onSubmitFormNumber()}
                        selectionColor="red"
                        returnKeyType="search"
                        returnKeyLabel="Find"
                        underlineColorAndroid="white"
                        value={this.state.phone}
                        maxLength={16}
                    />
                </View>

                <View style={styles.infoGroup}>
                    <Text
                        style={
                            this.state.keyboardActive
                                ? styles.infoTextKeyboardUp
                                : styles.infoText
                        }>
                        Country Of Origin:
                        {this.state.countryOfOrigin ? ' ' + this.state.countryOfOrigin : ''}
                    </Text>
                    <Text
                        style={
                            this.state.keyboardActive
                                ? styles.infoTextKeyboardUp
                                : styles.infoText
                        }>
                        Phone Type:
                        {this.state.phoneType ? ' ' + this.state.phoneType : ''}
                    </Text>
                    <Text
                        style={
                            this.state.keyboardActive
                                ? styles.infoTextKeyboardUp
                                : styles.infoText
                        }>
                        Mobile Carrier:
                        {this.state.carrier ? ' ' + this.state.carrier : ''}
                    </Text>
                </View>

                {buttonGroup}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#212121',
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imageStyle: {
        flex: 4,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    imageStyleKeyboardUp: {
        flex: 1,
        paddingTop: 2,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    formStyle: {
        flex: 1,
        alignSelf: 'center',
        minWidth: '80%',
        paddingBottom: 8,
        marginLeft: 40,
        marginRight: 50
    },
    inputFormNumberStyle: {
        textAlign: 'center',
        color: 'white'
    },
    formStyleKeyboardUp: {
        flex: 1,
        alignSelf: 'center',
        minWidth: '80%',
        paddingBottom: 4,
        marginLeft: 40,
        marginRight: 50
    },
    infoText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 12
    },
    infoTextKeyboardUp: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 4
    },
    infoGroup: {
        flex: 1.4,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonGroup: {
        paddingTop: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});
