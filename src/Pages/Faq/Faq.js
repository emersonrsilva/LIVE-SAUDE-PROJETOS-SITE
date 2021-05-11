import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './Faq.scss'
import { api } from '../../Api/app'
import FaqCp from "react-faq-component";

import MaisInfos from '../../Components/MaisInfos'

import Check from '../../images/home/check.svg';
import ArrowOpen from '../../images/faq/Seta_aberta.svg';
import ArrowClose from '../../images/faq/Seta_fechada.svg';

export default function Faq() {

    const [faq, setFaqList] = useState([]);
    const [data, setData] = useState({
        rows: []
    })

    useEffect(() => {

        getFaqList();
        
    }, [])

    async function getFaqList(){     

        let list = await api.get('/faqs');
        setFaqList(list.data);

        list.data.map((row) => {
            data.rows.push({
                title: row.pergunta,
                content: row.resposta,
            })
        })

        setData( {...data} )

    }
     
    const styles = {
        // bgColor: 'white',
        titleTextColor: "blue",
        rowTitleColor: "blue",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };

    const config = {
        // animate: true,
         arrowIcon: <img src={ArrowOpen} />,
        // tabFocus: true
    };

    return (
        <div id="faq">
            <div id="banner">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-12" align="left">
                            <p className="cl-white font-33 title-banner">
                                <b>Sua vida com<br />
                                muito mais saúde</b>
                            </p>
                            <p className="cl-white font-16 f-wheight-400 text-1">
                            Existimos pra levar mais Saúde para quem não quer depender<br />
                            do SUS, nem ter gastos excessivos com planos de saúde.
                            </p>
                            <p className="cl-white font-16 f-wheight-700 text-2">
                                Live Saúde é uma assinatura que te dá acesso a preços <br />
                                até 70% mais baixos em exames, consultas, remédios <br />
                                e ainda oferece assistência odontológica, nutricional, <br />
                                fitness, funeral e atendimento médico via telefone 24h.
                            </p>

                            <div className="bg-purple ver-planos">
                                <p className="font-20 cl-white">A partir de <span className="font-39 f-wheight-600">R$23,90</span>/mês <Link className="cl-black bg-white" href="javascript:;">ver planos</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="faq-list">
                
                <div className="content">
                    <div className="row">
                        <div className="col-12" align="center">
                            <p className="cl-purple font-26 title"><b>Dúvidas frequentes.</b> Caso precise, <Link className="cl-purple font-26">fale com um de nossos consultores.</Link></p>
                        </div>
                    </div>


                    <FaqCp data={data} styles={styles} config={config} />


                </div>
            </div>

            <div id="canais">
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <p className="font-16 cl-purple" align="center">
                                Não encontrou o que precisava? Tudo bem, estamos a dispósição pelos outros <Link to="contato" className="cl-purple">Canais de contato.</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>



            <MaisInfos />
        </div>
    );
}
