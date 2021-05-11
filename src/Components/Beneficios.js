import React from 'react';
import { Link } from 'react-router-dom';

export default function Beneficios(){
    return(
        <div id="footer-beneficios">
            <div className="content">
                <div className="row no-gutters">
                    <div className="col-12" align="center">
                        <p className="font-24 cl-white f-wheight-600">
                        Ainda não assina a Live Saúde? Conheça os planos e conte com inúmeros benefícios!
                        </p>
                    </div>
                    <div className="col-12 buttons" align="center">
                        <Link className="font-16 cl-white bt border-white">
                            Assinatura a partir de R$ 23,90/mês
                        </Link>
                        <Link className="font-16 cl-white bt border-white">
                            Assistência médica por telefone 24h, 7 dias por semana
                        </Link>
                        <Link className="font-16 cl-white bt border-white">
                            Assistência Odontológica e Funeral
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
