import React from "react";
import {
  Dimensions,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
// import Carousel from '../../components/Carousel';
import Carousel, { Pagination } from "react-native-snap-carousel";
import moment from "moment";
import API from "../../constants/API";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

let start = moment();
let time = 0;
const timeArray = [];

export default class CarouselScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerBackImage: <View style={{ paddingLeft: 16 }} />,
      gesturesEnabled: false,
      drawerLabel: () => null
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      subjobs: [],
      error: null,
      isLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const jobId = navigation.getParam("jobId");
      const apiCallSubjobs = await fetch(
        API.endpoint + `/jobs/${jobId}/subjobs`
      );
      const subjobs = await apiCallSubjobs.json();
      this.setState({
        isLoaded: true,
        subjobs
      });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.itemContainer}>
        <ScrollView>
          <Text style={styles.stepTitle}>Step {index + 1}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
        <Image
          style={{
            height: deviceWidth - 60,
            width: deviceWidth - 60,
            maxHeight: deviceHeight / 3
          }}
          source={{ uri: item.imgLink }}
          resizeMode="contain"
        />
      </View>
    );
  }

  get pagination() {
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
          backgroundColor: "#E98300"
        }}
        inactiveDotStyle={{
          backgroundColor: "#CCC"
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  startTimer = slideIndex => {
    time = moment(start).fromNow(true);
    console.log(time);
    timeArray.push({
      name: this.state.subjobs[slideIndex].title,
      took: time
    });
    start = moment();
    console.log(this.state.subjobs[slideIndex].title);
  };

  onPressButton = async subjobs => {
    const carousel = this.refs.carousel;
    if (carousel.currentIndex == subjobs.length - 1) {
      console.log("i am in here");
      console.log(timeArray);
      var jobName = this.props.navigation.getParam("title");
      try {
        var newTimeArray = JSON.stringify(timeArray);
        var value = await AsyncStorage.getItem(jobName);
        console.log(value);
        if (value != null) {
          await AsyncStorage.setItem(jobName, newTimeArray);
        } else {
          console.log("Job does not exist");
        }
      } catch (err) {
        console.log(err);
      }

      this.props.navigation.navigate("JobComplete", {
        title: this.props.navigation.getParam("title")
      });
    } else {
      carousel.snapToNext();
    }
  };

  render() {
    const { error, isLoaded, subjobs } = this.state;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={[styles.arrow, { left: 0 }]}>
            <TouchableOpacity
              onPress={() => {
                this.refs.carousel.snapToPrev();
              }}
              style={{ padding: 10 }}
            >
              <Image
                style={{ width: 10, height: 36, opacity: 0.4 }}
                resizeMode="contain"
                source={require("../../assets/images/arrow_left.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.arrow, { right: 0, alignItems: "flex-end" }]}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.onPressButton(subjobs)}
            >
              <Image
                style={{ width: 10, height: 36, opacity: 0.4 }}
                resizeMode="contain"
                source={require("../../assets/images/arrow_right.png")}
              />
            </TouchableOpacity>
          </View>
          <Carousel
            ref={"carousel"}
            data={this.state.subjobs}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            activeSlideOffset={10}
            swipeThreshold={10}
            inactiveSlideScale={1}
            onSnapToItem={index => {
              this.setState({ activeSlide: index });
              this.startTimer(index);
            }}
          />
          {this.pagination}
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    width: deviceWidth - 60,
    paddingTop: 10
  },
  stepTitle: {
    color: "#B6BF00",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 5
  },
  title: {
    color: "black",
    fontSize: 22,
    marginBottom: 10
  },
  description: {
    color: "black",
    fontSize: 22,
    opacity: 0.4,
    marginBottom: 10
  },
  arrow: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: 30,
    height: deviceHeight,
    position: "absolute",
    backgroundColor: "#FFF",
    zIndex: 99
  }
});
