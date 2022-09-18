import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await authService.signUp({ email, password });

  res.status(201).send(user);
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  const token = await authService.signIn(user);

  res.status(200).send(token);
}
