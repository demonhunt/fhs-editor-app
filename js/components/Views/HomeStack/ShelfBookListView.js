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
import {changeStatus, addListBook,resetListBook} from '../../../actions'
import { scan } from '../../../actions'
import {savehistory} from '../../../actions/savehistory'

class GetAllItem extends Component{
    //console.log(this.props.item.sku)
    render(){
        const changeBackGroundColor = this.props.item.isStatus ? styles.contentHight : styles.content
        //if(this.props.item.sku=='1116030351063') console.log(changeBackGroundColor)
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{
                    //console.log(' dispatch value ' , this.props.item.isStatus)
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
                        <View style={{flex:1}}>
                            {/* <Text style={styles.product}>{this.props.item.name}</Text> */}
                            <Text style={{fontSize: 15, fontWeight: "bold", color: 'black', marginTop: 5,marginRight: 5}}>{this.props.item.name}</Text>
                            <Text style={{fontSize: 15, marginTop: 5,}}>{this.props.item.sku}</Text>
                            <Text style={{fontSize: 15, color: globalSetting.main_orange_color, marginTop: 2,}}>{PriceFormat.formatTotal(this.props.item.price)}</Text>
                        </View>
                        
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableOpacity style={{flex:1}} onPress={()=>{this.props.getbook(this.props.item.sku)}}>
                                <View style={styles.rightViewButton}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold',color: 'white',}}>Chi tiet</Text></View>
                            </TouchableOpacity>
                                <View style={{flex:2}}></View>
                        </View>   
                    </View>
                </View>
                <View style={{height:1, backgroundColor:globalSetting.main_orange_color}}></View> 
                </TouchableOpacity>
            </View>
        )
    }
}

class ShelfBookListView extends Component {
    static navigationOptions = {
        header: null,
      }
    constructor(props){
        super(props)
    }

    async onPressHightLight(sku){
        await this.props.dispatch(changeStatus(sku))
        await this.props.dispatch(addListBook(this.props.shelfBook.bookSheflInfor))
    }
    async onClickAddBook(){
        //await this.props.dispatch(addListBook(this.props.shelfBook.bookSheflInfor))
        await this.props.dispatch(savehistory(this.props.shelfBook.bookSelected))
        await this.props.dispatch(resetListBook())
        this.props.navigation.goBack()
        //console.log("AAA===================" + this.props.shelfBook.bookSelected)
    }
    async onClickGoBack(){
        await this.props.navigation.goBack()
        this.props.dispatch(resetListBook())
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
    render(){
        //console.log(this.props.shelfBook.bookSheflInfor)
        //console.log("BBB===================" + this.props.shelfBook.bookSelected)
        const checkShowButton = this.props.shelfBook.bookSelected.length > 0 ? true : false
        if(this.props.shelfBook.isSuccess && this.props.shelfBook.bookSheflInfor.length > 0 ){
        return(
            <View style={{flex:1}}>
                
                <FlatList
                    data= {this.props.shelfBook.bookSheflInfor}
                    renderItem={({item,index}) =>{
                        return <GetAllItem item={item} 
                        onPressHightLight={this.onPressHightLight.bind(this)}
                        getbook = {this.getbook.bind(this)} />
                    }}
                    keyExtractor={(item, index) => {
                            return index.toString();
                    }}
                />
                <Footer
                    showRightButton= {checkShowButton}
                    rightText = {'Them'}
                    navigation = {this.props.navigation}
                    callBackLeft = {()=>{this.onClickGoBack()}}
                    callBackRight = {()=>{this.onClickAddBook()}}
                />
            </View>
        )}
        else return (
            <View style={styles.ViewError}><Text style={styles.textError}>Error</Text></View>
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
        backgroundColor : '#42f5da',
        flexDirection: 'row',
    },
    contentLeft: {
        //flex:1,
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
        width: 120,
        height : 150,
        resizeMode: 'stretch',
        //marginTop: 5,
        //marginBottom : 5,
        margin: 10,
    },
    product: {

    },
    rightViewButton: {
        backgroundColor: globalSetting.main_orange_color,
        //flex: 1,
        height:40,
        //width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
        //flexDirection: 'row',
    },
    ViewError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    textError: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
})

function select(store) {
    //console.log(store)
    return {
        shelfBook: store.shelfBook,
        user: store.user,
    };
  }
  
  module.exports = connect(select)(ShelfBookListView);