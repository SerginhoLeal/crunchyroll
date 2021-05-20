import React from 'react';

import GoBack from '../../Components/GoBack/GoBack'

import Select from './Select/Select'
import Episode from './Episode/Episode'

const Videos = () => {

  const [rota1, setRota1] = React.useState(null)

  return (
    <>

      {rota1 ? <GoBack setRota1={setRota1} /> : null}

      {
        rota1 
        ? <Episode getSelect={rota1} /> 
        : <Select setSelect={setRota1} />
      }
    
    </>  
  )
}

export default Videos;