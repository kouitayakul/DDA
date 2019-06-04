import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, Button } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';


const deviceWidth = Dimensions.get('window').width

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageArray = []
    let buttonArray = []

    const goToNext = (index) => {
      this.scroll.scrollTo({x: index * deviceWidth});
    }

    this.props.images.forEach((image, i) => {
      const thisImage = (
        <Image
        key={`image${i}`}
        source ={{uri: image}}
        style={{ width: deviceWidth }}
        />
      )
      const button = () => (
                            <Icon
                            name='circle'
                            type='font-awesome'
                            color ='#B6BF80'
                            onPress= {() => goToNext(i)}
                            />
                          );
      imageArray.push(thisImage);
      buttonArray.push({element: button});
    }
  )
    return (
      <View style={styles.container}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      ref={(c) => this.scroll = c}
      >
      {imageArray}
      </ScrollView>
      <ButtonGroup
        buttons={buttonArray}
      />
      </View>
    )
  }
}

Carousel.propTypes = {
  images: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Carousel;
