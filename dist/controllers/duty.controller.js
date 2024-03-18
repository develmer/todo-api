"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDuty = exports.updateDuty = exports.createDuty = exports.getDutyById = exports.getDuties = void 0;
const database_connection_1 = require("../database/database.connection");
const getDuties = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_connection_1.pool.query('SELECT * FROM duties');
        if (!result.rowCount)
            return response.status(404).json("Data not found.");
        return response.status(200).json(result.rows);
    }
    catch (error) {
        return response.status(500).json("Something went wrong.");
    }
});
exports.getDuties = getDuties;
const getDutyById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const result = yield database_connection_1.pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        if (!result.rowCount)
            return response.status(404).json("Data not found.");
        return response.status(200).json(result.rows);
    }
    catch (error) {
        return response.status(500).json("Something went wrong.");
    }
});
exports.getDutyById = getDutyById;
const createDuty = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = request.body;
    name = name.toLowerCase();
    if (!name)
        return response.json("Name is required.");
    try {
        const nameCheck = yield database_connection_1.pool.query('SELECT * FROM duties WHERE name = $1', [name]);
        if (nameCheck.rowCount)
            return response.status(400).json("The name already exist.");
        const result = yield database_connection_1.pool.query('INSERT INTO duties (name) VALUES ($1)', [name]);
        return response.status(201).json({
            message: "Duty successfully created",
            response: result.rowCount
        });
    }
    catch (error) {
        return response.status(500).json("Something went wrong.");
    }
});
exports.createDuty = createDuty;
const updateDuty = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    let { name } = request.body;
    name = name.toLowerCase();
    if (!name)
        return response.json("Name is required.");
    try {
        const result = yield database_connection_1.pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        if (!result.rowCount)
            return response.status(404).json("Data not found.");
        const updateResult = yield database_connection_1.pool.query('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
        if (!updateResult.rowCount)
            return response.status(400).json("Data not found.");
        return response.status(200).json("Duty updated.");
    }
    catch (error) {
        return response.status(500).json("Something went wrong.");
    }
});
exports.updateDuty = updateDuty;
const deleteDuty = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const deleteResult = yield database_connection_1.pool.query('DELETE FROM duties WHERE id = $1', [id]);
        if (!deleteResult.rowCount)
            return response.status(404).json("Data not found.");
        return response.status(200).json('Duty deleted.');
    }
    catch (error) {
        return response.status(500).json("Something went wrong.");
    }
});
exports.deleteDuty = deleteDuty;
