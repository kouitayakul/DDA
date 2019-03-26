import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

const deviceWidth = Dimensions.get('window').width

class Carousel extends Component {

animVal = new Animated.Value(0)
  constructor(props) {
    super(props);
  }

  render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image,i)
      const thisImage = (
        <Image
        key={'image${i}'}
        source ={{uri: image}}
        style={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage)
    }
  )
    return (
      <View
      style={styles.container}
      flex={1}
      >

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={10}
      pagingEnabled
      >
      {imageArray}
      </ScrollView>
      </View>
    )
  }

}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
