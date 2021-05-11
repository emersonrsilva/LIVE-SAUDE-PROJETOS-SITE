import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import {Input}  from '../../Components/Form/Input';
import {Select}  from '../../Components/Form/Select';

import './MinhaConta.scss';

import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'

export default function DadosPessoais(props) {
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

                setDadosEndereco(responseDadosPessoais.data[0].cadastrosEnderecos[0])
                setDadosAssinatura(responseDadosPessoais.data[0].Assinaturas[0])
                getPlanos(responseDadosPessoais.data[0].Assinaturas[0].planoId)

                await delete responseDadosPessoais.data[0].cadastrosEnderecos;
                await delete responseDadosPessoais.data[0].Assinaturas;

                setDadosPessoais(responseDadosPessoais.data[0]);

            }

        } catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }

    async function onChangeInputDadosPessoais(e){
        dadosPessoais[e.target.name] = e.target.value;
        setDadosPessoais({...dadosPessoais});
    }

    async function onChangeInputDadosEndereco(e){
        dadosEndereco[e.target.name] = e.target.value;
        setDadosEndereco({...dadosEndereco});
    }

    async function saveDadosPessoais(){
        try{
            let responseSave = await api.put('/cadastros/'+dadosPessoais._id, dadosPessoais);

            if(responseSave.data.status === 'success'){
                swal("Sucesso",responseSave.data.message, "success");
            }else{
                throw 'Ocorreu um erro, tente novamente mais tarde';
            }
        }catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }

    async function saveDadosEndereco(){
        try{
            console.log(dadosEndereco);

            let responseSave = await api.put('/cadastros/enderecos/'+dadosPessoais._id+'/'+dadosEndereco._id, dadosEndereco);

            if(responseSave.data.status === 'success'){
                swal("Sucesso",responseSave.data.message, "success");
            }else{
                throw 'Ocorreu um erro, tente novamente mais tarde';
            }

        }catch(err){
            swal("ops!",err.replace('Error:',''),"error");
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
                                    <span className="font-40 cl-purple f-weight-700">Dados Pessoais</span>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-md-12'}>
                                    <Input label="Nome" name="nome" value={dadosPessoais.nome} onChange={(e) => onChangeInputDadosPessoais(e)}  />
                                    <Input label="Data de Nascimento" type={'date'} name="dataNascimento" value={dadosPessoais.dataNascimento} onChange={(e) => onChangeInputDadosPessoais(e)} mask="99/99/9999"   />
                                    <Input label="Telefone" name="telefone" value={dadosPessoais.telefone} onChange={(e) => onChangeInputDadosPessoais(e)} mask="(99) 99999-9999"  />
                                    <Input label="CPF" name="cpf" value={dadosPessoais.cpf} onChange={(e) => onChangeInputDadosPessoais(e)} mask="999.999.999-99" />
                                    <Input label="RG" name="rg" value={dadosPessoais.rg} onChange={(e) => onChangeInputDadosPessoais(e)}  />

                                    <div className="actions">
                                        <button variant="primary" className="btn float-left cl-white bg-purple" type="button" onClick={(e) => saveDadosPessoais(e)}>Salvar</button>
                                        <Link to="/minha-conta" className="btn btn-secondary float-right">Voltar</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12" align="center">
                                <span className="font-40 cl-purple f-weight-700">Dados de Endereço</span>
                            </div>
                            <div className={'row'}>
                                <div className={'col-md-12'}>
                                    <Input label="Cep" name="cep" value={dadosEndereco.cep} onChange={(e) => onChangeInputDadosEndereco(e)}  />
                                    <Input label={'Logradouro'} name={'logradouro'} value={dadosEndereco.logradouro} onChange={(e) => onChangeInputDadosEndereco(e)}/>
                                    <Input label={'Número'} name={'numero'} value={dadosEndereco.numero} onChange={(e) => onChangeInputDadosEndereco(e)}/>
                                    <Input label={'Bairro'} name={'bairro'} value={dadosEndereco.bairro} onChange={(e) => onChangeInputDadosEndereco(e)}/>
                                    <Input label={'Cidade'} name={'cidade'} value={dadosEndereco.cidade} onChange={(e) => onChangeInputDadosEndereco(e)}/>
                                    <Select
                                        label={'Estado'}
                                        name={'estado'}
                                        value={dadosEndereco.estado}
                                        onChange={(e) => onChangeInputDadosEndereco(e)}
                                        options={[
                                            ['AC','Acre'],
                                            ['AL', 'Alagoas'],
                                            ['AP', 'Amapá'],
                                            ['AM', 'Amazonas'],
                                            ['BA', 'Bahia'],
                                            ['CE', 'Ceará'],
                                            ['DF', 'Distrito Federal'],
                                            ['ES', 'Espírito Santo'],
                                            ['GO', 'Goiás'],
                                            ['MA', 'Maranhão'],
                                            ['MT', 'Mato Grosso'],
                                            ['MS', 'Mato Grosso do Sul'],
                                            ['MG', 'Minas Gerais'],
                                            ['PA', 'Pará'],
                                            ['PB', 'Paraíba'],
                                            ['PR', 'Paraná'],
                                            ['PE', 'Pernambuco'],
                                            ['PI', 'Piauí'],
                                            ['RJ', 'Rio de Janeiro'],
                                            ['RN', 'Rio Grande do Norte'],
                                            ['RS', 'Rio Grande do Sul'],
                                            ['RO', 'Rondônia'],
                                            ['RR', 'Roraima'],
                                            ['SC', 'Santa Catarina'],
                                            ['SP', 'São Paulo'],
                                            ['SE', 'Sergipe'],
                                            ['TO', 'Tocantins']
                                        ]}
                                    />
                                    <div className="actions">
                                        <button variant="primary" className="btn float-left cl-white bg-purple" type="button" onClick={(e) => saveDadosEndereco(e)}>Salvar</button>
                                        <Link to="/minha-conta" className="btn btn-secondary float-right">Voltar</Link>
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
