import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
import Swiper from 'react-native-swiper'
import Image from 'react-native-image-progress'
import * as Progress from 'react-native-progress'
import ImageUtil from '../common/image/ImageUtil'

export default class GallerySwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleSwiper: true,
    }
    this.imageList = this.props.imageList
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ visibleSwiper: true })
    }, 300)
  }
  render() {
    let swiper = null
    //console.log(this.props.imageList)
    if (this.state.visibleSwiper) {
      swiper = (
        <Swiper
          height={(4 * screenHeight) / 10 - 20}
          removeClippedSubviews={false}
          paginationStyle={{ bottom: -1, position: 'absolute' }}
          width={screenWidth}
        >
          {this.props.imageList.map(function(item, index) {
            //console.log(item)
            return (
              <View style={styles.imageShow} key={'media_gallery' + index}>
                {item ? (
                  <LazyImage file={item} />
                ) : (
                  <Image
                    style={{
                      width: screenWidth,
                      height: (4 * screenHeight) / 10 - 20,
                    }}
                    source={ImageUtil.getImageSource('noImage')}
                    resizeMode="contain"
                  />
                )}
              </View>
            )
          })}
        </Swiper>
      )
    } else {
      swiper = <View />
    }
    return swiper
  }
}
class LazyImage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Image
        indicator={Progress.Circle}
        style={{ width: screenWidth,height: (4 * screenHeight) / 10 - 20, }}
        source={{ uri: this.props.file }}
        resizeMode="contain"
      />
    )
  }
}
const styles = StyleSheet.create({
  imageList: {
    backgroundColor: 'white',
    marginTop: 0,
    height: (4 * screenHeight) / 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageShow: {
    width: screenWidth,
    height: (4 * screenHeight) / 10 - 20,
    alignItems: 'center',
  },
})