import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native'
import globalSetting from '../../common/setting'

const extractKey = ({ id }) => id

export default class LogScan extends Component {
  constructor(props) {
    super(props)
  }
  renderItem = ({ item }) => {
    if (item.name == ''){
      return (
        <Text style={styles.row1}>
          {item.sku} - {item.name}
        </Text>
      )
    }
    else {
      return (
        <Text style={styles.row2}>
          {item.sku} - {item.name}
        </Text>
      )
    }
  }
  render() {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={this.props.isShowAlertView}
        onRequestClose={() => {}}
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
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 20,
                margin:20,
                marginBottom:80
              }}
            >
              <View>
                
              <FlatList
        style={styles.container1}
        data={this.props.message}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 0.5,
                  borderTopColor: globalSetting.drawer_line_color,
                  paddingBottom:15
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
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
                    color: globalSetting.main_orange_color,
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
  container1: {
    flex: 1,
  },
  row1: {
    padding: 10,
    marginBottom: 3,
    color: 'green',
    fontWeight: 'bold',
    borderTopWidth: 0, 
    borderBottomWidth: 0
  },
  row2: {
    padding: 10,
    marginBottom: 3,
    color: '#000000',
    fontWeight: 'bold',
    borderTopWidth: 0, 
    borderBottomWidth: 0
  }
})
