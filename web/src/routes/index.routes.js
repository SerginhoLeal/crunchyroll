import NavBar from '../Components/NavBar/NavBar'

import Home from '../Pages/Home/Home'
// import Select from '../Pages/Videos/Select/Select'
import Episode from '../Pages/Videos/Episode/Episode'
// import Play from '../Pages/Videos/Play/Videos'
import Upload from '../Pages/Upload/index.routes'
import Criadores from '../Pages/Criadores/Criadores'
import Perfil from '../Pages/Perfil/Perfil'
import Premium from '../Pages/Premium/Premium'

import IndexRoute from '../Pages/Videos/index.routes'

import { AuthProvider} from '../Context/Auth.Context'

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function _Routes(){
  return(
    <Router>

      <AuthProvider>

        <NavBar />

        <Route path="/" exact component={IndexRoute} />
        <Route path="/home" component={Home} />
        {/* <Route path="/select" exact component={Select} /> */}
        <Route path="/episode" component={Episode} />
        {/* <Route path="/play" component={Play} /> */}
        <Route path="/upload" component={Upload} />
        <Route path="/criadores" component={Criadores} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/premium" component={Premium} />
      </AuthProvider>

    </Router>
  )
}