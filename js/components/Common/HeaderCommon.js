import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
} from 'react-native'
import globalSetting from '../../common/setting'

export default class HeaderCommon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalQuantity: this.props.totalQuantity,
    }
  }
  

  render() {
    let noQuantity = {
      flex: 1,
      paddingLeft: 18,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
          },
          elevation: 4,
          // marginTop: Platform.OS == 'ios' ? globalSetting.STATUSBAR_HEIGHT : 0
        }}
      >
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <View style={noQuantity}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: globalSetting.main_text_color,
                }}
              >
                {this.props.headerCenter}
              </Text>
            </View>
        </View>
      </View>
    )
  }
}
