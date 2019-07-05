import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native'

import Dimensions from 'Dimensions'
const screenWidth = Dimensions.get('window').width
import globalSetting from '../../../../common/setting'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class CameraHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      isScanProduct: this.props.isScanProduct,
      clearInput: 'false',
      toteInfo: this.props.toteInfo,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isScanProduct != nextProps.isScanProduct) {
      this.setState({
        isScanProduct: nextProps.isScanProduct,
        toteInfo: nextProps.toteInfo,
      })
    }
  }

  focusTextInput() {
    if (!this.props.useCamera) {
      this.refTextInput.clear()
      this.setState({ searchText: '' })
      this.refTextInput.focus()
    }
  }

  render() {
    var header
    if (this.props.singleTab) {
      header = null
    } else if (this.props.hasSwitchScanType) {
      header = (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.props.goBack()
            }}
          >
            <MaterialIcons name={'arrow-back'} size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ isScanProduct: true })
              this.props.switchScanType('product')
              this.refTextInput.focus()
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: this.state.isScanProduct ? 2 : null,
                borderBottomColor: globalSetting.main_orange_color,
              }}
            >
              <Text
                style={{
                  color: this.state.isScanProduct
                    ? globalSetting.main_orange_color
                    : 'white',
                  fontWeight: this.state.isScanProduct ? 'bold' : null,
                  fontSize: this.state.isScanProduct ? 16 : 14,
                }}
              >
                {this.props.title[0]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ isScanProduct: false })
              this.props.switchScanType('bookshelf')
              this.refTextInput.focus()
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: this.state.isScanProduct ? null : 2,
                borderBottomColor: globalSetting.main_orange_color,
              }}
            >
              <Text
                style={{
                  color: this.state.isScanProduct
                    ? 'white'
                    : globalSetting.main_orange_color,
                  fontWeight: this.state.isScanProduct ? null : 'bold',
                  fontSize: this.state.isScanProduct ? 14 : 16,
                }}
              >
                {this.props.title[1]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else if (!this.props.noTopBar) {
      header = (
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              width: 50,
              height: globalSetting.navbar_height,
              justifyContent: 'center',
              marginTop: -globalSetting.navbar_height,
            }}
            onPress={() => {
              this.props.goBack()
            }}
          >
            <MaterialIcons name={'arrow-back'} size={22} color="white" />
          </TouchableOpacity>
        </View>
      )
    } else {
      header = null
    }
    return this.props.singleTab ? (
      <View style={styles.container}>
        {this.props.noTextInput ? null : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                flex: 1,
              }}
            >
              <TextInput
                ref={input => {
                  this.refTextInput = input
                }}
                style={{ height: 40, color: 'white', flex: 1 }}
                onChangeText={text => {
                  this.setState({ searchText: text })
                }}
                placeholder={this.props.placeHolder}
                keyboardType={
                  this.state.isScanProduct||this.props.numberKey
                    ? this.props.alphabetKey
                      ? 'default'
                      : 'numeric'
                    : 'default'
                }
                autoCapitalize={'characters'}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'white'}
                value={this.state.searchText}
                // onEndEditing={() => {
                //   if (this.state.searchText) {
                //     this.refTextInput.clear()
                //     this.props.onClickSearch(this.state.searchText)
                //   }
                // }}
                autoFocus={this.props.useCamera ? false : true}
              />
            </View>

            <TouchableOpacity
              onPress={searchText => {
                if (this.state.searchText) {
                  this.refTextInput.clear()
                  this.props.onClickSearch(this.state.searchText)
                }
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  height: 40,
                  borderColor: globalSetting.main_orange_color,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderWidth: 2,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                >
                  {this.state.isScanProduct ? 'Tìm sách' : 'Nhập'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ) : (
      <View style={styles.container}>
        {header ? (
          <View style={{ height: globalSetting.navbar_height }}>{header}</View>
        ) : null}
        {this.props.noTextInput ? null : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                flex: 1,
              }}
            >
              <TextInput
                ref={input => {
                  this.refTextInput = input
                }}
                style={{ height: 40, color: 'white', flex: 1 }}
                onChangeText={text => {
                  this.setState({ searchText: text })
                }}
                placeholder={this.props.placeHolder}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'white'}
                keyboardType={
                  this.state.isScanProduct||this.props.numberKey
                    ? this.props.alphabetKey
                      ? 'default'
                      : 'numeric'
                    : 'default'
                }
                autoCapitalize={'characters'}
                value={this.state.searchText}
                // onEndEditing={() => {
                //   if (this.state.searchText) {
                //     this.refTextInput.clear()
                //     this.props.onClickSearch(this.state.searchText)
                //   }
                // }}
                autoFocus={this.props.useCamera ? false : true}
              />
            </View>

            <TouchableOpacity
              onPress={searchText => {
                if (this.state.searchText) {
                  this.refTextInput.clear()
                  this.props.onClickSearch(this.state.searchText)
                }
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  height: 40,
                  borderColor: globalSetting.main_orange_color,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderWidth: 2,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                >
                  {this.state.isScanProduct ? 'Tìm sách' : 'Nhập'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {this.props.toteInfo ? (
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <View>
              <Text style={styles.infoText}>
                Khay S: {this.props.toteInfo[0].small}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>
                Khay M: {this.props.toteInfo[0].med}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>
                Khay L: {this.props.toteInfo[0].large}
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>
                Khay XL: {this.props.toteInfo[0].xlarge}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: globalSetting.homecmsBgColor,
  },
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  backButton: {
    alignItems: 'center',
    width: 50,
    height: globalSetting.navbar_height,
    justifyContent: 'center',
    // marginTop: -globalSetting.navbar_height
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
    flex: 1,
  },
  infoText: {
    fontSize: 20,
    marginLeft: 20,
    color: globalSetting.main_orange_color,
  },
})
