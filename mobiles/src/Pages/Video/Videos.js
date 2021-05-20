import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native'

import {useNavigation} from '@react-navigation/native'

import Controls from './Controls'

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

let count = 0;

const Videos = ({closeModal, getVideo, route}) => {

  const {sendParams} = route.params
  const navi = useNavigation()

  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const [play_and_pause, setPlay_and_pause] = useState(false)
  const [current_Time, setCurrent_Time] = useState(0)
  const [duration, setDuration] = useState(0)

  const Monitor_The_Screen = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        setPlay_and_pause(true)
        Orientation.lockToPortrait();
        navi.goBack();
      } else {
        setPlay_and_pause(true)
        navi.goBack();
      }
    });
  }

  const onLoad = data => setDuration(data.duration)

  const Execute_Progress = data => {

    // console.log(data)
    
    if (count > 1.5) {
      console.log('foi')
    }
    
    count = 1
    // if (controlsRef.style.visibility === "visible") count += 1
    
    setCurrent_Time(data.currentTime)

  }

  const Execute_Paused = () => setPlay_and_pause(!play_and_pause ? true : false)

  const Execute_Come_Back = () => playerRef?.current.seek(current_Time - 5.000)
  
  const Execute_Proceed = () => playerRef?.current.seek(current_Time + 5.000)

  const Execute_Seek_Change = (newValue) => playerRef?.current.seek(newValue)

  const fullScreen = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscape();
      }
    });
  }//Tenho que ver o que esse "orientation" do fullScreen retorna

  return (
    <View style={styles.container}>

      <Video
        ref={(ref) => (playerRef.current = ref)}
        source={{uri: sendParams.urlVideo}}
        style={styles.fullScreen}
        rate={1}//rate: Velocidade na qual a mídia deve ser reproduzida.
        paused={play_and_pause}
        volume={1}//volume: volume do video
        muted={false}//
        resizeMode={'contain'}
        onLoad={onLoad}
        onProgress={Execute_Progress}
        onEnd={() => { console.log('end') }}
        controls={false}
        repeat={false}
        hideShutterView={true}
      />

      <Controls
        ref={controlsRef}
        Paused={Execute_Paused}
        play_Pause={play_and_pause}
        onToggleFullScreen={fullScreen}
        closeModal={Monitor_The_Screen}
        onRewind={Execute_Come_Back}
        onFastForward={Execute_Proceed}
        onSeek={Execute_Seek_Change}
        slider_value={current_Time}
        duration={duration}
      />
        

        {/* <View style={styles.rateControl}>
          <TouchableOpacity transparent onPress={() => {setModalVisible(true)}}>
            <Icon type="FontAwesome5" name="ellipsis-v" style={{ color: "#fff", fontSize: 15 }} />
          </TouchableOpacity>
        </View> */}

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeModal}>
              <Button transparent onPress={() => { setModalVisible(!modalVisible)}}>
                <Icon name="close" />
              </Button>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Play Rate</Text>
              <List style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                {renderRateControl(0.25)}
                {renderRateControl(0.5)}
                {renderRateControl(1.0)}
                {renderRateControl(1.5)}
                {renderRateControl(2.0)}
              </List>
            </View>
          </View>
        </View>
      </Modal> */}
    </View >
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * .6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  // innerProgressCompleted: {
  //   height: 20,
  //   backgroundColor: '#cccccc',
  // },
  // innerProgressRemaining: {
  //   height: 20,
  //   backgroundColor: '#2C2C2C',
  // },
  // generalControls: {
  //   flex: 1,
  //   // flexDirection: 'row',
  //   borderRadius: 4,
  //   overflow: 'hidden',
  //   paddingBottom: 10,
  // },
  // volumeControl: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    // alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  centeredView: {
    flex: 1,
    marginTop: '22%'
  },
  modalView: {
    width: '100%',
    padding: '5%',
    backgroundColor: "white",
    position: 'absolute',
    bottom: 10,
  },
  // openButton: {
  //   backgroundColor: "#F194FF",
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2
  // },
  // closeModal: {
  //   alignItems: 'flex-end',
  //   margin: -10
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center"
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center"
  // },
  rateControl: {
    // position:'absolute',
    // top:0,
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  buttonShapes:{
    padding:15
  }
});

export default Videos;