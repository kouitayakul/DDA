import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { forEach } from 'iterall';

export default class EmployeesScreen extends React.Component {
    state = {
        users: [],
    }

    async componentDidMount() {
        try {
            const apiCallUsers = await fetch('https://8izkm790rj.execute-api.ca-central-1.amazonaws.com/ddaBeta/users');
            const res = await apiCallUsers.json();
            const users = JSON.parse(res.body);
            this.setState({users});
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        const {users} = this.state;
        const {navigate} = this.props.navigation;

        if(!users.length) {
            return null;
        }

        
        function _onPressButton(code) {
            navigate('EmpUserScreen', {
                code
            });
        };

        function Item({user}) {
        return (
            <TouchableHighlight onPress={() => _onPressButton(user.code)}>
                <View style={styles.userName}>
                    <View>
                    <Text style={styles.title}>{user.name}</Text>
                    </View>
                    <Icon name='angle-right' style={styles.icon}/>
                </View>
            </TouchableHighlight>
        );
        };
          
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    data={users}
                    renderItem={({ item }) => 
                    <Item 
                    user={item}
                    />
                    }
                    keyExtractor={item => item.code.toString()}
                />
            </SafeAreaView>
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
    userName: {
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
    icon: {
        fontSize: 20,
        color: '#C7C7CC'
    }
});
