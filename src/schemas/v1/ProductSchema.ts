//arrumar o telefone dps

import * as yup from 'yup'

const create = yup.object().shape({
    name: yup.string().required().min(3),
    price: yup.number().required(),
    category: yup.string().required(),
    amount_stored: yup.number(),
    photo: yup.string()
})

export {create}