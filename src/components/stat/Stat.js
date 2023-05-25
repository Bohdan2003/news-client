import img1 from '../../assets/stat/1.png';
import img2 from '../../assets/stat/2.png';
import img3 from '../../assets/stat/3.png';
import img4 from '../../assets/stat/4.png';
import img5 from '../../assets/stat/5.png';
import img6 from '../../assets/stat/6.png';
import img7 from '../../assets/stat/7.png';

import './stat.scss';

const stat = [
    {kindOfTechnique:"особовий склад ", number: "~36 200", img: img1},
    {kindOfTechnique:"танки ", number: "1 589", img: img2},
    {kindOfTechnique:"артсистеми ", number: "4 578", img: img3},
    {kindOfTechnique:"літаки ", number: "220", img: img4},
    {kindOfTechnique:"РСЗВ ", number: "246", img: img5},
    {kindOfTechnique:"гелікоптери ", number: "190", img: img6},
    {kindOfTechnique:"ББМ ", number: "4 578", img: img7}
];

const StatList = ({stat}) => {
    return(
        <ul className="stat__list">
            {stat.map(({kindOfTechnique, number, img}, i)=>{
                return (
                    <li className="stat__item" key={i}>
                        <img className="stat__img" src={img} alt={kindOfTechnique} />
                            {kindOfTechnique}
                        <span className="stat__number">{number}</span>
                    </li>
                )                      
            })}
        </ul>   
    )
}

export const Stat = () => {
    const getDaysOfWar = (startday) => Math.floor((Date.parse(new Date()) - Date.parse(startday))/1000/60/60/24);

    return (
        <section className="stat">
            <div className="container">
                <div className="stat__inner">
                    <div className="stat__title">
                        {getDaysOfWar('2022-02-24')} день війни:
                    </div>
                    <div className="stat__box">  
                        <div>
                            <StatList stat={stat}/>                   
                            <StatList stat={stat}/>                   
                        </div>               
                    </div>         
                </div>                
            </div>
        </section>
    )
}