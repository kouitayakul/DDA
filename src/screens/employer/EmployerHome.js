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
import API from '../../constants/API';

export default class EmployerHome extends React.Component {
  
  render() {
    const employer = this.props.navigation.getParam('employer');
    const company = this.props.navigation.getParam('company');
    const { navigate } = this.props.navigation; 
      
    function _onPressJobs() {
      navigate('EmployerJobs', { companyId: employer['profile'] });
    };
    
    function _onPressEmployees() {
      navigate('Employees', { companyId: employer['profile'] });
    };

    function Employer({employer}) {
      return (
        <View style={styles.employer}>
          <View style={styles.item}>
            <Text style={styles.title}>name</Text>
            <Text style={styles.value}>{employer.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>company</Text>
            <Text style={styles.value}>{company.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>email</Text>
            <Text style={styles.value}>{employer.email}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>phone</Text>
            <Text style={styles.value}>{employer.phone_number}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>address</Text>
            <Text style={styles.value}>{company.address}</Text>
          </View>
        </View>
      )
    }
          
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={[employer]}
            renderItem={({item}) => 
              <View>
                <Employer employer={item} />
                <TouchableHighlight onPress={_onPressEmployees}>
                  <View style={styles.jobs}>
                    <View>
                      <Text style={styles.jobsTitle}>Employees</Text>
                    </View>
                    <Icon name='angle-right' style={styles.icon}/>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={_onPressJobs}>
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
    employer: {
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
