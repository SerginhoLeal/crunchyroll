import React, { useState } from 'react'

import './Search.css'

import {FaSearch} from 'react-icons/fa'

import {server} from '../../../services/server'

import {MyHooksContext} from '../../../Context/Auth.Context'

export default function _Search({sendInfo}){

  const {data, Logout} = MyHooksContext()

  const [docs, setDocs] = useState([])

  const [search, setSearch] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Anime')
  

  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    console.log(e)
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!selectedFile){
      return;
    }else{
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => createFolder(reader.result)
      reader.onerror = () => {
        console.log('something went wrong!');
      };
    }
  };

  const searchFolder = async() => {
    try {
      await fetch(`${server}/F2gAqRAutddCEHMQ92TVuCk`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json',
          user:data.user._id,
          "Authorization":`Bearer ${data.token}`
        },
        body:JSON.stringify({ 
          fileAnimeName:search
        }),
      })
      .then(res => res.json())
      .then(res => {
        if(res.inspired_session){
          Logout();
        }else{
          setDocs(res)
        }
      })
    } catch (err) {
      setDocs(err)
    }
  }

  const createFolder = (upImageFolder) => {
    fetch(`${server}/mKycCxFk2xQJ9xTCg9eF6Wj`, {
      method: 'POST',
      headers: { 
        'Content-Type':'application/json',
        user:data.user._id,
        "Authorization":`Bearer ${data.token}`
      },
      body:JSON.stringify({
        description:description,
        urlImage:upImageFolder,
        category:category,
        folder:search
      })
    })
    .then(res => res.json())
    .then(res =>{
      setDescription('')
      setPreviewSource('')
      setSelectedFile('')
      setDocs([])
    })
  }

  return(
    <div className="bodySearch">
      
      <div className="boxSearch">
      
        <div className="createNewFolder">
          
          <input
            placeholder="Create/Search folder"
            className="inputSearch"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={event => event.key === 'Enter' ? searchFolder() : null}
          />

          <FaSearch onClick={()=>searchFolder()} className={search ? "faSearch show" : "faSearch"} />

        </div>


        {!data && <h1 className="fontGlobal texto">O login é necessário para realizar o upload.</h1>}

        {
          docs[0] && docs.map((resk, index) => (
            <div className="preView" key={index}>
              <img className="preViewImage" src={resk.urlImage} />
              <button onClick={()=>sendInfo(docs)} className="fontGlobal texto options">Proximo</button>
            </div>
          ))
        }

        {
          docs.error && (
            <div className="createFolder">
              {
                previewSource
                  ?
                <img className="preViewImage" src={previewSource} />
                  :
                <label for="uploadFile" className="folderUpload">
                  <FaSearch color="#fff"/>
                  <input spellCheck="false" type="file" id="uploadFile" name="uploadFile" accept="image/*," onChange={handleFileInputChange} />
                </label>
              }

              <input spellCheck="false" placeholder="Descrição do anime" className="inputSearch" value={description} onChange={e => setDescription(e.target.value)}/>
            
              <select className='inputSearch' onChange={e => setCategory(e.target.value)}>
                <option>Anime</option>
                <option>Hentai</option>
              </select>

              <button onClick={handleSubmitFile} className="fontGlobal texto options">Criar pasta</button>
            
            </div>
          )
        }

        {docs.notAccess && <h1 className="fontGlobal texto">Você não tem permissão para realizar os upload.</h1>}

      </div>

    </div>
  )
}