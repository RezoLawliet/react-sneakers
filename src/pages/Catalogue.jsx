import React, { useContext, useEffect, useRef } from 'react'

import { Storage } from '../compons/App'
import SearchBar from '../compons/SearchBar'
import ProductCard from '../compons/ProductCard'
import Carousel from '../compons/Carousel'

const Catalogue = () => {
  const { items, searchChanges, addCartItem, addFavoriteItem, itemLoader } = useContext(Storage)

  const render = () => {
    return itemLoader ?
    [...Array(8)].map((item, index) => (
      <ProductCard
        key={index}
      />
    )) :
    items.filter(item => item.title.toLowerCase().includes(searchChanges.toLowerCase())).map((item) => (
      <ProductCard
        key={item.id}
        {...item}
        addCartItem={item => addCartItem(item)}
        addFavoriteItem={item => addFavoriteItem(item)}
      />
    ))
  }

  return (
    <>
      <Carousel />
      <div className="product-collection">
        <div className="product-category">
          <h2>Все кроссовки</h2>
          <SearchBar />
        </div>
        <div className="product-container">
          {render()}
        </div>
      </div>
    </>
  )
}

export default Catalogue