import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

const Components = ({openDrawer}) => {

  return (
    <View style={styles.body}>

      <TouchableOpacity onPress={() => openDrawer()} style={{padding:15}}>
        <Icon name="stream" size={20} color="#1c1c1c" />
      </TouchableOpacity>

      <Icon style={{padding:15}} name="search" size={20} color="#1c1c1c" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  body:{
    width:'100%',
    // height:'7%',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff'
  }
})

export default Components;