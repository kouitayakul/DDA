import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
} from 'react-native';
import Footer from '../../components/Footer';

export default class EmpJobScreen extends React.Component {
    render() {
        const {navigation} = this.props;
        const jobs = navigation.getParam('jobs');

        if(!jobs.length) {
            return null;
        }

        function Item({jobName}) {
        return (
        <View style={styles.jobName}>
            <Text style={styles.title}>{jobName}</Text>
        </View>
        );
        };

        function _onAdd() {
            console.log('add');
        }
          
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    data={jobs}
                    renderItem={({ item }) => 
                    <Item 
                    jobName={item.name}
                    />
                    }
                    keyExtractor={item => item.jobId.toString()}
                />
            </SafeAreaView>
            <Footer 
            info={`${jobs.length} Jobs`}
            func= {_onAdd}
            iconName={'plus'}
            />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    safeAreaView: {
        flex: 1
    },
    jobName: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
        paddingRight: 15
      },
    title: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: "#000000"
    },
});
