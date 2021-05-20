import React, { useState } from 'react'

import './Premium.css'

export default function _Premium(){

  const [assinatura, setAssinatura] = useState({
    plano1: false,
    plano2: false,
    plano3: false
  })

  const SendRequest = () => {
    
  }

  return(
    <div className="PremiumBody">

      <div className="boxCart">

        <h1 className="fontGlobal title">Plano 1</h1>

        <h1 className="fontGlobal title">R$: 10.00 por mês</h1>

        <p className="fontGlobal title">Sem anúncios</p>

        <p className="fontGlobal title notAccess">Acesso liberado à página extra ( ͡° ͜ʖ ͡°)</p>

        <p className="fontGlobal title notAccess">Realize upload de animes, caso o feedback for positivo, trabalhe conosco.</p>

        <button 
          onClick={()=> setAssinatura({
            ...assinatura, 
            plano1: assinatura.plano1 === true
          })} 
          className="fontGlobal texto">Assinar</button>

      </div>

      {/* {!!openModal && (
        <div className="">
        </div>
      )} */}

      <div className="boxCart">

        <h1 className="fontGlobal title">Plano 2</h1>

        <h1 className="fontGlobal title">R$: 20.00 por mês</h1>

        <p className="fontGlobal title">Sem anúncios</p>

        <p className="fontGlobal title">Acesso liberado à página extra ( ͡° ͜ʖ ͡°)</p>

        <p className="fontGlobal title notAccess">Realize upload de animes, caso o feedback for positivo, trabalhe conosco.</p>

        <button onClick={()=> alert('trabalhando nisso')} className="fontGlobal texto">Assinar</button>

      </div>

      <div className="boxCart">

        <h1 className="fontGlobal title">Plano 3</h1>

        <h1 className="fontGlobal title">R$: 30.00 por mês</h1>

        <p className="fontGlobal title">Sem anúncios</p>

        <p className="fontGlobal title">Acesso liberado à página extra ( ͡° ͜ʖ ͡°)</p>

        <p className="fontGlobal title">Realize upload de animes, caso o feedback for positivo, trabalhe conosco.</p>

        <button onClick={()=> alert('trabalhando nisso')} className="fontGlobal texto">Assinar</button>

      </div>

    </div>
  )
}