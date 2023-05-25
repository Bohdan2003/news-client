import { useState, useRef, memo } from 'react';
import { transformDate } from '../../utils/helpers';
import { useGetNewsVideoQuery } from '../../api/apiSlice';
import { TransitionGroup, Transition } from 'react-transition-group';
import { onShowTransitionGroupItem, onHiddenTransitionGroupItem } from '../../utils/helpers';
import { Fancybox } from "@fancyapps/ui";

import { SkeletonVideo } from './SkeletonVideo';
import { Error } from "../error/Error";

import "@fancyapps/ui/dist/fancybox.css";
import './video.scss';

import { IMAGE_URL } from "../../keys"

const MemoVideoItem = memo(({imgURL, date, descr, videoLink}) => {
    return (
        <li className="video__item">
            <a className="video__item-linkimg" data-fancybox
            href={videoLink}>
                <img src={IMAGE_URL+imgURL} alt="Зображення відео"/>                                            
            </a>
            <div className="video__date">
                {transformDate(date)}
            </div>
            <a className="video__item-descr" href="#">
                {descr}
            </a>
        </li>
    )
} )

export const Video = () => {
    const disabledBtnRef = useRef(false);
    const [limit, setLimit] = useState(5)

    const { 
        data = {news:[], length:0},
        isLoading,
        isFetching,
        isError
    } = useGetNewsVideoQuery(limit)

    const setContent = () => {        
        if(isLoading) return <SkeletonVideo/>;
        if(isError) return <Error/>;

        return (
            <TransitionGroup className="video__list" component="ul">
                {
                    data.news.map(({_id, ...props}) => (
                        <Transition
                            timeout={250} 
                            onEnter={ e => {
                                onHiddenTransitionGroupItem(e);  
                                onShowTransitionGroupItem(e);
                                setTimeout(() => {
                                    e.style.height = `auto`;
                                }, 250)
                            }}
                            key={_id} 
                        >
                            <MemoVideoItem {...props}/>
                        </Transition>
                        
                    ))
                }
            </TransitionGroup>
        )
    }

    const content = setContent()

    return (
        <section className="video">
            <div className="container">
                <div className="video__inner">

                    <div className="video__box">
                        <h3 className="video__title">
                            Відео
                        </h3>
                        <a className="video__link" href="#">
                            Більше відео
                        </a>
                    </div>

                    {content}

                    <button className={`video__btn ${isFetching ? 'isLoading' : null}`}
                            disabled={(data.length <= 5 || isError || disabledBtnRef.current) && !isFetching}
                            onClick={() => {
                                if(data.length - 5 > limit){
                                    setLimit(value => value + 5)
                                } else {
                                    setLimit(value => value + 5)
                                    disabledBtnRef.current = true;
                                }
                            }}
                    >Більше</button>

                </div>
            </div>
        </section>
    )
}
