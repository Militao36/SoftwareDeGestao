
export default (req, res, next) => {
  req.idEmpresa = 1;
  return next()
}