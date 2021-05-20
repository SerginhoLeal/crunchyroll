import React from 'react'

import './Episode.css'

import View from '../../../Components/Video/View/View'

import { MyHooksContext } from '../../../Context/Auth.Context';

export default function _Episode({getSelect}){

  const {sethideNavBar} = MyHooksContext()
  sethideNavBar(true)

  const [play, setPlay] = React.useState(null)
  const getPlayData = JSON.parse(play)

  const getAllData = JSON.parse(getSelect)

  return(
    <div className="bodySelect">

      {play ? <View getUrlVideo={getPlayData} /> : null}

      <img className="backgroundEpisode" src={getAllData.urlImage}/>

      <div className={play ? "showEpisode hoverList" : "showEpisode"}>

        <div className="container">

        {/* <div className="blocoParaVer" /> */}

          {
            getAllData.videos.map((tes, index) => (
              <div onClick={()=> setPlay(JSON.stringify(tes))} key={index} className="card" style={{cursor:'pointer'}}>
                <img src={getAllData.urlImage} className="imgHome" data-text="Design"/>
                <div className="content">
                  <div className="info_content">
                    <h3 className="fontGlobal titulo">{tes.episode}</h3>
                    <p className="fontGlobal texto">{tes.description}</p>
                  </div>
                </div>
              </div>
            ))
          }

          {/* <p className="fontGlobal titulo">Assistir</p> */}

        </div>
      </div>
    </div>
  )
}