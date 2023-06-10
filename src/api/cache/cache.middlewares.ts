import * as jwtService from "../../services/jwt/jwt.service";

export const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const { payload } = jwtService.decodeJWT(token);
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
