//src/siswa-validation.js
import Joi from "joi";

//1. READ : Endpoint : GET /api/siswa

//2. READ : Endpoint : GET /api/siswa/:id
//validasi apakah id > angka, positive, required(wajib ada)
export const getSiswaValidation = Joi.number().positive().required();

//3. CREATE : Endpoint : POST /api/siswa
//validasi Create
export const createSiswaValidation = Joi.object({
  //string, max100, required
  first_name: Joi.string().max(100).required(),
  //string, max100, opsional(boleh tdk ada)
  last_name: Joi.string().max(100).optional(),
  //email, max200, opsional
  email: Joi.string().max(200).email().optional(),
  //string, max20, opsional
  phone: Joi.string().max(20).optional()
});

//4. DELETE : Endpoint : DELETE /api/siswa/:id
//validasi id = validasi get by id
export const delsiswaValidation = getSiswaValidation

//5. UPDATE : Endpoint : PUT /api/siswa/:id
export const updateSiswaValidation = Joi.object({
  //validasi id > angka, positive, required(wajib ada)
  id: Joi.number().positive().required(),
  //string, max100, required
  first_name: Joi.string().max(100).required(),
  //string, max100, opsional(boleh tdk ada)
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional()
});