import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native'
import globalSetting from '../../common/setting'
var { connect } = require('react-redux')

export default class AlertConfirmBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.isShowConfirmView,
    }
  }

  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={this.props.isShowConfirmBlock}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View
            style={{
              width: this.props.width?this.props.width:290,
              backgroundColor: 'white',
              justifyContent: 'space-around',
              borderRadius: 10,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {this.props.messageBlock ? (
                this.props.messageBlock
              ) : (
                <Text
                  style={{
                    color: globalSetting.main_text_color,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textAlign: 'center',
                  }}
                >
                  {this.props.message}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 0.5,
                  borderTopColor: globalSetting.drawer_line_color,
                }}
              />
            </View>
            <View style={{ height: 50, flexDirection: 'row' }}>
              {this.props.noLeftButton?null:<TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (this.props.callBack) {
                    this.props.callBack()
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: globalSetting.main_orange_color,
                      fontSize: 15,
                    }}
                  >
                    {this.props.leftTitle}
                  </Text>
                </View>
              </TouchableOpacity>}
              <View
                style={{
                  backgroundColor: globalSetting.drawer_line_color,
                  width: 1,
                }}
              />
              <TouchableOpacity
                style={
                  this.props.changeColor
                    ? {
                        backgroundColor: globalSetting.main_orange_color,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomRightRadius: 10
                      }
                    : {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                }
                onPress={() => {
                  if (this.props.callBackRightButton) {
                    this.props.callBackRightButton()
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={
                      this.props.changeColor
                        ? { color: 'white', fontWeight: 'bold', fontSize: 15 }
                        : {
                            color: globalSetting.main_orange_color,
                            fontSize: 15,
                          }
                    }
                  >
                    {this.props.rightTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 10
  },
  productText: {
    color: globalSetting.main_text_color,
  },
})
