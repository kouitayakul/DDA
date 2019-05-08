import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, Button } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import PropTypes from 'prop-types'


const deviceWidth = Dimensions.get('window').width


const Carousel = (props) => {
    let imageArray = []
    let buttonArray = []
    props.images.forEach((image, i) => {
      const thisImage = (
        <Image
        key={`image${i}`}
        source ={{uri: image}}
        style={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage);
    }
  )
  const button = () => <Icon
                        name='circle'
                        type='font-awesome'
                        color ='#B6BF80'
                        />
  for (let i= 0; i < imageArray.length; i++) {
    buttonArray.push({element: button});
  }
    return (
      <View style={styles.container}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      >
      {imageArray}
      </ScrollView>
      <ButtonGroup
        buttons={buttonArray}
      />
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
