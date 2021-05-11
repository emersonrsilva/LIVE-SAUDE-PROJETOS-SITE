import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../Api/app'

import BulletMais from '../images/home/bullet_mais.svg'
import NumberFormat from 'react-number-format';

export default function Planos(props){

    const [planos, setPlanos] = useState([])
    const [planoSelecionado, setPlanoSelecionado] = useState("");

    useEffect(() => {
        getPlanos()

    }, [props]);

    async function getPlanos(){
        const result = await api.get('/planos/get/site');

        setPlanos(result.data);
        setPlanoSelecionado(result.data[0]);
    }

    return(
        <div id="planos">
        <div className="content">
            <div className="row">
                <div className="col-12">
                    <p className="font-25 cl-purple title" align="center">
                        Temos um <b>Cartão Live Saúde</b> perfeito para você e sua família. <b>Escolha o seu!</b>
                    </p>
                </div>
            </div>
            <div className="row plans">

                { planos.map((row, key) => 
                    <div className="col-lg-4 col-md-12 box-plans">
                        <ScrollAnimation animateIn="fadeIn" delay={100} animateOnce >
                        <div className="box">
                            <div className="topo">
                                <p className="font-32 cl-white f-wheight-700">Plano <span>{row.titulo}</span></p>
                            </div>
                            <div className="list">
                                { row.planosItens? row.planosItens.map((row2) =>
                                    <span className="cl-gray font-14" key={row2.id}><img src={BulletMais} /> {row2.titulo}</span>
                                ): '' }
                            </div>
                            <div className="footer">
                                <p className="font-14 cl-green f-wheight-700">Economia e tranquilidade por apenas</p>
                                <span className="cl-green font-35 f-wheight-700 valor">
                                    <NumberFormat value={row.valor}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                                    <span className="font-28 f-wheight-500">/mês</span>
                                </span>
                                <Link to="checkout" className="bt f-wheight-600 cl-white font-18">Solicitar Cartão</Link>
                            </div>
                        </div>
                        </ScrollAnimation>
                    </div>
                )}

                <span className="obs-planos cl-gray font-13">*Consulte condições do plano escolhido.</span>

            </div>
        </div>
    </div>
    );
}
