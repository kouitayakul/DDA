import React from 'react';
import { Dimensions, Image, Text, StyleSheet, View, ScrollView } from 'react-native';
// import Carousel from '../../components/Carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CarouselScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      entries: [
        {
          title: 'Measure and boil',
          subtitle: 'Measure as much water as you’re going to use to brew, plus a little extra for rinsing the filter, and bring it to a boil.',
          illustration: 'https://globalassets.starbucks.com/assets/062dd14299a44047afdd8c8bbe7b4e23.jpg'
        },
        {
          title: 'Pre-moisten filter',
          subtitle: 'Briefly rinse the paper filter with hot water, and discard the rinse water. This will give your coffee the purest flavour possible.',
          illustration: 'https://globalassets.starbucks.com/assets/83bf3861a9024c419790898ed4a1714a.jpg'
        },
        {
          title: 'Measure and grind',
          subtitle: 'Next, measure your coffee. For pour-over, use coffee ground for a paper cone. It’s a relatively fine grind that looks like granulated sugar. Measure 2 tablespoons of coffee per 6 ounces of water.',
          illustration: 'https://globalassets.starbucks.com/assets/d05ad8d86ab245f0ad7a533b0c9a7fd7.jpg'
        },
        {
          title: 'Pour and pause',
          subtitle: 'Use hot water that’s just off the boil and fill the cone halfway to saturate the grounds. Pause for 10 seconds and let the coffee bloom. This allows the coffee to hydrate evenly and begin to develop flavour.',
          illustration: 'https://globalassets.starbucks.com/assets/43ce44e02e354880bccae459c3e1b3e8.jpg'
        },
        {
          title: 'Complete the pour and enjoy',
          subtitle: 'Slowly add the rest of the water, pouring in small, steady circles to cover all the grounds.  Enjoy immediately.',
          illustration: 'https://globalassets.starbucks.com/assets/5692428eebee47699271e854d1627a61.jpg'
        }
      ],

    }
  }

    _renderItem ({item, index}) {
        return (
          <View style={styles.itemContainer}>
            <ScrollView>
              <Text>Step { index+1 }</Text>
              <Text>{ item.title }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
              <Text>{ item.subtitle }</Text>
            </ScrollView>
            <Image
              style={{height: deviceWidth-60, width: deviceWidth-60}}
              source={{ uri: item.illustration }}
              resizeMode="contain"
            />
          </View>
        );
    }

    get pagination () {
      const { entries, activeSlide } = this.state;
      return (
        <Pagination
          dotsLength={entries.length}
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
      return (
        <View style={styles.container}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            activeSlideOffset={10}
            swipeThreshold={10}
            inactiveSlideScale={1}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          />
          { this.pagination }
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemContainer: {
    backgroundColor: '#ff0',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: deviceWidth-60,
  }
});
