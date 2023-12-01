import React, { useContext } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/swiper-bundle.css';

import { Storage } from '../App';

const Carousel = () => {
  const { slideCollection } = useContext(Storage)

  return (
    <div className="product-carousel">
      <Swiper
        modules={[Autoplay, EffectCards]}
        autoplay={{delay: 7000, disableOnInteraction: false}}
        loop
        effect="cards"
      >
        {slideCollection.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.imageUrl} alt={slide.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel