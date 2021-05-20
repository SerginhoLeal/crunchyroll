import React, { forwardRef } from "react";
import './Controls.css'
import PropTypes from "prop-types";
import {Button, Slider, Tooltip, Grid, Typography, Popover, withStyles} from "@material-ui/core";

import {FaAngleDoubleLeft, FaAngleDoubleRight, FaVolumeMute, FaVolumeDown, FaVolumeUp, FaPlay, FaPause, FaExpand } from 'react-icons/fa'

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef(({
  onSeek, onSeekMouseDown, onSeekMouseUp, onDuration, onRewind, onPlayPause, onFastForward, playing, played,
  elapsedTime, totalDuration, onMute, muted, playbackRate, onPlaybackRateChange,
  onToggleFullScreen, volume, onVolumeChange,
},ref ) => {
  console.log("played: " + played)
  // console.log("onSeek: " + onSeek)
  // console.log("onSeekMouseDown: " + onSeekMouseDown)
  // console.log("onSeekMouseUp: " + onSeekMouseUp)
  // console.log("onDuration: " + onDuration)

  // console.log("onRewind: " + onRewind)
  // console.log("onRewind: " + played)

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <div ref={ref} className="configHidden">
      
      <div className="buttonsActions">

        <FaAngleDoubleLeft onClick={onRewind} className="actionsVideo" />

        <div onClick={onPlayPause}>
          {playing ? <FaPause className="actionsVideo" /> : <FaPlay className="actionsVideo" />}
        </div>

        <FaAngleDoubleRight onClick={onFastForward} className="actionsVideo"/>
      
      </div>

      <div className="scrollbuttonsActions">

        <div className="barraHorizontalVideo">
          <PrettoSlider
            min={0}
            max={100}
            // ValueLabelComponent={(props) => <ValueLabelComponent {...props} value={elapsedTime} />}
            aria-label="custom thumb label"
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
            onDurationChange={onDuration}
          />
        </div>

        <div className="itensVideo">

          <div className="styleLeft">

            <div onClick={onMute} className="icoVolume">
              {
                muted
                ? <FaVolumeMute size={20} /> : volume > 0.5 
                ? <FaVolumeUp size={20} /> : <FaVolumeDown size={20} />
              }
            </div>

            <div className="volume">
              <input
                min={0}
                max={100}
                type="range"
                value={muted ? 0 : volume * 100}
                onChange={e => onVolumeChange(e.target.value)}
              />
            </div>

            <div className="fontGlobal texto">
              {elapsedTime}/{totalDuration}
            </div>

          </div>

          <div className="styleLeft">

            <div onClick={handleClick} aria-describedby={id} className="fontGlobal text">
              <div>{playbackRate}X</div>
            </div>

            <Popover
              container={ref.current}
              open={open}
              id={id}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Grid container direction="column-reverse">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <Button key={rate} onClick={() => onPlaybackRateChange(rate)} variant="text">
                    <Typography color={rate === playbackRate ? "secondary" : "inherit"}>
                      {rate}X
                    </Typography>
                  </Button>
                ))}
              </Grid>
            </Popover>

            <FaExpand onClick={onToggleFullScreen} className="actionsVideo" />
            
          </div>
        </div>

      </div>

    </div>
  )}
);

// Controls.propTypes = {
//   onSeek: PropTypes.func,
//   onSeekMouseDown: PropTypes.func,
//   onSeekMouseUp: PropTypes.func,
//   onDuration: PropTypes.func,
//   onRewind: PropTypes.func,
//   onPlayPause: PropTypes.func,
//   onFastForward: PropTypes.func,
//   onVolumeSeekDown: PropTypes.func,
//   onChangeDispayFormat: PropTypes.func,
//   onPlaybackRateChange: PropTypes.func,
//   onToggleFullScreen: PropTypes.func,
//   onMute: PropTypes.func,
//   playing: PropTypes.bool,
//   played: PropTypes.number,
//   elapsedTime: PropTypes.string,
//   totalDuration: PropTypes.string,
//   muted: PropTypes.bool,
//   playbackRate: PropTypes.number,
// };

export default Controls;
