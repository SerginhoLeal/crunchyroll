import React, {useState, useEffect} from 'react'

import './Upload.css'

import Video from '../../../Components/Video/View/View'

import {FaVideo, FaAngleDoubleLeft, FaTimesCircle} from 'react-icons/fa'

import {server} from '../../../services/server'

import { MyHooksContext } from '../../../Context/Auth.Context'


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function _Upload({getInfo, sendInfoUp}){

  const { height, width } = useWindowDimensions();

  const {data} = MyHooksContext()

  const [loading, setLoading] = useState({
    loading: false,
    percent:0,
  })

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoading({...loading, percent: loading.percent + 3 || 6})
  //   },1000)
  // },[loading.percent])

  const [episodio, setEpisodio] = useState('')
  const [descricao, setDescricao] = useState('')

  const [previewSource, setPreviewSource] = useState('');
  console.log(previewSource)
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(JSON.parse(select))

  // const tes = () => {
  //   console.log(selectedFile2.videoWidth);

  //   selectedFile2.onloadedmetadata = () => {
  //     console.log("Video loaded!");
  //     alert("width: " + selectedFile2.videoWidth + "\n" + "height: " + selectedFile2.videoHeight);
  //   }
  // }


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    previewFile(file);
    setSelectedFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!selectedFile){
      return;
    }else{
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        uploadImage(reader.result);
        setLoading({...loading, loading: loading.loading = true})
      };
      reader.onerror = () => {
        console.log('something went wrong!');
      };
    }
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch(`${server}/7gGRGWhtz7eQjKjeKYLHJys/${getInfo[0]._id}`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json',
          "Authorization":`Bearer ${data.token}`
        },
        body: JSON.stringify({ 
          episode:episodio,
          description:descricao,
          urlVideo:base64EncodedImage,
        }),
      })
      .then(res => res.json())
      .then(res =>{
        setPreviewSource('')
        setSelectedFile(null)
        setEpisodio('')
        setDescricao('')
        setLoading({...loading, loading: loading.loading = false})
      })
    } catch (err) {
      console.log(err)
    }
  }

  const Exit_Room = () => {
    localStorage.setItem("@R-nextPage",null)
    sendInfoUp(null)
  }

  return(
    <div className="bodyUplaod">

      <div className="roomInformation">
        <FaAngleDoubleLeft style={{cursor:'pointer'}} onClick={Exit_Room} color="#fff" size={30} />
        <h1 className="fontGlobal title">{getInfo[0].nameFolder}</h1>
      </div>
      
        <div className="allPreView">
    
          {
            previewSource
              ?
            <div className="viewVideo">
              <FaTimesCircle onClick={()=>setPreviewSource(null)} className="FaTimesCircle" size={20} />
              <Video getUrlVideo={previewSource} />
            </div>
              :
            <label htmlFor="uploadFile" className="fileUpload">
              <FaVideo color="#fff" size={20} />
              <h1 className="fontGlobal texto">add your video</h1>
            </label>
          }

          <div className="addInfoPreview">

            <h1 className="fontGlobal title">{width}, {height}</h1>
            <input type="text" className="inputAdd" placeholder="Episodio" value={episodio} onChange={e => setEpisodio(e.target.value)} required/>

            {/* <h1 className="fontGlobal title">Descrição</h1> */}
            <input type="text" className="inputAdd" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required/>
            
            <button onClick={handleSubmitFile} className="fontGlobal texto">{!!loading.loading ? "Carregando..." : "Publicar"}</button>

          </div>

        </div>

      <input type="file" id="uploadFile" name="uploadFile" accept="video/mp4" onChange={handleFileInputChange} />

    </div>
  )
}