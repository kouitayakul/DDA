import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../constants/API'

export default class AllEmployers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      error: null,
      isLoaded: false,
    }
  }
  
  async componentDidMount() {
    try {
      const apiCallCompanies = await fetch(API.endpoint + 'companies');
      const companies = await apiCallCompanies.json();
      this.setState({
        companies,
        isLoaded: true,
      });
    }
    catch (error) {
      this.setState({error})
    }
    
  }
  
  render() {
    const { error, isLoaded, companies } = this.state;

    const _onPressButton = (companyId) => {
      // this.props.navigation.navigate('AssignedJobs', { companyId: companyId });
    };
    
    function Item({ title, address, companyId }) {
      return (
        <TouchableHighlight onPress={() => _onPressButton(companyId)}>
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

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={companies}
            renderItem={({ item }) => 
              <Item 
                title={item.name}
                address={item.address}
                companyId={item.companyId}
              />
            }
            keyExtractor={item => item.companyId.toString()}
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
