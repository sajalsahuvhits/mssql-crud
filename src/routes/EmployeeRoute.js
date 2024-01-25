import { Router } from "express";
import { addEditEmployee, deleteEmployee, getSingleEmployee, getEmployees } from "../controller/EmployeeController.js";

const EmployeeRouter = Router();
EmployeeRouter.route("/add-edit-employee").post(addEditEmployee)
EmployeeRouter.route("/get").get(getEmployees)
EmployeeRouter.route("/get-employee-by-id").post(getSingleEmployee)
EmployeeRouter.route("/delete").post(deleteEmployee)

export default EmployeeRouter;