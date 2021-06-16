import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

import LogoLive from '../../images/home/Logo_live_menu_superior.svg'
import IconFace from '../../images/home/Icon_facebook.svg'
import IconInstagram from '../../images/home/Icon_instagram.svg'

export default function Header(){
    const location = useLocation();
    async function logout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('login');
        window.location.href = '/'
    }

    return(
        <>
        <BrowserView>
        <header id="header" className="bg-purple">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            
            <div className="content">
                <div className="row no-gutters">
                    {location.pathname.search("/contratacao") ===  -1 ?
                        <>
                            <div className="col-2 logo">
                                <Link to="/"><img src={LogoLive} /></Link>
                            </div>

                            <div className="col-9">
                                <ul className="menu">
                                    <li>
                                        <Link to="/checkout" className="cl-black f-wheight-700 bg-green bt">ache seu plano ideal</Link>
                                    </li>
                                    <li>
                                        <Link to="/beneficios" className="cl-white">benefícios</Link>
                                    </li>
                                    <li>
                                        <Link to="/faq" className="cl-white">sobre a live saúde</Link>
                                    </li>
                                    <li>
                                        <Link to="/faq" className="cl-white">dúvidas frequentes</Link>
                                    </li>
                                    <li>
                                        <Link to="/consulta" className="cl-white">consulte a rede</Link>
                                    </li>
                                    <li>
                                        <Link to="/contato" className="cl-white">contato</Link>
                                    </li>
                                    {window.localStorage.getItem('token') ?
                                        <li>
                                            <Link onClick={logout} className="cl-white bt f-wheight-700 border-white ">logout</Link>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/Login" className="cl-white bt f-wheight-700 border-white ">fazer login</Link>
                                        </li>
                                    }

                                </ul>
                            </div>
                        </>
                        :
                        <div className="col-12 logo" style={{display:'inline-block', textAlign:'center'}} >
                           <img src={LogoLive} style={{display:'inline-block'}} className={'mt-4'} />
                        </div>
                        }
                    {location.pathname.search("/contratacao") ===  -1 ?
                        <div className="col-1 bg-green">
                            <ul className="redes">
                                <li>
                                    <Link to="javascript:;"><img src={IconFace}/></Link>
                                    <Link to="javascript:;"><img src={IconInstagram}/></Link>
                                </li>
                            </ul>
                        </div>
                    :''}
                </div>
            </div>
        </header>
        </BrowserView>
        <MobileView>
        <header id="header" className="bg-purple">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            <div className="content">
                <div className="row no-gutters">
                    <div className="logo">
                        <Link to="/"><img src={LogoLive} /></Link>
                    </div>
                    
                    <Menu className="menu-mobile" right width={ '500px' }>
                        <Link to="/checkout" className="cl-white f-wheight-700 bg-green bt">Ache seu plano ideal</Link>
                        <Link to="/beneficios" className="cl-white">Benefícios</Link>
                        <Link to="/faq" className="cl-white">Sobre a live saúde</Link>
                        <Link to="/faq" className="cl-white">Dúvidas frequentes</Link>
                        <Link to="/consulta" className="cl-white">Consulte a rede</Link>
                        <Link to="/contato" className="cl-white">Contato</Link>
                        {
                            window.localStorage.getItem('token') ?
                            <button className="cl-white bt f-wheight-700 border-white " onClick={logout}>Logout</button>
                            :
                            <Link to="/Login" className="cl-white bt f-wheight-700 border-white ">Fazer login</Link>
                        }
                        <Link to="/Login" className="cl-white bt f-wheight-700 border-white ">Fazer login</Link>
                        <Link to="javascript:;" className="icon-rede"><img src={IconFace}/></Link>
                        <Link to="javascript:;" className="icon-rede"><img src={IconInstagram}/></Link>
                    </Menu>
                </div>
            </div>
        </header>
        </MobileView>
        </>
    );
}
