import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import InputMask from 'react-input-mask';

import './Contratacao.scss';
import Cards from 'react-credit-cards';
import NumberFormat from 'react-number-format';
import {Select}  from '../../Components/Form';
import swal from 'sweetalert';
import { api } from '../../Api/app'

import BulletMais from "../../images/home/bullet_mais.svg";
import 'react-credit-cards/lib/styles.scss'

export default function Contratacao(props) {
    const history = useHistory()

    const [charge, setCharge] = useState({});
    const [metodoPagamento, setMetodoPagamento] = useState();

    const [currentStep, setCurrentStep] = useState(1);
    const [planos, setPlanos] = useState([]);
    const [planoSelecionado, setPlanoSelecionado] = useState("");

    async function handleCreditCard(e){
        try {
            e.preventDefault();


        } catch(error){

        }
    }

    const [creditCard, setCreditCard] = useState({
        focus: false,
        cardNumber: '',
        holderName: '',
        securityCode: '',
        expirationMonth: '',
        expirationYear: ''
    });

    function onChangeCreditCard(e){
        creditCard[e.target.name] = e.target.value
        setCreditCard({...creditCard})
    }

    function handleInputFocus(e){
        creditCard.focus = (e.target.name === "securityCode") ? "cvc" : e.target.name
        setCreditCard({...creditCard})
    }

    const [assinaturaPagamento, setAssinaturaPagamento] = useState({
        _id:'',
        assinaturaId: '',
        brokerIdExterno:'',
        uid:'',
        cartaoToken:'',
        cartaoLast4:'',
        boletoLink:'',
        statusPagamento:'',
        dataPagamento:'',
        brokerResponse:''
    });

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
        getPlanos();
        console.log(props.match.params.id);
        if(props.match.params.id !== '' && props.match.params.id !== null && props.match.params.id){
            getUser(props.match.params.id);
        }

    }, [props]);

    async function mudaMetodoPagamento(metodo){
        if(metodo === 'BOLETO'){
            sendStep3()
        }

        setMetodoPagamento(metodo)
    }

    async function getUser(id){
        let result = await api.get('cadastros/' + id);

        if(result.data[0].cadastrosEnderecos[0]){
            const endereco = result.data[0].cadastrosEnderecos[0];
            setDadosEndereco(endereco);
        }

        delete result.data[0].cadastrosEnderecos;

        if(result.data[0].cadastrosLogin[0]){
            const login = result.data[0].cadastrosLogin[0];
            setDadosLogin(login);
        }

        delete result.data[0].cadastrosEnderecos;

        setDadosPessoais(result.data[0]);
    }

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

            console.log('seila onde deu erro 3');

            if(responseDadosPessoais.data.status === "error"){
                throw responseDadosPessoais.data.message;
            }

            if(responseDadosPessoais.data.data.id){
                setDadosPessoais({...responseDadosPessoais.data.data});

                dadosEndereco.cadastroId = responseDadosPessoais.data.data.id;
                setDadosEndereco(dadosEndereco);

                dadosLogin.cadastroId = responseDadosPessoais.data.data.id;
                setDadosLogin(dadosLogin);

                dadosAssinatura.cadastroId = responseDadosPessoais.data.data.id;
                setDadosAssinatura(dadosAssinatura);
            }

            console.log(responseDadosPessoais.data.data);

            let responseDadosEndereco;
            let responseLogin;
            let responseAssinatura;

            console.log('seila onde deu erro 2');
            if( responseDadosPessoais.data.data.id ) {
                if(dadosLogin._id === null || dadosLogin._id === '' || !dadosLogin._id ){
                    if (dadosLogin.senha !== dadosLogin.repetaSenha) {
                        throw 'Senhas estão diferentes'
                    }

                    responseLogin = await api.post('/cadastros/login/' + dadosEndereco.cadastroId, {
                        login: dadosPessoais.email,
                        senha: dadosLogin.senha
                    });

                    if (responseLogin.data.data.status === "error") {
                        throw responseLogin.data.message;
                    }

                    console.log(responseLogin.data.data._id);
                    dadosLogin._id = responseLogin.data.data._id;
                    setDadosLogin({...dadosLogin});
                }

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

            setCurrentStep(2);

        } catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }
    async function sendStep3(){
        try
        {
            let responseAssinatura;

            let sendAssinatura = dadosAssinatura;
            console.log(dadosPessoais.cpf);

            sendAssinatura.email = dadosPessoais.email;
            sendAssinatura.formaPagamento = dadosPagamento.formaPagamento;
            if(metodoPagamento === 'CARTAO'){
                /*
                sendAssinatura.nome = dadosPagamento.nome;
                sendAssinatura.telefone = dadosPessoais.telefone;
                sendAssinatura.cvv = dadosPagamento.cvv;
                sendAssinatura.dataVencimento = dadosPagamento.dataVencimento;
                sendAssinatura.numeroCartao = dadosPagamento.numeroCartao;
                   */

                sendAssinatura.cpf = dadosPessoais.cpf;
                sendAssinatura.nome = creditCard.holderName;
                sendAssinatura.telefone = dadosPessoais.telefone;
                sendAssinatura.cvv = creditCard.securityCode;
                sendAssinatura.dataVencimento = creditCard.expirationMonth+'/'+creditCard.expirationYear;
                sendAssinatura.numeroCartao = creditCard.cardNumber;

            }else{
                sendAssinatura.nome = dadosPessoais.nome;
                sendAssinatura.telefone = dadosPessoais.telefone;
                sendAssinatura.cpf = dadosPessoais.cpf;
            }

            sendAssinatura.endereco = dadosEndereco;
            sendAssinatura.dataNascimento = dadosPessoais.dataNascimento;
            sendAssinatura.formaPagamento =  metodoPagamento;

            console.log(sendAssinatura);

            if(dadosAssinatura.id){
                responseAssinatura = await api.put('/assinaturas/'+dadosAssinatura.id, sendAssinatura);
            }else{
                responseAssinatura = await api.post('/assinaturas/',sendAssinatura);
            }

            if(responseAssinatura.data.status === "error"){
                throw responseAssinatura.data.message;
            }

            setDadosAssinatura(responseAssinatura.data.data);

            let responseAssinaturaPagamento =  await api.get('/assinatura-pagamentos/assinatura/' + responseAssinatura.data.data._id);

            setAssinaturaPagamento(responseAssinaturaPagamento.data.data[0]);

            if(metodoPagamento === 'CARTAO') {
                setCurrentStep(4);
            }

        } catch(err){
            setCurrentStep(1);
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
                    {currentStep < 2 ?
                    <div className="col-lg-3 col-md-12">

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

                    </div>
                    :''}
                    <div className={currentStep < 2 ? 'col-lg-9 col-md-12': 'col-md-12'}>
                        <div id="box-form" className={currentStep === 1 ? 'form-ativo':'' } >
                            <div className="row no-gutters">

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Informe seus dados pessoais e crie uma senha de acesso.</span>
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
                                        {!dadosLogin.login ?
                                            <input
                                                className="border-purple"
                                                required
                                                type="email"
                                                value={dadosPessoais.email}
                                                onChange={(e) => changeInputMult(e)}
                                                name="email"
                                                placeholder="" />
                                        :
                                            <input
                                            className="border-purple"
                                            readOnly
                                            required
                                            type="email"
                                            value={dadosPessoais.email}
                                            onChange={(e) => changeInputMult(e)}
                                            name="email"
                                            placeholder="" />
                                        }
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

                                    {!dadosLogin._id ?
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Sua senha*</span>
                                            <input required className="border-purple" type="password" value={dadosLogin.senha} onChange={(e) => changeInputLogin(e)} name="senha" placeholder="" />
                                        </label>
                                    :''}
                                    {!dadosLogin._id ?
                                        <label className="col-lg-6 col-md-12">
                                            <span className="cl-purple font-16">Confirme sua senha*</span>
                                            <input required className="border-purple" type="password"
                                                   value={dadosLogin.repetaSenha} onChange={(e) => changeInputLogin(e)}
                                                   name="repetaSenha" placeholder=""/>
                                        </label>
                                    :''}

                                </form>

                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700 mt-3">Preencha seu endereço. </span>
                                    <p className="font-16 cl-purple">Diga para onde devemos enviar seu cartão Live Saúde e crie uma senha segura para seu login.</p>
                                </div>

                                <form className="row" method="post" >
                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">CEP*</span>
                                        <InputMask mask="99999-999" required className="border-purple" type="text" value={dadosEndereco.cep} onChange={(e) => changeInputEndereco(e)} name="cep" placeholder="" />
                                    </label>

                                    <label className="col-lg-8 col-md-12">
                                        <span className="cl-purple font-16">Rua*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.logradouro} onChange={(e) => changeInputEndereco(e)} name="logradouro" placeholder="" />
                                    </label>

                                    <label className="col-lg-4 col-md-12">
                                        <span className="cl-purple font-16">Número*</span>
                                        <input  className="border-purple" required type="text" value={dadosEndereco.numero} onChange={(e) => changeInputEndereco(e)} name="numero" placeholder="" />
                                    </label>

                                    <label className="col-lg-8 col-md-12">
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

                                    <button type="submit" className="font-15 bg-purple cl-white bt" type="button" onClick={(e) => sendStep1(e)}>Próximo</button>

                                </form>
                            </div>
                        </div>

                        <div id="box-form" className={currentStep === 2 ? 'form-ativo':'' }>
                            <div className="row no-gutters">


                                <div className="col-12">
                                    <span className="font-40 cl-purple f-weight-700">Estamos quase lá! </span>
                                    <p className="font-16 cl-purple">Confirme as informações. e selecione a forma de pagamento</p>
                                </div>

                                <div className="col-12 box-1 card mt-5">
                                    <div className={'card-body'}>
                                        <div className="box-form ">

                                            <div className="row no-gutters">
                                                <div className="col-4">
                                                    <span className="font-16 cl-purple">Plano Selecionado</span>
                                                    <p className="font-16 f-weight-700 cl-purple">{ planoSelecionado.titulo}</p>
                                                </div>
                                                <div className="col-4">
                                                    <span className="font-16 cl-purple">Valor do Plano</span><br />
                                                    <span className="font-16 f-weight-700 cl-purple w-100"><NumberFormat value={planoSelecionado.valor}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês</span>
                                                </div>
                                                <div className="col-4">
                                                    <span className="font-16 cl-purple">Valor da Adesão</span><br />
                                                    <span className="font-16 f-weight-700 cl-purple w-100"> <NumberFormat value={planoSelecionado.valorAdesao}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês</span>
                                                </div>
                                            </div>
                                            <div className="row no-gutters">
                                                <div className="col-4">
                                                    <span className="font-16 cl-purple">E-mail</span>
                                                    <p className="font-16 f-weight-700 cl-purple">{ dadosPessoais.email}</p>
                                                </div>
                                                <div className="col-4">
                                                    <span className="font-16 cl-purple">Telefone </span><br />
                                                    <span className="font-16 f-weight-700 cl-purple w-100">{dadosPessoais.telefone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <form method="post" className={'w-100'}>

                                    <div className=" col-12">
                                        <label className="col-md-6">
                                            {metodoPagamento !== 'CARTAO'?
                                                <button type="button" className="font-15 bg-purple cl-white bt w-100" onClick={()=>mudaMetodoPagamento('BOLETO')} >Pagar com <b>Boleto</b></button>
                                            :''}
                                        </label>
                                        <label className="col-md-6">
                                            {metodoPagamento !== 'BOLETO'?
                                                <button type="button" className="font-15 bg-purple cl-white bt w-100" onClick={()=>mudaMetodoPagamento('CARTAO')} >Pagar com <b>Cartão de Crédito</b></button>
                                            :''}
                                        </label>
                                    </div>
                                </form>

                                {metodoPagamento === 'CARTAO'?
                                    <div className="boxCreditCard">

                                        <div className="card">
                                            <Cards
                                                cvc={creditCard.securityCode}
                                                expiry={creditCard.expirationMonth + "/" + creditCard.expirationYear}
                                                focused={creditCard.focus}
                                                name={creditCard.holderName}
                                                number={creditCard.cardNumber}
                                            />
                                        </div>

                                        <form >

                                            <label className="col-lg-12 col-md-12">
                                                <span className="cl-purple font-16">Número do cartão</span>
                                                <InputMask className="border-purple"  label="Número do cartão" name="cardNumber" value={creditCard.cardNumber} onChange={(e) => onChangeCreditCard(e)} mask={'9999999999999999'}  onFocus={handleInputFocus} />
                                            </label>
                                            <label className="col-lg-12 col-md-12">
                                                <span className="cl-purple font-16">Nome do titular do cartão</span>
                                                <input  className="border-purple" required type="text" value={creditCard.holderName} onChange={(e) => onChangeCreditCard(e)} name="holderName" placeholder="" />
                                            </label>
                                            <div className="flex">
                                                <label className="col-lg-4 col-md-12">
                                                    <span className="cl-purple font-16">Mês de vencimento</span>
                                                    <InputMask className="border-purple"  label="Mês" name="expirationMonth" value={creditCard.expirationMonth} onChange={(e) =>onChangeCreditCard(e)} mask={'99'} type="integer" onFocus={handleInputFocus} />
                                                </label>
                                                <label className="col-lg-4 col-md-12">
                                                    <span className="cl-purple font-16">Ano de vencimento</span>
                                                    <InputMask className="border-purple"  label="Ano" name="expirationYear" value={creditCard.expirationYear} onChange={(e) =>onChangeCreditCard(e)} mask={'9999'} type="integer" onFocus={handleInputFocus} />
                                                </label>
                                                <label className="col-lg-4 col-md-12">
                                                    <span className="cl-purple font-16">CVV</span>
                                                    <InputMask className="border-purple"  label="CVC / CVV" name="securityCode" value={creditCard.securityCode} onChange={(e) => onChangeCreditCard(e)} mask={'9999'} type="integer" onFocus={handleInputFocus} />
                                                </label>
                                            </div>
                                            <button type="BUTTON" className="font-15 bg-purple cl-white bt w-100" onClick={(e) => sendStep3(e)}>Confirmar pagamento</button>
                                            <p className="small">Seu pagamento passará por uma análise interna e estará sujeito à confirmação feita por telefone ou e-mail.</p>
                                        </form>
                                    </div>
                                :''}

                                {metodoPagamento === 'BOLETO'?
                                    <div className="boxBoleto W-100">
                                        <iframe className={'w-100'} src={assinaturaPagamento.boletoLink}></iframe>
                                        <button type="BUTTON" className="font-15 bg-purple cl-white bt w-100" onClick={() => setCurrentStep(4)}>Confirmar </button>
                                    </div>
                                :''}


                            </div>
                        </div>


                        <div id="box-form" className={currentStep === 3 ? 'form-ativo':'' }>
                            <div className="row no-gutters">


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
                                                    <div className="col-4">
                                                        <span className="font-16 cl-purple">Plano Selecionado</span>
                                                        <p className="font-16 f-weight-700 cl-purple">{ planoSelecionado.titulo}</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-16 cl-purple">Valor do Plano</span>
                                                        <span className="font-16 f-weight-700 cl-purple w-100"><NumberFormat value={planoSelecionado.valor}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span className="font-16 cl-purple">Valor da Adesão</span>
                                                        <span className="font-16 f-weight-700 cl-purple w-100"> <NumberFormat value={planoSelecionado.valorAdesao}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} /></span>
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
