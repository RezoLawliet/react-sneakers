import React, { useContext } from 'react'

import ContentLoader from 'react-content-loader'

import { Storage } from '../App'

const ProductCard = ({
id,
imageUrl,
title,
price,
addCartItem,
addFavoriteItem,
}) => {

  const { isChosen, isFavorite, itemLoader } = useContext(Storage)
  const specimen = { id, nodeId: id, imageUrl, title, price }

  const makeChosen = () => {
    addCartItem(specimen)
  }

  const makeFavorite = () => {
    addFavoriteItem(specimen)
  }

  return (
    <div className="product-card">
      { itemLoader ?
      <div className="product-card-wrapper">
        <ContentLoader
        speed={2}
        width={150}
        height={210}
        viewBox="0 0 150 210"
        backgroundColor="#F3F3F3"
        foregroundColor="#ECEBEB">
          <rect x={0} y={15} rx={10} ry={10} width={150} height={115} />
          <rect x={0} y={135} rx={5} ry={5} width={150} height={15} />
          <rect x={0} y={152} rx={5} ry={5} width={130} height={10} />
          <rect x={0} y={177} rx={5} ry={5} width={100} height={25} />
          <rect x={118} y={173} rx={10} ry={10} width={32} height={32} />
        </ContentLoader>
      </div> :
      <div className="product-card-wrapper">
        <div className="product-card-cover">
          <img src={imageUrl} alt={title} />
          {addFavoriteItem && 
          <button className="product-card-favorite" onClick={makeFavorite}>
            <img className="product-card-favorite-icon" src={isFavorite(id) ? "img/wished.svg" : "img/unwished.svg"} alt="In wish" />
          </button>
          }
        </div>
        <p className="product-card-title">{title}</p>
        <div className="product-card-detail">
          <div className="product-card-price">
            <span className="product-card-price-sublime">Цена:</span>
            <span className="product-card-price-value">{price} RUB</span>
          </div>
          {addCartItem &&
          <button className="product-card-action" onClick={makeChosen}>
            <img className="product-card-action-icon" src={isChosen(id) ? "img/added.svg" : "img/unadded.svg"} alt="In cart" />
          </button>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default ProductCard