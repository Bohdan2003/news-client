import { useRef } from 'react';
import { useGetNewsRegionsQuery } from '../../api/apiSlice';
import { Error } from "../error/Error";

import './menu.scss';

const Menu = () => {
    const listRef = useRef(null);

    const { 
            data = [],
            isLoading,
            isError
        } = useGetNewsRegionsQuery()

    if(isError) return <Error/>

    return (
        <nav className="menu">
            <button 
                className={`menu__btn ${isLoading ? 'isLoading' : ''}`}
                disabled={isError}
                onClick={()=>{
                    const list = listRef.current;
                    list.classList.toggle('menu__list--hidden');
                }}
            >Меню</button>
            <div className="menu__box">
                <ul 
                    className="menu__list menu__list--hidden"
                    ref={listRef}
                >
                    {data.map(({title, _id}) => (
                        <li className="menu__item" key={_id}>
                            <a href="#" className="menu__link">
                                {title}
                            </a>
                        </li>
                    ))}                   
                </ul>
            </div>                            
        </nav>
    )
}

export { Menu };