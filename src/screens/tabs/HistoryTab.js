import React, {PureComponent} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import format from 'date-fns/format';

import {getAllRecords} from '../../db/asyncStorageProvider';

export default class HistoryTab extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            timelineData: [],
            history: false
        };
    }

    componentDidMount = () => {
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            getAllRecords()
                .then(async (results) => {
                    if (results.length > 0) {
                        await this.setState({history: true});
                        this.fillTimeline(results);
                    } else {
                        await this.setState({history: false});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    componentWillUnmount = () => {
        this.willFocusSubscription && this.willFocusSubscription.remove();
    };

    fillTimeline = (data) => {
        const timelineArray = data.map((call, index) => {
            const timestamp = Number(call[0]);
            const dateString = (format(new Date(timestamp), 'dd/MM')).toString();
            const timeString = (format(new Date(timestamp), 'hh:mm')).toString();

            const phone = JSON.parse(call[1]).phone;
            const carrier = JSON.parse(call[1]).carrier;
            const country = JSON.parse(call[1]).countryOfOrigin;
            const phoneType = JSON.parse(call[1]).phoneType;
            return {
                time: `${dateString}\n${timeString}`,
                title: `Phone #${index + 1}`,
                description: this.renderDescription(phone, carrier, country, phoneType),
                icon:
                    phoneType === 'Mobile'
                        ? require('../../../assets/smartphone.png')
                        : require('../../../assets/telephone.png')
            };
        });

        this.setState({
            timelineData: timelineArray
        });
    };

    renderDescription = (phone, carrier, country, phoneType) => {
        return (
            <View style={styles.descriptionContainer}>
                {this.renderDescriptionRow('Phone', phone)}
                {this.renderDescriptionRow('Carrier', carrier)}
                {this.renderDescriptionRow('Country', country)}
                {this.renderDescriptionRow('Phone Type', phoneType)}
            </View>
        );
    };

    renderDescriptionRow = (title, value) => {
        return (
            <View style={styles.descriptionRow}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.descriptionRowText}>
                    {`${title}:`}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.descriptionRowValue}>
                    {value ? value : ''}
                </Text>
            </View>
        );
    };

    render() {
        const renderTimeline = this.state.history ? (
            <Timeline
                data={this.state.timelineData}
                circleSize={20}
                iconStyle={styles.timelineIcon}
                circleColor="#212121"
                lineColor="#C62828"
                timeContainerStyle={styles.timeContainer}
                timeStyle={styles.time}
                titleStyle={styles.timelineTitle}
                listViewContainerStyle={styles.listViewContainer}
                options={{
                    style: styles.timelineAdditional,
                    enableEmptySections: true
                }}
                innerCircle={'icon'}
            />
        ) : (
            <View style={styles.textContainer}>
                <Text style={styles.noHistoryText}>No history available</Text>
            </View>
        );

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#B71C1C"/>
                {renderTimeline}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        backgroundColor: '#212121'
    },
    listViewContainer: {
        paddingVertical: 18
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noHistoryText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        alignSelf: 'center',
        textAlign: 'center'
    },
    descriptionContainer: {
        marginTop: 5,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    descriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descriptionRowText: {
        color: '#EAE6E5',
        fontWeight: 'normal',
        textAlign: 'left',
    },
    descriptionRowValue: {
        color: '#EAE6E5',
        fontWeight: 'normal',
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 20,
    },
    timelineIcon: {
        marginTop: 4
    },
    timeContainer: {
        minWidth: 52,
        marginTop: 0
    },
    time: {
        textAlign: 'center',
        backgroundColor: '#306BAC',
        color: 'white',
        padding: 5,
        borderRadius: 10
    },
    timelineTitle: {
        color: '#ffffff',
        marginTop: -12,
        fontSize: 18,
        fontWeight: 'bold'
    },
    timelineAdditional: {
        paddingTop: 5
    }
});
