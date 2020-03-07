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
            allJobs: []
    }

    async componentDidMount() {
        console.log("Got to Shift Summary")
        try {
            const shift = await AsyncStorage.getItem('shift');
            console.log(shift + "i got here!!!");
            const shiftJobs = JSON.parse(shift);
            console.log(shiftJobs)
            this.setState({ allJobs: shiftJobs});
        } catch(err) {
            this.setState({error: err});
        }
        
    };
    
    userJobs = async () => {
        console.log("I got here");
        console.log(this.state.allJobs);
        var returnObjs = [];
        for (let job of this.state.allJobs) {
            console.log(job);
            value = job.name;
            returnObjs.push(
                <Text style={styles.subtitle}> {value} </Text>
            )
            console.log(value);
            try {
                let firstSubJobs = await AsyncStorage.getItem(value);
                subjobs = JSON.parse(firstSubJobs);
                console.log(subjobs);
                    for (let subjob of subjobs) {
                            returnObjs.push(
                                <Text style={{textAlign:"center"}}>{subjobs.name}: {subjob.took}</Text>
                            )
                        }
            } catch (err) {
                this.setState({error: err});
            }
        }
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

