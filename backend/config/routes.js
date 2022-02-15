module.exports = app =>{
    app.route('/funcionarios')
        .post(app.api.funcionario.save)
        .get(app.api.funcionario.getAll)

    app.route('/funcionarios/:id')
        .put(app.api.funcionario.save) //passando o id vai editar o registro
        .get(app.api.funcionario.getById)
        .delete(app.api.funcionario.remove)
}