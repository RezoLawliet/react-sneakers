import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom';

import { Storage } from '../App'

const FillerBullet = ({ imageUrl, title, describe }) => {
  const { setOpenCartBoard } = useContext(Storage)
  const navigate = useNavigate()

  const goBack = () => {
    setOpenCartBoard(prevState => (prevState ? false || navigate('/') : navigate('/')))
  }

  return (
    <div className="filler">
      <img className="filler-emoji" src={imageUrl} alt="Empty" />
      <h3 className="filler-title">{title}</h3>
      <p className="filler-description">{describe}</p>
      <button className="interaction-button" onClick={goBack}>
        <img className="interaction-button-prev" src="img/arrow-prev.svg" alt="Prev" />
        <span>К покупкам</span>
      </button>
    </div>
  )
}

export default FillerBullet