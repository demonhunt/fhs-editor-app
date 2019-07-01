import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import globalSetting from '../../../common/setting'
import CameraView from './Camera/CameraView'
import {showToast} from "../../../actions"
import { connect } from 'react-redux'
import { scan } from '../../../actions/scan'
import Footer from '../../Common/Footer'

class ScanSKU extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.onBarCodeRead = this.onBarCodeRead.bind(this)
    this.inputData = {
      bookshelfId: null,
    }
    this.state = {
      isShowSuccess: false,
      isShowCamera: true,
    }
    this.isScanProduct = false
    this.scanFlag = false
    this.locationData = {}
    this.isShowShelfToast = false,
    this.listener = this.props.navigation.addListener("willFocus", () => {
      this.turnOnCamera();
      });

  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.listener.remove();
  }

  turnOffCamera() {
    if (!this.scanFlag) {
      this.scanFlag = true
      this.setState({ isShowCamera: false })
    }
  }

  turnOnCamera() {
    this.scanFlag = false
    this.setState({ isShowCamera: true })
  }
  checkbook(sku) {
    let data = {
      sessionId: this.props.user.userInfor.token,
      bookstoreId: this.props.user.userInfor.bookstoreId,
      sku: sku,
      bundleId: 0,
    }
      this.props.dispatch(scan(data.sessionId, data.bookstoreId, data.sku))
      .then(res => {
        if(res == "scansuccess")
        {
          this.props.navigation.navigate('bookInforView')
        }}
      )
      .catch(e =>{
        if(e == "scanfail")
        {
          this.props.dispatch(showToast("Không tồn tại sản phẩm"))
          this.turnOnCamera();
        }
        else {
        }
      })
  }
  
  async onBarCodeRead(e){
    this.checkbook(e.data);
  }

  async onClickSearch(text){
    this.checkbook(text);
  }
  goBack(){
      this.props.navigation.goBack()
  }

  render() {
    var camera = <View style={{ flex: 1 }} />
    if (
      this.state.isShowSuccess ||
      (!this.state.isShowSuccess && !this.scanFlag)
    ) {
      camera = (
        <CameraView
          onBarCodeReadCallBack={e => {
            this.onBarCodeRead(e)
          }}
          onClickSearch={
              text=>this.onClickSearch(text)
          }
          scanFlag={this.scanFlag}
          goBack={() => this.goBack()}
          isScanProduct={ true } //false = QR, true = barcode
          title={['Quét SKU']}
          noFooterBar = {true}
          noTextInput={false}
        />
      )
    }

    return (
      <View style={styles.container}>
        {camera}
        <Footer showRightButton={'orange'} goBack={() => this.goBack()}></Footer>
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
    marginTop: -globalSetting.navbar_height,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    user: store.user,
  }
}

module.exports = connect(select)(ScanSKU)
