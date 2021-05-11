import React, {useEffect, useState} from 'react';
import { Link, useHistory  } from 'react-router-dom';

import './Login.scss'

import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'


export default function MudarSenha(props) {

    const history = useHistory();


    const [stepLoad, setstepLoad] = useState(false)
    const [camposFormulario, setCamposFormularios] = useState({
        senha: '',
        senhaRepete:''
    })

    async function handleSend(event)
    {

        event.preventDefault();

        try
        {
            let token = props.location.search;
            token = token.replace('?token=','');


            let responseLogin = await api.post('/cadastros-login/mudar-senha',
                {
                    senha: camposFormulario.senha,
                    senhaRepete: camposFormulario.senhaRepete,
                    token: token
                });

            console.log(responseLogin);

            if(responseLogin.data.status === "error"){
                throw responseLogin.data.message;
            }else{
                swal("Sucesso",responseLogin.data.message, "success");
                window.setTimeout(function(){
                    window.location.href = '/login';
                },2000)
            }




        } catch(err){
            swal("ops!",err.replace('Error:',''),"error");
        }
    }

    function changeInputMult(e)
    {
        var meusdados = camposFormulario
        meusdados[e.target.name] = e.target.value
        setCamposFormularios({...meusdados})
    }

    return (
        <div id="Login">
            <div className="content">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div id="box-login">
                            <form className="row" method="post" onSubmit={handleSend}>
                                <label className="col-lg-12 col-md-12">
                                    <span className="cl-purple font-16">Nova Senha</span>
                                    <input  className="border-purple" type="password" value={camposFormulario.senha} onChange={(e) => changeInputMult(e)} name="senha" placeholder="" />
                                </label>
                                <label className="col-lg-12 col-md-12">
                                    <span className="cl-purple font-16">Confirmar Senha</span>
                                    <input  className="border-purple" type="password" value={camposFormulario.senhaRepete} onChange={(e) => changeInputMult(e)} name="senhaRepete" placeholder="" />
                                </label>

                                <button  className="font-15 bg-purple cl-white bt" type="submit">{stepLoad === true ? <FiLoader /> : "Enviar Link"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
