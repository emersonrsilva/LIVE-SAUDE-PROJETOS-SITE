import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Checkout.scss';
import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'

import Sidebar from './Partial/Sidebar'

export default function Step2() {
    const [stepLoad, setstepLoad] = useState(false)
    const [camposFormulario, setCamposFormularios] = useState({
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        senha: '',
        confirmar_senha: '',
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
                    <div className="col-lg-3 col-md-12">
                        <Sidebar />
                    </div>    
                    <div className="col-lg-9 col-md-12">
                        <div id="box-form">
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <div className="steps" align="center">
                                        <span className="border-purple font-16 pass-1 st-pass ">1</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-2 st-pass active">2</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Preencha seu endereço e crie uma senha.</span>
                                    <p className="font-16 cl-purple">Diga para onde devemos enviar seu cartão Live Saúde e crie uma senha segura para seu login.</p>
                                </div>

                                <form className="row" method="post" onSubmit={handleSend}>
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">CEP*</span>
                                        <input className="border-purple" required type="text" value={camposFormulario.cep} onChange={(e) => changeInputMult(e)} name="cep" placeholder="" />
                                    </label>

                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">Rua*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.logradouro} onChange={(e) => changeInputMult(e)} name="logradouro" placeholder="" />
                                    </label>

                                    <label className="col-lg-3 col-md-12">
                                        <span className="cl-purple font-16">Número*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.numero} onChange={(e) => changeInputMult(e)} name="numero" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-9 col-md-12">
                                        <span className="cl-purple font-16">Complemento*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.complemento} onChange={(e) => changeInputMult(e)} name="complemento" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Bairro*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.bairro} onChange={(e) => changeInputMult(e)} name="bairro" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Cidade*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.cidade} onChange={(e) => changeInputMult(e)} name="cidade" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Estado*</span>
                                        <input  className="border-purple" required type="text" value={camposFormulario.estado} onChange={(e) => changeInputMult(e)} name="estado" placeholder="" />
                                    </label>

                                    <div className="row col-12 pass-camp">
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Sua senha*</span>
                                            <input  className="border-purple" required type="text" value={camposFormulario.senha} onChange={(e) => changeInputMult(e)} name="senha" placeholder="" />
                                        </label>
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Confirme sua senha*</span>
                                            <input  className="border-purple" required type="text" value={camposFormulario.confirmar_senha} onChange={(e) => changeInputMult(e)} name="confirmar_senha" placeholder="" />
                                        </label>
                                    </div>

                                    <Link to="/checkout/passo-3" className="font-15 bg-purple cl-white bt" type="submit">{stepLoad === true ? <FiLoader /> : "Próximo"}</Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
