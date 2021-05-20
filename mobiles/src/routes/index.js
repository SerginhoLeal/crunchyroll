import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerStyle} from '../StyledDrawer'

import Select_Folder from '../Pages/Video/Select_Folder'
import Settings from '../Pages/Settings'
import SignIn from '../Pages/SignIn'
import Select_Episode from '../Pages/Video/Select_Episode'
import Criadores from '../Pages/Criadores'
import Videos from '../Pages/Video/Videos'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native';

const HomeStack = createStackNavigator()

const HomeStackScreen = ({navigation}) => (

  <HomeStack.Navigator
    
    screenOptions={{
      headerShown:true,
      headerStyle:{
        backgroundColor:'#1c1c1c',
      },
      headerTitleAlign:'center',
      headerTintColor: "#fff",
      headerTitleStyle:{
        fontWeight:'bold',
      }
    }}
  >

    <HomeStack.Screen
      name="Select_Folder"
      component={Select_Folder}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{padding:15}}>
            <Icon name="stream" size={20} color="#fff" />
          </TouchableOpacity>
        )
      }} 
    />

    <HomeStack.Screen name="Select_Episode" component={Select_Episode} />

    <HomeStack.Screen 
      name="Videos" 
      component={Videos} 
      options={{
        headerStyle:{
          height:0
        },
        headerTintColor:'transparent',
      }}
    />

    <HomeStack.Screen name="Settings" component={Settings} />

    <HomeStack.Screen name="Criadores" component={Criadores} />

    <HomeStack.Screen name="SignIn" component={SignIn} />

  </HomeStack.Navigator>
)

const routes = () => {

  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator
        drawerContent={skoa => <DrawerStyle {...skoa} />}//skoa para importa o estilo e o props
        /*
          drawerContent serve para você fazer a sua própria estilização,
          graças ao contextApi, podemos fazer a mudança de páginas sem passar os parametros,
          não seria impossível de fazer sem, mas eu achei mais legal fazer com o contextApi,
          então eu criei uma página chamada StyledDrawer para fazer a estilização e a mudança de páginas.
        */
        screenOptions={{
          headerShown:false
        }}
        /*
          serve para retirar o cabeçalho onde ficaria o nome da pagina
        */
      >


        <Drawer.Screen name="Home" component={HomeStackScreen} />


      </Drawer.Navigator>
  );
}

export default routes;