import React, { useState } from 'react'
import { MyHooksContext } from '../Context/Auth.Context'

import './Sign-In.css'

export default function _SignIn(){

  const {signIn, SignUp, exchange, setExchange, alerts} = MyHooksContext()

  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [confirmar, setConfirmar] = useState('')

  const [codeAccess, setCodeAccess] = useState('')

  const Sign = () => {
    if(exchange === "") return signIn(codeAccess)
    if(exchange === "showCreate") return SignUp(nome, senha, email, confirmar) + setTimeout(function(){setExchange('')},500)
  }

  return(
    <div className="bodySignIn">

      <div className="containerSign">
      
        {!!alerts.carregando && <h1 className="fontGlobal texto">Carregando</h1>}

        {!!alerts.error && <h1 className="fontGlobal texto">Falha no login</h1>}

        <input 
          className={exchange === "showCreate" ? "inputSignIn" : "hider"} 
          type="name" 
          placeholder="Nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)}
        />
      
        <input 
          className={exchange === "showCreate" ? "inputSignIn" : "hider"}
          type="password"
          placeholder="Senha"
          value={senha} 
          onChange={e => setSenha(e.target.value)}
        />
      
        <input 
          className={exchange === "showCreate" ? "hider" : "inputSignIn"}
          type="text"
          placeholder="Código do login" 
          value={codeAccess} 
          onChange={e => setCodeAccess(e.target.value)}
          onKeyPress={event => event.key === 'Enter' ? Sign() : null}
        />
      
        <input 
          className={exchange === "showCreate" ? "inputSignIn" : "hider"}
          type="email"
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      
        <input 
          className={exchange === "showCreate" ? "inputSignIn" : "hider"}
          type="password"
          placeholder="Confirmar Senha"
          value={confirmar}
          onChange={e => setConfirmar(e.target.value)} 
        />
      
        <button onClick={Sign} className="fontGlobal texto">{exchange === "showCreate" ? "Criar Conta" : "Entrar"}</button>
      
        <p onClick={()=>setExchange(exchange === 'showCreate' ? '' : 'showCreate')} className="fontGlobal texto">{exchange === "showCreate" ? 'Já possuo uma conta' : 'Criar a sua conta'}</p>
      
      </div>

    </div>
  )
}