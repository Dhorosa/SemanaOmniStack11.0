import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import logo from '../../assets Web/logo.svg';
import heroesImg from '../../assets Web/heroes.png';
import api from '../../Services/api';

import './style.css';

export default function Logon(){
    const [id, setId]=useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', {id}); 

            localStorage.setItem('ongId' , id);
            localStorage.setItem('ongName' , response.data.name);
            history.push('/profile');
        }
          catch (err){
            alert('Falha no Login, tente novamente!') ;    
        }    
    }

    return (
        <div className= "logon-container">
            <section className= 'form'>
                <img src= {logo} alt='Be the Heroes ' />

                <form onSubmit={handleLogin}>
                    <h1>
                        Faça seu Logon
                    </h1>

                    <input 
                        placeholder='Sua ID'
                        value= {id}
                        onChange={e=>setId(e.target.value)} 
                    />
                    <button className='button' type="submit"> Entrar </button> 

                    <Link className='back-link' to= './register'>
                       <FiLogIn size= {16} color = '#e02041' /> 
                       Não tenho cadastro!    
                    </Link>       


                </form>
            </section>

            <img src= {heroesImg} alt='Heroes ' />

        </div>
    );
}