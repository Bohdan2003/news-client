import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from "swiper";

import { IMAGE_URL } from "../../keys"

import './subslider.scss';

const MemoSwiperSlideContent = memo(({descr, imgURL}) => (  
    <>
       <img 
            className="subslider__img" 
            src={IMAGE_URL+imgURL} 
            alt="Фото слайду"
        />
        <div className="subslider__text">
            {descr}
        </div>
    </> 
))

export const Subslider = ({slides, setThumbsSwiper}) => {
    return (
        <div className="subslider">
            <div className="container">
                <Swiper
                    className="subslider__items"
                    freeMode
                    modules={[Thumbs, FreeMode]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    breakpoints={{
                        0:{
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        500:{
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        900:{
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1200:{
                            slidesPerView: 4,
                            spaceBetween: 30,
                        }
                    }}
                >   
                    {slides.map(({_id, ...props})=>(
                        <SwiperSlide className="subslider__item" key={_id}>
                                <MemoSwiperSlideContent {...props}/>
                        </SwiperSlide> 
                        )
                    )}
                </Swiper>
            </div>
        </div>
    )
}   