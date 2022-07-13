//https://jsonapi.org/format/#errors-processing ver dps e atualizar

class Errors {
    static lastId = 0;
    id;    

    constructor(){
        this.id = ++Errors.lastId
    }

    createError(_title: string, _detail: string, _status: number){
        return {
            id: this.id,
            title: _title,
            detail: _detail,
            status: _status,
        }
    }
}

export const errCreateProduct = new Errors().createError("Falha no cadastro", "Um erro ocorreu ao cadastrar um produto", 500)

export const errGetProducts = new Errors().createError("Falha na requisição", "Ocorreu um erro ao receber o(s) produto(s)", 500)

export const errUpdateProduct = new Errors().createError("Falha na requisição", "Um erro ocorreu ao editar um produto", 500)

export const errDeleteProduct = new Errors().createError("Falha na requisição", "Um erro ocorreu ao deletar um produto", 500)

export const errProductsNotFound = new Errors().createError("Falha na requisição", "Nenhum produto foi encontrado", 404)

export const errCreateUser = new Errors().createError("Falha no cadastro", "Um erro ocorreu ao cadastrar um usuario", 500)

export const errGetUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao receber o(s) usuário(s)", 500)

export const errUpdateUser = new Errors().createError("Falha na requisição", "Um erro ocorreu ao editar um usuário", 500)

export const errDeleteUser = new Errors().createError("Falha na requisição", "Um erro ocorreu ao deletar um usuário", 500)

export const errUserNotFound = new Errors().createError("Falha na requisição", "Nenhum usuário foi encontrado", 404)

export const errUserAlreadyExists = new Errors().createError("Falha na requisição", "Este e-mail ja está cadastrado.", 500)