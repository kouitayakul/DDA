import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AdminHome extends React.Component {
  render() {
    const { navigate } = this.props.navigation; 

    function Item({ title, screen }) {
      return (
        <TouchableHighlight onPress={() => navigate(screen)}>
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Icon name='angle-right' style={styles.icon}/>
          </View>
        </TouchableHighlight>
      );
    }

    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[{title: 'Users', screen: 'AllUsers'},{title: 'Employers', screen: 'AllEmployers'}]}
          renderItem={({ item }) => <Item title={item.title} screen={item.screen} />}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    )
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