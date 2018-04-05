import React, { Component } from 'react';

import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

import PropTypes from 'prop-types';

import I18n from 'react-native-i18n';


import TurtorialStep from './tutorialStep';

const { width, height } = Dimensions.get('window');

export default class CoachMarks extends Component {
  static propTypes = {
    numberOfSteps: PropTypes.number,
    coachMarks: PropTypes.array,
    visible: PropTypes.bool,
    congratsText: PropTypes.string,
    congratsImage: PropTypes.number,
    onClose: PropTypes.func,
  }

  state = {
    stepStates: [],
    isStarting: false,
    isEnding: false,
  }

  componentDidMount() {
    this.setDefaultStepStates();
  }

  render() {
    console.log(this.props.congratsImageUri);
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible && !this.state.isEnding}
        onRequestClose={() => {
          this.dismiss();
        }}
      >
        {!this.state.isStarting &&
          <View style={styles.visibleContainer}>
            <TouchableOpacity style={styles.backArea} activeOpacity={1} />
            <View style={styles.scene}>
              <View style={styles.container}>
               {this.props.congratsImage &&
                 <Image
                   style={{ width: 150, height: 150 }}
                   source={this.props.congratsImage}
                 />
               }
                <Text style={styles.centeringTxt}>{this.props.congratsText}</Text>
                <View style={styles.divider}/>
                <View style = {styles.button}>
                  <Button title="startTutorial" onPress={() => this.startTutorial()} />
                </View>
              </View>
              <View style={styles.skipScene}>
                <Button title="skipTutorial" onPress={() => this.dismiss()} />
              </View>
            </View>
          </View>
        }
        {this.renderCM()}
      </Modal>
    );
  }

  dismiss() {
    this.setState({ isEnding: true });
    this.props.onClose();
  }

  startTutorial() {
    this.setState({ isStarting: true });
    this.startCoachMarks();
  }

  setDefaultStepStates() {
    const states = [];
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      states.push(0);
    }
    this.setState({ stepStates: states });
  }

  startCoachMarks() {
    const states = this.state.stepStates;
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === 0) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }

    this.setState({ stepStates: states });
  }

  OKBtn(step, onPressOK) {
    const states = this.state.stepStates;
    if (step === this.props.numberOfSteps - 1) {
      this.dismiss();
    }
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === step + 1) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }
    this.setState({ stepStates: states });

    if (onPressOK) {
      onPressOK();
    }
  }

  renderCM() {
    const {
      numberOfSteps, coachMarks,
    } = this.props;
    const CM = [];
    for (let i = 0; i < numberOfSteps; i++) {
      const state = this.state.stepStates[i];
      CM.push(<TurtorialStep
        key={i}
        step={i}
        tooltip={coachMarks[i].tooltip}
        style={coachMarks[i].style}
        position={coachMarks[i].position}
        tooltipPosition={coachMarks[i].tooltipPosition}
        visible={state !== 0}
        onPress={step => this.OKBtn(step, coachMarks[i].onPressOK)}
        styles={this.props.styles}
        okEnable={coachMarks[i].okEnable}
        onPressMark={coachMarks[i].onPressMark}
        endModal={coachMarks[i].endModal}
        isCircleMask={coachMarks[i].isCircleMask}
      />);
    }
    return (
      <View>
        {CM}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visibleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArea: {
    width,
    height,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,1)',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeringTxt: {
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    paddingHorizontal:16,
    paddingVertical:16,
  },
  skipScene: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 70,
  },
  divider: {
    backgroundColor: 'rgba(0,0,0,1)',
    width: 268,
    height: 1,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical:8,
  },
  buttonText: {
    color: 'rgba(0,0,0,1)',
  },
  skip: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  skipText: {
    color: 'rgba(0,0,0,1)',
    fontSize: 13,
  },
});
