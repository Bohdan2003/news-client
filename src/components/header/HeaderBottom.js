import { Drag } from '../drag/Drag';

import './headerBottom.scss';

const ListItem = ({link = "#", text, active = false}) => (
    <li className="header-bottom__item">
        <a className={`header-bottom__link ${active ? 'header-bottom__link--active' : ''}`} 
           href={link} 
        >
            {text}
        </a>
    </li>
)

export const HeaderBottom = () => {
    return (
        <Drag width={800}>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-bottom__inner">
                        <ul className="header-bottom__list">
                            <ListItem text="війна" active/>
                            <ListItem text="політика" />
                            <ListItem text="економіка" />
                            <ListItem text="суспільство" />
                            <ListItem text="погляди" />
                            <ListItem text="світ" />
                        </ul>
                        <a className="header-bottom__live" href="#">live</a>
                    </div>
                </div>
            </div>
        </Drag>       
    )
}