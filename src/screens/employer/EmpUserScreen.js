import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EmpUserScreen extends React.Component {
    state = {
        user: [],
        jobs: []
    }

    async getAllJobsName(jobIds) {
        const jobs = [];
        for(i = 0; i<jobIds.length; i++) {
            const jobId = jobIds[i].jobId;
            const apiCallJob = await fetch(`https://8izkm790rj.execute-api.ca-central-1.amazonaws.com/ddaBeta/jobs/${jobId}`);
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
        const {navigation} = this.props;
        const code = navigation.getParam('code');
        try {
            const apiCallUser = await fetch(`https://8izkm790rj.execute-api.ca-central-1.amazonaws.com/ddaBeta/users/${code}`);
            const user = await apiCallUser.json();
            const apiCallUserJobIds = await fetch(`https://8izkm790rj.execute-api.ca-central-1.amazonaws.com/ddaBeta/users/${user[0].code}/jobs`);
            const userJobIds = await apiCallUserJobIds.json();
            const jobs = await this.getAllJobsName(userJobIds);
            this.setState({user, jobs});
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        const {user, jobs} = this.state;
        const { navigate } = this.props.navigation; 

        if(!user.length) {
            return null;
        }
        
        function _onPressButton() {
        navigate('EmpJobScreen', {
            jobs
        });
    };

        function User({user}) {
            return (
                <View style={styles.user}>
                    <View style={styles.item}>
                        <Text style={styles.title}>name</Text>
                        <Text style={styles.value}>{user.name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>code</Text>
                        <Text style={styles.value}>{user.code}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>stars</Text>
                        <Text style={styles.value}>{user.stars}</Text>
                    </View>
                </View>
            )
        }
          
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    data={user}
                    renderItem={({item}) => 
                    <View>
                        <User 
                        user={item}
                        />
                        <TouchableHighlight onPress={_onPressButton}>
                            <View style={styles.jobs}>
                                <View>
                                    <Text style={styles.jobsTitle}>Jobs</Text>
                                </View>
                                <Icon name='angle-right' style={styles.icon}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
                keyExtractor={item => '1'}
                />
            </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    safeAreaView: {
        flex: 1
    },
    jobs: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
        borderTopWidth: 0.3,
        borderTopColor: 'grey',
        paddingRight: 15
      },
    jobsTitle: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: "#000000"
    },
    title: {
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 23,
        letterSpacing: -0.24,
        color: "#000000"
    },
    value: {
        fontFamily: 'System',
        fontSize: 18,
        letterSpacing: -0.41,
        color: "#000000"
    },
    icon: {
        fontSize: 20,
        color: '#C7C7CC'
    },
    user: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingLeft: 18,
        paddingTop: 10

    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});
