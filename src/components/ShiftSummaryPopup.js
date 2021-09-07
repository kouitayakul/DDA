import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View , Dimensions}from 'react-native';
import  RectangleButton  from './RectangleButton';
import BottomDrawer from 'rn-bottom-drawer';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ShiftSummary = () => {
    const data = {
        "Make Coffee":[{"Grind coffee": "2 minutes"}, {"Put coffee in": "1 minute"}], 
        "Clean around the Shop": [{"Clean the counter": "4 minutes"}]
    };
    const userJobs = () => {
        let returnObjs = [];
        for (let [key, value] of Object.entries(data) ) {
            returnObjs.push(
                <Text style={styles.subtitle}> {key} </Text>
            )
            value.forEach(element => {
                for (let [key2, value2] of Object.entries(element)) {
                        returnObjs.push(
                            <Text style={{textAlign:"center"}}>{key2}: {value2}</Text>
                        )
                    }
            });
        }

        return (
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={styles.title}> Shift Summary</Text>
                <View style={{flex:4}}>{returnObjs}</View>
                <View style={{flex:2}}><RectangleButton title="Send email and finish" /></View>
            </View>
        )
    }

    return (
        <BottomDrawer
        containerHeight={WINDOW_HEIGHT}
        downDisplay={WINDOW_HEIGHT*0.8}
        startUp={false}
        >
        {userJobs()}
        </BottomDrawer>
    )

}


export default ShiftSummary;

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

