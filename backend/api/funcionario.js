module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = async(req, res) =>{
        const funcionario = {...req.body}

        if(req.params.id) funcionario.id = req.params.id

        try{
            existsOrError(funcionario.nome, 'Nome não informado')
            existsOrError(funcionario.cargo, 'Cargo não informado')

        }catch(msg){
            return res.status(400).send(msg) //400 erro do lado do cliente
        }

        if(funcionario.id){
            app.db('funcionarios').update(funcionario).where({id: funcionario.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err)) //erro 500 servidor
        }
        else{
            app.db('funcionarios').insert(funcionario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getAll = (req, res) =>{
        app.db('funcionarios').select('id', 'nome', 'cargo')
            .then(funcionarios => res.json(funcionarios))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) =>{
        app.db('funcionarios').select('id', 'nome', 'cargo')
            .where({id: req.params.id})
            .first()
            .then(funcionario => res.json(funcionario))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) =>{
        try{
            const rowsDeleted = await app.db('funcionarios')
                .where({id: req.params.id}).del()
            try{
                existsOrError(rowsDeleted, 'Funcionario não encontrado')
            }catch(msg){
                return res.status(400).send(msg)
            }
            res.status(204).send()
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    return {save, getAll, getById, remove}
}