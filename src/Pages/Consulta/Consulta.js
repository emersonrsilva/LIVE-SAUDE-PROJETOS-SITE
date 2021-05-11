import React from 'react';
import { Link } from 'react-router-dom';

import MaisInfos from '../../Components/MaisInfos'

import './Consulta.scss'

export default function Faq() {
    return (
        <>
            <div id="formulario">
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="box-form">

                                <div className="row">
                                    <div className="col-12">
                                        <p className="font-28 cl-purple title">
                                            Consulte a rede <b>Live Saúde</b>
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <p className="font-25 cl-purple title">
                                            Consulte por nossos telefones <b>XXXX - XXXX</b>
                                        </p>
                                    </div>
                                </div>


                                {/* <form className="row no-gutters" >
                                    <label className="col-12 ipt">
                                        <span className="cl-purple"><b>Busque por</b> cidade, especialidade, clínica, farmácia ou profissional:</span>
                                        <input className="border-purple" type="text" name="search" placeholder="Sua busca"/>
                                    </label>
                                    
                                    <label className="lb-1 ipt-mb-full">
                                        <span className="font-16 cl-purple f-wheight-700">Filtre por: </span>
                                    </label>
                                    <label className="lb-1">
                                        <input type="radio" name="cidade" placeholder="Sua busca"/>
                                        <span className="font-16 cl-purple">Cidade</span>
                                    </label>
                                    <label className="lb-1">
                                        <input type="radio" name="area_medica" placeholder="Sua busca"/>
                                        <span className="font-16 cl-purple">Área médica</span>
                                    </label>
                                    <label className="lb-1">
                                        <input type="radio" name="farmacia" placeholder="Sua busca"/>
                                        <span className="font-16 cl-purple">Farmácia</span>
                                    </label>
                                    <label className="lb-1">
                                        <input type="radio" name="outros" placeholder="Sua busca"/>
                                        <span className="font-16 cl-purple">Outros</span>
                                    </label>
                                    
                                    <div className="row-button">
                                        <div className="col-12">
                                            <Link className="button bg-purple cl-white bt">Buscar</Link>
                                        </div>
                                    </div>

                                </form> */}

                                {/* <div className="row">
                                    <div className="col-12">
                                        <p className="font-25 cl-purple f-wheight-700 title-busca">Resultados da busca</p>
                                    </div>

                                    <div className="col-12">
                                        <div className="s-result">
                                            <span className="cl-purple font-18 f-wheight-700">Nome do paciente</span>
                                            <p className="cl-purple font-16 nome-clinica">Nome da clinica</p>
                                            <p className="cl-purple font-16 endereco">end-1</p>
                                            <p className="cl-purple font-16 endereco">end-2</p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="s-result">
                                            <span className="cl-purple font-18 f-wheight-700">Nome do paciente</span>
                                            <p className="cl-purple font-16 nome-clinica">Nome da clinica</p>
                                            <p className="cl-purple font-16 endereco">end-1</p>
                                            <p className="cl-purple font-16 endereco">end-2</p>
                                        </div>
                                    </div>

                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <MaisInfos />
        </>
    );
}
