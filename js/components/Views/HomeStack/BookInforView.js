import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PriceFormat from '../../../common/PriceFormat'
import globalSetting from "../../../common/setting"
import Footer from '../../Common/Footer'
import {savehistory} from '../../../actions/savehistory'
import Header from '../../Common/HeaderCommon'
import GallerySwiper from '../../../common/GallerySwiper'

class BookInforView extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      arrayhistory: [{
        sku: this.props.book.bookInfor.sku,
        name : this.props.book.bookInfor.name,
        status : true
      }],
      showRightButton: this.props.navigation.state.params.showRightButton,
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
  }
  savehistory(arrayhistory) {
    this.props.dispatch(savehistory(arrayhistory));
    this.props.navigation.goBack();
  }
  
  render() {
    //console.log(this.props.book.imageBook)
    return (
      <View style={styles.container}>
      <Header headerCenter={"Thông tin sách"}></Header>
        <View style={styles.row}>
          <GallerySwiper
              imageList={this.props.book.imageBook}
            />
        </View>
        <View style={styles.row2}>
            <FlatList
              data={this.props.book.bookInfor}
              renderItem={({item,index})=>{
                //delete item['image']
                // var dataFake = Object.keys(item).map(function(key) {
                //     if(key != 'image')
                //   return <GetAllItem title={key} info ={item[key]}></GetAllItem>
                     return <GetAllItem item={item}></GetAllItem>
                // });
                // return dataFake
              }}
              keyExtractor={(item, index) => {
                        return index.toString();
              }}
            />
        </View>
          {this.showFooter(this.state.showRightButton)}
      </View>
    );
  }
}
class GetAllItem extends Component{
  render(){
    //let title = this.props.title == 'price' ? PriceFormat.formatTotal(this.state.data.price) : 
    const {item} = this.props
    const data = Object.values(item)
    console.log(item)
        return(
          <View style={{flex:1, marginTop:5}}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:1}}>
                    <Text style={{fontSize: 15, fontWeight: "bold",color: 'black'}}>{item['vi']}</Text>
              </View>
              <View style={{flex:1}}>
                    <Text style={{color: globalSetting.main_orange_color,fontWeight: "bold", textAlign: 'right', fontSize: 15,}}>{data[0]}</Text>
              </View>
            </View>
            <View style={{height:1, backgroundColor:globalSetting.main_orange_color}}></View>
          </View>
        )
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
    flex: 1,
    //height: 500,
    marginBottom: 5,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor : 'red'
  },
  row1: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: globalSetting.main_orange_color,
    //backgroundColor: 'red'
  },
  row2: {
    flex: 1,
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
    backgroundColor : 'red',
    marginTop: 5,
  }
});

function select(store) {
  return {
    book: store.book,
  }
}

module.exports = connect(select)(BookInforView)
