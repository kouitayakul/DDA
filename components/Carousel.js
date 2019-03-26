import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import PropTypes from 'prop-types'


const deviceWidth = Dimensions.get('window').width

const Carousel = (props) => {
    let imageArray = []
    let barArray = []
    props.images.forEach((image, i) => {
      const thisImage = (
        <Image
        key={`image${i}`}
        source ={{uri: image}}
        style={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage)
    }
  )
    return (
      <View style={styles.container}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      >
      {imageArray}
      </ScrollView>
      </View>
    )
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
