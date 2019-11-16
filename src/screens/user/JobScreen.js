import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
    AsyncStorage,
    Button,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class JobScreen extends React.Component {
    state = {
        jobs: [],
        shiftStarted: false
    }

    async getAllJobsName(jobIds) {
        const jobs = [];
        for(i = 0; i<jobIds.length; i++) {
            const jobId = jobIds[i].jobId;
            const apiCallJob = await fetch(`https://hc8jk7j3d0.execute-api.ca-central-1.amazonaws.com/ddaBeta/jobs/${jobId}`);
            const job = await apiCallJob.json();
            const jobObj = {
                uniqueKey: i.toString(),
                jobId: jobId,
                jobName: job[0].name
            };
            jobs.push(jobObj);
        }
        return jobs; 
    }

    async componentDidMount() {
        try {
            const userCode = await AsyncStorage.getItem('userCode');
            const apiCallJobIds = await fetch(`https://hc8jk7j3d0.execute-api.ca-central-1.amazonaws.com/ddaBeta/users/${userCode}/jobs`);
            const jobIds = await apiCallJobIds.json();
            const jobs = await this.getAllJobsName(jobIds);
            this.setState({jobs});
        }
        catch (err) {
            console.log(err);
        }
    }

    _onPressButton(jobName, jobId) {
        if (!this.state.shiftStarted) {
            Alert.alert(
                'Start Shift',
                'Start your shift before beginning your job',
            );
        } else {
            this.props.navigation.navigate('Carousel', { title: jobName, jobId: jobId })
        }
    };

    renderItem(item) {
        return (
            <TouchableHighlight onPress={() => this._onPressButton(item.jobName, item.jobId)}>
                <View style={styles.jobName}>
                    <View>
                        <Text style={styles.title}>{item.jobName}</Text>
                    </View>
                    <Icon name='angle-right' style={styles.icon}/>
                </View>
            </TouchableHighlight>
        );
    };

    render() {
        const {jobs, shiftStarted} = this.state;

        if(!jobs.length) {
            return null;
        }
          
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.safeAreaView}>
                <FlatList
                    data={jobs}
                    renderItem={({ item }) => this.renderItem(item) }
                    keyExtractor={item => item.uniqueKey}
                />
            </View>
            <View style={[styles.button, {backgroundColor: shiftStarted ? '#DB4848' : '#B6BF00'}]}>
                <Button 
                    title={shiftStarted ? 'End Shift' : 'Start Shift'}
                    type='solid'
                    color='#FFFFFF'
                    onPress={() => { 
                        this.setState({shiftStarted: !shiftStarted});
                    }}
                />
            </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    safeAreaView: {
        flex: 1
    },
    button: {
        height: 50,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 40,
        marginLeft: 20,
        justifyContent: 'center',
        borderRadius: 10,
    },
    jobName: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
        paddingRight: 15
      },
      title: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: "#000000"
      },
      icon: {
          fontSize: 20,
          color: '#C7C7CC'
      }
});
