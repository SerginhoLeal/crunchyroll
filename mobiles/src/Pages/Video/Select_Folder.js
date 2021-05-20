import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import {myHooksContext} from "../../Context/authContext"

import {server} from '../../services/server'

import {useNavigation} from '@react-navigation/native'

import Video from 'react-native-video'

const VideoPlayer = () => {

  const navigation = useNavigation()

  const {data} = myHooksContext()

  const [docs, setDocs] = React.useState([])
  const [alerts, setAlerts] = React.useState({
    carregando: false,
    error: false
  })


  const loadInfo = async () => {
    if(data != null){
      setAlerts({
        ...alerts,
        carregando: alerts.carregando = true,
        error: alerts.error = false
      })
      
      await fetch(`${server}/qHRjF787trq3NU8QhRqbQrv`, {
        method: 'GET',
        headers: { 
          'Content-Type':'application/json',
          user:data ? data._id : '' 
        },
      })
      .then(res => res.json())
      .then(res =>{
        setDocs(res)
        // sethideNavBar(false)
      })
      .catch(err => {
        setAlerts({ 
          ...alerts, 
          carregando: alerts.carregando = false,
          error: alerts.error = true
        })
      })
    }
  }

  React.useEffect(()=>{
    loadInfo()
  },[data])

  const nextPage = dest => navigation.navigate('Select_Episode',{parms: dest})

  const { height } = Dimensions.get("window");

  return (
    <>
      <Video
        resizeMode={"cover"}
        repeat={true}
        source={{uri: 'https://res.cloudinary.com/zasetrewsqw/video/upload/v1609203180/video_upload/wallpaper_zbdmjk.mp4'}}
        style={{
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
          alignItems: "stretch",
          bottom: 0,
          right: 0
        }}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>

            {
              docs.length === 0
                ?
              <>
                <Text style={styles.title}>{alerts.carregando && "Carregando..."}</Text>
                <Text style={styles.title}>{alerts.error && "Falhas nos dados."}</Text>
              </>
                :
              docs.map((rest, index) => (
                <TouchableOpacity onPress={()=>{nextPage(rest)}} key={index}>
                  <Image style={styles.img} source={{uri: rest.urlImage}} />
                </TouchableOpacity>
              ))
            }
          
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title:{
    color:'#fff',
    fontSize:20,
  },
  container: {
    flex: 1,
    justifyContent:'center',
  },
  content:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'center',
  },
  img:{
    margin:5,
    width: 150,
    height: 150,
    borderRadius:5,
  }
});

export default VideoPlayer;