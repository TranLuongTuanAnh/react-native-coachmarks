import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image, LayoutAnimation, TouchableOpacity,Button } from 'react-native';

const { width, height } = Dimensions.get('window');
const dogImg = require('../ic_public.png');

export default class TurtorialStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    tooltip: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    position: PropTypes.object,
    tooltipPosition: PropTypes.object,
    onPress: PropTypes.func,
    okEnable: PropTypes.bool,
    onPressMark: PropTypes.func,
    endModal: PropTypes.bool,
    isCircleMask: PropTypes.bool,
  };

  static defaultProps = {
    okEnable: true,
    endModal: false,
    isCircleMask: true,
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const {
      tooltip, visible, position, tooltipPosition, okEnable, onPressMark, endModal, isCircleMask,
    } = this.props;

    const { theme } = this.props.styles;
    const styles = createThemeStyle(theme);

    const firstOverlayWidth = position.left;
    const firstOverlayHeight = height;
    const firstOverlayX = 0;
    const firstOverlayY = 0;

    const secondOverlayWidth = this.props.style.width;
    const secondOverlayHeight = position.top;
    const secondOverlayX = position.left;
    const secondOverlayY = 0;

    const thirdOverlayWidth = width - position.left - this.props.style.width;
    const thirdOverlayHeight = height;
    const thirdOverlayX = position.left + this.props.style.width;
    const thirdOverlayY = 0;

    const fourthOverlayWidth = this.props.style.width;
    const fourthOverlayHeight = height - position.top - this.props.style.height;
    const fourthOverlayX = position.left;
    const fourthOverlayY = position.top + this.props.style.height;
    const lineLogoImg = require('../mask.png');

    return (
      visible &&
        <View style={styles.backArea}>
          <View style={[styles.overlay,
            {
              left: firstOverlayX,
              top: firstOverlayY,
              width: firstOverlayWidth,
              height: firstOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: secondOverlayX,
              top: secondOverlayY,
              width: secondOverlayWidth,
              height: secondOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: thirdOverlayX,
              top: thirdOverlayY,
              width: thirdOverlayWidth,
              height: thirdOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: fourthOverlayX,
              top: fourthOverlayY,
              width: fourthOverlayWidth,
              height: fourthOverlayHeight,
            }]}
          />
          {!endModal &&
            <View style={[styles.tooltip, tooltipPosition]}>
              <Text style={styles.tooltipText}>{tooltip}</Text>
              {okEnable && <Button title="ok" onPress={() => this.OKButton()} />}
            </View>
          }
          {endModal &&
            <View>
              <View style={[styles.tooltip, tooltipPosition, { paddingTop: 0 }]}>
                <Image
                  style={[styles.dogImage, { marginVertical: 0 }]}
                  source={dogImg}
                />
                <Text style={[styles.centeringTxt, { marginTop: 0 }]}>{tooltip}</Text>
              </View>
              <View style={[styles.skipScene, { top: tooltipPosition.top + tooltipPosition.height }]}>
                <Button title="skipAction" onPress={() => this.OKButton()}/>
              </View>
            </View>
          }
          {okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              <View style={[this.props.style, styles.coachMarks]} />
              {isCircleMask &&
                <Image
                  source={lineLogoImg}
                  resizeMode="stretch"
                  style={{
                  flex: 1,
                  width: null,
                  height: null,
                  }}
                />
              }
            </View>
          }
          {!okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              {isCircleMask &&
              <Image
                source={lineLogoImg}
                resizeMode="stretch"
                style={{
                flex: 1,
                width: null,
                height: null,
            }}
              />
            }
              <View style={[this.props.style, styles.coachMarks]}>
                <TouchableOpacity
                  onPress={() => {
                  this.OKButton();
                  onPressMark();
                }}
                  style={{ width: this.props.style.width, height: this.props.style.height }}
                  activeOpacity={1.0}
                />
              </View>
            </View>
          }
        </View>
    );
  }

  OKButton() {
    LayoutAnimation.easeInEaseOut();
    this.props.onPress(this.props.step);
  }
}

const createThemeStyle = theme => StyleSheet.create({
  coachMarks: {
    position: 'absolute',
  },
  tooltip: {
    backgroundColor: theme.content,
    borderColor: theme.coachmarksTooltipBorder,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    alignSelf: 'center',
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tooltipText: {
    color: theme.coachmarksText,
    textAlign: 'center',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  backArea: {
    width,
    height,
    top: 0,
    right: 0,
    backgroundColor: theme.transparent,
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    backgroundColor: theme.coachmarksOverlay,
    position: 'absolute',
  },
  divider: {
    backgroundColor: theme.divider,
    marginTop: 16,
    width: 200,
  },
  button: {
    backgroundColor: theme.transparent,
    width: 150,
  },
  buttonText: {
    color: theme.mainColor,
  },
  dogImage: {
    marginVertical: 16,
    marginTop: 15,
    marginBottom: 10,
    width: 124,
    height: 124,
  },
  centeringTxt: {
    color: theme.coachmarksText,
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 16,
  },
  skipScene: {
    position: 'absolute',
    width: 300,
    height: 70,
    left: (width - 300) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    backgroundColor: theme.transparent,
  },
  skipText: {
    color: theme.coachmarksSkipText,
    fontSize: 13,
  },
});
