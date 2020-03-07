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
import { HeaderBackButton } from 'react-navigation-stack';

export default class EmployerHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('company').name,
      headerBackTitle: navigation.getParam('company').name,
    };
  };

  render() {
    const employer = this.props.navigation.getParam('employer');
    const company = this.props.navigation.getParam('company');
    const { navigate } = this.props.navigation; 
      
    function _onPressJobs() {
      navigate('EmployerJobs', { companyId: company.companyId });
    };
    
    function _onPressEmployees() {
      navigate('Employees', { companyId: company.companyId });
    };

    function Employer({info, items}) {
      const fields = []
      Object.entries(items).forEach(el => {
        const attrs = el[1].split('.');
        if (info[attrs[0]]) {
          fields.push(
            <View style={styles.item} key={el[0]}>
              <Text style={styles.title}>{el[0]}</Text>
              <Text style={styles.value}>{info[attrs[0]][attrs[1]]}</Text>
            </View>
          )
        }
      })
      
      return (
        <View style={styles.employer}>{fields}</View>
      )
    }
          
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={[{employer: employer, company: company}]}
            renderItem={({item}) => 
              <View>
                <Employer info={item} items={{name: 'employer.name', company: 'company.name', email: 'employer.email', phone: 'employer.phone_number', address: 'company.address'}} />
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
