import React from 'react';
import { Link } from 'react-router-dom';

import LogoLive from '../../images/home/Logo_live_menu_superior.svg'
import IconFace from '../../images/home/Icon_facebook.svg'
import IconInstagram from '../../images/home/Icon_instagram.svg'

export default function Footer(){
    return(
        <footer id="footer" >
            <div id="footer-1" className="bg-green">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-lg-2 col-md-12">
                            <img className="logo-footer" src={LogoLive} />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="uls-menus">
                                <ul className="cl-white font-16 ">
                                    <li>
                                        <Link to="javascript:;">Conheça os planos</Link>
                                    </li>
                                    <li>
                                        <Link to="beneficios">Benefícios</Link>
                                    </li>
                                    <li>
                                        <Link to="faq">Sobre a Live Saúde</Link>
                                    </li>
                                </ul>

                                <ul className="cl-white font-16 ">
                                    <li>
                                        <Link to="faq">Dúvidas frequentes</Link>
                                    </li>
                                    <li>
                                        <Link to="consulta">Consulte nossa Rede</Link>
                                    </li>
                                    <li>
                                        <Link to="contato">Contato</Link>
                                    </li>
                                </ul>

                                <ul className="cl-white font-16 redes ">
                                    <li>
                                        <a>Siga a Live Saúde</a>
                                    </li>
                                    <li>
                                        <Link to="javascript:;"><img src={IconFace}/> <img src={IconInstagram}/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 bd-left">
                            <p className="cl-white font-10">
                                *Live Saúde  não é plano de saúde, não garante e não se responsabiliza pelos serviços oferecidos e pelo pagamento das despesas, nem assegura desconto em todos os serviços obrigatoriamente garantidos por plano de saúde. Tudo o que o cliente usar ou comprar será por ele pago ao prestador, assegurando-se apenas os preços e descontos que constam na relação de empresas e serviços conveniados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer-2">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-md-12 col-lg-6" align="left">
                            <p className="font-14 cl-white">2020 ® Live Saúde</p>
                        </div>
                        <div className="col-md-12 col-lg-6" align="right">
                            <p className="prod font-14 cl-white">Produzido por <a href="https://tropa.digital" className="f-wheight-600 cl-white"> Tropa Digital &nbsp;</a> e <a className="f-wheight-600 cl-white" href="https://somocollab.com">SOMO Collab</a> </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
