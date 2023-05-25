import { useState, useEffect, useCallback } from 'react';
import { checkIsMatchesWidth } from '../../utils/helpers';
import AnimateHeight from 'react-animate-height';

export const FooterBox = ({title, children}) => {

    const [height, setHeight] = useState('auto');

    const compare = useCallback(() => {
        checkIsMatchesWidth(600)
        ? setHeight(0)
        : setHeight('auto')
    }, [])

    useEffect(()=>{
        compare();
    }, [compare]);

    useEffect(()=>{
        window.addEventListener('resize', compare);
        return () => {
            window.removeEventListener('resize', compare);
        }
    }, [compare]);
    
    return (
        <div className="footer-top__item-box">
            <button
                className={`
                    footer-top__button 
                    ${height !== 0 
                        ? 'footer-top__button--active' 
                        : ''
                    }`
                }
                aria-expanded={height !== 0}
                onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            >
                {title}
            </button>
            <div className="footer-top__title">{title}</div>
            <AnimateHeight
                duration={500}
                height={height}
            >
                {children}   
            </AnimateHeight>
                    
        </div>
    )
}