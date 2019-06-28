import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
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
var { connect } = require('react-redux')
import { RNCamera } from 'react-native-camera'

import CameraHeader from './CameraHeader'
import { PermissionsAndroid } from 'react-native'

class CameraView extends Component {
  constructor(props) {
    super(props)
    this.scanFlag = false
    this.state = {
      searchText: '',
      isScanProduct: this.props.isScanProduct,
    }
    this.toteInfo = this.props.toteInfo
    this.scantTote = this.props.scanTote
    this.placeHolder = this.props.placeHolder
  }
  componentWillMount() {
    this.requestCameraPermission()
  }
  componentWillReceiveProps(nextProps) {
    if (this.scanFlag !== nextProps.scanFlag) {
      this.scanFlag = nextProps.scanFlag
      if (!this.props.specialHeader) this.refCameraHeader.focusTextInput()
    }
    if (this.state.isScanProduct != nextProps.isScanProduct) {
      this.setState({ isScanProduct: nextProps.isScanProduct })
      this.setBarcodeTypes(nextProps.isScanProduct)
    }
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
        }
      )
    } catch (err) {}
  }
  setBarcodeTypes(isScanProduct) {

  }

  render() {
    var cameraLib = null
    if (this.props.useCamera) {
      if (Platform.OS == 'ios') {
        cameraLib = (
          <RNCamera
            ref={cam => {
              this.camera = cam
            }}
            style={styles.preview}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            barCodeTypes={[
              RNCamera.Constants.BarCodeType.ean13,
              RNCamera.Constants.BarCodeType.code128,
              RNCamera.Constants.BarCodeType.qr,
            ]}
          />
        )
      } else {
        cameraLib = (
          <BarcodeScanner
            style={{ flex: 1 }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            focusMode={FocusMode.AUTO}
            torchMode={TorchMode.ON}
            cameraFillMode={CameraFillMode.COVER}
            barcodeTypes={
              this.state.isScanProduct
                ? BarcodeType.EAN_13 | BarcodeType.CODE_128
                : BarcodeType.QR_CODE
            }
          />
        )
      }
    }
    return (
      <View style={styles.container}>
        {cameraLib}
        <ScrollView
          style={styles.overlayContainer}
          contentContainerStyle={{ flex: 1 }}
          bounces={false}
        >
          <View style={[styles.overlay]}>
            {this.props.specialHeader ? (
              this.props.specialHeader
            ) : (
              <CameraHeader
                alphabetKey={this.props.alphabetKey}
                toteInfo={this.props.toteInfo}
                singleTab={this.props.singleTab ? true : false}
                scanTote={this.scantTote}
                numberKey = {this.props.numberKey}
                placeHolder={this.props.placeHolder}
                switchScanType={scanType => {
                  if (scanType == 'bookshelf') {
                    this.setBarcodeTypes(false)
                    this.setState({ isScanProduct: false })
                  } else {
                    this.setBarcodeTypes(true)
                    this.setState({ isScanProduct: true })
                  }
                  // this.setBarcodeTypes(!this.state.isScanProduct);
                  this.props.switchScanType(scanType)
                }}
                isScanProduct={this.state.isScanProduct}
                title={this.props.title}
                onClickSearch={searchText => {
                  if (this.props.useCamera) {
                    this.props.onClickSearch(searchText)
                  } else {
                    this.onBarCodeRead({ data: searchText })
                  }
                }}
                goBack={() => this.props.goBack()}
                useCamera={this.props.useCamera}
                ref={input => (this.refCameraHeader = input)}
                hasSwitchScanType={this.props.switchScanType}
                noTextInput={this.props.noTextInput}
                noTopBar={this.props.noTopBar}
              />
            )}
        
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.overlay} />
            <View
              style={{
                width: screenWidth < 300 ? screenWidth - 20 : 300,
                height: 180,
              }}
            />
            <View style={styles.overlay} />
          </View>
          <View style={styles.overlay} />

          {this.props.noFooterBar ? null : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.goBack()
                }}
              >
                <View
                  style={{
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: globalSetting.main_orange_color,
                    backgroundColor: this.props.callBackRightButton
                      ? 'white'
                      : globalSetting.main_orange_color,
                  }}
                >
                  <Text
                    style={{
                      color: this.props.callBackRightButton
                        ? globalSetting.main_orange_color
                        : 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    Quay lại
                  </Text>
                </View>
              </TouchableOpacity>
              {this.props.callBackRightButton ? (
                this.props.rightButton != null ? (
                  this.props.rightButton
                ) : (
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      this.props.callBackRightButton()
                    }}
                  >
                    <View
                      style={{
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: globalSetting.main_orange_color,
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Sách đã scan
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              ) : null}
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
  onBarCodeRead(e) {
    if (!this.scanFlag) {
      this.scanFlag = true
      if (this.props.useCamera) {
        Vibration.vibrate(400)
      }
      this.props.onBarCodeReadCallBack(e)
    }
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
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderColor: 'white',
    borderLeftWidth: 2,
    borderTopWidth: 2,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderColor: 'white',
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderColor: 'white',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderColor: 'white',
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
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
})

function select(store) {
  return {
    useCamera: store.user.useCamera,
  }
}

module.exports = connect(select)(CameraView)
