import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import InputMask from 'react-input-mask';

import './Checkout.scss';
import NumberFormat from 'react-number-format';
import {Input, TextareaEditor, Textarea, Select, NumberInput}  from '../../Components/Form';
import swal from 'sweetalert';
import { api } from '../../Api/app'

import BulletMais from "../../images/home/bullet_mais.svg";

export default function Step1(props) {
    const history = useHistory()
    
    const [currentStep, setCurrentStep] = useState(1);
    const [planos, setPlanos] = useState([]);
    const [planoSelecionado, setPlanoSelecionado] = useState("");
    const [dadosPessoais, setDadosPessoais] = useState({
        id:"",
        cpf:"",
        passo:"",
        email:"",
        dataNascimento:"",
        nome:"",
        origem:"SITE",
        rg:"",
        telefone:"",
    });
    const [dadosEndereco, setDadosEndereco] = useState({
        cadastroId:"",
        cep:"",
        logradouro:"",
        numero:"",
        bairro:"",
        cidade:"",
        estado:"",
    });

    const [dadosLogin, setDadosLogin] = useState({
        login:"",
        senha:"",
        repetaSenha:"",
    });

    const [dadosAssinatura, setDadosAssinatura] = useState({
        planoId:"",
        cadastroId:"",
        statusAssinatura:"ATIVO",
        formaPagamento:"CARTAO",
        nome:"",
        numeroCartao:"",
        dataVencimento:"",
        telefone:"",
    });

    const [dadosPagamento, setDadosPagamento] = useState({
        planoId:"",
        cadastroId:"",
        statusAssinatura:"ATIVO",
        formaPagamento:"CARTAO",
        nome:"",
        numeroCartao:"",
        dataVencimento:"",
        telefone:"",
    });

    const [dadosFatura, setDadosFatura] = useState({})

    useEffect(() => {
        getPlanos()

    }, [props]);

    async function getPlanos(){
        const result = await api.get('/planos/get/site');

        setPlanos(result.data);
        setPlanoSelecionado(result.data[0]);
    }

    async function sendStep1(e)
    {
        e.preventDefault();

        try
        {

            let responseDadosPessoais;

            if( dadosPessoais.id ){
                responseDadosPessoais = await api.put('/cadastros/' + dadosPessoais.id, dadosPessoais);
            } else {
                responseDadosPessoais = await api.post('/cadastros', dadosPessoais);
            }

            if(responseDadosPessoais.data.status === "error"){
                throw responseDadosPessoais.data.message;
            }else{
                setCurrentStep(2)
            }

            if(responseDadosPessoais.data.data.id){
                dadosEndereco.cadastroId = responseDadosPessoais.data.data.id;
                setDadosEndereco(dadosEndereco);

                dadosAssinatura.cadastroId = responseDadosPessoais.data.data.id;
                setDadosAssinatura(dadosAssinatura);
            }


        } catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }

    async function sendStep2(e)
    {
        e.preventDefault();

        try
        {
            let responseDadosEndereco;
            let responseLogin;
            let responseAssinatura;

            if(dadosLogin.senha !== dadosLogin.repetaSenha){
                throw 'Senhas estão diferentes'
            }

            responseLogin = await api.post('/cadastros/login/' + dadosEndereco.cadastroId, {login:dadosPessoais.email,senha:dadosLogin.senha});

            if(responseLogin.data.status === "error"){
                throw responseLogin.data.message;
            }


            if(dadosEndereco.id){
                responseDadosEndereco = await api.put('/cadastros/enderecos/'+dadosEndereco.cadastroId+'/'+dadosEndereco.id, dadosEndereco);
            }else{
                responseDadosEndereco = await api.post('/cadastros/enderecos/'+dadosEndereco.cadastroId ,dadosEndereco);
            }

            dadosAssinatura.planoId = planoSelecionado.id;




            if(responseDadosEndereco.data.status === "error"){
                throw responseDadosEndereco.data.message;
            }

            setCurrentStep(3)

        } catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }
    async function sendStep3(e){
        try
        {
            e.preventDefault();
            let responseAssinatura;

            let sendAssinatura = dadosAssinatura;

            sendAssinatura.email = dadosPessoais.email
            sendAssinatura.formaPagamento = dadosPagamento.formaPagamento;
            if(dadosPagamento.formaPagamento === 'CARTAO'){
                sendAssinatura.nome = dadosPagamento.nome;
                sendAssinatura.telefone = dadosPagamento.telefone;
                sendAssinatura.cpf = dadosPagamento.cpf;
                sendAssinatura.cvv = dadosPagamento.cvv;
                sendAssinatura.dataVencimento = dadosPagamento.dataVencimento;
                sendAssinatura.numeroCartao = dadosPagamento.numeroCartao;
            }else{
                sendAssinatura.nome = dadosPessoais.nome;
                sendAssinatura.telefone = dadosPessoais.telefone;
                sendAssinatura.cpf = dadosPessoais.cpf;
            }

            sendAssinatura.endereco = dadosEndereco;
            sendAssinatura.dataNascimento = dadosPessoais.dataNascimento;

            if(dadosAssinatura.id){
                responseAssinatura = await api.put('/assinaturas/'+dadosAssinatura.id, dadosAssinatura);
            }else{
                responseAssinatura = await api.post('/assinaturas/',dadosAssinatura);
            }

            if(responseAssinatura.data.status === "error"){
                throw responseAssinatura.data.message;
            }

            setDadosAssinatura(responseAssinatura)

            setCurrentStep(4)

        } catch(err){
            setCurrentStep(1)
            swal("ops!",err.replace('Error:',''),"error");
        }
    }

    function changeInputMult(e)
    {
        let meusdados = dadosPessoais
        meusdados[e.target.name] = e.target.value
        setDadosPessoais({...meusdados})
    }

    function changeInputEndereco(e)
    {
        let meusdados = dadosEndereco
        meusdados[e.target.name] = e.target.value
        setDadosEndereco({...meusdados})
    }

    function changeInputLogin(e)
    {
        let meusdados = dadosLogin
        meusdados[e.target.name] = e.target.value
        setDadosLogin({...meusdados})
    }

    function changeInputPagamento(e)
    {
        let meusdados = dadosPagamento
        meusdados[e.target.name] = e.target.value
        setDadosPagamento({...meusdados})
    }

    return (
        <div id="checkout">
            <div className="content">
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        {currentStep < 3 ?
                        <div id="sidebar">
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <p className="font-40 f-weight-700 cl-purple title-side">Escolha sua assinatura.</p>
                                    <p className="font-16 cl-purple sub-side">Um pequeno valor mensal para uma vida com muito mais saúde. </p>
                                    <select className="font-15 bt cl-purple border-purple escolha f-weight-700" name="planoselecionado"
                                            onChange={e => setPlanoSelecionado(planos[e.target.value])} >
                                        <option value="">Escolha seu plano Live Saúde</option>
                                        { planos.map((row, key) =>
                                            <option value={key}>{row.titulo}</option>
                                        )}
                                    </select>

                                    <span className="font-15 cl-gray vc-escolheu">Você escolheu</span>
                                    <span className="font-18 cl-white bt bg-green f-weight-700">{planoSelecionado.titulo}</span>

                                    <ul>
                                        { planoSelecionado.planosItens? planoSelecionado.planosItens.map((row) =>
                                            <li className="cl-gray font-14" key={row.id}><img src={BulletMais} />{row.titulo}</li>
                                        ): '' }
                                    </ul>

                                    <Link  className="border-green bt bg-white font-18 cl-green f-weight-700">
                                        Valor: <NumberFormat value={planoSelecionado.valor}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês
                                    </Link>
                                    Valor de Adesão:  <NumberFormat value={planoSelecionado.valorAdesao}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                                    <span className="termos cl-gray font-13">Acessar termos de associação</span>

                                </div>
                            </div>
                        </div>
                        :''}
                    </div>    
                    <div className={currentStep < 3 ? 'col-lg-9 col-md-12': 'col-md-12'}>
                        <div id="box-form" className={currentStep === 1 ? 'form-ativo':'' } >
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <div className="steps" align="center">
                                        <span className="border-purple font-16 pass-1 st-pass active">1</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-2 st-pass ">2</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-2 st-pass ">3</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Informe seus dados pessoais.</span>
                                    <p className="font-16 cl-purple">Criaremos um cadastro para que você tenha acesso ao seu plano.</p>
                                </div>

                                <form className="row" method="post" onSubmit={sendStep1}>
                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">Seu nome completo*</span>
                                        <input className="border-purple" required type="text" value={dadosPessoais.nome} onChange={(e) => changeInputMult(e)} name="nome" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Data de nascimento*</span>
                                        <InputMask mask="99/99/9999" required className="border-purple" type="text" value={dadosPessoais.dataNascimento} onChange={(e) => changeInputMult(e)} name="dataNascimento" placeholder="" />

                                    </label>

                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">E-mail*</span>
                                        <input  className="border-purple" required type="email" value={dadosPessoais.email} onChange={(e) => changeInputMult(e)} name="email" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Telefone para contato*</span>
                                        <InputMask mask="(99) 99999-9999" required className="border-purple" type="text" value={dadosPessoais.telefone} onChange={(e) => changeInputMult(e)} name="telefone" placeholder="" />
                                    </label>

                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">CPF*</span>
                                        <InputMask mask="999.999.999-99" required className="border-purple" type="text" value={dadosPessoais.cpf} onChange={(e) => changeInputMult(e)} name="cpf" placeholder="" />
                                    </label>
                                    
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">RG*</span>
                                        <InputMask mask="**.***.***-*" required className="border-purple" type="text" value={dadosPessoais.rg} onChange={(e) => changeInputMult(e)} name="rg" placeholder="" />

                                    </label>

                                    <button type="submit" className="font-15 bg-purple cl-white bt" type="submit">Próximo</button>

                                </form>
                            </div>
                        </div>



                        {/* formulario 2 */}
                        <div id="box-form" className={currentStep === 2 ? 'form-ativo':'' }>
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <div className="steps" align="center">
                                        <span className="border-purple font-16 pass-1 st-pass ">1</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-2 st-pass active">2</span>
                                        <span className="dashed-bar"></span>
                                        <span className="border-purple font-16 pass-2 st-pass ">3</span>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Preencha seu endereço e crie uma senha.</span>
                                    <p className="font-16 cl-purple">Diga para onde devemos enviar seu cartão Live Saúde e crie uma senha segura para seu login.</p>
                                </div>

                                <form className="row" method="post" onSubmit={sendStep2}>
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">CEP*</span>
                                        <InputMask mask="99999-999" required className="border-purple" type="text" value={dadosEndereco.cep} onChange={(e) => changeInputEndereco(e)} name="cep" placeholder="" />
                                    </label>

                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">Rua*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.logradouro} onChange={(e) => changeInputEndereco(e)} name="logradouro" placeholder="" />
                                    </label>

                                    <label className="col-lg-3 col-md-12">
                                        <span className="cl-purple font-16">Número*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.numero} onChange={(e) => changeInputEndereco(e)} name="numero" placeholder="" />
                                    </label>

                                    <label className="col-lg-9 col-md-12">
                                        <span className="cl-purple font-16">Complemento</span>
                                        <input  className="border-purple" type="text" value={dadosEndereco.complemento} onChange={(e) => changeInputEndereco(e)} name="complemento" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Bairro*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.bairro} onChange={(e) => changeInputEndereco(e)} name="bairro" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Cidade*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.cidade} onChange={(e) => changeInputEndereco(e)} name="cidade" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Estado*</span>
                                        <Select
                                            className={'border-purple'}
                                            required
                                            name={'estado'}
                                            value={dadosEndereco.estado}
                                            onChange={(e) => changeInputEndereco(e)}
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
                                    </label>

                                    <div className="row col-12 pass-camp">
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Sua senha*</span>
                                            <input required className="border-purple" type="password" value={dadosLogin.senha} onChange={(e) => changeInputLogin(e)} name="senha" placeholder="" />
                                        </label>
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Confirme sua senha*</span>
                                            <input required className="border-purple" type="password" value={dadosLogin.repetaSenha} onChange={(e) => changeInputLogin(e)} name="repetaSenha" placeholder="" />
                                        </label>
                                    </div>

                                    <button type="submit" className="font-15 bg-purple cl-white bt" type="submit">Próximo</button>

                                </form>
                            </div>
                        </div>

                        <div id="box-form" className={currentStep === 3 ? 'form-ativo':'' }>
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


                                <form className="row" method="post" onSubmit={sendStep3}>
                                    <div className="row no-gutters col-12">
                                        <label className="col-md-12">
                                            <select  className="border-purple" value={dadosPagamento.formaPagamento} onChange={(e) => changeInputPagamento(e)} name="formaPagamento">
                                                <option value="CARTAO">Cartão de crédito</option>
                                                <option value="BOLETO">Boleto</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div className={dadosPagamento.formaPagamento}>

                                        <label className="col-md-12">
                                            <span className="cl-purple font-16">CPF*</span>
                                            <InputMask mask="999.999.999-99" className="border-purple"  value={dadosPagamento.cpf} onChange={(e) => changeInputPagamento(e)} name="cpf" placeholder="" />
                                        </label>


                                        <label className="col-12">
                                            <span className="cl-purple font-16">Nome completo (como escrito no cartão)*</span>
                                            <input className="border-purple" type="text" value={dadosPagamento.nome} onChange={(e) => changeInputPagamento(e)} name="nome" placeholder="" />
                                        </label>

                                        <label className="col-lg-5 col-md-12">
                                            <span className="cl-purple font-16">Número do cartão*</span>
                                            <InputMask mask="9999999999999999" className="border-purple" type="text" value={dadosPagamento.numeroCartao} onChange={(e) => changeInputPagamento(e)} name="numeroCartao" placeholder="" />
                                        </label>

                                        <label className="col-lg-5 col-md-12">
                                            <span className="cl-purple font-16">Data de vencimento*</span>
                                            <InputMask mask="99/9999"  className="border-purple" type="text" value={dadosPagamento.dataVencimento} onChange={(e) => changeInputPagamento(e)} name="dataVencimento" placeholder="" />
                                        </label>

                                        <label className="col-lg-2 col-md-12">
                                            <span className="cl-purple font-16">CVV*</span>
                                            <InputMask mask="999"  className="border-purple" type="text" value={dadosPagamento.cvv} onChange={(e) => changeInputPagamento(e)} name="cvv" placeholder="" />
                                        </label>



                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Data de nascimento*</span>
                                            <InputMask mask="99/99/9999"  className="border-purple"  value={dadosPagamento.dataNascimento} onChange={(e) => changeInputPagamento(e)} name="dataNascimento" placeholder="" />
                                        </label>

                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Telefone*</span>
                                            <InputMask mask="(99) 99999-9999"  className="border-purple" type={'text'} value={dadosPagamento.telefone} onChange={(e) => changeInputPagamento(e)} name="telefone" placeholder="" />
                                        </label>
                                    </div>
                                    <button type="submit" className="font-15 bg-purple cl-white bt" >Próximo</button>
                                </form>

                            </div>
                        </div>

                        {/* Formulario 4 - Final */ }
                        <div id="box-form" className={ currentStep === 4 ? "box-check-final  form-ativo": "box-check-final " }>
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
                                                        <span className="font-16 cl-purple">{ planoSelecionado.titulo}</span>
                                                        <p className="font-16 f-weight-700 cl-purple">{dadosAssinatura.statusAssinatura}</p>
                                                    </div>
                                                    <div className="col-6" align="right">
                                                        <span className="font-16 cl-purple">R$ { planoSelecionado.valor} /mês</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*}
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
                                        */}
                                    </div>
                                    <div className="row col-lg-4 col-md-12 no-gutters">
                                        <div className="box-form user-data">
                                            <span className="cl-purple font-19 f-weight-700 name">{dadosPessoais.nome}</span>
                                            <span className="cl-purple font-16 f-weight-700 info">{dadosPessoais.email}	</span>
                                            <span className="cl-purple font-16 f-weight-700 info">{dadosPessoais.telefone}</span>
                                            <span className="cl-purple font-16 f-weight-700 info">{dadosEndereco.logradouro}, {dadosEndereco.numero} - {dadosEndereco.cidade} - {dadosEndereco.estado}</span>
                                            {/*}
                                            <Link className="cl-purple font-16">(alterar dados)</Link>
                                            <Link className="bt cl-purple border-purple font-15 f-weight-700">Cancelar assinatura</Link>
                                            */ }
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
