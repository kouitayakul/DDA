import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../constants/API';
import Modal from 'react-native-modal';
import { Header } from 'react-native-elements';

export default class EmpAddJobs extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        cancel: PropTypes.any.isRequired,
        done: PropTypes.any.isRequired,
        code: PropTypes.number.isRequired
    }
    state = {
        jobs: []
    }

    async componentDidMount() {
        try {
            const apiJobs = await fetch(`${API.endpoint}/jobs`);
            const jobsJson = await apiJobs.json();
            const jobs = jobsJson.map(job => {
                job.isSelect = false;
                return job;
            })
            this.setState({jobs});
        } catch (err) {
            console.log(err);
        }
    }

    selectItem(job) {
        job.isSelect = !job.isSelect;
        const index = this.state.jobs.findIndex(
            item => job.jobId === item.jobId
        );

        this.state.jobs[index] = job;
        this.setState({
            jobs: this.state.jobs
        });
        
    }

    async _addSelectedJobs() {
        const {jobs} = this.state;
        let body = {};

        for(let i = 0; i < jobs.length; i++) {
            if(jobs[i].isSelect) {
                body.jobId = jobs[i].jobId;
                try {
                    await fetch(`${API.endpoint}/users/${this.props.code}/jobs`, {
                        method: 'POST',
                        body: JSON.stringify(body)
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        this.props.done();
    }

    renderItem(job) {
        return(
            <TouchableHighlight onPress={() => this.selectItem(job)}>
                <View style={styles.job}>
                    <View>
                        <Text style={styles.title}>{job.name}</Text>
                    </View>
                    <Icon name='check-circle' style={[styles.icon, {color: job.isSelect ? '#B6BF00' : '#C7C7CC'}]}/>
                </View>
            </TouchableHighlight>
        );
    }

    renderHeader = () => {
        return(
            <Header 
                backgroundColor='rgb(255, 255, 255)'
                leftComponent={ 
                <TouchableHighlight underlayColor='rgba(255, 255, 255, 0.92)' onPress={this.props.cancel}>
                    <Text style={styles.headerText}>Cancel</Text>
                </TouchableHighlight>
            }
                rightComponent={ 
                <TouchableHighlight underlayColor='rgba(255, 255, 255, 0.92)' onPress={() => this._addSelectedJobs()}>
                    <Text style={styles.headerText}>Done</Text>
                </TouchableHighlight>}
            />
        );
    }

    render() {
        const {jobs} = this.state;
        const {isVisible} = this.props;

        if(!jobs.length) {
            return null;
        }

        return (
            <Modal isVisible={isVisible} style={styles.modal}>
                <SafeAreaView>
                <View>
                    <FlatList 
                    data={jobs}
                    renderItem={({item}) => this.renderItem(item)}
                    ListHeaderComponent={this.renderHeader}
                    stickyHeaderIndices={[0]}
                    keyExtractor={item => item.jobId.toString()}
                    extraData={this.state}
                    />
                </View>
                </SafeAreaView>
            </Modal>
        )

    }
}

const styles = StyleSheet.create({
    job: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'rgba(128,128,128, 0.2)',
        borderTopWidth: 0.2,
        borderTopColor: 'rgba(128,128,128, 0.2)',
        paddingRight: 15,
        paddingTop: 35
    },
    title: {
        fontFamily: 'System',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: "#000000"
    },
    icon: {
        fontSize: 20
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0
    },
    headerText: {
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: '#007AFF'
    }
});