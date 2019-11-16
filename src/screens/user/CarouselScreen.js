import React from 'react';
import { Dimensions, Image, Text, StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
// import Carousel from '../../components/Carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CarouselScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerBackImage: (<View style={{paddingLeft: 16}} />)
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      subjobs: [],
      error: null,
      isLoaded: false,
    }
  }

  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const jobId = navigation.getParam('jobId');
      const apiCallSubjobs = await fetch(`https://hc8jk7j3d0.execute-api.ca-central-1.amazonaws.com/ddaBeta/jobs/${jobId}/subjobs`);
      const subjobs = await apiCallSubjobs.json();
      this.setState({
        isLoaded: true,
        subjobs
      });
    }
    catch (err) {
        this.setState({error: err});
    }
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.itemContainer}>
        <ScrollView>
          <Text style={styles.stepTitle}>Step { index+1 }</Text>
          <Text style={styles.title}>{ item.title }</Text>
          <Text style={styles.description}>{ item.description }</Text>
        </ScrollView>
        <Image
          style={{height: deviceWidth-60, width: deviceWidth-60}}
          source={{ uri: item.imgLink }}
          resizeMode="contain"
        />
      </View>
    );
  }

  get pagination () {
    const { subjobs, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={subjobs.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: -2,
          backgroundColor: '#E98300'
        }}
        inactiveDotStyle={{
          backgroundColor: '#CCC'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  render () {
    const { error, isLoaded, subjobs } = this.state;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={[styles.arrow, {left: 0}]}>
            <TouchableOpacity onPress={() => { this.refs.carousel.snapToPrev(); }} style={{padding: 10}}>
              <Image
                style={{width:10, height:36, opacity:0.4}}
                resizeMode="contain"
                source={require('../../assets/images/arrow_left.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.arrow, {right: 0, alignItems: 'flex-end'}]}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => { 
                const carousel = this.refs.carousel;
                if (carousel.currentIndex == subjobs.length-1) {
                  this.props.navigation.navigate('JobComplete', {title: this.props.navigation.getParam('title')});
                } else {
                  carousel.snapToNext();
                }
              }}
            > 
              <Image
                style={{width:10, height:36, opacity:0.4}}
                resizeMode="contain"
                source={require('../../assets/images/arrow_right.png')}
              />
            </TouchableOpacity>
          </View>
          <Carousel
            ref={'carousel'}
            data={this.state.subjobs}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            activeSlideOffset={10}
            swipeThreshold={10}
            inactiveSlideScale={1}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
          { this.pagination }
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: deviceWidth-60,
    paddingTop: 10,
  },
  stepTitle: {
    color: '#B6BF00',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    color: 'black',
    fontSize: 22,
    marginBottom: 10,
  },
  description: {
    color: 'black',
    fontSize: 22,
    opacity: 0.4,
    marginBottom: 10,
  },
  arrow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 30,
    height: deviceHeight,
    position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 99
  }
});
