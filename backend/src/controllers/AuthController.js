module.exports = {

    create(req, res) {
        const { username, password } = req.body
        username === 'adm' && password === '123' ? res.json({typeUser: "Administrador"}) : res.status(401).send()
        username === 'user' && password === '123' ? res.json({typeUser: "Usuário Comum"}): res.status(401).send()
    }
}