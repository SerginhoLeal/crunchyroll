import React,{useEffect, useState} from 'react'

import Search from './Search/Search'
import Upload from './Upload/Upload'

let infos = null;

export default function _Routes(){

  const storageUser = localStorage.getItem('@R-nextPage');
  
  const getData = JSON.parse(`${storageUser}`)

  const [info, setinfo] = useState(getData ? getData : infos)

  useEffect(()=>{
    localStorage.setItem("@R-nextPage", JSON.stringify(info))
  },[info])
  
  return info ? <Upload sendInfoUp={setinfo} getInfo={info} /> : <Search sendInfo={setinfo} />
  
}