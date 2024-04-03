import express from "express"
import { createEmployee, getAllEmployee, getEmployee, deleteEmployee, updateEmployee } from "../controllers/employeeController.js"
import upload from "../multerConfig/storageConfig.js"

const router = express.Router()


router.route('/').post(upload.single('user_profile'), createEmployee).get(getAllEmployee)
router.route('/edit/:id').patch(upload.single('user_profile'), updateEmployee)
router.route('/:id').delete(deleteEmployee)
router.route('/userProfile/:id').get(getEmployee)

export default router