import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Modal,ListView } from 'react-native'
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';
import globalSetting from '../../common/setting'
import {deleteItem} from '../../actions/deleteItem'
import { connect } from 'react-redux'
import { scan } from '../../actions/scan'


class LogScan extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.message,
      isShowAlertView: this.props.isShowAlertView
    };
  }
  deleteRow(secId, rowId, rowMap,data) {
    let index = this.getIndex(data.sku);
    this.props.dispatch(deleteItem(index));
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.message!=this.props.message){
      this.setState({listViewData: nextProps.message})
    }
    if(nextProps.isShowAlertView!=this.props.isShowAlertView){
      this.setState({isShowAlertView: nextProps.isShowAlertView})
    }
  }
  getIndex(sku) {
    let arr = this.state.listViewData;
    return arr.findIndex(obj => obj.sku === sku);
  }
  getbook(sku) {
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
          this.setState({
            isShowAlertView: false });
          this.props.navigation.navigate('bookInforView',{showRightButton:false})
        }}
      )
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={this.state.isShowAlertView}
        onRequestClose={() => { }}
      >
        <View style={styles.container}>
          <View
            style={{
              width: 310,
              height: 450,
              backgroundColor: 'white',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 18,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                margin: 35,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  textAlign: 'center',
                  color: globalSetting.main_text_color,
                }}
              >
                {this.props.title ? this.props.title : 'Thông báo'}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
                //paddingBottom: 10,
                marginBottom: 40,
              }}
            >

              <Container>
                <Content>
                  <List
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                    renderRow={data =>
                      <ListItem>
                        <TouchableOpacity onPress={() => { this.getbook(data.sku)}} 
                        style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}><Text >{data.sku} - {data.name}</Text></TouchableOpacity>
                      </ListItem>}
                    renderLeftHiddenRow={data =>
                      <Button full onPress={() => alert(data.sku)}>
                        <Icon active name="information-circle" />
                      </Button>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                      <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                        <Icon active name="trash" />
                      </Button>}
                  />
                </Content>
              </Container>

            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18
              }}
              onPress={() => {
                setTimeout(() => {
                  if (this.props.callBack) {
                    this.props.callBack()
                  }
                }, 1)
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
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {this.props.buttonTittle}
                </Text>
              </View>
            </TouchableOpacity>
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
  },
})

function select(store) {
  return {
    book: store.book,
    user: store.user,
  }
}

module.exports = connect(select)(LogScan)