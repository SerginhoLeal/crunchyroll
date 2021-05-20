import React, { useState, useRef } from "react";

import './View.css'

import ReactPlayer from "react-player";

import screenful from "screenfull";
import Controls from "../../../Components/Video/Controls/Controls";

const format = (seconds) => {
  if (isNaN(seconds)) return `00:00`
  
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  
  if(hh) return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  
  return `${mm}:${ss}`;
};

let count = 0;

function App({getUrlVideo}) {

  // console.log('getUrlVideo: ' , getUrlVideo)

  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    pip: true,
    playing: false,
    controls: false,
    light: 'https://res.cloudinary.com/zasetrewsqw/image/private/s--tn9SwoK3--/v1608677875/video_upload/v3mkxg24z6uis6erugyp.jpg',
    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  console.log(state.played)

  const playerRef = useRef(null);

  const playerContainerRef = useRef(null);

  const controlsRef = useRef(null);

  const { playing, light, muted, loop, playbackRate, pip, played, volume} = state;

  const handlePlayPause = () => setState({ ...state, playing: !state.playing })

  /* 
    ...state ( o três pontos é chamado de atributos de propagação ) 
    Até onde eu sei, esse atributo server para pegar todos os dados do state (...state) e
    altera-la passando uma vírgula e pegando o estado desejado (, seeking: !state.seeking)
  */

  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
  /*
    handleRewind: Retroceder 5 segundos
  */

  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  /*
    handleFastForward: Adianta 5 segundos
  */


  const handleProgress = (changeState) => {
    // console.log("changeState: " + JSON.stringify(changeState))
    /*
      esse if de baixo é responsável pelos controles, passou de 1.5, 
      o mesmo some, caso o mouse fique parado
    */
    if (count > 1.5) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    
    if (controlsRef.current.style.visibility === "visible") count += 1

    if (!state.seeking) setState({ ...state, ...changeState })
  };
  /*
    handleProgress: responsável por monitorar o seu mouse,,
    caso fique parado os controles desaparecerão,
    caso você mova o mouse, os controles retornarão.
  */

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleSeekChange = (e, newValue) => setState({ ...state, played: parseFloat(newValue / 100) })
  /*
    handleSeekChange: Responsável por monitorar a barra do episodio
  */

  const handleSeekMouseDown = (e) => setState({ ...state, seeking: true })
  /*
    handleSeekMouseDown: 
  */

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => setState({ ...state, duration })

  const handleVolumeSeekDown = (e, newValue) => setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) })

  const handleVolumeChange = (newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => screenful.toggle(playerContainerRef.current)

  const handleDisplayFormat = () => setTimeDisplayFormat(timeDisplayFormat === "normal" ? "remaining" : "normal")

  const handlePlaybackRate = (rate) => setState({ ...state, playbackRate: rate })

  const hanldeMute = () => setState({ ...state, muted: !state.muted })

  const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : "00:00";

  const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  
  const elapsedTime = timeDisplayFormat === "normal" ? format(currentTime) : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <div className="bodyVideos">

      <div className="teste2">

      <div onMouseMove={handleMouseMove} onMouseLeave={hanldeMouseLeave} ref={playerContainerRef} className="VideoStyle">

        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100vh"
          url={`${!!getUrlVideo.urlVideo ? getUrlVideo.urlVideo : getUrlVideo}`}
          pip={pip}// cria uma nova tela para assistir o video, igual ao Opera
          playing={playing}
          controls={false}
          light={light}//uma imagem para aparecer de inicio antes de starta o video
          loop={loop}
          playbackRate={playbackRate}//Defina a taxa de reprodução do player
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
            },
          }}
        />

        <Controls
          ref={controlsRef}
          muted={muted}//mutado
          played={played}//barra de andamento do video
          volume={volume}//botão do volume
          playing={playing}//botão de play e pause
          onMute={hanldeMute}
          onRewind={handleRewind}
          onSeek={handleSeekChange}
          elapsedTime={elapsedTime}
          playbackRate={playbackRate}
          onDuration={handleDuration}
          onPlayPause={handlePlayPause}
          totalDuration={totalDuration}
          onFastForward={handleFastForward}
          onSeekMouseUp={handleSeekMouseUp}
          onVolumeChange={handleVolumeChange}
          onSeekMouseDown={handleSeekMouseDown}
          onToggleFullScreen={toggleFullScreen}
          onVolumeSeekDown={handleVolumeSeekDown}
          onChangeDispayFormat={handleDisplayFormat}
          onPlaybackRateChange={handlePlaybackRate}
          // onBookmark={addBookmark}
        />

        </div>

      </div>

    </div>
  );
}

export default App;
