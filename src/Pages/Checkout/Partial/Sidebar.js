
import React from 'react';
import { Link } from 'react-router-dom';


import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../../Api/app'

import BulletMais from '../../../images/home/bullet_mais.svg'
import { FaCaretRight } from 'react-icons/fa'

export default function Sidebar() {

    const [planoSelecionado, setPlanoSelecionado] = useState('')
    const [bullet, setBullet] = useState([])
    const [planos, setPlanos] = useState([])
    const [PlanoSave, setPlanoSave] = useState(false);

    useEffect(() => {

        getPlanos();

    }, [])

    async function getPlanos(){       
        let list = await api.get('/planos');
        setPlanos(list.data);
    }

    async function getPlanoSelecionado(planoSelecionado){       

        let list = await api.get('/planos/' + planoSelecionado)
        let bullets = await api.get('/planos/itens/' + planoSelecionado )

        
        if(!window.localStorage.getItem('plano')){
            setPlanoSave('planoSelecionado')
            window.localStorage.setItem('plano', planoSelecionado)
        }
        
        setPlanoSelecionado(list.data[0])
        setBullet(bullets.data)

    }

    return (
        <div></div>
    );
}


