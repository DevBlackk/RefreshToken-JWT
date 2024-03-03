import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }

  // Bearer d51731f140134a5cafd8e308fd3d75f7
  const [, token] = authToken.split(" ");

  try {
    verify(token, "d51731f1-4013-4a5c-afd8-e308fd3d75f7");

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid",
    });
  }
}
