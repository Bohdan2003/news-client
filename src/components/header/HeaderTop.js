import { Language }  from "./Language";
import { Social } from "./Social";
import { Menu } from "./Menu";

import './headerTop.scss';

export const HeaderTop = () => {
    return (
        <div className="header-top">
            <div className="container">
                <div className="header-top__inner">
                    <Menu/>
                    <div className="header-top__box">
                        <Social/>
                        <Language/>
                    </div>
                </div>
            </div>
        </div>
    )
}