import React from "react";
import { Text, View, Alert, StyleSheet, SafeAreaView, AsyncStorage, ScrollView } from "react-native";
import RectangleButton from "../../components/RectangleButton";
import API from '../../constants/API';

export default class ShiftSummaryScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);

    this.state = {
      shiftData: null,
      isLoaded: false,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const shiftDataKey = this.props.navigation.getParam("shiftDataKey");
      let shiftData = await AsyncStorage.getItem(shiftDataKey);
      shiftData = JSON.parse(shiftData);
      this.setState({
        isLoaded: true,
        shiftData
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendEmail() {
    const { shiftData } = this.state;
    if (shiftData.length === 0) {
      this.props.navigation.navigate("AssignedJobs");
      return;
    }

    try {
      const userCode = await AsyncStorage.getItem("userCode");
      const apiSendEmail = await fetch(`${API.endpoint}/email/${userCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shiftData)
      });
      const response = await apiSendEmail.json();
      console.log(response);
      
      const shiftDataKey = this.props.navigation.getParam("shiftDataKey");
      await AsyncStorage.removeItem(shiftDataKey);

      this.props.navigation.navigate("AssignedJobs");
    } catch (err) {
      Alert.alert(err.message);
    }
  }

  renderRow = (el, index, isLast) => {
    return(
      <View key={index} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderBottomWidth: isLast ? 1 : 0, borderColor: '#CCCCCC' }}>
        
        <View style={[styles.tableCell, {flex: 1}]}><Text style={{fontWeight: index===0 ? 'bold' : 'normal'}}>{el['Job Number']}</Text></View>
        <View style={[styles.tableCell, {flex: 4, borderLeftWidth: 1, borderColor: '#CCCCCC'}]}><Text style={{fontWeight: index===0 ? 'bold' : 'normal'}}>{el['Job Name']}</Text></View>
        <View style={[styles.tableCell, {flex: 4, borderLeftWidth: 1, borderColor: '#CCCCCC'}]}><Text style={{fontWeight: index===0 ? 'bold' : 'normal'}}>{el['Subjob Name']}</Text></View>
        <View style={[styles.tableCell, {flex: 4, borderLeftWidth: 1, borderColor: '#CCCCCC'}]}><Text style={{fontWeight: index===0 ? 'bold' : 'normal'}}>{el['Time (HH:mm:ss)']}</Text></View>
      </View>
    )
  }
  
  userJobs = () => {
    const { shiftData } = this.state;
    const columnNames = [{
      'Job Number': '#',
      'Job Name': 'Job Name',
      'Subjob Name': 'Subjob Name',
      'Time (HH:mm:ss)': 'Time (HH:mm:ss)',
    }];
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
        { shiftData.length>0 &&
          [...columnNames, ...shiftData].map((el, index) => {
            return this.renderRow(el, index, index===shiftData.length);
          })
        }
      </View>
    );
  };

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <Text>Loading...</Text>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Shift Summary</Text>
          <ScrollView>{this.userJobs()}</ScrollView>
          <RectangleButton title="Send email and finish" onPress={() => this.sendEmail()}/>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "stretch",
    marginVertical: 20
  },
  title: {
    fontFamily: "System",
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.35,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
  tableCell: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 3,
  }
});
