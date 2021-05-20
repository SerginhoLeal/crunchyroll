import React,{useState, useEffect} from 'react'

import './Perfil.css'

import SignIn from '../../Client/Sign-In'

import { MyHooksContext } from '../../Context/Auth.Context'

import Photo from '../../img/2019-10-27.png'

const _PerfilLog = () => {

  const [statevolum, setStateVolum] = useState(0.3)

  const handleVolume = (q) => {
    setStateVolum(q);
  }

  return(
    <div className="bodyPerfil">
      <div className="container">
        <div style={{cursor:'pointer'}} className="card">
          <img src={Photo} className="imgHome" data-text="Design"/>
          <div className="info_content">
            <h3 className="fontGlobal titulo">aaaaaaaaaaaaaaa</h3>
            <p className="fontGlobal texto">aaaaaaaaaaaaa</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function _Perfil(){

  const {signed} = MyHooksContext()

  return signed ? <_PerfilLog/> :<SignIn />
}