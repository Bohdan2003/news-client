import { useState, memo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay, Pagination  } from 'swiper';
import { useGetSLidesQuery } from "../../api/apiSlice";

import { Subslider } from "./Subslider";
import { SkeletonSlider } from "./SkeletonSlider";
import { IMAGE_URL } from "../../keys";
import { Error } from "../error/Error";

import 'swiper/css';
import "./slider.scss";

const MemoSwiperSlideContent = memo(({descr, imgURL, link = "#"}) => {
    return (  
        <>
            <div className="slider__content">    
                <div className="container">
                    <h2 className="slider__text">
                        <a className="slider__textlink" href={link}>{descr}</a> 
                    </h2>                
                </div>
            </div>
                
            <img src={IMAGE_URL+imgURL} alt="Фото слайду" className="slider__img" />
        </> 
    )
})

export const Slider = () => {
    const {
        data = [],
        isLoading,
        isError
    } = useGetSLidesQuery()

    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    if(isLoading) return <SkeletonSlider/>
    if(isError) return <Error/>

    return (
        <section className="slider">
            <div className="slider__inner">
                <Swiper
                    className="slider__items" 
                    pagination={{
                        type: "fraction",
                        el:".slider__counter",
                        renderFraction: function (currentClass, totalClass) {
                            return '<span class="' + currentClass + '"></span>' +
                                        '/' +
                                    '<span class="' + totalClass + '"></span>';
                        }
                    }}
                    navigation={{
                        prevEl: '.swiper-prev',
                        nextEl: '.swiper-next',
                      }}
                    modules={[Navigation, Thumbs, Autoplay, Pagination ]}
                    autoplay={{ delay: 5000 }}   
                    thumbs={{ swiper: thumbsSwiper }} 
                >
                    {data.map(({_id, ...props})=>(
                        <SwiperSlide className="slider__item" key={_id}>
                            <MemoSwiperSlideContent {...props}/>
                        </SwiperSlide>
                    ))}                      
                </Swiper>
                <div className="slider__counter-box">
                    <div className="container">
                        <div className="swiper-prev"></div>
                        <div className="slider__counter"></div>
                        <div className="swiper-next"></div>
                    </div>                   
                </div>  
            </div>
                
             <Subslider slides={data} setThumbsSwiper={setThumbsSwiper}/>             
                      
        </section>
    )
}