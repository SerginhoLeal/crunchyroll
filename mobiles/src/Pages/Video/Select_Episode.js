import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image, ImageBackground } from 'react-native';

import {useNavigation} from '@react-navigation/native'

const VideoPlayer = ({route}) => {

  const navig = useNavigation()

  const {parms} = route.params;

  const Send_Video = data => {navig.navigate('Videos',{sendParams: data})}
  
  return (
    <ImageBackground source={{uri: parms.urlImage}} style={styles.container}>

      <FlatList data={parms.videos} keyExtractor={(ksoaskao) => ksoaskao._id} renderItem={(rest) => {
          return(

            <TouchableOpacity onPress={()=>Send_Video(rest.item)} style={styles.card}>

              <Image style={styles.img2} source={{uri: parms.urlImage}} />

              <View style={styles.bodyDescription}>
                <Text style={styles.title}>{rest.item.episode}</Text>
                <Text style={styles.title}>{rest.item.description}</Text>
              </View>

            </TouchableOpacity>
            
          )
        }}
      />
      
    </ImageBackground>
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
    alignItems:'center',
  },
  bodyDescription:{
    flex:1,
    justifyContent:'space-around',
    marginHorizontal:10
  },
  card:{
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width * (9 / 14),
    backgroundColor:'#000000aa',
    alignItems:'center',
    marginBottom:5,
    marginTop:5,
    borderRadius:10,
    borderColor:'#fff',
    borderWidth:1,
  },
  img2:{
    width: '100%',
    height: '70%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
});

export default VideoPlayer;