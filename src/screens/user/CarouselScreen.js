import React from "react";
import {
  Button,
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
import Carousel, { Pagination } from "react-native-snap-carousel";
import moment from "moment";
import API from "../../constants/API";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class CarouselScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam("title"),
      gesturesEnabled: false,
      drawerLabel: () => null,
      headerLeft: (
        <Button
          onPress={async () => {
            await params.updateSubjobEndTime();
            await params.calculateTotalTimeForJob();
            navigation.navigate('AssignedJobs');
          }}
          title="Cancel"
        />
      ),
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

    this.lastSubJobStartTime = new moment();
  }

  async componentDidMount() {
    this.props.navigation.setParams({
      updateSubjobEndTime: this.updateSubjobEndTime,
      calculateTotalTimeForJob: this.calculateTotalTimeForJob
    });
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

  startTimer = async slideIndex => {
    await this.updateSubjobEndTime(slideIndex-1);
    this.lastSubJobStartTime = new moment();
  };

  updateSubjobEndTime = async (subJobId = this.state.activeSlide) => {
    try {
      const shiftDataJobNumber = this.props.navigation.getParam("shiftDataJobNumber");
      const jobTitle = this.props.navigation.getParam("title");
      const subJobTitle = this.state.subjobs[subJobId].title;
      
      const now = new moment();
      const duration = moment.utc(now.diff(this.lastSubJobStartTime)).format("HH:mm:ss");
      
      const shiftDataKey = this.props.navigation.getParam("shiftDataKey");
      let shiftData = await AsyncStorage.getItem(shiftDataKey);
      shiftData = JSON.parse(shiftData);

      shiftData.push({'Job Number': shiftDataJobNumber, 'Job Name': jobTitle, 'Subjob Name': subJobTitle, 'Time (HH:mm:ss)': duration});
      await AsyncStorage.setItem(shiftDataKey, JSON.stringify(shiftData));
    } catch (e) {
      console.log(e);
    }
  }

  calculateTotalTimeForJob = async () => {
    const shiftDataJobNumber = this.props.navigation.getParam("shiftDataJobNumber");
    const jobTitle = this.props.navigation.getParam("title");
    let totalTime = moment(0);

    const shiftDataKey = this.props.navigation.getParam("shiftDataKey");
    let shiftData = await AsyncStorage.getItem(shiftDataKey);
    shiftData = JSON.parse(shiftData);

    shiftData.forEach(subjob => {
      if (subjob['Job Number'] === shiftDataJobNumber) {
        const subjobTime = moment.duration(subjob['Time (HH:mm:ss)'], 'HH:mm:ss').asSeconds();
        totalTime.add(subjobTime, 'seconds');
      }
    });
    totalTime = moment.utc(totalTime).format('HH:mm:ss');

    shiftData.push({'Job Number': shiftDataJobNumber, 'Job Name': jobTitle, 'Subjob Name': 'ALL', 'Time (HH:mm:ss)': totalTime});
    await AsyncStorage.setItem(shiftDataKey, JSON.stringify(shiftData));
  }

  onPressButton = async subjobs => {
    const carousel = this.refs.carousel;
    if (carousel.currentIndex === subjobs.length - 1) {
      await this.updateSubjobEndTime(carousel.currentIndex);
      await this.calculateTotalTimeForJob();
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
