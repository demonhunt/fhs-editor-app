import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { logout } from "../../../actions";
import globalSetting from "../../../common/setting";
//import AlertYesNo from '../AlertYesNo';
import AlertConfirmBlock from '../../Common/AlertConfirmBlock';
import { PermissionsAndroid} from "react-native";
import ImageUtil from '../../../common/image/ImageUtil';

const arrayButton = [
  {
    title: "Scan",
    icon: "SKU",
    navigation : 'scanSKU',
  },
  {
    title: "chuyen ke",
    icon: "pack",
    navigation : 'pack',
  },
  {
    title: "Quan ly ke",
    icon: "tray",
    navigation : 'tray',
  },
  {
    title: "Nhap sach len ke",
    icon: "truck",
    navigation : 'truck',
  },
  {
    title: "Nhap bang phieu",
    icon: "truck",
    navigation : 'truck',
  },
  {
    title: "Nhap bang phieu",
    icon: "truck",
    navigation : 'truck',
  },
]
class GetAllDataList extends Component {
  render(){
    const {item} = this.props;
    return(
      <View style={styles.contentFlaxListItem}>
        <TouchableOpacity
          onPress = {()=>{
          this.props.navigation.navigate(item.navigation);
        }}>
          <Image
            source={ImageUtil.getImageSource(item.icon)}
            style={{ width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{ 
            fontSize: 15,
            textAlign: 'center',
            marginTop: 5,
            color:'black'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>  
    );
  }
}
export default class HomeMain extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isShowAlertView: false,
      message: this.props.user.message,
    };
  }

  componentDidMount() {
    //console.log(this.props.user)
  }

  async requestCameraPermission(callBack) {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures."
          }
        );
        callBack();
      } catch (err) {}
    } else {
      callBack();
    }
  }

  postLogout() {
    this.props.dispatch(logout());
  }
  userLogout(){
    if(this.state.isShowAlertView == false)
    this.setState({ isShowAlertView: true });
    // this.props.dispatch({
    //   type: 'LOGOUT_SUCCESS'
    // })
  }
  render() {
    //console.log(this.props.user.message);
    //console.log(this.props.user);
    return (
      <View style={styles.content}>
        <AlertConfirmBlock
            isShowConfirmBlock={this.state.isShowAlertView}
            callBack={() => {
              this.setState({ isShowAlertView: false });
            }}
            callBackRightButton={()=>{ this.props.dispatch({
                type: 'LOGOUT_SUCCESS'})
            }}
            message={"Are you sure?"}
            leftTitle = {'No'}
            rightTitle = {'Yes'}
            changeColor = {'true'}

          />
          
      <View style={styles.contentHeader}>
        <View style={{
          flex:1,
          flexDirection: 'row',
        }}>
        <View style={{
          flex:1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
            source={ImageUtil.getImageSource('setting')}
            style={{ width: 30, height: 30, marginLeft: 5, marginRight: 5 }}
        />
        <Text style={{fontSize:15,color:'black'}}>{this.props.user.userInfor.lastName}</Text>
        </View>
        <View style={{flex:1}}>
        <TouchableOpacity 
          onPress = {()=>{
            this.userLogout()
        }}
          style={styles.iconButtonLogout}
        >
        <Text style={{fontSize:15,color: 'black', alignSelf:'center'}}>Logout</Text> 
        <Image
            source={ImageUtil.getImageSource('checkout')}
            style={{width: 30, height: 30, marginLeft: 5, marginRight: 5,}}
        />
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.contentTitle}><Text style={{  
          fontSize: 20, 
          color: 'white',
          fontWeight: 'bold',
        }}>Thuong Mai Dien Tu Fahasa</Text></View>
      </View>
      <View style={styles.contentFlaxList}>
        <FlatList
          data={arrayButton}
          renderItem={({item})=>{
            return <GetAllDataList 
            item={item}
            navigation={this.props.navigation}
            />   
          }}
          keyExtractor={(item, index) => {
                        return index.toString();
          }}
          numColumns = {'2'}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    backgroundColor: globalSetting.gray
  },
  contentHeader:{
    //flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    //alignItems: 'center',
    //paddingTop : 10,
    height: 100,
    backgroundColor: 'white',
  },
  contentTitle:{
    backgroundColor: globalSetting.main_orange_color, 
    flex:1,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentFlaxList:{
    flex: 1,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
    //textAlign: 'center',
    //alignContent : 'center',
    backgroundColor: 'white',
    //marginTop: 30,
    //marginBottom: 300,

  },
  contentFlaxListItem:{
    flex: 1,
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-around',
    //flexDirection : 'column',
    //alignContent: 'center',
    //width: 150,
    marginTop : 20,
    
  },
  iconButtonLogout:{
    flex:1,
    flexDirection: 'row', 
    justifyContent:'flex-end',
    //alignContent : 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    //backgroundColor: 'red'
  },

});
function select(store) {
  return {
    user: store.user
  };
}

module.exports = connect(select)(HomeMain);
