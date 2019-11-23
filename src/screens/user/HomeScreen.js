import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import AppHeader from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer';
import { Auth } from 'aws-amplify';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        empIds: []
    }

    // handleSignOut = () => {
    //     Auth.signOut()
    //         .then(() => this.props.navigation('Start'))
    //         .catch(err => console.log(err));
    // };

    async componentDidMount() {
        try {
            const userCode = await AsyncStorage.getItem('userCode');
            const apiCallEmpIds = await fetch(`https://hc8jk7j3d0.execute-api.ca-central-1.amazonaws.com/ddaBeta/users/${userCode}/employers`);
            const empIds = await apiCallEmpIds.json();
            this.setState({empIds});
        }
        catch (err) {
            console.log(err);
        }
        
    }

    render() {
        const DATA = [
            {
              id: '1',
              title: 'Starbucks',
              address: '123 Example St.'
            }
          ];

          const _onPressButton = () => {
            this.props.navigation.navigate('Job');
        };

          function Item({ title, address }) {
            return (
            <TouchableHighlight onPress={() => _onPressButton()}>
              <View style={styles.item}>
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.address}>{address}</Text>
                  </View>
                  <Icon name='angle-right' style={styles.icon}/>
              </View>
            </TouchableHighlight>
            );
          };
          
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => 
                    <Item 
                    title={item.title}
                    address={item.address} 
                    />
                    }
                    keyExtractor={item => item.id}
                />
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
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
        paddingRight: 15
      },
      title: {
        fontFamily: 'System',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0.35,
        color: "#000000"
      },
      address: {
        fontFamily: 'System',
        fontSize: 13,
        lineHeight: 18,
        color: '#000000'
      },
      icon: {
          fontSize: 20,
          color: '#C7C7CC'
      }
});
