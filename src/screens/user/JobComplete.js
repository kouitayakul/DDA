import React from 'react';
import { AsyncStorage, Button, Dimensions, Image, Text, StyleSheet, View, SafeAreaView } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class JobComplete extends React.Component {
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
  }

  async componentDidMount() {
    try {
      const userCode = await AsyncStorage.getItem('userCode');
      const apiCallUpdateStars = await fetch(`https://hc8jk7j3d0.execute-api.ca-central-1.amazonaws.com/ddaBeta/users/${userCode}/stars`);
      const stars = await apiCallUpdateStars.json();
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
          <Text style={styles.largeTitle}>Congratulations</Text>
          <Text style={styles.heading3}>Job Complete</Text>
          <Image
            style={{height: deviceWidth*0.7, width: deviceWidth*0.7, maxHeight: deviceHeight/3, marginVertical: 20}}
            resizeMode="contain"
            source={require('../../assets/images/star-plus1.png')}
          />
          <Text style={styles.heading3}>{stars+1} {stars+1==1 ? 'Star' : 'Stars'}</Text>
          <View style={styles.button}>
            <Button 
              title='Continue'
              type='solid'
              color='#FFFFFF'
              onPress={() => { 
                this.props.navigation.navigate('AssignedJobs')
              }}
            />
          </View>
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
  button: {
    height: 50,
    width: deviceWidth-60,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#007AFF'
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 3,
  },
  heading3: {
    fontSize: 22,
    marginBottom: 10,
  }
});
