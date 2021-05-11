import React from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Animated} from "react-animated-css";

import './lp.scss'

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import LogoEssencial from '../../images/lp/essencial/logo-essencial.svg'
import Icon1 from '../../images/lp/essencial/icon1.svg'
import Icon2 from '../../images/lp/essencial/icon2.svg'
import Icon3 from '../../images/lp/essencial/icon3.svg'
import Icon4 from '../../images/lp/essencial/icon4.svg'
import Icon5 from '../../images/lp/essencial/icon5.svg'
import Icon6 from '../../images/lp/essencial/icon6.svg'
import Icon7 from '../../images/lp/essencial/icon7.svg'
import Icon8 from '../../images/lp/essencial/icon8.svg'
import Icon9 from '../../images/lp/essencial/icon9.svg'

import BgCard from '../../images/lp/essencial/bg-card.svg'
import Card from '../../images/lp/essencial/card.svg'

import { IoLogoWhatsapp, IoIosArrowForward, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io'

import IconFace from '../../images/home//Icon_facebook.svg'
import IconInstagram from '../../images/home/Icon_instagram.svg'

export default function Essencial() {
    return (
        <div id="lp">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" />

            <style dangerouslySetInnerHTML={{
                __html: `
                    #footer,
                    #header{
                        display: none;
                    }
                    @media screen and (min-height: 938px){
                        body{
                            overflow-y: hidden;
                        }
                    }
                `
            }} />
            <img src={BgCard} className="bg-card midle-image animated rotateIn" />
            <img src={Card} className="card-midle midle-image animated zoomIn" />
            <div className="lp-left bg-essencial ">
                <div className="container animated fadeIn" align="center">
                    <img src={LogoEssencial} />
                    <h2 className="cl-white font-24">Nossos planos oferecem diversos <b>benefícios<br /> pra você</b> cuidar da sua Saúde!</h2>
                    <Carousel
                        className="carousel-wid"
                        arrows
                        infinite
                        centered 
                        slidesPerScroll={1}
                    >
                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon1} />
                            </div>
                            <p>
                                Descontos de até <span className="cl-green">70% </span>
                                em consultas médicas(clínico e especialidades)
                            </p>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon2} />
                            </div>
                            <p>
                                Rede de descontos em diversos estabelecimentos, incluindo farmácias.
                            </p>
                        </div>
                        
                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon3} />
                            </div>
                            <p>
                                Assistência odontológica
                            </p>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon4} />
                            </div>
                            <p>
                            Orientação médica por telefone
                            </p>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon5} />
                            </div>
                            <p>
                                Assistência funeral
                            </p>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon6} />
                            </div>
                            <p>
                                Leva e traz em caso de emergência*
                            </p>
                            <span>*Plano Saúde+ </span>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon7} />
                            </div>
                            <p>
                                Check-up Médico anual*
                            </p>
                            <span>*Plano Saúde+ </span>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon8} />
                            </div>
                            <p>
                                Orientação Nutricional**
                            </p>
                            <span>**Plano Live Premium</span>
                        </div>

                        <div className="box-car">
                            <div className="box-icon bg-green">
                                <img src={Icon9} />
                            </div>
                            <p>
                                Orientação Fitness**
                            </p>
                            <span>**Plano Live Premium</span>
                        </div>
                        
                    </Carousel>
                </div>
            </div>
            <div className="lp-right animated fadeIn">
                
                <ul>
                    <li><Link to="" className="font-16 instagram"><IoLogoInstagram className="icon" /></Link></li>
                    <li><Link to="" className="font-16 facebook"><IoLogoFacebook className="icon" /></Link></li>
                    <li><Link to="" className="bt bt-whats cl-green-whats border-green-whats font-16"><IoLogoWhatsapp className="icon-whats"/> Fale conosco</Link></li>
                    <li><Link to="" className="bt accessar cl-purple border-purple font-16">Acessar site<IoIosArrowForward className="icon-site" /><IoIosArrowForward className="icon-site icon2" /></Link></li>
                </ul>

                <div className="container">
                    <h2 className="title-left cl-purple font-30 f-weight-400">A <b>qualidade de vida</b> que sua família merece não precisa custar caro!</h2>
                    <div className="bg-green a-partir">
                        <span className="cl-white font-16">
                            Planos<br />
                            a partir de 
                        </span>
                        <span className="cl-white font-32">R$23,90/mês</span>
                    </div>

                    <p className="cl-gray font-16 voce-garante">Você garante <b>preços muito mais baixos</b> em consultas, exames, remédios e ainda conta com assistência odontológica e funeral.</p>
                    <p className="cl-gray font-16 muito-mais">E muito mais:</p>
                    <p className="cl-purple font-24 f-weight-700 orientacao">
                        Orientação médica por telefone<br />
                        <span className="cl-gray">24h por dia, 7 dias por semana!</span> 
                    </p>

                    <form method="">
                        <p className="cl-gray font-16 f-weight-700">Para saber mais infomações, informe os dados abaixo:</p>

                        <label>
                            <input type="text" name="nome" placeholder="Nome Completo"  />
                        </label>

                        <label>
                            <input type="text" name="telefone" placeholder="Telefone"  />
                        </label>

                        <button className="bt bg-purple cl-white" type="submit">Quero receber mais informações <IoIosArrowForward className="cl-white icon1" /><IoIosArrowForward className="cl-white icon2"/></button>
                    </form>

                    <Link class="link-footer cl-purple font-16 f-wheight-700">Conhecer todos os planos Live Saúde</Link>

                </div>

            </div>
            <div id="footer-lp">
                <p className="cl-gray font-12">2020 ® Live Saúde</p>
                <span className="cl-gray font-12">Produzido por <Link to="">Tropa Digital</Link> e <Link to="">SOMO Collab</Link></span>
            </div>
        </div>
    );
}
