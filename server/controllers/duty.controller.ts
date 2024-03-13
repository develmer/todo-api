import { QueryResult } from "pg";
import { pool } from "../database/database.connection";
import { Request, Response } from "express";

export const getDuties = async (request: Request, response: Response): Promise<Response> => {
    try {
        const result: QueryResult = await pool.query('SELECT * FROM duties');

        if (!result.rowCount) return response.status(404).json("Data not found.");

        return response.status(200).json(result.rows);
    } catch (error: unknown) {
        return response.status(500).json("Something went wrong.");
    }
};

export const getDutyById = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);

        if (!result.rowCount) return response.status(404).json("Data not found.");

        return response.status(200).json(result.rows);
    } catch (error: unknown) {
        return response.status(500).json("Something went wrong.");
    }
};

export const createDuty = async (request: Request, response: Response): Promise<Response> => {
    let { name } = request.body;
    name = name.toLowerCase();

    if (!name) return response.json("Name is required.");

    try {
        const nameCheck: QueryResult = await pool.query('SELECT * FROM duties WHERE name = $1', [name]);
        if (nameCheck.rowCount) return response.status(400).json("The name already exist.");

        const result: QueryResult = await pool.query('INSERT INTO duties (name) VALUES ($1)', [name]);

        return response.status(201).json({
            message: "Duty successfully created",
            response: result.rowCount
        });
    } catch (error: unknown) {
        return response.status(500).json("Something went wrong.");
    }
}

export const updateDuty = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    let { name } = request.body;
    name = name.toLowerCase();

    if (!name) return response.json("Name is required.");

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        if (!result.rowCount) return response.status(404).json("Data not found.");

        const updateResult = await pool.query('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
        if (!updateResult.rowCount) return response.status(400).json("Data not found.");

        return response.status(200).json("Duty updated.");
    } catch (error: unknown) {
        return response.status(500).json("Something went wrong.");
    }
}

export const deleteDuty = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    try {
        const deleteResult: QueryResult = await pool.query('DELETE FROM duties WHERE id = $1', [id]);
        if (!deleteResult.rowCount) return response.status(404).json("Data not found.");

        return response.status(200).json('Duty deleted.');

    } catch (error: unknown) {
        return response.status(500).json("Something went wrong.");
    }
}