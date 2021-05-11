import React, { useState} from 'react';
import { Link, useHistory  } from 'react-router-dom';

import './Login.scss'

import { FiLoader } from 'react-icons/fi'
import swal from 'sweetalert';
import { api } from '../../Api/app'


export default function EsqueciSenha() {

    const history = useHistory();
    const [stepLoad, setstepLoad] = useState(false)
    const [camposFormulario, setCamposFormularios] = useState({
        login: '',
    })

    async function handleSend(event)
    {

        event.preventDefault();

        try
        {
            let responseLogin = await api.post('/cadastros-login/gerar-token', camposFormulario);

            console.log(responseLogin);

            if(responseLogin.data.status === "error"){
                throw responseLogin.data.message;
            }else{

                swal("Sucesso",responseLogin.data.message, "success");
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
                                    <span className="cl-purple font-16">Email de Cadastro</span>
                                    <input  className="border-purple" type="text" value={camposFormulario.login} onChange={(e) => changeInputMult(e)} name="login" placeholder="" />
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
