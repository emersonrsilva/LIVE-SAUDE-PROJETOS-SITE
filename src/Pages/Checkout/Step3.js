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
        formaPagamento: '',
        nome: '',
        numeroCartao: '',
        dataVencimento: '',
        cvv: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
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
                                        <span className="border-purple font-16 pass-2 st-pass ">2</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-3 st-pass active">3</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Estamos quase lá! </span>
                                    <p className="font-16 cl-purple">Informe os dados para pagamento. Não se preocupe, suas informações estão seguras.</p>
                                </div>

                                <form className="row" method="post" onSubmit={handleSend}>
                                    
                                    <div className="row no-gutters col-12">
                                        <label className="col-lg-4 col-md-12">
                                            <select  className="border-purple" value={camposFormulario.formaPagamento} onChange={(e) => changeInputMult(e)} name="formaPagamento">
                                                <option value="Cartão de crédito">Cartão de crédito</option>
                                                <option value="Boleto">Boleto</option>
                                            </select>
                                        </label>
                                    </div>

                                    <label className="col-12">
                                        <span className="cl-purple font-16">Nome completo (como escrito no cartão)*</span>
                                        <input className="border-purple" type="text" value={camposFormulario.nome} onChange={(e) => changeInputMult(e)} name="nome" placeholder="" />
                                    </label>

                                    <label className="col-lg-5 col-md-12">
                                        <span className="cl-purple font-16">Número do cartão*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.numeroCartao} onChange={(e) => changeInputMult(e)} name="numeroCartao" placeholder="" />
                                    </label>

                                    <label className="col-lg-5 col-md-12">
                                        <span className="cl-purple font-16">Data de vencimento*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario. dataVencimento} onChange={(e) => changeInputMult(e)} name=" dataVencimento" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-2 col-md-12">
                                        <span className="cl-purple font-16">CVV*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.cvv} onChange={(e) => changeInputMult(e)} name="cvv" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">CPF*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.cpf} onChange={(e) => changeInputMult(e)} name="cpf" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Data de nascimento*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.dataNascimento} onChange={(e) => changeInputMult(e)} name="dataNascimento" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Telefone*</span>
                                        <input  className="border-purple" type="text" value={camposFormulario.telefone} onChange={(e) => changeInputMult(e)} name="telefone" placeholder="" />
                                    </label>

                                    <Link to="/checkout/passo-4" className="font-15 bg-purple cl-white bt" type="submit">{stepLoad === true ? <FiLoader /> : "Próximo"}</Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
