import React from 'react';
import { AsyncStorage, Dimensions, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import API from '../../constants/API'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class RewardsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerLeft: null,
      gesturesEnabled: false,
      drawerLabel: () => null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      stars: undefined
    }

    this.getStars = this.getStars.bind(this)
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.getStars();
      }
    );
  }

  async getStars() {
    this.setState({
      isLoaded: false
    });

    try {
      const userCode = await AsyncStorage.getItem('userCode');
      const apiCallGetStars = await fetch(API.endpoint + `users/${userCode}/stars`);
      let stars = await apiCallGetStars.json();
      this.setState({
        isLoaded: true,
        stars: stars[0].stars
      });
    }
    catch (err) {
        this.setState({error: err});
    }
  }

  render() {
    const { error, isLoaded, stars } = this.state;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <Image
            style={{height: deviceWidth*0.7, width: deviceWidth*0.7, maxHeight: deviceHeight/3, marginVertical: 20}}
            resizeMode="contain"
            source={require('../../assets/images/stars.png')}
          />
          <Text style={styles.largeTitle}>{stars} {stars==1 ? 'Star' : 'Stars'}</Text>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 3,
  }
});
