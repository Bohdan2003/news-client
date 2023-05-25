import { useCallback, useEffect, useState, memo } from 'react';
import { checkIsMatchesWidth } from '../../utils/helpers';
import { useGetNewsSectionQuery } from "../../api/apiSlice";

import { Tile } from '../tile/Tile';
import { ListItem } from '../listItem/ListItem';
import { Error } from "../error/Error";
import { SkeletonSection } from './SkeletonSection';

import './section.scss'

const MemoListItem = memo(({className, date, descr}) => 
    <ListItem 
        className={className} 
        date={date} 
        descr={descr}
    />
);

const MemoTile = memo(({imgURL, date, descr}) => 
    <Tile 
        imgURL={imgURL}
        date={date}
        descr={descr}
    />
);

const FilterBtns = ({filter, setFilter}) => {
    return (
        <div className="section__tabs">
            <button 
                className={`section__filter-btn ${filter === 'news' ? 'section__filter-btn--active' : ''}`}
                onClick={() => {
                    setFilter('news')
                }}
                >Новини</button>
            <button 
                className={`section__filter-btn ${filter === 'articles' ? 'section__filter-btn--active' : ''}`}
                onClick={() => {
                    setFilter('articles')
                }}
                >Статті</button>
        </div>
    )
}

const Tiles = ({news}) => {
    return (
        <div className="section__content-box">
            <ul className="section__items">
                {
                    news.map(({_id, ...props}) => 
                        <MemoTile {...props} key={_id}/>
                    )
                }
            </ul>
            <a className="section__link-more" href='#'>
                Більше
            </a>
        </div>
    )
}

const List = ({newsList}) => {
    return (
        <div className="list">
            <div className="list__title">
                Новини розділу
            </div>
            <ul className="list__items">
              {
                newsList.map(({_id, ...props}) => 
                    <MemoListItem {...props} key={_id}/>
                )
              }
            </ul>
            <a className="section__link-more" href='#'>
                Більше
            </a>
        </div>
    )
}

export const Section = ({id}) => {

    const [ filter, setFilter] = useState(null);
    const { 
            data: news = {newsTile:[], newsList:[]}, 
            isLoading,
            isError
        } = useGetNewsSectionQuery(id)

    const compare = useCallback(() => {
        checkIsMatchesWidth(800)
        ? setFilter('news')
        : setFilter('all')
    }, [])

    useEffect(() => {
        compare()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', compare);
        return () => {
            window.removeEventListener('resize', compare)
        }
    }, [])

    const setContent = () => {
        switch(filter){
            case 'all':
                return (<>
                    <Tiles news={news.newsTile}/>
                    <List newsList={news.newsList}/>
                </>)
            case 'news': 
                return <List newsList={news.newsList}/>
            case 'articles':            
                return <Tiles news={news.newsTile}/>
        }
    }

    if(isError) return <section className="section"><Error/></section>
    if(isLoading) return <SkeletonSection/>

    const content = setContent()

    return (
        <section className="section">          
            <div className="section__box">
                <h2 className="section__title">
                    {news.title}
                </h2>
                <a className="section__link" href="#" >
                    Всі новини розділу
                </a>
            </div>    
                {
                    filter !== 'all' 
                        ? <FilterBtns filter={filter} setFilter={setFilter}/> 
                        : null
                }
            <div className="section__content">
                {content}
            </div>       
        </section>
    )
}