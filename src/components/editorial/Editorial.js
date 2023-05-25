import { memo } from "react";
import { useGetNewsEditorialQuery } from "../../api/apiSlice";

import { Tile } from '../tile/Tile';
import { Error } from "../error/Error";
import { SkeletonEditorial } from "./SkeletonEditorial";

import './editorial.scss';

const MemoTile = memo(({imgURL, date, descr}) => 
    <Tile 
        imgURL={imgURL}
        date={date}
        descr={descr}
    />
);

export const Editorial = () => {
    const {
        data: news = [],
        isLoading,
        isError
    } = useGetNewsEditorialQuery()

    const setContent = () => {
        if(isLoading) return <SkeletonEditorial/>
        if(isError)   return <Error/>

        return news.map(({_id,...props}) => 
            <MemoTile {...props} key={_id}/>   
        )
    }

    const content = setContent()

    return (
        <section className="edirorial">
            <h2 className="edirorial__title">
                Вибір редакції
            </h2>
            <ul className="edirorial__items">
                {content}  
            </ul>
            <button className="edirorial__btn" disabled >Завантажити ще</button>
        </section>
    )
}

