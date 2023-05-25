import { getDay } from '../../utils/helpers';

import { RegionsList } from './RegionsList';

export const RegionsColumn = ({title, articles}) => {

    let indexArr = [],
        arrOfRange = [];

    const renderContent = (articles) => {
        let prevValue;

        for(let i = 0; i < articles.length; i++){
            if(i == 0){
                indexArr.push(0);
                prevValue = getDay(articles[1].date).replace(/0/g,'');
            }
            if(prevValue !== getDay(articles[i].date).replace(/0/g,'')){
                indexArr.push(i);
                indexArr.push(i);
                prevValue = getDay(articles[i].date).replace(/0/g,'');
            }
            if(i === articles.length-1){
                indexArr.push(articles.length);
            }
        }

        let j = 0;
        for(let i = 1; i < indexArr.length; i+=2){
            arrOfRange[j] = [indexArr[i-1], indexArr[i]];
            j++;
        }
    };
   
    renderContent(articles); 
    
    return (
        <div className="regions__column">
            <h3 className="regions__column-title">
                {title}
            </h3>
            <div className="regions__column-box">
            {
                arrOfRange.map((range, i) => 
                    <RegionsList 
                        date={articles[range[0]].date} 
                        articles={articles.slice(...range)}
                        key={i} 
                    />                 
                )
            }
            </div>           
            <a className="regions__link-more" href='#'>Більше новин</a>
        </div> 
    )  
}