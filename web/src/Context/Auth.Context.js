import React, {createContext, useState, useEffect, useContext, Component} from 'react';

import {server} from '../services/server'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  const storageUser = localStorage.getItem('@RN-Auth');

  const [data, setData] = useState(JSON.parse(storageUser));

  const [codeAccess, setCodeAccess] = useState('')
  const [exchange, setExchange] = useState('')
  const [select, setSelect] = useState('')

  const [alerts, serAlerts] = useState({
    carregando: false,
    error:false
  })

  const [hideNavBar, sethideNavBar] = useState(false)

  /******************* Logar *******************/
  async function signIn(codeAccessed){

    serAlerts({
      ...alerts, 
      carregando: !alerts.carregando,
      error: false
    })

    fetch(`${server}/PwbsOs9YtfLi85clN8Sz`,{
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        codeAccess:codeAccessed,
      })
    })
    .then(res => res.json())
    .then(res =>{
      // console.log(res)
      if(res.error){
        serAlerts({ ...alerts, carregando: false, error: true})
      }else{
        setData(res)
        localStorage.setItem("@RN-Auth", JSON.stringify(res))
        serAlerts({ ...alerts, carregando: false, error: false })
      }
    })
  }
  /******************* Logar *******************/

  /******************* Cadastro *******************/
  const SignUp = (nome, senha, email, confirmar) => {

    if(senha != confirmar) {
      // setExchange('showCreate')
      return alert('Senha não são compativeis')
    }

    fetch(`${server}/NRBQlog6f2Pwnqe3adQJ`,{
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        nome,
        password:senha,
        email,
      })
    })
    .then(res => res.json())
    .then(res =>{
      setCodeAccess(res.user.codeAccess)
      // setData(res)
      // localStorage.setItem("@RN-Auth", JSON.stringify(res))
    })
  }
  /******************* Cadastro *******************/

  const Logout = () => {
    setData(null)
    localStorage.removeItem('@RN-Auth');
  }

  return(
    <AuthContext.Provider value={{ 
      signed: !!data,
      data,
      hideNavBar,
      sethideNavBar,
      signIn, SignUp,
      codeAccess, setCodeAccess,
      exchange, setExchange,
      select, setSelect,
      alerts,
      Logout
    }}>
      {children}
    </AuthContext.Provider>
  )
};


export function MyHooksContext(){
  const context = useContext(AuthContext)

  return context;
}