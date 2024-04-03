import Employee from "../models/employeeModel.js";
import moment from "moment"

const getAllEmployee = async (req, res) => {

    // search functionality here using query params
    const search = req.query.search || ""
    const sort = req.query.sort || ""
    // const page = req.query.page || 1
    // const ITEM_PER_PAGE = 5

    const query = {
        name: { $regex: search, $options: "i" }
    }

    try {
        // const skip = (page - 1) * ITEM_PER_PAGE // 1 * 7 = 7

        // const count = await Employee.countDocuments(query) // total data 

        const employee = await Employee.find(query)
            .sort({ createdAt: sort == "new" ? -1 : 1 })
        // .limit(ITEM_PER_PAGE)
        // .skip(skip)

        // const pageCount = Math.ceil(count / ITEM_PER_PAGE) // 8 / 7 = 2
        res.status(200).json({
            // Pagination: {
            //     count, pageCount
            // },
            status: "Success",
            employee
        })
    } catch (error) {
        res.status(200).json({ status: "Failure", msg: "Error Getting Employees" })
    }
}

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)

        if (!employee) {
            return res.status(404).json({ status: "Failure", msg: "Employee not found" })
        }

        res.status(200).json({ status: "Success", employee })
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ status: "Failure", msg: "Error getting employee" })
    }
}

const createEmployee = async (req, res) => {
    try {
        const { name, age, email, password } = req.body
        const file = req.file.filename

        if (!name || !age || !email || !password || !file) {
            return res.status(401).json({ status: "Failure", msg: "All inputs is required" })
        }

        const findEmployee = await Employee.findOne({ email: email })

        if (findEmployee) {
            return res.status(401).json({ status: "Failure", msg: "User already exists" })
        }

        const createdAt = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")

        const employee = await Employee.create({ name, age, email, password, image: file, createdAt })

        console.log(employee)

        res.status(201).json({ status: "Success", employee })
    } catch (error) {
        res.status(500).json({ status: "Failure", msg: "Error creating employee" })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: "Success", employee })
    } catch (error) {
        res.status(500).json({ status: "Failure", msg: "Error deleting employee" })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { name, age, email, password, image } = req.body
        const file = req.file ? req.file.filename : image

        const updatedAt = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")

        const employee = await Employee.findByIdAndUpdate(req.params.id, { name, age, email, password, image: file, updatedAt }, { new: true })

        res.status(201).json({ status: "Success", employee })
    } catch (error) {
        res.status(500).json({ status: "Failure", msg: "Error updating employee" })
    }
}

export { getEmployee, getAllEmployee, createEmployee, deleteEmployee, updateEmployee }