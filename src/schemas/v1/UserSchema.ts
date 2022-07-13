//arrumar o telefone dps

import * as yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js' //validar o numero de telefone 
import {cpf} from 'cpf-cnpj-validator'

const register = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string(),
    gender: yup.mixed().oneOf(["Masculino", "Feminino", "Não Binario"]),
    // phone: yup.string().test("is-valid-mobile", "${path} is not a mobile number", (value)=>parsePhoneNumber(value, "BR").isValid()),
    zipcode: yup.string(),
    street: yup.string(),
    city: yup.string(),
    country:yup.string(),
    state: yup.string(),
    addressNumber: yup.number(),
    document: yup.string().test("is-valid-document", "${path} is not a valid CPF", (value: any)=>cpf.isValid(value)),
})

export {register}