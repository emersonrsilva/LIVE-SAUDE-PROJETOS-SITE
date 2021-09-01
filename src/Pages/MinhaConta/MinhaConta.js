import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import './MinhaConta.scss';

import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'

export default function MinhaConta(props) {
    useEffect(() => {
        getDetalhe()

    }, [props]);

    async function getPlanos(id){
        const result = await api.get('/planos/'+id);

        console.log(result.data)
        setPlano(result.data[0])
    }
    const dateformat = require('dateformat');
    const [dadosPessoais, setDadosPessoais] = useState({})
    const [dadosEndereco, setDadosEndereco] = useState([])
    const [dadosAssinatura, setDadosAssinatura] = useState([])
    const [plano, setPlano] = useState([])

    async function getDetalhe(){
        try
        {

            let responseDadosPessoais;

            if( window.localStorage.getItem('login')){
                responseDadosPessoais = await api.get('/cadastros/get-email/'+window.localStorage.getItem('login'));

                //console.log(responseDadosPessoais.data[0])

                setDadosPessoais(responseDadosPessoais.data[0]);
                setDadosEndereco(responseDadosPessoais.data[0].cadastrosEnderecos[0])
                setDadosAssinatura(responseDadosPessoais.data[0].Assinaturas[0]||{})
                getPlanos(responseDadosPessoais.data[0].Assinaturas[0].planoId)

            }

        } catch(err){
            console.log(err)
            swal("ops!",err,"error");
        }
    }




    return (
        <div id="checkout">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <div id="box-form" className={'form-ativo'}>
                            <div className="row no-gutters">
                                <div className="col-12" align="center">
                                    <span className="font-40 cl-purple f-weight-700">Minha Conta </span>
                                </div>
                                <div className="row ">
                                    <div className={'row col-md-12'}>
                                        <div className="no-gutters col-md-6 ">
                                            <div className="col-12 box-1">
                                                <div className="box-form ">
                                                    <p className="font-16 f-weight-700 cl-purple w-100">
                                                        Resumo da assinatura
                                                    </p>
                                                    <hr />
                                                    <div className="row no-gutters">
                                                        <div className="col-6">
                                                            <span className="font-16 cl-purple">{plano.titulo}</span>
                                                            <p className="font-16 cl-purple">Status</p>
                                                        </div>
                                                        <div className="col-6" align="right">
                                                            <span className="font-16 f-weight-700 cl-purple"><NumberFormat value={plano.valor}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês</span>
                                                            <p className="font-16 f-weight-700 cl-purple">{dadosAssinatura.statusAssinatura}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="box-form">

                                                    <div className="row no-gutters">
                                                        <div className="col-6">
                                                            <span className="font-16 cl-purple">Data da renovação</span>
                                                            <p className="font-16 cl-purple">Pagamento</p>

                                                        </div>
                                                        <div className="col-6" align="right">
                                                            <span className="font-16 cl-purple f-weight-700">{dadosAssinatura.dataProximaCobranca ? dateformat(dadosAssinatura.dataProximaCobranca, 'dd-mm-yyyy'): ''}</span>
                                                            <p className="font-16 f-weight-700 cl-purple">{dadosAssinatura.formaPagamento}</p>
                                                        </div>
                                                    </div>
                                                    <div className={'row'}>
                                                        <div className={'col-md-12 mt-5'}>
                                                            <Link className="bt cl-white bg-purple f-weight-700">Cancelar assinatura</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 no-gutters">
                                            <div className="box-form user-data">
                                                <p className="font-16 f-weight-700 cl-purple w-100">
                                                    Dados Pessoais
                                                </p>
                                                <hr />

                                                <div className="cl-purple w-100 font-19 f-weight-700 name display-block">{dadosPessoais.nome}</div>
                                                <div className="cl-purple font-16 f-weight-700 info">{dadosPessoais.email}</div>
                                                <div className="cl-purple font-16 f-weight-700 info">{dadosPessoais.telefone}</div>

                                                <div className="cl-purple font-16 f-weight-700 info">{dadosEndereco.logradouro} {dadosEndereco.numero} - {dadosEndereco.cidade} - {dadosEndereco.estado}</div>

                                                <div className={'w-100'}>
                                                    <Link className="cl-purple font-16" to={'/minha-conta/dados-pessoais'}>(alterar dados)</Link>
                                                </div>
                                                <br />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row col-md-12 mt-5" >
                                        <div className={'col-md-12 text-center'}>
                                            <span className="cl-purple font-16 atend">Caso precise, <Link className="cl-purple">entre em contato por nossos canais de atendimento.</Link></span>
                                        </div>
                                    </div>

                                    <div className="row col-md-12" >
                                        <div className={'col-md-12 mt-5 text-align-center'} align={'center'}>
                                            <Link to="/"  align={'center'} className="bt cl-white bg-purple f-weight-700">Voltar para a página inicial</Link>
                                        </div>
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
