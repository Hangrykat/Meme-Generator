import React, { useContext } from 'react';
import './Meme.css';

import { StateContext } from '../../context';

function Meme(props) {
  const {
    setSelectedMemeSrc,
    setImgData,
    memes,
    setInputs,
    setCurrentMemeIdx,
  } = useContext(StateContext);

  function clickHandler(e) {
    setImgData(null);
    setSelectedMemeSrc(e.target.src);
    setCurrentMemeIdx(props.idx);
    setInputs(Array(memes[props.idx].box_count).fill(''));
  }

  return (
    <div className="MemeContainer">
      <img onClick={clickHandler} src={props.pic} alt="meme" />
    </div>
  );
}

export default Meme;
