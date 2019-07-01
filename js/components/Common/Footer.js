import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import globalSetting from '../../common/setting'

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.isShowConfirmView,
    }
  }

  render() {
    let textColor = this.props.showRightButton
      ? { color: globalSetting.main_orange_color }
      : { color: 'white' }

    let rightButton = this.props.showRightButton ? (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          this.props.callBackRight()
        }}
      >
        <View style={styles.rightViewButton}>
          <Text
            style={[
              {
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              },
            ]}
          >
            {this.props.rightText}
          </Text>
        </View>
      </TouchableOpacity>
    ) : null
    let leftButton = (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          this.props.callBackLeft
            ? this.props.callBackLeft()
            : this.props.navigation.goBack()
        }}
      >
        <View
          style={
            this.props.showRightButton
              ? styles.leftViewButton
              : styles.rightViewButton
          }
        >
          <Text
            style={[
              {
                color: globalSetting.main_orange_color,
                fontSize: 15,
                fontWeight: 'bold',
              },
              textColor,
            ]}
          >
            {this.props.leftText ? this.props.leftText : 'Quay lại'}
          </Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View style={{ height: 50, flexDirection: 'row' }}>
        {leftButton}
        {rightButton}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productText: {
    color: globalSetting.main_text_color,
  },
  leftViewButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: globalSetting.main_orange_color,
    backgroundColor: 'white',
  },
  rightViewButton: {
    backgroundColor: globalSetting.main_orange_color,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})