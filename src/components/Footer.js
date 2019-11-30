import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



class Footer extends Component {
  static propTypes = {
    info: PropTypes.string.isRequired,
    func: PropTypes.any,
    iconName: PropTypes.string,
  }

  render = () => {
    const {info, func, iconName} = this.props;

    if(func) {
      return(
      <View style={styles.containerStyle2}>
          <View style={styles.textContainer}>
            <Text style={styles.infoStyle}>{info}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableHighlight onPress={func} underlayColor='rgba(248, 248, 248, 0.92)'>
            <Icon name={iconName} style={styles.iconStyle} />
            </TouchableHighlight>
          </View>
      </View>
    );
    }else {
      return(
      <View style={styles.containerStyle1}>
        <Text style={styles.infoStyle}>{info}</Text>
      </View>
    );

    }
  }
}
const styles = StyleSheet.create({
    containerStyle1: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(248, 248, 248, 0.92)',
        height: 55,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
    },
    containerStyle2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(248, 248, 248, 0.92)',
        height: 55,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
    },
    infoStyle: {
        fontSize: 10,
        lineHeight: 12,
        color: '#777777',
    },
    iconStyle: {
        fontSize: 18,
        color: '#007AFF'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 27
    },
    iconContainer: {
        flex: 0.07,
    }
});

export default Footer;