import { Drag } from '../drag/Drag';

import './navigation.scss';

const ListItem = ({link = "#", text, active = false}) => (
    <li className="navigation__item">
        <a className={`navigation__link ${active ? 'navigation__link--active' : ''}`} 
           href={link} 
        >
            {text}
        </a>
    </li>
)

export const Navigation = () => {
    return (
        <Drag width={800}>
            <div className="navigation">
                <div className="container">
                    <nav className="navigation__inner">
                        <ul className="navigation__list">
                            <ListItem text="війна" active/>
                            <ListItem text="політика" />
                            <ListItem text="економіка" />
                            <ListItem text="суспільство" />
                            <ListItem text="погляди" />
                            <ListItem text="світ" />
                        </ul>
                        <a className="navigation__live" href="#">live</a>
                    </nav>
                </div>
            </div>
        </Drag>       
    )
}