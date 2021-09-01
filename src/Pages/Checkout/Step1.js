import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Iframe from 'react-iframe'

import InputMask from 'react-input-mask';
import LoadingOverlay from 'react-loading-overlay';

import './Checkout.scss';
import NumberFormat from 'react-number-format';
import { Input, TextareaEditor, Textarea, Select, NumberInput } from '../../Components/Form';
import swal from 'sweetalert';
import { gcloud, api, apiCep } from '../../Api/app'

import BulletMais from "../../images/home/bullet_mais.svg";
import DadosPessoais from '../MinhaConta/DadosPessoais';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Accordion, Card } from 'react-bootstrap'

export default function Step1(props) {
    const history = useHistory()
    const [corTexto, setCorTexto] = useState('cl-sp')
    const [apenasPagamento, setApenasPagamento] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [planos, setPlanos] = useState([]);
    const [planoSelecionado, setPlanoSelecionado] = useState("");
    const [loadingText, setloadingText] = useState("")
    const [dadosPessoais, setDadosPessoais] = useState({
        categoria_beneficio: "",
        id: "",
        cpf: "",
        passo: "",
        email: "",
        nascimento: "",
        nome: "",
        origem: "SISTEMA",
        rg: "",
        telefone: "",
    });
    const [dadosEndereco, setDadosEndereco] = useState({
        cadastroId: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
    });

    const [dadosLogin, setDadosLogin] = useState({
        login: "",
        senha: "",
        repetaSenha: "",
    });

    const [dadosAssinatura, setDadosAssinatura] = useState({
        planoId: "",
        cadastroId: "",
        statusAssinatura: "PENDENTE DE ATIVACAO",
        formaPagamento: "CARTAO",
        nome: "",
        numeroCartao: "",
        dataVencimento: "",
        telefone: "",
        boletoUrl: ""
    });

    const [dadosPagamento, setDadosPagamento] = useState({
        planoId: "",
        cadastroId: "",
        statusAssinatura: "PENDENTE DE ATIVACAO",
        formaPagamento: "CARTAO",
        nome: "",
        numeroCartao: "",
        dataVencimento: "",
        telefone: "",
    });

    const [dadosFatura, setDadosFatura] = useState({})

    useEffect(() => {
        getCorTexto()
        getCardPwr()

    }, [props]);
    async function getCardPwr() {
        setloadingText("Carregando Checkout... ")
        const query = new URLSearchParams(props.location.search);

        if (query.get("cid")) {
            let cid = query.get("cid")
            const quotinfo = await gcloud.get("quotation?power_h=" + cid)
            console.log(quotinfo)
            if (quotinfo.status == 200) {
                const dados_buscados = quotinfo.data
                setDadosPessoais({ ...dados_buscados })
                console.log('atualizou->', dadosPessoais, dados_buscados)
                getPlanos(dados_buscados.plano.atual.categoria, dados_buscados.plano.painellive)
                console.log("planos", dados_buscados.plano.painellive)
                console.log("filtrar", dados_buscados.plano.atual.id_painel_live)
                console.log(dados_buscados.plano.painellive.filter(x => x._id == dados_buscados.plano.atual.id_painel_live).shift())
                setPlanoSelecionado(dados_buscados.plano.painellive.filter(x => x._id == dados_buscados.plano.atual.id_painel_live).shift());
                setloadingText("")
            }
        }
        if (query.get("id")) {
            setCurrentStep(1)

            let meusdados = dadosPessoais
            meusdados['id'] = '60e6729790d1200d7af1b40d'
            meusdados['nome'] = 'teste mudado'
            meusdados['telefone'] = '34998167556'
            meusdados['cpf'] = '12184074683'
            meusdados['rg'] = '18923726'
            meusdados['dataNascimento'] = '25/06/1997'
            meusdados['email'] = query.get("id") + '@gmail.com'
            setDadosPessoais({ ...meusdados })

            let endereco = dadosEndereco
            endereco["cep"] = "38700-262"
            endereco["logradouro"] = "RUA MINAS GERAIS"
            endereco["numero"] = parseInt("1000")
            endereco["bairro"] = "SANTA TEREZINHA"
            endereco["cidade"] = "PATOS DE MINAS"
            endereco["uf"] = "MG"
            //setDadosEndereco(endereco)

            let meusDadosLogin = dadosLogin
            //meusDadosLogin['senha'] =meusDadosLogin['repetaSenha']= '@SenhaPadraoPwrCheckout1'
            //setDadosLogin({...meusDadosLogin})

            //setCurrentStep(3)
            //setApenasPagamento(true)
        } else {
            setCurrentStep(1)
        }
    }
    async function getCorTexto() {
        setCorTexto('cl-sp')
    }
    async function getPlanos(filtro, force) {
        if (force) {
            console.log("plano force", force)
            setPlanos(force);

        } else {
            const result = await gcloud.get('/planos-config?categoria=' + filtro);

            setPlanos(result.data);
            console.log('planos', result.data)
            setPlanoSelecionado(result.data[0]);

        }
    }

    async function sendStep1(e) {
        e.preventDefault();
        try {
            let responseDadosPessoais;
            console.log("resoponse", responseDadosPessoais)
            setCurrentStep(2)
            const body = {
                nome: dadosPessoais.nome,
                nascimento: dadosPessoais.nascimento,
                email: dadosPessoais.email,
                telefone: dadosPessoais.telefone,
                cpf: dadosPessoais.dadosPessoais,
                rg: dadosPessoais.rg,
                id: dadosPessoais.id,
            }
            responseDadosPessoais = await gcloud.put('/quotation?h=' + dadosPessoais.id, body)
            return;
            dadosPessoais['origem'] = 'SITE'
            if (dadosPessoais.id) {
                responseDadosPessoais = await api.put('/cadastros/' + dadosPessoais.id, dadosPessoais);
            } else {
                responseDadosPessoais = await api.post('/cadastros', dadosPessoais);
                /// cria cotacao tambem
            }
            if (responseDadosPessoais.data.status === "error") {
                throw responseDadosPessoais.data.message;
            } else {
                setCurrentStep(2)
            }

            if (responseDadosPessoais.data.data.id) {
                dadosEndereco.cadastroId = responseDadosPessoais.data.data.id;
                setDadosEndereco(dadosEndereco);

                dadosAssinatura.cadastroId = responseDadosPessoais.data.data.id;
                setDadosAssinatura(dadosAssinatura);
            }


        } catch (err) {
            swal("ops!", err, "error");
        }
    }

    async function sendStep2(e) {
        try {
            e.preventDefault();

            let responseDadosEndereco;
            let responseLogin;
            let responseAssinatura;
            const body = Object.assign({ 'id': dadosPessoais.id }, dadosEndereco)
            responseDadosEndereco = await gcloud.put('/quotation?h=' + dadosPessoais.id, body)
            setCurrentStep(3)
            return;
            // if(dadosLogin.senha !== dadosLogin.repetaSenha){
            //     throw 'Senhas estão diferentes'
            // }

            responseLogin = await api.post('/cadastros/login/' + dadosEndereco.cadastroId, { login: dadosPessoais.email, senha: dadosLogin.senha });

            if (responseLogin.data.status === "error") {
                //throw responseLogin.data.message;
            }


            if (dadosEndereco.id) {
                responseDadosEndereco = await api.put('/cadastros/enderecos/' + dadosEndereco.cadastroId + '/' + dadosEndereco.id, dadosEndereco);
            } else {
                responseDadosEndereco = await api.post('/cadastros/enderecos/' + dadosEndereco.cadastroId, dadosEndereco);
            }

            dadosAssinatura.planoId = planoSelecionado.id;




            if (responseDadosEndereco.data.status === "error") {
                throw responseDadosEndereco.data.message;
            }

            setCurrentStep(3)

        } catch (err) {
            swal("ops!", err, "error");
        }
    }
    async function sendStep3(e) {
        e.preventDefault();
        try {
            //salva_plano 
            console.log('planos live', dadosPessoais)
            console.log('selec', planoSelecionado)
            const planoAtual = dadosPessoais.plano.todos.filter(x => x.id_painel_live == planoSelecionado.id).shift()
            const body = Object.assign({ 'id': dadosPessoais.id, 'plano': planoAtual.id_universal })
            setloadingText("Processando pagamento")
            const responsePlano = await gcloud.put('/quotation?h=' + dadosPessoais.id, body)
            const bodyCartao = {
                'numero': dadosPagamento.numeroCartao,
                'cvv': dadosPagamento.cvv,
                'cpf': dadosPagamento.cpf,
                'telefone': dadosPessoais.telefone,
                'validade': dadosPagamento.dataVencimento,
                'nome': dadosPagamento.nome,
                'id': dadosPessoais.h
            }
            const responsePagamento = await gcloud.post('/payment?h=' + dadosPessoais.id, bodyCartao)
            console.log(responsePagamento)
            setloadingText("")
            if (responsePagamento.data.status == 'refused' || responsePagamento.data.error) {
                throw "Pagamento não aprovado. Por favor tente outro cartão ou verifique os dados cadastrados"
            }
            return setCurrentStep(4);
            let responseAssinatura;

            let sendAssinatura = dadosAssinatura;

            sendAssinatura.email = dadosPessoais.email
            sendAssinatura.formaPagamento = dadosPagamento.formaPagamento;
            if (dadosPagamento.formaPagamento === 'CARTAO') {
                sendAssinatura.name = dadosPagamento.nome;
                sendAssinatura.telefone = dadosPagamento.telefone;
                sendAssinatura.cpf = dadosPagamento.cpf;
                sendAssinatura.cvv = dadosPagamento.cvv;
                sendAssinatura.dataVencimento = dadosPagamento.dataVencimento;
                sendAssinatura.numeroCartao = dadosPagamento.numeroCartao;
            } else {
                sendAssinatura.nome = dadosPessoais.nome;
                sendAssinatura.telefone = dadosPessoais.telefone;
                sendAssinatura.cpf = dadosPessoais.cpf;
            }

            sendAssinatura.endereco = dadosEndereco;
            sendAssinatura.dataNascimento = dadosPessoais.nascimento;

            if (dadosAssinatura.id) {
                responseAssinatura = await api.put('/assinaturas/' + dadosAssinatura.id, dadosAssinatura);
            } else {
                responseAssinatura = await api.post('/assinaturas/', dadosAssinatura);
            }

            if (responseAssinatura.data.status === "error") {
                throw responseAssinatura.data.message;
            }
            let bol = await api.get('/assinatura-pagamentos/assinatura/' + responseAssinatura.data.data.id)
            responseAssinatura['boletoUrl'] = bol.data.data.boletoLink

            setDadosAssinatura(responseAssinatura)
            var myElement = '<iframe src="' + bol.boletoLink + '" width="100px" height="100px" style="position: relative;width: 100%;height: 500px;border: 0px;"></iframe>';
            document.getElementById('boleto').innerHTML = myElement

            setCurrentStep(4)

        } catch (err) {
            //setCurrentStep(1)
            swal("ops!", err ? err.toString().replace("Error:", "") : "Desconhecido", "error");
        }
    }

    function changeInputMult(e) {
        let meusdados = dadosPessoais
        meusdados[e.target.name] = e.target.value
        setDadosPessoais({ ...meusdados })
    }

    function changeInputEndereco(e) {
        let meusdados = dadosEndereco
        meusdados[e.target.name] = e.target.value
        setDadosEndereco({ ...meusdados })
    }

    async function atualizaCep(e) {
        setloadingText(" ")
        const ceprsp = await apiCep.get('/ws/' + dadosEndereco['cep'].replace("-", "") + '/json/')
        setloadingText("")
        console.log(ceprsp)
        let meusdados = dadosEndereco
        //meusdados[e.target.name] = e.target.value
        for (var key in ceprsp.data) {
            meusdados[key] = ceprsp.data[key]
        }
        meusdados['cidade'] = ceprsp.data['localidade']
        setDadosEndereco({ ...meusdados })
    }

    function changeInputLogin(e) {
        let meusdados = dadosLogin
        meusdados[e.target.name] = e.target.value
        setDadosLogin({ ...meusdados })
    }

    function changeInputPagamento(e) {
        let meusdados = dadosPagamento
        meusdados[e.target.name] = e.target.value
        setDadosPagamento({ ...meusdados })
    }

    return (


        <div id="checkout">

            <div className="content">
                <LoadingOverlay
                    active={loadingText != ''}
                    spinner
                    text={loadingText}
                >
                    <div className="row">
                        {currentStep < 4 ?
                            <div className="col-lg-3 col-md-12">
                                <div id="sidebar">
                                    <div className="row no-gutters">



                                        <div className='col-12'>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    
                                                </Accordion.Item>
                                                 
                                            </Accordion>
                                        </div>


                                        <div className="col-12">

                                            <p className={"font-30 f-weight-700 " + corTexto + " title-side"}>Escolha sua assinatura.</p>
                                            <p className={"font-12 " + corTexto + " sub-side"}>Um pequeno valor mensal para uma vida com muito mais saúde. </p>
                                            <select disabled={apenasPagamento || currentStep > 3} className="font-15 bt cl-sp border-purple escolha f-weight-700" name="planoselecionado"
                                                onChange={e => setPlanoSelecionado(planos[e.target.value])} >
                                                {planos.map((row, key) =>
                                                    <option selected={row.id == planoSelecionado.id} value={key}>{row.titulo}</option>
                                                )}
                                            </select>

                                            <span className="font-15 cl-gray vc-escolheu">Você escolheu</span>
                                            <span className="font-18 cl-white bt bg-green f-weight-700">{planoSelecionado.titulo}</span>

                                            <ul>
                                                {planoSelecionado.planosItens ? planoSelecionado.planosItens.map((row) =>
                                                    <li className="cl-gray font-14" key={row.id}><img src={BulletMais} />{row.titulo}</li>
                                                ) : ''}
                                            </ul>

                                            <span className="border-green bt bg-white font-18 cl-green f-weight-700">
                                                Valor: <NumberFormat value={planoSelecionado.valor} fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />/mês
                                            </span>
                                            Valor de Adesão:  <NumberFormat value={planoSelecionado.valorAdesao} fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                                            <span className="termos cl-gray font-13">Acessar termos de associação</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''}
                        <div className={currentStep < 4 ? 'col-lg-9 col-md-12' : 'col-md-10 offset-md-1'}>
                            <div id="box-form" className={currentStep === 1 ? 'form-ativo' : ''} >
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <div className="steps" align="center">
                                            <span className="border-purple font-12 pass-1 st-pass active">1</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-2 st-pass ">2</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-2 st-pass ">3</span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <span className="font-30 cl-sp f-weight-700">Informe seus dados pessoais.</span>
                                        <p className="font-12 cl-sp">Criaremos um cadastro para que você tenha acesso ao seu plano.</p>
                                    </div>

                                    <form className="row" method="post" onSubmit={sendStep1}>
                                        <label className="col-lg-8 col-md-12">
                                            <span className="cl-sp font-12">Seu nome completo**</span>
                                            <input className="border-purple" required type="text" disabled={apenasPagamento} value={dadosPessoais.nome} onChange={(e) => changeInputMult(e)} name="nome" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">Data de nascimento*</span>
                                            <InputMask mask="99/99/9999" required className="border-purple" type="text" disabled={apenasPagamento} value={dadosPessoais.nascimento} onChange={(e) => changeInputMult(e)} name="nascimento" placeholder="" />

                                        </label>

                                        <label className="col-lg-8 col-md-12">
                                            <span className="cl-sp font-12">E-mail*</span>
                                            <input className="border-purple" required type="email" value={dadosPessoais.email} disabled={apenasPagamento} onChange={(e) => changeInputMult(e)} name="email" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">Telefone para contato*</span>
                                            <InputMask mask="(99) 99999-9999" required className="border-purple" type="text" disabled={apenasPagamento} value={dadosPessoais.telefone} onChange={(e) => changeInputMult(e)} name="telefone" placeholder="" />
                                        </label>

                                        <label className="col-lg-8 col-md-12">
                                            <span className="cl-sp font-12">CPF*</span>
                                            <InputMask mask="999.999.999-99" required className="border-purple" type="text" disabled={apenasPagamento} value={dadosPessoais.cpf} onChange={(e) => changeInputMult(e)} name="cpf" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">RG*</span>
                                            <InputMask mask="**.***.***-*" required className="border-purple" type="text" disabled={apenasPagamento} value={dadosPessoais.rg} onChange={(e) => changeInputMult(e)} name="rg" placeholder="" />

                                        </label>

                                        <button type="submit" className="font-15 bg-purple cl-white bt" type="submit">Próximo</button>

                                    </form>
                                </div>
                            </div>



                            {/* formulario 2 */}
                            <div id="box-form" className={currentStep === 2 ? 'form-ativo' : ''}>
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <div className="steps" align="center">
                                            <span className="border-purple font-12 pass-1 st-pass ">1</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-2 st-pass active">2</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-2 st-pass ">3</span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <span className="font-30 cl-sp f-weight-700">Preencha seu endereço.</span>
                                        <p className="font-12 cl-sp">Diga para onde devemos enviar seu cartão Super Benefícios e crie uma senha segura para seu login.</p>
                                    </div>

                                    <form className="row" method="post" onSubmit={sendStep2}>
                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">CEP*</span>
                                            <InputMask mask="99999-999" disabled={apenasPagamento} required className="border-purple" type="text" value={dadosEndereco.cep} onBlur={(e) => atualizaCep()} onChange={(e) => changeInputEndereco(e)} name="cep" placeholder="" />
                                        </label>

                                        <label className="col-lg-8 col-md-12">
                                            <span className="cl-sp font-12">Rua*</span>
                                            <input className="border-purple" disabled={apenasPagamento} required type="text" value={dadosEndereco.logradouro} onChange={(e) => changeInputEndereco(e)} name="logradouro" placeholder="" />
                                        </label>

                                        <label className="col-lg-3 col-md-12">
                                            <span className="cl-sp font-12">Número*</span>
                                            <input className="border-purple" disabled={apenasPagamento} required type="text" value={dadosEndereco.numero} onChange={(e) => changeInputEndereco(e)} name="numero" placeholder="" />
                                        </label>

                                        <label className="col-lg-9 col-md-12">
                                            <span className="cl-sp font-12">Complemento</span>
                                            <input className="border-purple" disabled={apenasPagamento} type="text" value={dadosEndereco.complemento} onChange={(e) => changeInputEndereco(e)} name="complemento" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">Bairro*</span>
                                            <input className="border-purple" disabled={apenasPagamento} required type="text" value={dadosEndereco.bairro} onChange={(e) => changeInputEndereco(e)} name="bairro" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">Cidade*</span>
                                            <input className="border-purple" disabled={apenasPagamento} required type="text" value={dadosEndereco.cidade} onChange={(e) => changeInputEndereco(e)} name="cidade" placeholder="" />
                                        </label>

                                        <label className="col-lg-4 col-md-12">
                                            <span className="cl-sp font-12">Estado*</span>
                                            <Select
                                                className={'border-purple'}
                                                required
                                                disabled={apenasPagamento}
                                                name={'uf'}
                                                value={dadosEndereco.uf}
                                                onChange={(e) => changeInputEndereco(e)}
                                                options={[
                                                    ['AC', 'Acre'],
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

                                        <div className="d-none row   pass-camp col-sm-12" style={{ display: apenasPagamento ? 'none' : '' }} >
                                            <label className="col-lg-6 col-md-12">
                                                <span className="cl-sp font-12">Sua senha*</span>
                                                <input className="border-purple" disabled={apenasPagamento} type="password" value={dadosLogin.senha} onChange={(e) => changeInputLogin(e)} name="senha" placeholder="" />
                                            </label>
                                            <label className="col-lg-6 col-md-12">
                                                <span className="cl-sp font-12">Confirme sua senha*</span>
                                                <input className="border-purple" disabled={apenasPagamento} type="password" value={dadosLogin.repetaSenha} onChange={(e) => changeInputLogin(e)} name="repetaSenha" placeholder="" />
                                            </label>
                                        </div>

                                        <button type="submit" className="font-15 bg-purple cl-white bt" type="submit">Próximo</button>

                                    </form>
                                </div>
                            </div>

                            <div id="box-form" className={currentStep === 3 ? 'form-ativo' : ''}>
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <div className="steps" align="center">
                                            <span className="border-purple font-12 pass-1 st-pass ">1</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-2 st-pass ">2</span>
                                            <span className="dashed-bar"></span>
                                            <span className="border-purple font-12 pass-3 st-pass active">3</span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <span className="font-30 cl-sp f-weight-700">Estamos quase lá! </span>
                                        <p className="d-none font-12 cl-sp">Informe os dados para pagamento. Não se preocupe, suas informações estão seguras.</p>
                                    </div>


                                    <form className="row" method="post" onSubmit={sendStep3}>
                                        <div className="d-none row no-gutters col-12">
                                            <label className="col-md-12">
                                                <select className="border-purple" value={dadosPagamento.formaPagamento} onChange={(e) => changeInputPagamento(e)} name="formaPagamento">
                                                    <option value="CARTAO">Cartão de crédito</option>
                                                    <option value="BOLETO">Boleto</option>
                                                </select>
                                            </label>
                                        </div>

                                        <div className={dadosPagamento.formaPagamento}>

                                            <label className="col-md-12">
                                                <span className="cl-sp font-12">CPF do titular do cartão*</span>
                                                <InputMask mask="999.999.999-99" className="border-purple" value={dadosPagamento.cpf} onChange={(e) => changeInputPagamento(e)} name="cpf" placeholder="" />
                                            </label>


                                            <label className="col-12">
                                                <span className="cl-sp font-12">Nome completo (como escrito no cartão)*</span>
                                                <input className="border-purple" type="text" value={dadosPagamento.nome} onChange={(e) => changeInputPagamento(e)} name="nome" placeholder="" />
                                            </label>

                                            <label className="col-lg-5 col-md-12">
                                                <span className="cl-sp font-12">Número do cartão*</span>
                                                <InputMask mask="9999999999999999" className="border-purple" type="text" value={dadosPagamento.numeroCartao} onChange={(e) => changeInputPagamento(e)} name="numeroCartao" placeholder="" />
                                            </label>

                                            <label className="col-lg-5 col-md-12">
                                                <span className="cl-sp font-12">Data de vencimento *</span>
                                                <InputMask mask="99/9999" className="border-purple" type="text" value={dadosPagamento.dataVencimento} onChange={(e) => changeInputPagamento(e)} name="dataVencimento" placeholder="" />
                                            </label>

                                            <label className="col-lg-2 col-md-12">
                                                <span className="cl-sp font-12">CVV*</span>
                                                <InputMask mask="999" className="border-purple" type="text" value={dadosPagamento.cvv} onChange={(e) => changeInputPagamento(e)} name="cvv" placeholder="" />
                                            </label>



                                            <label className="col-lg-6 col-md-12">
                                                <span className="cl-sp font-12">Data de nascimento do titular*</span>
                                                <InputMask mask="99/99/9999" className="border-purple" value={dadosPagamento.dataNascimento} onChange={(e) => changeInputPagamento(e)} name="dataNascimento" placeholder="" />
                                            </label>

                                            <label className="col-lg-6 col-md-12">
                                                <span className="cl-sp font-12">Telefone*</span>
                                                <InputMask mask="(99) 99999-9999" className="border-purple" type={'text'} value={dadosPessoais.telefone} onChange={(e) => changeInputPagamento(e)} name="telefone" placeholder="" />
                                            </label>
                                        </div>
                                        <div className="  row no-gutters col-12">
                                            <div class='col-md-1'><input type="checkbox"></input></div> <span class="col-md-10">Autorizo cobrança recorrente ..... texto a definir</span>
                                        </div>
                                        <button type="submit" className="font-15 bg-purple cl-white bt" >Próximo</button>
                                    </form>

                                </div>
                            </div>

                            {/* Formulario 4 - Final */}
                            <div id="box-form" className={currentStep === 4 ? "box-check-final  form-ativo" : "box-check-final "}>
                                <div className="row no-gutters">
                                    <div className="col-12" align="center">
                                        <span className="font-30 cl-sp f-weight-700">Sucesso! </span>
                                        <p className="font-12 cl-sp">Obrigado por escolher a Super Benefícios.<br></br>Enviaremos por e-mail a confirmação e mais informações sobre seu plano. </p>
                                    </div>
                                    <div className="row col-12 ck-st4">
                                        <div className="row no-gutters col-lg-8 col-md-12 space-box-mb ">
                                            <div className="col-12 box-1">
                                                <div className="box-form ">
                                                    <p className="font-12 f-weight-700 cl-sp">
                                                        Resumo da assinatura
                                                    </p>
                                                    <div className="row no-gutters">
                                                        <div className="col-6">
                                                            <span className="font-12 cl-sp">{planoSelecionado.titulo}</span>
                                                            <p className="font-12 f-weight-700 cl-sp">{dadosAssinatura.statusAssinatura}</p>
                                                        </div>
                                                        <div className="col-6" align="right">
                                                            <span className="font-12 cl-sp">R$ {planoSelecionado.valor} /mês</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*}
                                        <div className="col-12">
                                            <div className="box-form">
                                                <p className="font-12 f-weight-700 cl-sp">
                                                    Pagamento
                                                </p>
                                                <div className="row no-gutters">
                                                    <div className="col-6">
                                                        <span className="font-12 cl-sp">Data da renovação</span>
                                                        <p className="font-12 f-weight-700 cl-sp">Cartão de crédito</p>
                                                    </div>
                                                    <div className="col-6" align="right">
                                                        <span className="font-12 cl-sp">10/10/2020</span>
                                                        <p className="font-12 cl-sp"><b>1234-xxxx-xxx-5678</b> (alterar)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        */}
                                        </div>
                                        <div className="row col-lg-4 col-md-12 no-gutters">
                                            <div className="box-form user-data">
                                                <span className="cl-sp font-19 f-weight-700 name">{dadosPessoais.nome}</span>
                                                <span className="cl-sp font-12 f-weight-700 info">{dadosPessoais.email}	</span>
                                                <span className="cl-sp font-12 f-weight-700 info">{dadosPessoais.telefone}</span>
                                                <span className="cl-sp font-12 f-weight-700 info">{dadosEndereco.logradouro}, {dadosEndereco.numero} - {dadosEndereco.cidade} - {dadosEndereco.uf}</span>
                                                {/*}
                                            <Link className="cl-sp font-12">(alterar dados)</Link>
                                            <Link className="bt cl-sp border-purple font-15 f-weight-700">Cancelar assinatura</Link>
                                            */ }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-none row col-12">

                                        <div id='boleto' />

                                    </div>
                                    <div className="d-none row col-12 bottom">
                                        <div className="col-12" align="center">
                                            <span className="cl-sp font-12 atend">Caso precise, <Link className="cl-sp">entre em contato por nossos canais de atendimento.</Link></span>
                                        </div>
                                        <div className="col-12" align="center">
                                            <Link to="/" className="bt cl-white bg-purple f-weight-700">Voltar para a página inicial</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>

            </div>
        </div>
    );
}
