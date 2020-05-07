import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import Modal from "react-native-modal";
import { Header } from "react-native-elements";

const windowHeight = Dimensions.get("window").height;

export default class AdminAddEmployers extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    cancel: PropTypes.any.isRequired,
    done: PropTypes.any.isRequired,
    code: PropTypes.number.isRequired,
    existEmployers: PropTypes.array.isRequired
  };
  state = {
    employers: [],
    error: null,
    isLoaded: false
  };

  async componentDidMount() {
    try {
      const apiEmployers = await fetch(`${API.endpoint}/companies`);
      const employersJson = await apiEmployers.json();
      const employers = employersJson.map(employer => {
        employer.isSelect = false;
        return employer;
      });

      this.setState({ employers, isLoaded: true });
      this.prepExistEmployers();
    } catch (error) {
      this.setState({ error });
    }
  }

  prepExistEmployers() {
    let existEmployers = this.props.existEmployers;
    for (let i = 0; i < existEmployers.length; i++) {
      let index = this.state.employers.findIndex(
        employer => existEmployers[i].companyId === employer.companyId
      );
      this.state.employers[index].isSelect = true;
    }
  }

  selectItem(employer) {
    employer.isSelect = !employer.isSelect;

    const index = this.state.employers.findIndex(
      item => employer.companyId === item.companyId
    );

    this.state.employers[index] = employer;
    this.setState({
      employers: this.state.employers
    });
  }

  async editSelectedEmployers() {
    const { employers } = this.state;
    let existEmployers = this.props.existEmployers;

    for (let i = 0; i < employers.length; i++) {
      if (employers[i].isSelect) {
        await this.addEmployers(employers[i]);
      } else {
        let index = existEmployers.findIndex(
          exEmp => exEmp.companyId === employers[i].companyId
        );
        if (index !== -1) {
          await this.removeEmployers(employers[i]);
        }
      }
    }
    this.props.done();
  }

  async addEmployers(employer) {
    let body = {};

    body.companyId = employer.companyId;
    try {
      await fetch(`${API.endpoint}/users/${this.props.code}/companies`, {
        method: "POST",
        body: JSON.stringify(body)
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  onCancel() {
    let { employers } = this.state;
    let existEmployers = this.props.existEmployers;

    for (let i = 0; i < employers.length; i++) {
      let index = existEmployers.findIndex(
        exEmp => exEmp.companyId === employers[i].companyId
      );
      if (index === -1) {
        employers[i].isSelect = false;
      } else {
        employers[i].isSelect = true;
      }
    }
    this.props.cancel();
  }

  async removeEmployers(employer) {
    let body = {};
    body.companyId = employer.companyId;
    try {
      await fetch(`${API.endpoint}/users/${this.props.code}/companies`, {
        method: "DELETE",
        body: JSON.stringify(body)
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  renderItem(employer) {
    return (
      <TouchableHighlight onPress={() => this.selectItem(employer)}>
        <View style={styles.employer}>
          <View>
            <Text style={styles.title}>{employer.name}</Text>
          </View>
          <Icon
            name="check-circle"
            style={[
              styles.icon,
              { color: employer.isSelect ? "#B6BF00" : "#C7C7CC" }
            ]}
          />
        </View>
      </TouchableHighlight>
    );
  }

  renderHeader = () => {
    return (
      <Header
        backgroundColor="rgb(255, 255, 255)"
        leftComponent={
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.92)"
            onPress={() => this.onCancel()}
          >
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableHighlight>
        }
        rightComponent={
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.92)"
            onPress={() => this.editSelectedEmployers()}
          >
            <Text style={styles.headerText}>Done</Text>
          </TouchableHighlight>
        }
      />
    );
  };

  render() {
    const { employers, error, isLoaded } = this.state;
    const { isVisible } = this.props;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <Modal isVisible={isVisible} style={styles.modal}>
          <SafeAreaView>
            <View>
              <FlatList
                data={employers}
                renderItem={({ item }) => this.renderItem(item)}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
                keyExtractor={item => item.companyId.toString()}
                extraData={this.state}
                style={{
                  minHeight: windowHeight,
                  backgroundColor: "rgba(255, 255, 255, 0.92)"
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  employer: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(128,128,128, 0.2)",
    borderTopWidth: 0.2,
    borderTopColor: "rgba(128,128,128, 0.2)",
    paddingRight: 15,
    paddingTop: 35
  },
  title: {
    fontFamily: "System",
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
    justifyContent: "flex-end",
    margin: 0
  },
  headerText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF"
  }
});
