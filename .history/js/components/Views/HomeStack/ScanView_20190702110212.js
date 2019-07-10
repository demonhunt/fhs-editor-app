import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Modal,TouchableHighlight,Alert } from 'react-native'
import globalSetting from '../../../common/setting'
import CameraView from './Camera/CameraView'
import {showToast} from "../../../actions"
import { connect } from 'react-redux'
import { scan } from '../../../actions/scan'
import Footer from '../../Common/Footer'
import LogScan from '../LogScan'
import AlertComfirmBlock from '../../Common/AlertConfirmBlock'


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
      modalVisible: false,
      isShowConfirmBlock: false,
      logscan: this.props.book.logscan
    }
    this.isScanProduct = true
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
          //this.props.dispatch(showToast("Không tồn tại sản phẩm"))
          this.setState({
            isShowConfirmBlock: true });
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  openmodal() {
    this.setModalVisible(true);
  }
  closemodal() {
    this.setModalVisible(false);
  }
  showlogscan(logscans){
    var result = null;
    if (logscans.length >0) {
      result = logscans.map((item, index) => {
        if(item.flag == true){
          return(
            <Text>
              {item.sku}
            </Text>
          );
        }
        else{
          return(
            <Text style={{color:'red'}}>
              {item.sku}
            </Text>
          );
        }
      });
    }
    return result;
  }

  switchScanType(type = 'product') {
    if (type == 'bookshelf') {
      this.isScanProduct = false
    } else {
      this.isScanProduct = true
    }
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
          scanFlag={this.scanFlag}
          goBack={() => this.goBack()}
          isScanProduct={this.isScanProduct}
          onClickSearch={searchText => this.onClickSearch(searchText)}
          // title={this.isScanProduct ? 'Scan Sách' : 'Scan Kệ'}
          title={['Scan sách', 'Scan kệ']}
          switchScanType={type => {
            this.switchScanType(type)
          }}
          noFooterBar = {true}
          isScanProduct={this.isScanProduct}
          callBackRightButton={() => {
            this.goToConfirmView()
          }}
        />
      )
    }

    return (
      <View style={styles.container}>
        <LogScan message={this.showlogscan(this.state.logscan)} title={'Lịch sử thao tác'} isShowAlertView={this.state.modalVisible} buttonTittle={'Close'} callBack={() => { this.closemodal() }}></LogScan>
        {camera}
        <AlertComfirmBlock isShowConfirmBlock={this.state.isShowConfirmBlock}
                            message={"Mã SKU không đúng. Bạn có muốn SCAN tiếp?"} 
                            leftTitle={"Có"} rightTitle={"Không"} 
                            callBackRightButton={() => { this.setState({isShowConfirmBlock: false}) }} 
                            callBack={() => { this.setState({isShowConfirmBlock: false}) }}>
        </AlertComfirmBlock>
        <Footer navigation = {this.props.navigation} showRightButton={'orange'} rightText={'Lịch sử'} callBackRight={() => { this.openmodal() }}></Footer>
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
    book: store.book,
  }
}

module.exports = connect(select)(ScanSKU)
