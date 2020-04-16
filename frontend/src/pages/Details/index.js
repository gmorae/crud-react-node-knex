import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory, Link } from "react-router-dom";

import './style.css'
import api from "../../services/api";

export default function Details() {
    const [user, setUser] = useState([])

    const history = useHistory()
    let id = +history.location.pathname.split('/')[2]

    useEffect(() => {
        api.get(`/register/${id}`).then(res => {
            setUser(res.data)
        })
    });

    return (
        <div className="details-container">
            <div className="content">
                <section>

                    <h1>Listar usuário <br /> {user.name} {user.last_name}</h1>

                    <Link to="/home" className="back-link">
                        <FiArrowLeft size={16} color="30706f" />
                        Voltar para home
                    </Link>
                </section>
                <ul>
                    <li key={user.id}>
                        <div className="group">

                            <strong>NOME COMPLETO:</strong>
                            <p>{user.name} {user.last_name}</p>

                            <strong>CPF ou CNPJ:</strong>
                            <p>{user.cpf}</p>

                            <strong>VALOR:</strong>
                            <p>{user.value}</p>

                            <strong>E-MAIL:</strong>
                            <p>{user.email}</p>

                            <strong>TELEFONE:</strong>
                            <p>{user.tel}</p>

                            <strong>CELULAR:</strong>
                            <p>{user.cel}</p>

                            <strong>DATA DE ANIVERSÁRIO:</strong>
                            <p>{user.birth_date}</p>

                        </div>
                        <div className="group">

                            <strong>CEP:</strong>
                            <p>{user.cep}</p>

                            <strong>CIDADE:</strong>
                            <p>{user.city}</p>

                            <strong>UF:</strong>
                            <p>{user.uf}</p>

                            <strong>CPF:</strong>
                            <p>{user.cpf}</p>

                            <strong>VALOR:</strong>
                            <p>{user.value}</p>

                            <strong>SOBRE:</strong>
                            <p>{user.about}</p>

                            <strong>MOTIVO:</strong>
                            <p>{user.reason}</p>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}