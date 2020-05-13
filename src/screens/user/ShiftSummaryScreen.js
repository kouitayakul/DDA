import React, { createContext } from "react";
import qs from 'qs';
import { StyleSheet, Linking } from "react-native";
import { Text, View, Dimensions, AsyncStorage } from "react-native";
import RectangleButton from "../../components/RectangleButton";

const WINDOW_HEIGHT = Dimensions.get("window").height;

let emailBody = [];

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
        let firstJob = singleJob.name;
        let firstSubJobs = await AsyncStorage.getItem(firstJob);
        let objToPush = { [firstJob]: firstSubJobs };
        shiftJobs.push(objToPush);
      }
      this.setState({ allJobs: shiftJobs });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  async sendEmail(to, subject, body, options = {}) {
    const {cc, bcc} = options;
    let url = `mailto:${to}`;

    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }
    
    return Linking.openURL(url);

  }

  
  userJobs = () => {
    const { allJobs } = this.state;
    let returnObjs = [];

    for (i = 0; i < allJobs.length; i++) {
      for (let [key, value] of Object.entries(allJobs[i])) {
        if (value == "Not Completed") {
          returnObjs.push(<Text style={styles.subtitle}> {key}: {value} </Text>);
          emailBody.push(`${key} : ${value}`);
        } else {
        returnObjs.push(<Text style={styles.subtitle}> {key} </Text>);
        emailBody.push(`${key}`);
          let subjobs = JSON.parse(value);
          for (let subjob of subjobs) {
            returnObjs.push(
              <Text style={{ textAlign: "center" }}>
                {subjob.name}: {subjob.took}
              </Text>
            );
            emailBody.push(`${subjob.name}: ${subjob.took}`);
          }
        }
      }
    }
    return returnObjs;
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <Text style={styles.title}> Shift Summary</Text>
        <View style={{ flex: 4 }}>{this.userJobs()}</View>
        <View style={{ flex: 2 }}>
          <RectangleButton title="Send email and finish" onPress={() => this.sendEmail('nandini@codethechange.ca', 'Shift Summary', JSON.stringify(emailBody)).then(
            this.props.navigation.navigate("AssignedJobs")
          )
        }/>
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
