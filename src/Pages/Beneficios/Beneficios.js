import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../Api/app'
import './Beneficios.scss'

import Scrollchor from 'react-scrollchor';

import MaisInfos from '../../Components/MaisInfos'
import Planos from '../../Components/Planos'

import Cartao from '../../images/beneficios/Cartao_pg_beneficios.png'

import CardImage1 from '../../images/beneficios/AtendimentoMedico.png'
import CardImage2 from '../../images/beneficios/Consultas.png'
import CardImage3 from '../../images/beneficios/Exames.png'
import CardImage4 from '../../images/beneficios/odonto.png'
import CardImage5 from '../../images/beneficios/Remedios.png'
import CardImage6 from '../../images/beneficios/Checkup.png'
import CardImage7 from '../../images/beneficios/Nutricao.png'
import CardImage8 from '../../images/beneficios/funeral.png'


export default function Beneficios() {

    const [beneficios, setBeneficios] = useState([]);


    useEffect(() => {

        getBeneficios();
        
    }, [])

    async function getBeneficios(){       
        let list = await api.get('/beneficios');
        setBeneficios(list.data);
    }

    const divStyle = (src) => ({
        backgroundImage: 'url(' + src + ')'
      })

    return (
        <div id="beneficios">
            <div id="banner">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12" align="right">
                            <p className="cl-white font-33 title-banner">
                                <b>Um cartão, muitos benefícios.</b><br />
                                Mais saúde pra você aproveitar<br />
                                a vida com quem importa.<br />
                            </p>
                            <div className="bg-purple ver-planos">
                                <p className="font-20 cl-white">A partir de <span className="font-39 f-wheight-600">R$23,90</span>/mês <Scrollchor className="cl-black bg-green" to="#planoa">ver planos</Scrollchor></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="itens-beneficios">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12 title-bene" align="center">
                            <span className="cl-purple font-28 f-weight-700">
                                Assine a Live Saúde já e conte com todos esses benefícios!
                            </span>
                            <p className="cl-gray font-16">
                                Você não precisa pagar caro para cuidar da saúde da sua família. Conheça tudo que oferecemos:
                            </p>
                            <img className="mb-none" src={Cartao}></img>
                        </div>
                        
                        <div className="row col-12 no-gutters boxes">
                            
                            { beneficios.map((row, key) => 
                                <div className="col-lg-3 col-md-12">
                                    <ScrollAnimation animateIn="fadeIn" delay={100} animateOnce >
                                    <div className="box">
                                        <span className="bg-green font-13 circle cl-white">{row.aviso}</span>
                                        <div className="background" style={divStyle(row.imagemUrl)}></div>
                                        <div className="box-text">
                                            <p className="font-22 cl-purple f-weight-700 title">
                                            {row.titulo}
                                            </p>
                                            <p className="font-15 cl-gray text">
                                            {row.texto}
                                            </p>
                                            {/* <span className="text-bottom font-13 cl-gray">
                                                *Esse serviço não substitui consultas médicas
                                            </span> */}
                                        </div>
                                    </div>
                                    </ScrollAnimation>
                                </div>
                            )}

                            {/* <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce >
                                <div className="box">
                                    <span className="bg-purple font-13 circle cl-white">Pague Até 70% menos</span>
                                    <img src={CardImage2} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Valores especiais em consultas médicas
                                        </p>
                                        <p className="font-15 cl-gray text">
                                        Pague até X% a menos em mais de XX especialidades em clínicas particulares do Brasil todo, além de atendimento online
                                        </p>
                                        <Link className="text-bottom font-13 cl-purple">
                                            Consulte nossa rede na sua cidade
                                        </Link>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={200} animateOnce >
                                <div className="box">
                                    <span className="bg-purple font-13 circle cl-white">pague até 60% menos</span>
                                    <img src={CardImage3} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Exames laboratoriais por preços muito reduzidos
                                        </p>
                                        <p className="font-15 cl-gray text">
                                            Realize exames de sangue, urina, glicemia, eletrocardiogramas, ultrasonografia e muito mais, nos melhores laboratórios particulares da sua região.
                                        </p>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={250} animateOnce >
                                <div className="box">
                                    <span className="bg-green font-13 circle cl-white">Sem custo adicional!</span>
                                    <img src={CardImage4} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Assistência odontológica no consultório ou em casa
                                        </p>
                                        <p className="font-15 cl-gray text">
                                            Atendimento de urgência em caso de extração, restauração, coroas provisórias, tratamento de gengivites, entre outros.
                                        </p>
                                        <span className="text-bottom font-13 cl-gray">
                                            *1 assistência gratuita por ano
                                        </span>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={100} animateOnce >
                                <div className="box">
                                    <span className="bg-purple font-13 circle cl-white">A partir de 20% de desconto</span>
                                    <img src={CardImage5} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Descontos em remédios em farmácias de todo Brasil
                                        </p>
                                        <p className="font-15 cl-gray text">
                                        Essencial para quem faz uso de medicamentos todo mês. 
                                        Economizando R24,00 por mês, 
                                        o cartão Live Saúde Essencial 
                                        se pagará sozinho!
                                        </p>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce >
                                <div className="box">
                                    <span className="bg-green font-13 circle cl-white">Sem custo adicional!</span>
                                    <img src={CardImage6} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Check-up Médico Anual
                                        </p>
                                        <p className="font-15 cl-gray text">
                                            Faça a manutenção preventiva da sua saúde e fique tranquilo. São diversos exames inclusos no valor da sua assinatura!
                                        </p>
                                        <span className="text-bottom font-13 cl-gray">
                                            Disponível nos planos Saúde+ e Live Premium.
                                        </span>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={200} animateOnce >
                                <div className="box">
                                    <span className="bg-green font-13 circle cl-white">Sem custo adicional!</span>
                                    <img src={CardImage7} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Orientação Nutricional e Fitness
                                        </p>
                                        <p className="font-15 cl-gray text">
                                            Faça uma avaliação anual online junto à um Nutricionista e um profissional de Educação Física e receba orientações para uma melhor qualidade de vida. Disponível no plano Live Premium.
                                        </p>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <ScrollAnimation animateIn="fadeIn" delay={250} animateOnce >
                                <div className="box">
                                    <span className="bg-green font-13 circle cl-white">Sem custo adicional!</span>
                                    <img src={CardImage8} />
                                    <div className="box-text">
                                        <p className="font-22 cl-purple f-weight-700 title">
                                            Assistência Funeral
                                        </p>
                                        <p className="font-15 cl-gray text">
                                            A Live Saúde está presente em todos os momentos, e oferece sem custo adicional assistência também nas horas de mais necessidade, incluindo urna mortuaria, higienização, flores, transporte de familiar e outros serviços.
                                        </p>
                                    </div>
                                </div>
                                </ScrollAnimation>
                            </div> */}

                            <div className="col-lg-12 col-md-12">
                                <div className="box-full emerg" align="center">
                                    <p className="font-22 cl-purple f-weight-700">
                                        E mais! Leva-e-traz em casos de emergência:  <span className="cl-gray font-15">Socorro com veículo associado, para levá-lo ao posto de atendimento mais próximo. Consulte condições no plano escolhido.</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div> 
                </div>
            </div>

            <div id="line-full" className="bg-purple" >
                <div className="content">
                    <div className="row" align="center">
                        <div className="col-12">
                            <p className="font-25 cl-white">
                                Temos um <b>Cartão Live Saúde</b> perfeito para você e sua família. <Link to="faq" className="cl-white font-25"><b>Tire suas dúvidas conosco.</b></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="planoa"></div>
            <Planos />
            <MaisInfos />
        </div>
    );
}
