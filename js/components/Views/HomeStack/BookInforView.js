import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import PriceFormat from '../../../common/PriceFormat'
import globalSetting from "../../../common/setting"

class BookInforView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.book.bookInfor,
    }
  }
  
  componentDidMount() {
    console.log(this.props.book)
  }

  render() {
    let price = PriceFormat.formatTotal(this.state.data.price);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
              style={{ width: 280, height: 280 }}
              source={{uri: this.state.data.image}}
              resizeMode="contain"
            />
          <Text style={{fontSize: 15, color: 'black'}}>{this.state.data.name}</Text>
        </View>
        <View style={styles.row1}>
            <View>
              <Text style={{fontWeight: "bold",color: 'black'}}>{this.state.data.sku}</Text>
            </View>
            <View>
              <Text style={{color: globalSetting.main_orange_color,fontWeight: "bold", textAlign: 'right'}}>{price} / <Text style={{fontWeight: "bold",color: '#333', textAlign: 'right'}}>{this.state.data.unit}</Text> </Text>
            </View>
        </View>
        <View style={styles.row2}>
            <View style={[styles.box]}></View>
            <View style={[styles.box]}></View>
            <View style={[styles.box]}></View>
        </View>
        <View style={styles.row3}>
            <View style={{flex: 1,alignItems: 'center',}}>
            <TouchableOpacity onPress = {()=>{ this.props.navigation.pop(2) }}>
          <Text style={{
          color: globalSetting.main_orange_color, margin: 11}}>Quay lại</Text>
        </TouchableOpacity>
            </View>
            <View style={{flex: 1,alignItems: 'center',backgroundColor: globalSetting.main_orange_color}}>
            <TouchableOpacity onPress = {()=>{this.props.navigation.goBack()}}>
          <Text style={{ color: 'white', margin: 11}}>Scan tiếp sách</Text>
        </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white",
    justifyContent: 'space-between',
  },
  row: {
    flex: 6,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  row1: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: globalSetting.main_orange_color
  },
  row2: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  row3: {
    flex: .9,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: globalSetting.main_orange_color
  },
  box: {
    flex: 1,
    height: 150,
  }
});

function select(store) {
  return {
    book: store.book,
  }
}

module.exports = connect(select)(BookInforView)
