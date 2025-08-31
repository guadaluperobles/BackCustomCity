import jwt from 'jsonwebtoken'

const authRequired = (req, res, next) => {
  const {token} = req.cookies;
  console.log(req)
  next();
}