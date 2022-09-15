import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  await authService.signUp({ email, password });

  res.status(201).send("User created!");
}
