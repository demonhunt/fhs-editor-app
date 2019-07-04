import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import PriceFormat from '../../../common/PriceFormat'
import globalSetting from "../../../common/setting"
import Footer from '../../Common/Footer'
import {savehistory} from '../../../actions/savehistory'
import Header from '../../Common/HeaderCommon'

class BookInforView extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.book.bookInfor,
      arrayhistory: [{
        sku: this.props.book.bookInfor.sku,
        name : this.props.book.bookInfor.name,
        status : true
      }],
      showRightButton: this.props.navigation.state.params.showRightButton
    }
  }
  showFooter(showRightButton){
    if(showRightButton === true){
      return(
      <Footer navigation = {this.props.navigation} 
            showRightButton={'orange'} rightText={'Thêm'} 
            callBackRight={() => { this.savehistory(this.state.arrayhistory)}}/>)
    }
    else {
      return(
      <Footer navigation = {this.props.navigation} />)
    }
  }
  componentDidMount() {
    //console.log(this.props.book)
  }
  savehistory(arrayhistory) {
    this.props.dispatch(savehistory(arrayhistory));
    this.props.navigation.goBack();
  }

  render() {
    let price = PriceFormat.formatTotal(this.state.data.price);
    return (
      <View style={styles.container}>
      <Header headerCenter={"Thông tin sách"}></Header>
        <View style={styles.row}>
          <Image
              style={{ width: 280, height: 270 }}
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
          {this.showFooter(this.state.showRightButton)}
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
