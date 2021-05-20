import React from 'react'

import './NavBar.css'
import '../../GlobalStyles.css'

import {Link} from 'react-router-dom'
import { MyHooksContext } from '../../Context/Auth.Context'

export default function NavBar(){

  const {hideNavBar, data} = MyHooksContext()

  return(
    <header className={!!hideNavBar ? "headerNavBar hide" : "headerNavBar"}>
      <Link to="/perfil" className="fontGlobal title options">{!!data ? data.user.nome : "-> Usuário <-"}</Link>
      <nav>
        <div className="nav_links">
          <li><Link to="/" className="fontGlobal texto options">Animes</Link></li>
          <li><Link to="/upload" className="fontGlobal texto options">Upload</Link></li>
          <li><Link to="/premium" className="fontGlobal texto options">Premium</Link></li>
        </div>
      </nav>
      <Link to="/criadores"><button className="fontGlobal texto">Criadores</button></Link>
    </header>
  )
}