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
const dogImg = require('../ic_public.png');

export default class CoachMarks extends Component {
  static propTypes = {
    numberOfSteps: PropTypes.number,
    coachMarks: PropTypes.array,
    visible: PropTypes.bool,
    congratsText: PropTypes.string,
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
    const { theme } = this.props.styles;
    const styles = createThemeStyle(theme);

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
                <Image
                  style={{ width: 150, height: 150 }}
                  source={dogImg}
                />
                <Text style={styles.centeringTxt}>{this.props.congratsText}</Text>
                <Button title="startTutorial" onPress={() => this.startTutorial()} />
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

const createThemeStyle = theme => StyleSheet.create({
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
    backgroundColor: theme.coachmarksOverlay,
  },
  container: {
    width: 300,
    height: 320,
    backgroundColor: theme.content,
    borderColor: theme.coachmarksContainerBorder,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeringTxt: {
    color: theme.coachmarksText,
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
  },
  skipScene: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 70,
  },
  divider: {
    backgroundColor: theme.divider,
    marginVertical: 16,
    width: 268,
  },
  button: {
    backgroundColor: theme.transparent,
  },
  buttonText: {
    color: theme.mainColor,
  },
  skip: {
    backgroundColor: theme.transparent,
  },
  skipText: {
    color: theme.coachmarksSkipText,
    fontSize: 13,
  },
});
