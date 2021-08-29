import React, { useState, useEffect } from "react";
import {MusicNoteOutlined, MusicOffOutlined} from "@material-ui/icons";

/**
 * https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
 * @param url
 * @constructor
 */
const AudioPlayer = ({ url }: any) => {
  console.log(url)
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return (
    <div>
      {/*<button onClick={toggle}>{playing ? "Pause" : "Play"}</button>*/}
      {!playing ?
        <MusicOffOutlined className="pointer" style={{color: "white"}} onClick={toggle} /> :
        <MusicNoteOutlined className="pointer" style={{color: "white"}} onClick={toggle} />
      }
    </div>
  );
};

export default AudioPlayer;
