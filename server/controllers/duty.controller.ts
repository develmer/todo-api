import { Request, Response } from "express";

import { pool } from '../database/database';
import { QueryResult } from "pg";

export const getDuties = async (request: Request, response: Response): Promise<Response> => {
    try {
        const result: QueryResult = await pool.query('SELECT * FROM duties');

        if(!result.rowCount) return response.status(404).json('The server cannot find your request.');

        return response.status(200).json(result.rows);
    } catch(error: unknown) {
        console.log(error);
        return response.status(500).json('Something went wrong, Please call administrator.');
    }
};

export const getDutyById = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        
        if(!result.rowCount) return response.status(404).json(`The server cannot find your request.`);

        return response.status(200).json(result.rows);
    } catch(error: unknown) {
        console.log(error);
        return response.status(500).json('Something went wrong, Please call administrator.');
    }
};

export const createDuty = async (request: Request, response: Response): Promise<Response> => {
    const { name } = request.body;

    if(!name) return response.status(400).json('Incorrect request. Please, modify your request.')

    try {
        const result: QueryResult = await pool.query('INSERT INTO duties (name) VALUES ($1)', [name]);
        console.log(result.rows)
        return response.status(201).json({
            message: "Duty successfully created",
            body: {
                duties: {
                    name
                }
            }
        });
    } catch(error: unknown) {
        console.log(error);
        return response.status(500).json('Something went wrong, Please call administrator.');
    }
}

export const updateDuty = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;
    const { name } = request.body;

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        if(!result.rowCount) return response.status(404).json(`The server cannot find your request.`);
        
        const updateResult = await pool.query('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
        if(!updateResult.rowCount) return response.status(400).json('Incorrect request. Please, modify your request.')

        return response.status(200).json("Duty updated.");
    } catch(error: unknown) {
        console.log(error);
        return response.status(500).json('Something went wrong, Please call administrator.');
    }
}

export const deleteDuty = async (request: Request, response: Response): Promise<Response> => {
    const id = request.params.id;

    try {
        const result: QueryResult = await pool.query(`SELECT * FROM duties WHERE id = $1`, [id]);
        if(!result.rowCount) return response.status(404).json(`The server cannot find your request.`);

        const deleteResult: QueryResult = await pool.query('DELETE FROM duties WHERE id = $1', [id]);
        if(!deleteResult.rowCount) console.log('deleted');

        return response.status(200).json('Duty deleted.');

    } catch(error: unknown) {
        console.log(error);
        return response.status(500).json('Something went wrong, Please call administrator.');
    }
}