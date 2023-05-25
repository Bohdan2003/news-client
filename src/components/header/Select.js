import React, { useRef } from 'react';

import "./select.scss"; 

export const Select = ({props, option, setOption}) => {
  
  const refList = useRef(null);
  const refTitle = useRef(null);

  const ShowList = () => {
    refTitle.current.classList.toggle("select__title--active");
    refList.current.classList.toggle("select__list--hidden");
    refList.current.parentNode.classList.toggle("select__box--disable");    
  };

  return (
    <div className="select">
      <div 
        ref={refTitle}
        className="select__title"
        onClick={ShowList}
        >{option}</div>
      <div className="select__box">
        <ul className="select__list select__list--hidden" ref={refList}>
        {
          props.map(({value}, i) => {
            return (
              <li 
                className={`select__item 
                            ${value == option ? 'select__item--active' : ''}`} 
                key={i}
                onClick={()=>{
                    setOption(value);
                    ShowList();
                }}>
                {value}
              </li>
            )           
          })
        }       
      </ul>
      </div>
      
    </div>
  );
}