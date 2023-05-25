import telegram from '../../assets/telegram.svg'
import instagram from '../../assets/instagram.svg'
import youTube from '../../assets/youTube.svg'
import facebook from '../../assets/facebook.svg'

const ListItem = ({link = "#", img, descr}) => (
    <li className="header-top__social-item">
        <a href={link} className="header-top__social-link">
            <img src={img} alt={descr}/>
        </a>
    </li>
);

export const Social = () => {
    return (
        <ul className="header-top__social-list">
            <ListItem img={telegram} descr="Telegram"/>
            <ListItem img={facebook} descr="Facebook"/>
            <ListItem img={instagram} descr="Instagram"/>
            <ListItem img={youTube} descr="YouTube"/>
        </ul>
    )
}