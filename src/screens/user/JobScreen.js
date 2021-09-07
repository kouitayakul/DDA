import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  AsyncStorage,
  Button,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import Footer from "../../components/Footer";

export default class JobScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  state = {
    jobs: [],
    shiftStarted: false
  };

  async componentDidMount() {
    try {
      const userCode = await AsyncStorage.getItem("userCode");
      const apiCallJobIds = await fetch(
        API.endpoint + `users/${userCode}/jobs`
      );
      const jobs = await apiCallJobIds.json();
      this.setState({
        jobs: jobs.filter(
          job => job.companyId === this.props.navigation.getParam("companyId")
        )
      });
    } catch (err) {
      console.log(err);
    }
  }

  async _onPressButton(jobName, jobId) {
    if (!this.state.shiftStarted) {
      Alert.alert("Start Shift", "Start your shift before beginning your job");
    } else {
      try {
        let shiftDataJobNumber = await AsyncStorage.getItem('@shift_data_job_number');
        shiftDataJobNumber = parseInt(shiftDataJobNumber)+1
        await AsyncStorage.setItem('@shift_data_job_number', shiftDataJobNumber.toString());
        
        const companyId = this.props.navigation.getParam("companyId");
        const shiftDataKey = '@shift_data_company_' + companyId.toString();

        this.props.navigation.navigate("Carousel", {
          title: jobName,
          jobId: jobId,
          shiftDataJobNumber,
          shiftDataKey,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async _onPressShiftButton(shiftStarted) {
    this.setState({ shiftStarted: !shiftStarted }, async () => {
      const { shiftStarted } = this.state;
      const companyId = this.props.navigation.getParam("companyId");
      const shiftDataKey = '@shift_data_company_' + companyId.toString();

      if (shiftStarted) {
        try {
          await AsyncStorage.setItem('@shift_data_job_number', "0");
          await AsyncStorage.setItem(shiftDataKey, JSON.stringify([]));
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          // const shiftData = await AsyncStorage.getItem(shiftDataKey);
          // console.log(JSON.parse(shiftData));
          this.props.navigation.navigate("ShiftSummary", {
            shiftDataKey
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  renderItem(item) {
    return (
      <TouchableHighlight
        onPress={() => this._onPressButton(item.name, item.jobId)}
      >
        <View style={styles.jobName}>
          <View>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <Icon name="angle-right" style={styles.icon} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { jobs, shiftStarted } = this.state;

    if (!jobs.length) {
      return null;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.safeAreaView}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.jobId.toString()}
          />
        </View>
        <View
          style={[
            styles.button,
            { backgroundColor: shiftStarted ? "#DB4848" : "#B6BF00" }
          ]}
        >
          <Button
            title={shiftStarted ? "End Shift" : "Start Shift"}
            type="solid"
            color="#FFFFFF"
            onPress={() => this._onPressShiftButton(shiftStarted)}
          />
        </View>
        <Footer info={`${jobs.length} Jobs`} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  safeAreaView: {
    backgroundColor: "#F2F2F2",
    flex: 1
  },
  button: {
    height: 50,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 12,
    marginLeft: 20,
    justifyContent: "center",
    borderRadius: 10
  },
  jobName: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    paddingRight: 15
  },
  title: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000"
  },
  icon: {
    fontSize: 20,
    color: "#C7C7CC"
  }
});
