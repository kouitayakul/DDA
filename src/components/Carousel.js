import React, {Component} from 'react';
import {Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, Button} from 'react-native';
import {ButtonGroup, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import moment from "moment";


const deviceWidth = Dimensions.get('window').width
let start = moment();
let time = 0;
const timeArray = [];

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

        const startTimer = () => {
            time = moment(start).fromNow(true);
            console.log(time);
            timeArray.push({element: time});
            start = moment();

        }

        this.props.images.forEach((image, i) => {
                const thisImage = (
                    <Image
                        key={`image${i}`}
                        source={{uri: image}}
                        style={{width: deviceWidth}}
                    />
                )
                const button = () => (
                    <Icon
                        name='circle'
                        type='font-awesome'
                        color='#B6BF80'
                        onPress={() => goToNext(i)}
                    />
                );
                imageArray.push(thisImage);
                buttonArray.push({element: button});
            }
        );

        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    ref={(c) => this.scroll = c}
                    onScroll={() => startTimer()}
                >
                    {imageArray}
                    {timeArray}
                </ScrollView>
                <ButtonGroup
                    containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}
                    buttons={buttonArray}
                />
            </View>
        )
    }
}

Carousel.propTypes = {
    images: PropTypes.array
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 180,
    },
});

export default Carousel;
