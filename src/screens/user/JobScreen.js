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

export default class HomeScreen extends React.Component {
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

    render() {
        const {jobs, shiftStarted} = this.state;

        if(!jobs.length) {
            return null;
        }
        

          function _onPressButton() {
            if(!shiftStarted) {
                Alert.alert(
                    'Start Shift',
                    'Start your shift before beginning your job',
                );
            }else {
                //go to carousel
            }
        };

          function Item({jobName}) {
            return (
            <TouchableHighlight onPress={_onPressButton}>
              <View style={styles.jobName}>
                  <View>
                    <Text style={styles.title}>{jobName}</Text>
                  </View>
                  <Icon name='angle-right' style={styles.icon}/>
              </View>
            </TouchableHighlight>
            );
          };
          
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    data={jobs}
                    renderItem={({ item }) => 
                    <Item 
                    jobName={item.jobName}
                    />
                    }
                    keyExtractor={item => item.uniqueKey}
                />
            </SafeAreaView>
            <View style={styles.button}>
                <Button 
                title='Start Shift'
                type='solid'
                color='#FFFFFF'
                />
            </View>
            </View>
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
        backgroundColor: '#B6BF00',
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
