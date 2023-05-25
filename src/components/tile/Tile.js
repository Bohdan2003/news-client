import { transformDate } from "../../utils/helpers";

import "./tile.scss";

import { IMAGE_URL } from "../../keys"

export const Tile = ({imgURL, date, descr}) => {
    return (
        <li className="tile" >
            <a className="tile__imglink" href="#">
                <img src={IMAGE_URL+imgURL} alt="Фото для статті"  />
            </a>           
            <div className="tile__date" >      
                {transformDate(date)}
            </div>
            <h4 className="tile__descr">
                <a className="tile__descrlink" href="#">{descr}</a>
            </h4>
        </li>  
    )
}