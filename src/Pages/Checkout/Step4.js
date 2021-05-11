import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Checkout.scss';
import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'

import Sidebar from './Partial/Sidebar'

export default function Step3() {
    const [stepLoad, setstepLoad] = useState(false)
    const [camposFormulario, setCamposFormularios] = useState({
        metodo_pagamento: '',
        nome_completo: '',
        numero_cartao: '',
        vencimento: '',
        cvv: '',
        cpf_cartao: '',
        nascimento_cartao: '',
        telefone_cartao: '',
    })

    async function handleSend(event)
    {

        event.preventDefault()

        var data = camposFormulario

        setstepLoad(true)

             var response =  await api.post('/clientes', data)

            if  ( response.data.error == true){
                alert( response.data.message )
            }  else {
                swal("Enviado com sucesso!");
            }

            setTimeout(function(){
                setstepLoad(false)
            })

        

        console.log( response )

    }

    function changeInputMult(e)
    {

        var meusdados = camposFormulario
        meusdados[e.target.name] = e.target.value
        setCamposFormularios({...meusdados})

        console.log( meusdados )

    }

    return (
        <div id="checkout">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <div id="box-form" className="box-check-final">
                            <div className="row no-gutters">
                                <div className="col-12" align="center">
                                    <span className="font-40 cl-purple f-weight-700">Sucesso! </span>
                                    <p className="font-16 cl-purple">Obrigado por escolher a Live Saúde. Enviaremos por e-mail a confirmação e mais informações sobre seu plano. </p>
                                </div>
                                <div className="row col-12 ck-st4">
                                    <div className="row no-gutters col-lg-8 col-md-12 space-box-mb ">
                                        <div className="col-12 box-1">
                                            <div className="box-form ">
                                                <p className="font-16 f-weight-700 cl-purple">
                                                    Resumo da assinatura
                                                </p>
                                                <div className="row no-gutters">
                                                    <div className="col-6">
                                                        <span className="font-16 cl-purple">Plano Live Essencial</span>
                                                        <p className="font-16 f-weight-700 cl-purple">Status</p>
                                                    </div>
                                                    <div className="col-6" align="right">
                                                        <span className="font-16 cl-purple">R$23,90/mês</span>
                                                        <p className="font-16 f-weight-700 cl-purple">Ativo</p>                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="box-form">
                                                <p className="font-16 f-weight-700 cl-purple">
                                                    Pagamento
                                                </p>
                                                <div className="row no-gutters">
                                                    <div className="col-6">
                                                        <span className="font-16 cl-purple">Data da renovação</span>
                                                        <p className="font-16 f-weight-700 cl-purple">Cartão de crédito</p>
                                                    </div>
                                                    <div className="col-6" align="right">
                                                        <span className="font-16 cl-purple">10/10/2020</span>
                                                        <p className="font-16 cl-purple"><b>1234-xxxx-xxx-5678</b> (alterar)</p>                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="row col-lg-4 col-md-12 no-gutters">
                                        <div className="box-form user-data">
                                            <span className="cl-purple font-19 f-weight-700 name">Maria de Lurdes Pereira</span>
                                            <span className="cl-purple font-16 f-weight-700 info">mlurdes@email.com	</span>
                                            <span className="cl-purple font-16 f-weight-700 info">(11) 9.1234-5678</span>
                                            <span className="cl-purple font-16 f-weight-700 info">Rua Candido Malta, 123 - Osasco - SP</span>
                                            <Link className="cl-purple font-16">(alterar dados)</Link>
                                            <Link className="bt cl-purple border-purple font-15 f-weight-700">Cancelar assinatura</Link>
                                        </div>
                                    </div>
                                </div>


                                <div className="row col-12 bottom">
                                    <div className="col-12" align="center">
                                        <span className="cl-purple font-16 atend">Caso precise, <Link className="cl-purple">entre em contato por nossos canais de atendimento.</Link></span>
                                    </div>
                                    <div className="col-12" align="center">
                                        <Link to="/" className="bt cl-white bg-purple f-weight-700">Voltar para a página inicial</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
