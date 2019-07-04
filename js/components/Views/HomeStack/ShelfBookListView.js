import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Platform
} from "react-native"
import { connect } from "react-redux"
import globalSetting from "../../../common/setting"
import PriceFormat from '../../../common/PriceFormat'
import Footer from '../../../components/Common/Footer'
import {changeStatus, addListBook} from '../../../actions'
class GetAllItem extends Component{
    //console.log(this.props.item.sku)
    render(){
        const changeBackGroundColor = this.props.item.isStatus ? styles.contentHight : styles.content
        //if(this.props.item.sku=='1116030351063') console.log(changeBackGroundColor)

        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{
                    // console.log(' dispatch value ' , this.props.dispatch)
                    // this.props.dispatch(changeStatus(this.props.item.sku))
                    
                    this.props.onPressHightLight(this.props.item.sku)
                    }}>
                <View style={changeBackGroundColor}>
                    <View style={styles.contentLeft}>
                        <Image
                            style={styles.images}
                            source={{uri: this.props.item.image}}
                        />
                    </View>
                    <View style={styles.contentRight}>
                        {/* <Text style={styles.product}>{this.props.item.name}</Text> */}
                        <Text style={{fontSize: 15, fontWeight: "bold", color: 'black', marginTop: 5,marginRight: 5}}>{this.props.item.name}</Text>
                        <Text style={{fontSize: 15, marginTop: 5,}}>{this.props.item.sku}</Text>
                        <Text style={{fontSize: 15, color: globalSetting.main_orange_color, marginTop: 2,}}>{PriceFormat.formatTotal(this.props.item.price)}</Text>
                    </View>
                </View>
                <View style={{height:1, backgroundColor:globalSetting.main_orange_color}}></View> 
                </TouchableOpacity>
            </View>
        )
    }
}

class ShelfBookListView extends Component {
    constructor(props){
        super(props)
    }

    onPressHightLight(sku){
        this.props.dispatch(changeStatus(sku))
    }
    onClickAddBook(){
        this.props.dispatch(addListBook(this.props.shelfBook.bookSheflInfor))
    }
    render(){
        //console.log(this.props.shelfBook.bookSheflInfor[0])
        return(
            <View style={{flex:1}}>
                <FlatList
                    data= {this.props.shelfBook.bookSheflInfor}
                    renderItem={({item,index}) =>{
                        return <GetAllItem item={item} 
                        onPressHightLight={this.onPressHightLight.bind(this)} skuFooter />
                    }}
                    keyExtractor={(item, index) => {
                            return index.toString();
                    }}
                />
                <Footer
                    showRightButton= {true}
                    rightText = {'Them'}
                    navigation = {this.props.navigation}
                    //callBackLeft = {()=>{this.props.navigation.goBack()}}
                    callBackRight = {()=>{this.onClickAddBook()}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        backgroundColor : 'white',
        flexDirection: 'row',
    },
    contentHight: {
        flex:1,
        backgroundColor : '#228b22',
        flexDirection: 'row',
    },
    contentLeft: {
        flex:1,
        //backgroundColor: 'white',
        //alignItems: 'center',
        //width: 60,
        //height : 100,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contentRight: {
        flex:1,
        // backgroundColor: 'white',
        //justifyContent : 'center'
        //textAlign : 'center',
    },
    images: {
        //flex:1,
        width: 100,
        height : 120,
        resizeMode: 'stretch',
        //marginTop: 5,
        //marginBottom : 5,
        margin: 10,
    },
    product: {

    },
})

function select(store) {
    //console.log(store)
    return {
        shelfBook: store.shelfBook,
    };
  }
  
  module.exports = connect(select)(ShelfBookListView);