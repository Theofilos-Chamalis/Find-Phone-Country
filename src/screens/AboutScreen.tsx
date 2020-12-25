import React from 'react';
import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import packageJson from '../../package.json';

export default () => {
    const onSendEmail = () => {
        Linking.openURL(
            'mailto:theofxam@gmail.com?cc=&subject=Find Phone Country&body='
        )
            .catch(() => {
                Alert.alert(
                    'Error',
                    'Please make sure that you have an email client app configured and that you are connected to the internet!'
                );
            });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/globenphone.png')}
                style={styles.image}
            />
            <View style={styles.textGroup}>
                <Text style={styles.textHeadPrimary}> Find Phone Country </Text>
                <Text style={styles.textHeadSecondary}>Version {packageJson.version}</Text>
                <Text textBreakStrategy='balanced' style={styles.textParagraph}>
                    This app was created by Theofilos Chamalis. For any questions,
                    suggestions or donations feel free to contact me at:
                </Text>
                <Text
                    style={styles.emailText}
                    onPress={onSendEmail}>
                    theofxam@gmail.com
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212121',
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    image: {
        flex: 4,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    textGroup: {
        flex: 6,
        paddingLeft: 24,
        paddingRight: 24
    },
    textHeadPrimary: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 4,
        fontSize: 30
    },
    textHeadSecondary: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: 12,
        fontSize: 28
    },
    textParagraph: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    emailText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
        textDecorationLine: 'underline'
    }
});
