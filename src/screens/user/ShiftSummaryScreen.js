import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Dimensions, AsyncStorage } from "react-native";
import RectangleButton from "../../components/RectangleButton";

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default class ShiftSummaryScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  state = {
    allJobs: []
  };

  async componentDidMount() {
    try {
      const shift = await AsyncStorage.getItem("shift");
      const temp = JSON.parse(shift);
      let shiftJobs = [];
      for (let singleJob of temp) {
        let value = singleJob.name;
        let firstSubJobs = await AsyncStorage.getItem(value);
        let objToPush = { value: firstSubJobs };
        shiftJobs.push(objToPush);
      }
      this.setState({ allJobs: shiftJobs });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  userJobs = () => {
    const { allJobs } = this.state;
    let returnObjs = [];

    for (i = 0; i < allJobs.length; i++) {
      for (let [key, value] of Object.entries(allJobs[i])) {
        returnObjs.push(<Text style={styles.subtitle}> {key} </Text>);

        if (value == "Not Completed") {
          returnObjs.push(<Text style={styles.subtitle}> {value} </Text>);
        } else {
          let subjobs = JSON.parse(value);
          for (let subjob of subjobs) {
            returnObjs.push(
              <Text style={{ textAlign: "center" }}>
                {subjob.name}: {subjob.took}
              </Text>
            );
          }
        }
      }
    }
    return returnObjs;
  };

  render() {
    let completedJobs = this.userJobs;
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <Text style={styles.title}> Shift Summary</Text>
        <View style={{ flex: 4 }}>{this.userJobs()}</View>
        <View style={{ flex: 2 }}>
          <RectangleButton title="Send email and finish" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "System",
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.35,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    justifyContent: "space-between",
    flex: 1
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: 0.35,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center"
  },
  button: {
    bottom: 0
  }
});
