import React, { useState } from 'react'

import './Criadores.css'

import Me from '../../img/E_U.jpeg'

export default function _Criadores(){

  const [showModal, setShowModal] = useState(null)

  return(
    <div className="all">
        <div className="card">
            <div className="face face1">
                <div className="content">
                    <img className="img_criador" src={Me} />
                    <h3 className="h3_criador">Design</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p className="fontGlobal texto" style={{color:'#000'}} >Fiquei responsavel pela estilização do site.</p>
                    <a className="a_criador" href="http://">FB <i className="fab fa-facebook-f"></i></a>
                    <a className="a_criador" href="http://">Twitter <i className="fab fa-twitter"></i></a>
                    <a className="a_criador" href="http://">Instagram <i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="face face1">
                <div className="content">
                    <img className="img_criador" src={Me} />
                    <h3 className="h3_criador">Front-end</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p className="fontGlobal texto" style={{color:'#000'}} >Fiquei responsavel pela construção do site junto com o Designer.</p>
                    <a className="a_criador" href="http://">FB <i className="fab fa-facebook-f"></i></a>
                    <a className="a_criador" href="http://">Twitter <i className="fab fa-twitter"></i></a>
                    <a className="a_criador" href="http://">Instagram <i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="face face1">
                <div className="content">
                    <img className="img_criador" src={Me} />
                    <h3 className="h3_criador">Back-end</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p className="fontGlobal texto" style={{color:'#000'}} >Fiquei com a parte mais legal, fiz esse site funcionar mesmo passando raiva com uns códigos</p>
                    <a className="a_criador" href="http://">FB <i className="fab fa-facebook-f"></i></a>
                    <a className="a_criador" href="http://">Twitter <i className="fab fa-twitter"></i></a>
                    <a className="a_criador" href="http://">Instagram <i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
  )
}