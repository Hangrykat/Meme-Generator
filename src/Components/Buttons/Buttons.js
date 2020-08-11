import React, { useContext } from 'react';

import './Button.css';
import { StateContext } from '../../context';

function Buttons() {
  const {
    setImgData,
    imgData,
    memes,
    currentMemeIdx,
    inputs,
    setSelectedMemeSrc,
    setLoading,
  } = useContext(StateContext);

  function onUpload(e) {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      console.log('data recorded');
    }
  }

  const querifyObj = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return '?' + params.join('&');
  };

  function clickGenerate() {
    setLoading(true);
    const currentMeme = memes[currentMemeIdx];

    const obj = {
      username: 'Beerios',
      password: 'letmeusethis',
      template_id: currentMeme.id,
    };
    const arr = inputs.map((v, idx) => `boxes[${idx}][text]=${v}`).join('&');

    fetch(`https://api.imgflip.com/caption_image${querifyObj(obj)}&${arr}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.data) setSelectedMemeSrc(res.data.url);
      });
  }

  return (
    <div className="ButtonWrapper">
      <input type="file" className="custom-file-input" onChange={onUpload} />
      <button
        disabled={
          currentMemeIdx !== null ? false : imgData !== null ? false : true
        }
        onClick={clickGenerate}
      >
        Preview
      </button>
      <a href="#popup1">
        <button
          disabled={
            currentMemeIdx !== null ? false : imgData !== null ? false : true
          }
        >
          Share
        </button>
        </a>
        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>Shared link</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
              www.linkofmeme.com
            </div>
          </div>
        </div>
    </div>
  );
}

export default Buttons;
