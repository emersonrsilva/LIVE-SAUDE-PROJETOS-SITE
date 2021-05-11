import React from 'react';
import { Link } from 'react-router-dom';

export default function MaisInfos(){
    return(
        <div id="Maisinfos" className="bg-purple">
            <div className="content">
                <div className="row no-gutters">
                    <div className="col-12" align="center">
                        <p className="font-24 cl-white f-wheight-600">
                            Acesse mais informações e comprove todos diferenciais da Live Saúde
                        </p>
                    </div>
                    <div className="col-12 buttons" align="center">
                        <Link className="font-16 cl-white bt border-white" to="contato">
                            Receba mais informações por telefone ou e-mail
                        </Link>
                        <Link className="font-16 cl-white bt border-white" to="faq">
                            Confira nossa sessão de Dúvidas Frequentes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
