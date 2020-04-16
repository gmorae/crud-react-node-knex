const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const register = await connection('register').select('*');
        return res.json(register);
    },

    async indexId(req, res) {
        const { id } = req.params

        const user = await connection('register')
            .where('id', id)
            .select('*')
            .first()

        if (!user) {
            return res.status(400).json({ error: 'Não foi encontrado usuário com esse id' })
        }

        return res.json(user)
    },

    async create(req, res) {
        const { name, last_name, email, tel, cel, birth_date, cep, city, uf, cpf, value, about, reason } = req.body;

        if (!name || !last_name || !email || !tel || !cel || !birth_date || !cep || !city || !uf || !cpf || !value || !about || !reason) {
            return res.status(400).json({ error: 'Existe campos vazios' })
        }

        const resultCpf = await connection('register')
            .where('cpf', cpf)
            .select('cpf')
            .first()

        if (resultCpf) {
            return res.json({ success: 'Cpf já cadastrado' });
        } else {
            await connection('register').insert({
                name,
                last_name,
                email,
                tel,
                cel,
                birth_date,
                cep,
                city,
                uf,
                cpf,
                value,
                about,
                reason
            });

            return res.json({ success: 'Usuário cadastrado com sucesso' });
        }

    },

    async update(req, res) {
        const { id } = req.params;
        const { name, last_name, email, tel, cel, birth_date, cep, city, uf, cpf, value, about, reason } = req.body;

        await connection('register')
            .where({ id: id })
            .update({
                name,
                last_name,
                email,
                tel,
                cel,
                birth_date,
                cep,
                city,
                uf,
                cpf,
                value,
                about,
                reason
            });

        return res.json({ success: 'Usuário editado com sucesso' });
    },

    async delete(req, res) {
        const { id } = req.params

        await connection('register').where('id', id).delete()

        return res.status(204).send()
    }

};