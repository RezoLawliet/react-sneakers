import React, { createContext, useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import CartBoard from './CartBoard'
import Catalogue from '../pages/Catalogue'
import Favorite from '../pages/Favorite'
import History from '../pages/History'
import Footer from './Footer'

export const Storage = createContext({})

const App = () => {

  const [openCartBoard, setOpenCartBoard] = useState(false)
  const [searchChanges, setSearchChanges] = useState('')
  const [slideCollection, setSlideCollection] = useState([
    {
      title: "Slide 1",
      imageUrl: "img/main.png",
    },
    {
      title: "Slide 2",
      imageUrl: "img/main.png",
    },
    {
      title: "Slide 3",
      imageUrl: "img/main.png",
    },
  ])
  const [items, setItems] = useState([])
  const [cartCollection, setCartCollection] = useState([])
  const [favoriteCollection, setFavoriteCollection] = useState([])
  const [orderCollection, setOrderCollection] = useState([])
  const [itemLoader, setItemLoader] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        setItemLoader(true)
        const response = await axios.get('https://65681b909927836bd97417f3.mockapi.io/items')
        setItems(response.data)
      } catch (error) {
        console.error(`Ошибка: ${error}.`)
        alert('Не удалось получить данные о каталоге.')
      }
      setItemLoader(false)
    }
    fetch()
  }, [])

  const addCartItem = (item) => {
    const specimen = cartCollection.find(cartItem => +(cartItem.nodeId) === +(item.id))
    if(specimen) {
      setCartCollection(prev => prev.filter(cartItem => +(cartItem.nodeId) !== +(item.id)))
    } else {
      setCartCollection(prev => [...prev, item])
    }
  }

  const addFavoriteItem = (item) => {
    if(favoriteCollection.find(favoriteItem => +(favoriteItem.nodeId) === +(item.id))) {
      setFavoriteCollection(prev => prev.filter(favoriteItem => +(favoriteItem.id) !== +(item.id)))
    } else {
      setFavoriteCollection(prev => [...prev, item])
    }
  }

  const isChosen = (id) => {
    return cartCollection.some(item => +(item.nodeId) === +(id))
  }

  const isFavorite = (id) => {
    return favoriteCollection.some(item => +(item.nodeId) === +(id))
  }

  const removeCartItem = (id) => {
    setCartCollection(prev => prev.filter(item => +(item.id) !== +(id)))
  }

  return (
    <div className="app">
      <Storage.Provider 
        value={{
          items,
          cartCollection,
          setCartCollection,
          favoriteCollection,
          orderCollection,
          setOrderCollection,
          slideCollection,
          isChosen,
          isFavorite,
          searchChanges,
          setSearchChanges,
          setOpenCartBoard,
          addCartItem,
          addFavoriteItem,
          itemLoader,
          setItemLoader,
        }}>
        <Header openCartBoard={() => setOpenCartBoard(true)} />
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="" exact
                element={<Catalogue />} 
              />
              <Route path="favorite" exact
                element={<Favorite />} 
              />
              <Route path="history" exact
                element={<History />}
              />
            </Routes>
          </div>
        </main>
        <CartBoard openCartBoard={openCartBoard} removeCartItem={removeCartItem} />
        <Footer />
      </Storage.Provider>
    </div>
  )
}

export default App