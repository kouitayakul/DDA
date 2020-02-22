import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../constants/API'

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      error: null,
      isLoaded: false,
    }
  }
  
  async componentDidMount() {
    try {
      const apiCallUsers = await fetch(API.endpoint + 'users');
      const users = await apiCallUsers.json();
      this.setState({
        users,
        isLoaded: true,
      });
    }
    catch (error) {
      this.setState({error})
    }
    
  }

  _storeData = async (code) => {
    try {
        await AsyncStorage.setItem('userCode', code);
    }
    catch (err) {
        console.log(err);
    }
  }
  
  render() {
    const { error, isLoaded, users } = this.state;

    const _onPressButton = async (user) => {
      this.props.navigation.navigate('SingleUser', { user });
    };
    
    function Item({ user }) {
      return (
        <TouchableHighlight onPress={() => _onPressButton(user)}>
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{user.name}</Text>
            </View>
            <Icon name='angle-right' style={styles.icon}/>
          </View>
        </TouchableHighlight>
      );
    };

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={users}
            renderItem={({ item }) => 
              <Item 
                user={item}
              />
            }
            keyExtractor={item => item.code.toString()}
          />
        </SafeAreaView>
      );
    }
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
