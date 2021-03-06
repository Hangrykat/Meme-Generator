import React, { createContext, useState, useEffect } from 'react';

export const StateContext = createContext({});

const ContextProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [imgData, setImgData] = useState(null);
  const [selectedMemeSrc, setSelectedMemeSrc] = useState(null);
  const [currentMemeIdx, setCurrentMemeIdx] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((json) => {
        const allMemes = json.data.memes.slice(0, 90);
        setMemes(allMemes);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        currentMemeIdx,
        setCurrentMemeIdx,
        inputs,
        setInputs,
        memes,
        selectedMemeSrc,
        setSelectedMemeSrc,
        imgData,
        setImgData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
