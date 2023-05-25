import React, { useState} from 'react';

import { Select } from "./Select";

const languageNames = [
  { value: 'UA'},
  { value: 'RU'}
];

export const Language = () => {     
    const [language, setLanguage] = useState(languageNames[0].value);

    return (
        <>
            <div className="header-top__language">
                {
                    languageNames.map(({value}, i) => (
                      <button 
                        className={`header-top__language-btn 
                                    ${value == language ? 'header-top__language-btn--active' : ''}`} 
                        key={i}
                        onClick={()=>{
                          setLanguage(value);
                      }}>{value}</button>
                    ))
                }                           
            </div>  
            <Select props={languageNames} option={language} setOption={setLanguage}/>
        </>
    )
}