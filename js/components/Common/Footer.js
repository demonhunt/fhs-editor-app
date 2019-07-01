import React, { Component } from 'react'
import { Modal,View, Text, TouchableOpacity, StyleSheet,Alert,TouchableHighlight} from 'react-native'
import globalSetting from '../../common/setting'
import { connect } from 'react-redux'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.isShowConfirmView,
      modalVisible: false,
      data: this.props.book.logscan,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
          this.setModalVisible(true);
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
            {this.props.rightText ? this.props.rightText : 'Lịch sử'}
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
            : this.props.goBack()
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
        <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
        {leftButton}
        {rightButton}
      </View>
    )
  }
  showlogscan(logscan) {
    var result = null;
    if (logscan.length > 0) {
      result = logscan.map((item, index) => {
            return (
                <Text key={index}>{item.sku}</Text>
            );
        });
    }
    return result;
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

function select(store) {
  return {
    book: store.book,
  }
}

module.exports = connect(select)(Footer)