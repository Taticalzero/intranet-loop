import jwt, { JwtPayload } from 'jsonwebtoken'

export function signJwt(payload: JwtPayload) {
  const secretKey = process.env.JWT_USER_ID_SECRET!
  const token = jwt.sign(payload, secretKey)
  return token
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_USER_ID_SECRET!
    const decoded = jwt.verify(token, secretKey)
    return decoded as JwtPayload
  } catch (e) {
    console.log(e)
    return null
  }
}
