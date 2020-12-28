// @ts-ignore
import {Button, Icon, Text} from 'native-base/src';
import React, {PureComponent} from 'react';
import {
    Alert,
    Image,
    Keyboard,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';
import SplashScreen from 'react-native-splash-screen';

import fetchNumberInfo from '../../api/fetchNumberInfo';
import capitalizeFirstLetter from '../../utils/stringUtils';
import {saveRecord} from '../../db/asyncStorageProvider';
import {NavigationActions} from "react-navigation";

interface homeTabState {
    phone?: string,
    carrier?: string,
    countryOfOrigin?: string,
    phoneType?: string
}

export default class HomeTab extends PureComponent<{}, homeTabState> {
    private keyboardDidShowListener: any;
    private keyboardDidHideListener: any;
    private willBlurSubscription: any;
    private willFocusSubscription: any;
    private showImage: boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            phone: '',
            carrier: '',
            countryOfOrigin: '',
            phoneType: ''
        };
        this.showImage = true;
    }

    // @ts-ignore
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: navigation?.state?.params?.showTabBar,
        animationEnabled: true
    });

    toggleTabBar = (enable: boolean) => {
        const setParamsAction = NavigationActions.setParams({
            params: {showTabBar: enable},
            // @ts-ignore
            key: this.props.navigation.state.key,
        });
        // @ts-ignore
        this.props.navigation.dispatch(setParamsAction);
    };

    _keyboardDidShow = () => {
        this.showImage = false;
        this.toggleTabBar(false);
    };

    _keyboardDidHide = () => {
        this.showImage = true;
        this.toggleTabBar(true);
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
        this.showImage = true;
        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
        this.willBlurSubscription && this.willBlurSubscription.remove();
        this.willFocusSubscription && this.willFocusSubscription.remove();
        this.toggleTabBar(true);
    };

    componentDidMount = () => {
        this.showImage = true;
        // @ts-ignore
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide
            );
            this.toggleTabBar(true);
        });

        // @ts-ignore
        this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
            this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
        });

        SplashScreen.hide();
    };

    onChangeFormNumber = (text: string) => {
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
        if (this?.state?.phone && this.state.phone.length > 5) {
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
                                    phone: this.state.phone || '',
                                    carrier: this.state.carrier || '',
                                    countryOfOrigin: this.state.countryOfOrigin || '',
                                    phoneType: this.state.phoneType || ''
                                }).catch();
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

    renderInfoRow = (title: string, value: string) => {
        return (
            <View style={styles.infoRow}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.infoText}>
                    {`${title}:`}
                </Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    textBreakStrategy={'balanced'}
                    style={styles.infoValue}>
                    {value ? value : ''}
                </Text>
            </View>
        );
    };

    renderInputField = () => {
        return (
            <View
                style={styles.formStyle}>
                <TextInput
                    style={styles.inputFormNumberStyle}
                    keyboardType="phone-pad"
                    onChangeText={(enteredNumber) =>
                        this.onChangeFormNumber(enteredNumber)
                    }
                    placeholder="Enter Phone Number"
                    autoCapitalize={'none'}
                    textAlign={'center'}
                    autoCompleteType={'tel'}
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
        );
    };

    renderButtonGroup = () => {
        return (
            <View style={styles.buttonGroupContainer}>
                <View style={styles.buttonGroup}>
                    <Button
                        iconLeft
                        light
                        rounded
                        bordered
                        onPress={() => {
                            this.onLoadContacts().catch();
                        }}>
                        <Icon name="people-outline" style={styles.buttonText}/>
                        <Text style={styles.buttonText}>LOAD</Text>
                    </Button>
                    <Button
                        iconLeft
                        light
                        rounded
                        bordered
                        onPress={() => {
                            this.onClearFormNumber();
                        }}>
                        <Icon name="trash" style={styles.buttonText}/>
                        <Text style={styles.buttonText}>CLEAR</Text>
                    </Button>
                </View>
                <Button
                    iconLeft
                    light
                    rounded
                    bordered
                    block
                    onPress={() => {
                        this.onSubmitFormNumber();
                    }}>
                    <Icon name="search" style={[styles.buttonFindIcon]}/>
                    <Text style={styles.buttonFindText}>FIND</Text>
                </Button>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.containerStyle}>
                <StatusBar backgroundColor="#B71C1C"/>
                <ScrollView
                    contentContainerStyle={{height: '100%'}}
                    automaticallyAdjustContentInsets={true}
                >
                    {
                        this.showImage ?
                            <Image
                                source={require('../../../assets/globenphone.png')}
                                style={styles.imageStyle}
                            /> :
                            null
                    }
                    <View
                        style={this.showImage ? styles.inputAndTextContainer : styles.inputAndTextContainerWithKeyboard}>
                        {this.renderInputField()}
                        <View style={styles.infoGroup}>
                            {this.renderInfoRow('Country Of Origin', this.state.countryOfOrigin || '')}
                            {this.renderInfoRow('Phone Type', this.state.phoneType || '')}
                            {this.renderInfoRow('Mobile Carrier', this.state.carrier || '')}
                        </View>
                        {this.renderButtonGroup()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#212121',
        height: '100%'
    },
    imageStyle: {
        maxHeight: '40%',
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 12,
        resizeMode: 'center'
    },
    formStyle: {
        alignSelf: 'center',
        minWidth: '90%',
        paddingBottom: 16,
        marginLeft: 40,
        marginRight: 50
    },
    inputFormNumberStyle: {
        textAlign: 'center',
        color: 'white'
    },
    infoText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoValue: {
        color: 'white',
        fontWeight: 'normal',
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 26,
    },
    infoGroup: {
        flexDirection: 'column',
        height: '30%',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    buttonGroup: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonGroupContainer: {
        justifyContent: 'center',
        marginTop: 48,
    },
    buttonText: {
        color: 'white'
    },
    buttonFindText: {
        color: 'white',
        textAlign: 'center',
        paddingRight: 50,
        flexGrow: 500
    },
    buttonFindIcon: {
        color: 'white',
        flexShrink: 1,
    },
    inputAndTextContainer: {
        height: '52%',
        paddingHorizontal: 32,
        justifyContent: 'flex-end',
        paddingTop: 32
    },
    inputAndTextContainerWithKeyboard: {
        height: '100%',
        paddingHorizontal: 32,
        justifyContent: 'center',
        paddingVertical: 32
    }
});
