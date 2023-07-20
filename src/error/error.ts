import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const handleError = (
    erro: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (erro instanceof AppError) {
        return res.status(erro.statusCode).json({ message: erro.message });
    }
    console.error(erro);
    return res.status(500).json({ message: erro.message })
}