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

export default class SingleUser extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('user').name,
      headerBackTitle: navigation.getParam('user').name,
    };
  };

  render() {
    const user = this.props.navigation.getParam('user');
    const { navigate } = this.props.navigation; 
    
    function _onPressEmployers() {
      // navigate('Employees', { companyId: company.companyId });
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
            data={[{user: user}]}
            renderItem={({item}) => 
              <View>
                <Employer info={item} items={{name: 'user.name', code: 'user.code', stars: 'user.stars'}} />
                <TouchableHighlight onPress={_onPressEmployers}>
                  <View style={styles.jobs}>
                    <View>
                      <Text style={styles.jobsTitle}>Employers</Text>
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
