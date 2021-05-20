import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Dimensions } from 'react-native';

import {myHooksContext} from "../Context/authContext"

import EU from '../assets/E_U.jpeg'

const src = () => {
  const { data } = myHooksContext();

  return (
    <View style={styles.body}>
      
      <View style={styles.card}>

        {/* <Image source={EU} /> */}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:"#1c1c1c",
    justifyContent:'center',
    alignItems:'center'
  },
  txt:{
    color:'#fff',
    fontSize:15,
    marginTop:3,
    marginBottom:3
  },
  card:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderColor:'#fff',
    borderWidth:1
  }
})

export default src;