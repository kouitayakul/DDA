import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View , Dimensions, AsyncStorage}from 'react-native';
import  RectangleButton  from '../../components/RectangleButton';

const WINDOW_HEIGHT = Dimensions.get('window').height;


export default class ShiftSummaryScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: () => null
    };
    state = {
            allJobs: [
            ]
    }

    async componentDidMount() {
        console.log("Got to Shift Summary")
        try {
            const shift = await AsyncStorage.getItem('shift');
            console.log(shift + "i got here!!!");
            const temp = JSON.parse(shift);
            let shiftJobs = [];
            for(let singleJob of temp) {
            console.log("Got here! LP");
            let value = singleJob.name;    
            let firstSubJobs = await AsyncStorage.getItem(value);
            console.log(value);
            let objToPush = {value: firstSubJobs};
            console.log("Line 32 of Shift SUmmary:");
            console.log(objToPush);
            shiftJobs.push(objToPush);
            }
            console.log(shiftJobs + "I have received end of COmponent Moutn");
            this.setState({ allJobs: shiftJobs});
        } catch(err) {
            this.setState({error: err});
        }
        
    };
    
    userJobs = () => {
        console.log("I got here :O");
        console.log(this.state.allJobs);
        var returnObjs = [];
        for (let [key, value] of Object.entries(this.state.allJobs)) {
            console.log(key);
            console.log("Line 49:" + value);
            returnObjs.push(
                <Text style={styles.subtitle}> {key} </Text>
            )
            if (value == "Not Completed") {
                returnObjs.push(
                    <Text style={styles.subtitle}> {value} </Text>
                )
            } else {
                let subjobs = JSON.parse(JSON.stringify(value));
                console.log(subjobs);
                for (let subjob of subjobs) {
                    returnObjs.push(
                        <Text style={{textAlign:"center"}}>{subjobs.name}: {subjob.took}</Text>
                        )
                }
            }
        }
        return returnObjs;
    }

    render() {
       let completedJobs = this.userJobs;
            return (
                <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.title}> Shift Summary</Text>
                    <View style={{flex:4}}>{this.userJobs()}</View>
                    <View style={{flex:2}}><RectangleButton title="Send email and finish" /></View>
                </View>
            )
    };

}


const styles = StyleSheet.create({
    title: {
        fontFamily: 'System',
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0.35,
        textAlign: "center",
        color: "#000000",
        fontWeight: "bold",
        justifyContent: 'space-between',
        flex:1,
      },
      subtitle: {
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 28,
        letterSpacing: 0.35,
        fontWeight: "bold",
        color: "#000000",
        textAlign: 'center'
      },
      button: {
          bottom: 0,
      }
});

