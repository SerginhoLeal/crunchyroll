import React, { useState, useEffect } from 'react'

import './Select.css'

import {Link} from 'react-router-dom'

import {server} from '../../../services/server'
import { MyHooksContext } from '../../../Context/Auth.Context'

export default function _Select({setSelect}){

  const {data, sethideNavBar} = MyHooksContext()

  const [docs, setDocs] = useState('')

  const [alerts, setAlerts] = useState({
    carregando: false,
    error: false
  })

  useEffect(()=>{

    setAlerts({...alerts, carregando: !alerts.carregando})
    
    fetch(`${server}/qHRjF787trq3NU8QhRqbQrv`, {
      method: 'GET',
      headers: { 
        'Content-Type':'application/json',
        user:data ? data.user._id : ''
      },
    })
    .then(res => res.json())
    .then(res =>{
      setDocs(res)
      sethideNavBar(false)
    })
    .catch(err => {
      setAlerts({ ...alerts, carregando: alerts.carregando})
    })
  },[])

  return(
    <div className="bodySelect">
      <div className="container">
        {
          docs.length === 0 
            ?
          <h1 className="fontGlobal texto">{alerts.carregando ? "Carregando..." : "Falhas nos dados."}</h1>
            :
          docs.map((ret, index) => (
            <div style={{cursor:'pointer'}} onClick={()=> setSelect(JSON.stringify(ret))} key={index} className="card">
              <img src={ret.urlImage} className="imgHome" data-text="Design"/>
              <div className="info_content">
                <h3 className="fontGlobal titulo">{ret.nameFolder}</h3>
                <p className="fontGlobal texto">{ret.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

//Titulo do anime
//Descrição do anime, img ("sizeImage" * 1.7)