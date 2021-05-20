import React, { forwardRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import Slider from "@react-native-community/slider"

let count = 0;

const Controls = forwardRef(({
  onSeek, onRewind, Paused, onFastForward, play_Pause, slider_value,
  onToggleFullScreen, closeModal, duration
}, ref) => {

  const [closeIcons, setCloseIcons] = useState(false)
  
  return (
    <TouchableOpacity onPress={()=>setCloseIcons(!!closeIcons ? false : true)} ref={ref} style={[styles.backgroundVideo]}>

      <View style={{position:'absolute', bottom:0, width:'100%'}}>

        {
          !closeIcons ?
          <Slider
            style={{width: "100%", height: 40}}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#1c1c1c"
            value={slider_value}
            onValueChange={onSeek}
          />
          :
          null
        }

        <View style={[styles.rateControl,{display:!!closeIcons?"none":"flex"}]}>

          <TouchableOpacity style={styles.buttonShapes} onPress={onToggleFullScreen}>
            <Icon name="compress" style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonShapes} onPress={onRewind}>
            <Icon name="angle-double-left" style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonShapes} onPress={Paused}>
            <Icon name={play_Pause ? "play" : "pause"} style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonShapes} onPress={onFastForward}>
            <Icon name="angle-double-right" style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonShapes} onPress={closeModal}>
            <Icon name="sign-out-alt" style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>

        </View>

      </View>
    </TouchableOpacity>
  );
})

const styles = StyleSheet.create({
  backgroundVideo: {
    width:'100%',
    height:'100%',
    // ackgroundColor: 'rgba(52, 52, 52, 0.8)'
    // display:'none'
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').width * .6,
    // borderWidth:1,
    // borderColor:'#fff'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  rateControl: {
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  buttonShapes:{
    // backgroundColor:'#1c1c1c',
    padding:25,
    // backgroundColor:'#fff'
  }
});

export default Controls;