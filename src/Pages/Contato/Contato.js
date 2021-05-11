import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

import './Contato.scss';
import { FiLoader, FiFacebook, FiInstagram, Whatsapp } from 'react-icons/fi';
import { FaFacebookSquare, FaInstagram, FaWhatsapp,} from 'react-icons/fa';
import swal from 'sweetalert';
import { api } from '../../Api/app'
import InputMask from 'react-input-mask';

import Beneficios from '../../Components/Beneficios'

export default function Contato() {
    const [stepLoad, setstepLoad] = useState(false)
    const [camposFormulario, setCamposFormularios] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cpf: '',
        motivo: '',
        mensagem: '',
    })

    async function handleSend(event)
    {

        event.preventDefault()

        var data = camposFormulario

        setstepLoad(true)

             var response =  await api.post('/contatos', data)

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
        <>
        <div id="contato">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <div id="box-form">
                            <div className="row no-gutters">
                                <div className="col-12" align="center">
                                    <span className="font-28 cl-purple f-weight-700">Entre em contato com a Live Saúde </span>
                                </div>

                                <ScrollAnimation animateIn="fadeIn" animateOnce >
                                    <div className="row col-12 boxes">
                                        <div className="col-lg-4 col-md-12" align="center">
                                            <div className="box">
                                                <span className="font-16 f-weight-700 cl-purple">Dúvidas sobre a Live Saúde</span>
                                                <p className="font-16  cl-purple">Caso nossa sessão de Dúvidas Frequentes
                                                não consiga ajudar, envie sua dúvida e prontamente te responderemos.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 borders" align="center">
                                            <div className="box ">
                                                <span className="font-16 f-weight-700 cl-purple">Atendimento ao Assinante</span>
                                                <p className="font-16  cl-purple">Nossa equipe está pronta para auxiliar
                                                você que já aproveita os benefícios de ter um cartão Live Saúde com o que precisar.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12" align="center">
                                            <div className="box">
                                                <span className="font-16 f-weight-700 cl-purple">Críticas e Canal de Denúncia</span>
                                                <p className="font-16  cl-purple">Queremos sempre melhorar e para isso contamos com você para nos auxiliar.
                                                Suas informações estão seguras aqui.</p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <div className="col-12">
                                    <p className="font-16 cl-purple f-weight-700">Preencha os dados da mensagem:</p>
                                </div>

                                <form className="row" method="post" onSubmit={handleSend}>
                                    
                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">Seu nome completo*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.nome} onChange={(e) => changeInputMult(e)} name="nome" placeholder="" />
                                    </label>

                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">Seu e-mail*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.email} onChange={(e) => changeInputMult(e)} name="email" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">Telefone para contato*</span>
                                        <InputMask mask="(99) 99999-9999" className="border-purple" type="text" value={camposFormulario.telefone} onChange={(e) => changeInputMult(e)} name="telefone" placeholder="" />
                                    </label>

                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">Sua Cidade e Estado*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.endereco} onChange={(e) => changeInputMult(e)} name="endereco" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">CPF, caso seja Assinante</span>
                                        <InputMask mask="999.999.999-99" className="border-purple" type="text" value={camposFormulario.cpf} onChange={(e) => changeInputMult(e)} name="cpf" placeholder="" />
                                    </label>

                                    <label className="col-lg-6 col-md-12">
                                        <span className="cl-purple font-16">Motivo do contato*</span>
                                        <select name="motivo" className="border-purple">
                                            <option value="">Escolha uma das opções</option>
                                            <option value="Assinatura">Assinatura</option>
                                            <option value="Contato">Contato</option>
                                        </select>
                                    </label>
                                
                                    <div className="row col-12">
                                        <div className="col-6">
                                            <button className="font-16 bg-purple cl-white bt" type="submit">{stepLoad === true ? <FiLoader /> : "Enviar"}</button>
                                        </div>
                                        <div className="col-6 ft-span" align="right">
                                            <span className="font-14 cl-purple">*campos obrigatórios</span>
                                        </div>
                                    </div>
                                </form>

                                <div className="col-12">
                                    <hr />
                                </div>

                                
                                <div className="row col-12 boxes bxs-bottom">
                                    <div className="col-lg-4 col-md-12" align="center">
                                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                                            <div className="box">
                                                <span className="font-16 f-weight-700 cl-green">Central de Atendimento</span>
                                                <p className="font-16  cl-green">De segunda à sexta-feira, das 9h às 18h</p>
                                                <span className="col-26 cl-green font-26 f-weight-700">0800-123 567</span>
                                        </div>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-4 col-md-12" align="center">
                                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                                            <div className="box ">
                                                <span className="font-16 f-weight-700 cl-green">Nosso Whatsapp</span>
                                                <p className="font-16  cl-green">De segunda à sexta-feira, das 9h às 18h</p>
                                                <span className="col-26 cl-green font-26 f-weight-700"><FaWhatsapp /> Clique e fale conosco</span>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-4 col-md-12" align="center">
                                        <ScrollAnimation animateIn="fadeIn" animateOnce >
                                            <div className="box">
                                                <span className="font-16 f-weight-700 cl-green">Siga a Live Saúde nas redes!</span>
                                                <p className="font-16  cl-green">Dicas e novidades no seu celular.</p>
                                                <span className="col-26 cl-green font-26 f-weight-700"><FaFacebookSquare className="icon-rede" /> <FiInstagram className="icon-rede" /></span>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </div>
        <Beneficios />
        </>
    );
}
