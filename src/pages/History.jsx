import React, { useEffect, useContext, useState } from 'react'

import axios from 'axios'

import ProductCard from '../compons/ProductCard'
import { Storage } from '../compons/App'
import FillerBullet from '../compons/FillerBullet'

const History = () => {
  const { orderCollection, setOrderCollection, itemLoader, setItemLoader } = useContext(Storage)

  useEffect(() => {
    async function fetch() {
      try {
        setItemLoader(true)
        const { data } = await axios.get('https://65681b909927836bd97417f3.mockapi.io/history')
        setOrderCollection(data.map((item) => item.order).flat())
      } catch (error) {
        console.error(`Ошибка: ${error}.`)
        alert('Не удалось получить данные о заказах.')
      }
      setItemLoader(false)
    }
    fetch()
  }, [])

  return (
    <div className="product-collection">
      <>
        <div className="product-category">
          <h2>История заказов</h2>
        </div>
        <div className="product-container">
          {itemLoader ?
          [...Array(8)].map((index) => (
            <ProductCard
              key={index}
            />
          )) :
          orderCollection.length > 0 ?
          orderCollection
          .map((item) => (
            <ProductCard
              {...item}
            />
          )) :
          <FillerBullet
            imageUrl={"img/emoji-1.svg"}
            title={"У вас нет заказов"}
            describe={"История ваших заказов будет отображаться здесь."}
          />}
        </div>
      </>
    </div>
  )
}

export default History