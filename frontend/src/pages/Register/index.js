import React, { useState, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';

import './style.css'
import api from '../../services/api'

export default function Register() {

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [cel, setCel] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [cep, setCep] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const [cpf, setCpf] = useState('')
    const [value, setValue] = useState('')
    const [about, setAbout] = useState('')
    const [reason, setReason] = useState('')

    const history = useHistory()

    let id = +history.location.pathname.split('/')[2] || 0

    useEffect(() => {
        api.get(`/register/${id}`).then(res => {
            setName(res.data.name)
            setLastName(res.data.last_name)
            setEmail(res.data.email)
            setTel(res.data.tel)
            setCel(res.data.cel)
            setBirthDate(res.data.birth_date)
            setCep(res.data.cep)
            setUf(res.data.uf)
            setCity(res.data.city)
            setCpf(res.data.cpf)
            setValue(res.data.value)
            setAbout(res.data.about)
            setReason(res.data.reason)
        })
    }, [id]);

    async function handleUser(e) {
        e.preventDefault()

        if (uf > 2) {
            return alert('O campo uf tem que ser obtigatóriamente dois caracteres')
        }       

        const data = ({
            name,
            last_name,
            email,
            tel,
            cel,
            birth_date,
            cep,
            uf,
            city,
            cpf,
            value,
            about,
            reason
        })

        try {
            const res = await api.post('/register', data)
            alert(res.data.success)
            if (res.data.success !== 'Cpf já cadastrado') {
                history.push('/home')
            }
        } catch (err) {
            alert('erro ao cadastrar')
        }
    }

    async function handleEdit(e) {
        e.preventDefault()

        name.subname(0, 1).toUpperCase().concat(name.substring(1));
        last_name.sublast_name(0, 1).toUpperCase().concat(last_name.substring(1));
        const data = ({
            name,
            last_name,
            email,
            tel,
            cel,
            birth_date,
            cep,
            uf,
            city,
            cpf,
            value,
            about,
            reason
        })

        try {
            const res = await api.put(`/register/${id}`, data)
            alert(res.data.success)
            history.push('/home')
        } catch (err) {
            alert('erro ao cadastrar')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>{id > 0 ? 'Editar Usuário' : 'Cadastrar novo usuário'}</h1>
                    <p>Todos os campos são obrigatórios.</p>

                    <Link to="/home" className="back-link">
                        <FiArrowLeft size={16} color="30706f" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={id > 0 ? handleEdit : handleUser}>
                    <div className="input-group">

                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={last_name}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />

                    </div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <div className="input-group">

                        <InputMask
                            mask="+5\5 (99) 9999-9999"
                            type="text"
                            placeholder="Telefone"
                            value={tel}
                            onChange={e => setTel(e.target.value)}
                            required
                        />
                        <InputMask
                            mask="+5\5 (99) 99999-9999"
                            // defaultValue="+55"
                            type="text"
                            placeholder="Celular"
                            value={cel}
                            onChange={e => setCel(e.target.value)}
                            required
                        />

                    </div>
                    <div className="input-group">

                        <InputMask
                            mask="99/99/9999"
                            type="text"
                            placeholder="Data de nascimento"
                            value={birth_date}
                            onChange={e => setBirthDate(e.target.value)}
                            required
                        />
                        <InputMask
                            mask="99999-999"
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                            required
                        />

                    </div>
                    <div className="input-group">

                        <input
                            id="uf"
                            type="text"
                            placeholder="Estado"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />

                    </div>
                    <div className="input-group">

                        <InputMask
                            mask="999.999.999-99"
                            type="text"
                            placeholder="CPF ou CNPJ"
                            id="cpf"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Valor desejado"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required
                        />

                    </div>
                    <div className="input-group">

                        <select value={about} onChange={e => setAbout(e.target.value)}>
                            <option selected> Como você soube da Firgun?</option>
                            <option value="motivo1">Motivo 1</option>
                            <option value="motivo2">Motivo 2</option>
                        </select>

                        <select value={reason} onChange={e => setReason(e.target.value)}>
                            <option selected> Motivo de crédito?</option>
                            <option value="motivo1">Motivo 1</option>
                            <option value="motivo2">Motivo 2</option>
                        </select>
                    </div>


                    <button className="button" type="submit">{id > 0 ? 'Editar' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>
    )
}