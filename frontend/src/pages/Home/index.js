import React, { useState, useEffect } from 'react'
import { FiPower, FiTrash2, FiEdit3, FiArrowRight } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './style.css'
import api from '../../services/api'

export default function Home() {

    const [user, setUser] = useState([])
    const history = useHistory()

    const username = localStorage.getItem('type')

    useEffect(() => {
        api.get('/list').then(res => {
            setUser(res.data)
        })
    });

    function format(value) {
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    async function handleDelete(id) {
        try {
            await api.delete(`register/${id}`)
                .then(
                    alert('Deletado com sucesso!')
                )
        } catch (err) {
            alert('Erro ao deletar, tente novamente')
        }
    }

    function handleEdit(id) {
        history.push(`update/${id}`)
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header className={username !== 'Administrador' ? `justifyBetween` : ``}>
                <span>Bem vindo, {username}</span>

                <div>
                    <Link className={username !== 'Administrador' ? `d-none justifyBetween` : `button`} to="register">Cadastrar novo usuário</Link>
                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="30706f" />
                    </button>
                </div>

            </header>

            <h1>Todos os usuários</h1>

            <ul>
                {
                    user.map(user => (

                        <li key={user.id}>
                            <strong>NOME COMPLETO:</strong>
                            <p>{user.name} {user.last_name}</p>

                            <strong>CPF ou CNPJ:</strong>
                            <p>{user.cpf}</p>

                            <strong>VALOR:</strong>
                            <p>{format(user.value)}</p>

                            <section>
                                <Link to={`/details/${user.id}`} className="back-link">
                                    Detalhes
                                    <FiArrowRight size={20} color="30706f" />
                                </Link>
                            </section>

                            <div className={username !== 'Administrador' ? `d-none` : ``}>
                                <button onClick={() => handleEdit(user.id)}>
                                    <FiEdit3 size={20} color="30706f" />
                                </button>
                                <button onClick={() => handleDelete(user.id)}>
                                    <FiTrash2 size={20} color="30706f" />
                                </button>
                            </div>
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}