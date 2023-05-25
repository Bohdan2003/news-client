import { FooterBox as Box } from './FooterBox'

import YouTube from '../../assets/social/YouTube.svg';
import Telegram from '../../assets/social/Telegram.svg';
import Instagram from '../../assets/social/Instagram.svg';
import Facebook from '../../assets/social/Facebook.svg';
import TikTok from '../../assets/social/TikTok.svg';
import GoogleNews from '../../assets/social/GoogleNews.svg';

import './footer.scss';

const List = (props) => (
    <ul className="footer-top__list">
        {props.children}
    </ul>
);

const ListItem = ({text, link = "#"}) => (
    <li className="footer-top__list-item">
        <a className="footer-top__list-link" href={link}>
            {text}
        </a>
    </li>
);

const SocialItem = ({text, link = "#", src}) => (
    <a className="footer-top__social-itemlink" href={link}>
        <img className="footer-top__social-img" src={src} alt={text} />
        <div className="footer-top__social-text">{text}</div>
    </a>
);

const MenuLink = ({text, link = "#"}) => (
    <a className="footer-top__menu-link" href={link}> {text} </a>
);

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-top__items">
                        <div className="footer-top__item">
                            <div className="footer-top__item-box">
                                <a className="footer-top__link" href="#"> Всі новини </a>
                                <a className="footer-top__link" href="#"> COVID-19 </a>
                                <a className="footer-top__link" href="#"> Війна </a>
                            </div>
                            <Box title="Політика">
                                <List>
                                    <ListItem text="Україна"/>
                                    <ListItem text="Світ"/>
                                </List>
                            </Box>
                        </div>
                        <div className="footer-top__item">
                            <Box title="Здоров’я">
                                 <List>
                                    <ListItem text="Дієти"/>
                                    <ListItem text="Краса"/>
                                    <ListItem text="Секс"/>
                                    <ListItem text="Психологія"/>
                                    <ListItem text="Медицина"/>
                                </List>
                            </Box>
                            <Box title="Події">
                                <List>
                                    <ListItem text="ДТП"/>
                                    <ListItem text="Катастрофи"/>
                                    <ListItem text="Кримінал"/>
                                </List>
                            </Box>   
                        </div>
                        <div className="footer-top__item">
                            <Box title="Лайфстайл">
                                <List>
                                    <ListItem text="Історії з життя"/>
                                    <ListItem text="Подорожі"/>
                                    <ListItem text="Кухня"/>
                                    <ListItem text="Шоубізнес"/>
                                    <ListItem text="Мода та стиль"/>
                                    <ListItem text="Зірковий гороскоп"/>
                                </List>
                            </Box>   
                            <Box title="Суспільство">
                                <List>
                                    <ListItem text="Охорона здоров’я"/>
                                    <ListItem text="Кримінал"/>
                                    <ListItem text="Екологія"/>
                                    <ListItem text="Релігія"/>
                                </List>
                            </Box>
                        </div>
                        <div className="footer-top__item">
                            <Box title="Регіони">
                                <List>
                                    <ListItem text="Київ"/>
                                    <ListItem text="Одеса"/>
                                    <ListItem text="Харків"/>
                                    <ListItem text="Львів"/>
                                </List>
                            </Box>
                            <Box title="Техно">
                                <List>
                                    <ListItem text="Наука"/>
                                    <ListItem text="Гаджети"/>
                                    <ListItem text="ІТ"/>
                                    <ListItem text="Космос"/>
                                </List>
                            </Box>                            
                        </div>
                        <div className="footer-top__item">
                            <Box title="Економіка">
                                <List>
                                    <ListItem text="Фінанси"/>
                                    <ListItem text="Комунальні послуги"/>
                                    <ListItem text="Бізнес"/>
                                    <ListItem text="Львів"/>
                                </List>
                            </Box>
                            <Box title="Спорт">
                                <List>
                                    <ListItem text="Футбол"/>
                                    <ListItem text="Волейбол"/>
                                    <ListItem text="Баскетбол"/>
                                    <ListItem text="Хокей"/>
                                </List>   
                            </Box>
                        </div>
                            
                        <div className="footer-top__item footer-top__menu">
                            <MenuLink text="Про нас"/>
                            <MenuLink text="Контакти"/>
                            <MenuLink text="Структура власності"/>
                            <MenuLink text="Команда"/>
                            <MenuLink text="Медіакіт"/>
                        </div>
                    </div>
                    <div className="footer-top__social">
                        <div className="footer-top__social-title">
                            Новини у зручному форматі
                        </div>
                        <div className="footer-top__social-items">
                            <SocialItem src={YouTube} text={'YouTube'}/>
                            <SocialItem src={Telegram} text={'Telegram'}/>
                            <SocialItem src={Instagram} text={'Instagram'}/>
                            <SocialItem src={Facebook} text={'Facebook'}/>
                            <SocialItem src={TikTok} text={'TikTok'}/>
                            <SocialItem src={GoogleNews} text={'Google News'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom__text">
                        © 2020-2022, ТОВ «Медіа Мережі»
                    </div>
                    <div className="footer-bottom__terms">
                        <a className="footer-bottom__link" href="#">Політика користувача</a>
                        <a className="footer-bottom__link" href="#">Політика конфіденційності</a>
                        <a className="footer-bottom__link" href="#">Політика Cookie-файлів</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

