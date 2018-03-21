/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import CoachMarks from './source/coachmarks'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const { width, height } = Dimensions.get('window');
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topChildView}>
          <Image style={styles.topChildItem}
            source={require('./ic_touch.png')}
          />
          <Image style={styles.topChildItem}
            source={require('./ic_public.png')}
          />
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <View style={styles.bottomChildView}>
          <Image style={styles.bottomChildItem}
            source={require('./ic_laptop.png')}
          />
          <Image style={styles.bottomChildItem}
            source={require('./ic_perm_phone_msg.png')}
          />
          <Image style={styles.bottomChildItem}
            source={require('./ic_person.png')}
          />
          <Image style={styles.bottomChildItem}
            source={require('./ic_skip_next.png')}
          />
        </View>
        {this.renderCoachMarks()}
      </View>
    );
  }
   renderCoachMarks() {
     const CM = [];
     CM.push(
      {
        tooltip: 'The first steps of your tutorial',
        position: {
          top:35,
          left: width - 58,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: 110,
          left: (width - 300) / 2,
        },
        style: {
          width: 50,
          height: 50,
          borderRadius: 30,
        },
      },
      {
        tooltip: 'The second steps of your tutorial',
        position: {
          top:height - 60,
          left: width - 85,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 200,
          left: (width - 300) / 2,
        },
        style: {
          width: 60,
          height: 60,
          borderRadius: 30,
        },
      },
      {
        tooltip: 'The third steps of your tutorial',
        position: {
          top:height - 60,
          left: width - 155,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 200,
          left: (width - 300) / 2,
        },
        style: {
          width: 60,
          height: 60,
          borderRadius: 30,
        },
      },
    );
    return (
          <CoachMarks
            {...this.props}
            numberOfSteps={CM.length}
            coachMarks={CM}
            congratsText="congratsText"
            visible={true}
            onClose={() => {}}
          />)
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop:100,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bottomChildView: {
    flexDirection: 'row',
    top: height / 2 - 40,
  },
  bottomChildItem: {
    width: 60,
    height: 60,
    margin: 5,
  },
  topChildView: {
    flexDirection: 'row',
    top: 30,
    width: width,
    justifyContent: 'flex-end',
  },
  topChildItem: {
    width: 24,
    height: 24,
    margin: 20,
  },
});
