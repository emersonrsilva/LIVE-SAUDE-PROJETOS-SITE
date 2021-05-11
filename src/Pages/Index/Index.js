import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import './Index.scss'

import Scrollchor from 'react-scrollchor';

import MaisInfos from '../../Components/MaisInfos'
import Planos from '../../Components/Planos'

import Check from '../../images/home/check.svg';
import Cartoes from '../../images/home/cartoes.png'
import IconConsulta from '../../images/home/Icone_consultas.svg'
import IconExames from '../../images/home/Icone_exames.svg'
import IconRemedios from '../../images/home/Icone_remedios.svg'
import IconSaude from '../../images/home/Icone_cruz.svg'
import BannerFull from '../../images/home/banner-full.png'
import DepoImg1 from '../../images/home/dep_01.jpg'
import DepoImg2 from '../../images/home/dep_02.jpg'
import DepoDetail from '../../images/home/box-depo-detail.jpg'
import { BrowserView, MobileView } from 'react-device-detect';



export default function Index() {
    return (
        <div id="home">
            <div id="banner">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12" align="right">
                            <p className="cl-white font-33 title-banner">
                                a <b>tranquilidade</b> <br />
                            que sua família merece <br />
                                <b>não precisa custar caro!</b> <br />
                            </p>
                            <ul className="cl-white font-16 list-ck">
                                <li><span><img src={Check} /></span>Orientação médica por telefone</li>
                                <li><span><img src={Check} /></span>Consultas e exames com descontos de até 60%</li>
                                <li><span><img src={Check} /></span>Descontos em medicamentos</li>
                                <li><span><img src={Check} /></span>Assistência odontológica e funeral</li>
                                <li><span><img src={Check} /></span>Atendimento nutricional e fitness</li>
                                <li className="cl-green">e ainda mais benefícios!</li>
                            </ul>
                            <div className="bg-purple ver-planos">
                                <p className="font-20 cl-white">A partir de <span className="font-39 f-wheight-600">R$23,90</span>/mês <Scrollchor className="cl-black bg-green" to="#planoa">ver planos</Scrollchor></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="para-voce">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12 title" align="center">
                            <h2 className="cl-purple font-28">Se você não quer depender do SUS e não tem um plano de saúde, <b>a Live Saúde é pra você!</b></h2>
                            <p className="cl-gray font-16">Com um valor mensal pequeno, tenha benefícios e facilidades nas mais diversas áreas da Saúde, de forma humanizada, acessível e descomplicada. </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 cartoes mb-none">
                            <ScrollAnimation animateIn="fadeIn" animateOnce >
                                <img src={Cartoes} />
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-6 col-md-12 text">
                            <BrowserView>
                        <ScrollAnimation animateIn="fadeInRight" animateOnce >
                            <p className="font-28 cl-purple ">
                                Com o cartão Live Saúde você pode ter <br />
                                direito a um <b>Check-up Médico</b> anual <br />
                                e <b>Orientação Médica por telefone,</b> <br />
                                quando quiser!
                            </p>
                            <Link to="beneficios" className="font-16 cl-purple border-purple bt">quero mais informações</Link>
                        </ScrollAnimation>
                        </BrowserView>
                        <MobileView>
                            <p className="font-28 cl-purple ">
                                Com o cartão Live Saúde você pode ter <br />
                                direito a um <b>Check-up Médico</b> anual <br />
                                e <b>Orientação Médica por telefone,</b> <br />
                                quando quiser!
                            </p>
                            <Link to="beneficios" className="font-16 cl-purple border-purple bt">quero mais informações</Link>
                        </MobileView>
                        </div>
                    </div>
                </div>
            </div>

            <div id="especialidades">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12" align="center">
                            <h2 className="cl-white font-25">Acesso a consultas, exames, remédios, dentista, e outras especialidades.</h2>
                            <p className="cl-white font-25">Tudo isso com valores especiais reduzidos para clientes Live Saúde.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <ScrollAnimation animateIn="fadeIn" animateOnce >
                            <div className="box border-white">
                                <img src={IconConsulta} />
                                <span className="cl-white font-25 title">Consultas</span>
                                <p className="cl-white font-16">
                                    Atendimentos presenciais e remotos, em diversas especialidades  <br /><br />
                                E mais: Orientação médica via telefone 24h.
                            </p>
                            </div>
                            </ScrollAnimation>
                        </div>

                        <div className="col-lg-3 col-md-6">
                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                            <div className="box border-white">
                                <img src={IconExames} />
                                <span className="cl-white font-25 title">Exames</span>
                                <p className="cl-white font-16">Os exames laboratoriais que você precisa, incluindo hemograma, urina, ultrason e eletrocardiograma.</p>
                                <span className="obs cl-white font-12">*consulte condições</span>
                            </div>
                            </ScrollAnimation>
                        </div>

                        <div className="col-lg-3 col-md-6">
                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                            <div className="box border-white">
                                <img src={IconRemedios} />
                                <span className="cl-white font-25 title">Remédios</span>
                                <p className="cl-white font-16">Preços reduzidos em farmácias das redes parceiras, com desconto de até 60%.</p>
                                <Link className="link cl-white" to="consulta">Consulte nossa rede</Link>
                            </div>
                            </ScrollAnimation>
                        </div>

                        <div className="col-lg-3 col-md-6">
                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                            <div className="box border-white">
                                <img src={IconSaude} />
                                <span className="cl-white font-25 title">Saúde 360°</span>
                                <p className="cl-white font-16">Dentistas, nutricionistas e outros profissionais, além de assistência funeral e serviço de emergências veiculares.</p>
                                <Link className="link cl-white" to="consulta">Saiba mais</Link>
                            </div>
                            </ScrollAnimation>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-12" align="center">
                            <div className="cl-purple bg-white fale-consultor">
                                <p className="font-22">
                                    Dê esse passo para uma vida melhor por menos de R$0,80 por dia!
                                <Link to="contato" className="border-purple cl-purple bt font-16 f-wheight-700">fale com um consultor</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="planoa"></div>
            <Planos />

            <div id="banner-full"></div>

            <div id="para-todos">
                <div className="content">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 bx-1">
                            <p className="font-40 f-wheight-700 cl-purple mb-none">
                                A Live Saúde<br /> 
                                é pra todos!
                            </p>
                            <p className="font-40 f-wheight-700 cl-purple desk-none">
                                A Live Saúde é pra todos!
                            </p>
                            <span className="font-20 cl-purple">
                                Veja o que nossos clientes têm 
                                a dizer e junte-se a nós em busca 
                                de mais qualidade de vida.
                            </span>
                            <Link className="bg-purple bt cl-white f-wheight-700" to="checkout">
                                Assinar Live Saúde
                            </Link>
                        </div>

                        <div className="col-lg-4 col-md-12" align="center">
                            <div className="box border-purple">
                                <img className="detail" src={DepoDetail} />
                                <img className="user" src={DepoImg1} />
                                <p className="font-14 cl-purple">
                                    <span className="font-18 f-wheight-700">
                                        “A economia que fiz na compra de remédios me ajudou muito.
                                    </span>
                                    preciso de medicação todo mês e com o valor que economizei posso pagar a Live Saúde e ainda sobra!”
                                </p>
                                <span className="cl-gray font-14"><b>Vera Mendes</b> - Aposentada</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12" align="center">
                            <div className="box border-purple ">
                                <img className="detail" src={DepoDetail} />
                                <img className="user" src={DepoImg2} />
                                <p className="font-14 cl-purple">
                                    <span className="font-18 f-wheight-700">
                                        “É muito bom não precisar esperar agendamento no SUS.
                                    </span>
                                        Com o cartão da Live Saúde eu tenho consulta, retorno e exames pra mim e pros meus filhos e esposa. Recomendo.”
                                </p>
                                <span className="cl-gray font-14"><b>Jorge Barroso</b> - Autônomo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MaisInfos />
        </div>
    );
}
