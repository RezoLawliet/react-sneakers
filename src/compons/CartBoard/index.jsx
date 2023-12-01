import React, { useContext, useState } from 'react'

import cn from 'classnames'
import axios from 'axios'

import { Storage } from '../App'
import FillerBullet from '../FillerBullet'

const CartBoard = ({ openCartBoard, removeCartItem }) => {
  const { cartCollection, setCartCollection, setOpenCartBoard, itemLoader, setItemLoader } = useContext(Storage)
  const [orderIdentity, setOrderIdentity] = useState(null)
  const [isOrdered, setIsOrdered] = useState(false)

  const totalPrice = cartCollection.reduce((sum, item) => sum + item.price, 0)
  const discount = 5
  const discountPrice = (totalPrice / 100 * discount).toFixed(0)

  const addOrderItem = async () => {
    try {
      setItemLoader(true)
      const { data } = await axios.post('https://65681b909927836bd97417f3.mockapi.io/history', {
        order: cartCollection
      })
      setOrderIdentity(data.id)
      setIsOrdered(true)
      setCartCollection([])
    } catch (error) {
      console.error(`Ошибка: ${error}.`)
      alert('Ошибка при создании заказа.')
    }
    setItemLoader(false)
  }

  return (
    <div className={cn("cart-board", {
        "open" : openCartBoard,
      })}>
      <div className="cart-board-overflow" onClick={() => setOpenCartBoard(false)}>
      </div>
      <div className="cart">
        <h3 className="cart-title">Корзина</h3>
        {cartCollection.length > 0 ?
        <>
          <div className="cart-quick-buy">
            {cartCollection.map((item) => (
              <div className="cart-product" key={item.id}>
                <div className="cart-product-cover">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="cart-product-detail">
                  <p className="cart-product-title">{item.title}</p>
                  <span className="cart-product-price">{item.price} р.</span>
                </div>
                <button className="cart-product-action" onClick={() => removeCartItem(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                    <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="cart-payment">
            <ul className="cart-payment-check">
              <li className="cart-payment-check-item">
                <span className="cart-payment-check-category">Стоимость</span>
                <div className="cart-payment-check-divider"></div>
                <span className="cart-payment-check-price">{totalPrice} RUB</span>
              </li>
              <li className="cart-payment-check-item">
                <span className="cart-payment-check-category">Скидка</span>
                <div className="cart-payment-check-divider"></div>
                <span className="cart-payment-check-price">{discount}%</span>
              </li>
              <li className="cart-payment-check-item">
                <span className="cart-payment-check-category">Общая стоимость</span>
                <div className="cart-payment-check-divider"></div>
                <span className="cart-payment-check-price">{totalPrice - discountPrice} RUB</span>
              </li>
            </ul>
            <button className="interaction-button" onClick={() => addOrderItem()} disabled={itemLoader}>
              <span>Оформить заказ</span>
              <img className="interaction-button-next" src="img/arrow-next.svg" alt="Next" />
            </button>
          </div>
        </> :
        <div className="cart-quick-buy">
          <FillerBullet
            imageUrl={isOrdered ? "img/ordered.svg" : "img/box.svg"}
            title={isOrdered ? "Заказ оформлен!" : "Пока что пусто"}
            describe={isOrdered ? `Ваш заказ под номером #${orderIdentity} был передан нашему менеджеру!` :
            "В вашей корзине пока ничего нет. Добавьте что-то, чтобы сделать заказ."}
            closeCartBoard={() => setOpenCartBoard(false)}
          />
        </div>}
      </div>
    </div>
  )
}

export default CartBoard