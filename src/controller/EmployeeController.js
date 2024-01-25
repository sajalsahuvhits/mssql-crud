import { StatusCodes } from "http-status-codes";
import { ResponseMessages } from "../utils/ResponseMessages.js";
import { SendResponse } from "../utils/SendResponse.js";
import sql from "mssql";
const EMPLOYEE_TABLE_NAME = "employees";

export const addEditEmployee = async (req, res) => {
  try {
    const { id, name, email, contact } = req.body;
    if (id) {
      const findEmployeeQuery = `SELECT * FROM ${EMPLOYEE_TABLE_NAME} WHERE id <> ${id} AND email = '${email}'`;
      const findEmployee = await sql.query(findEmployeeQuery);
      console.log(findEmployee);
      if (findEmployee.recordset.length) {
        return SendResponse(
          res,
          StatusCodes.CONFLICT,
          ResponseMessages.EMPLOYEE_ALREADY_EXIST
        );
      }
      const updateQuery = `UPDATE ${EMPLOYEE_TABLE_NAME} SET name = '${name}', email = '${email}', contact = '${contact}' WHERE id = ${id}`;
      const result = await sql.query(updateQuery);
      if (result.rowsAffected) {
        SendResponse(
          res,
          StatusCodes.OK,
          ResponseMessages.EMPLOYEE_UPDATED,
          result
        );
      } else {
        SendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          ResponseMessages.EMPLOYEE_NOT_UPDATED
        );
      }
    } else {
      const findEmployeeQuery = `SELECT * FROM ${EMPLOYEE_TABLE_NAME} WHERE email = '${email}'`;
      const findEmployee = await sql.query(findEmployeeQuery);
      if (findEmployee.recordset?.length) {
        return SendResponse(
          res,
          StatusCodes.CONFLICT,
          ResponseMessages.EMPLOYEE_ALREADY_EXIST
        );
      }
      const insertQuery = `INSERT INTO ${EMPLOYEE_TABLE_NAME} (name, email, contact) VALUES ('${name}', '${email}', '${contact}')`;
      const result = await sql.query(insertQuery);
      SendResponse(
        res,
        StatusCodes.OK,
        ResponseMessages.EMPLOYEE_CREATED,
        result
      );
    }
  } catch (err) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [err.message]
    );
  }
};

export const getEmployees = async (req, res) => {
  try {
    const getQuery = `SELECT * FROM ${EMPLOYEE_TABLE_NAME}`;
    const result = await sql.query(getQuery);
    SendResponse(
      res,
      StatusCodes.OK,
      ResponseMessages.EMPLOYEE_FETCHED,
      result.recordset
    );
  } catch (error) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.body;
    const deleteQuery = `DELETE FROM ${EMPLOYEE_TABLE_NAME} WHERE id = ${empId}`;
    const result = await sql.query(deleteQuery);
    console.log(result);
    if (result.rowsAffected[0]) {
      SendResponse(res, StatusCodes.OK, ResponseMessages.EMPLOYEE_DELETED);
    } else {
      SendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.EMPLOYEE_NOT_DELETED
      );
    }
  } catch (error) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};

export const getSingleEmployee = async (req, res) => {
  try {
    const { empId } = req.body;
    console.log({ empId });
    const getQuery = `SELECT * FROM ${EMPLOYEE_TABLE_NAME} WHERE id = ${empId}`;
    const result = await sql.query(getQuery);
    if (result.recordset?.length) {
      SendResponse(
        res,
        StatusCodes.OK,
        ResponseMessages.EMPLOYEE_FETCHED,
        result.recordset
      );
    } else {
      SendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.EMPLOYEE_NOT_FOUND
      );
    }
  } catch (error) {
    console.log(error);
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};
