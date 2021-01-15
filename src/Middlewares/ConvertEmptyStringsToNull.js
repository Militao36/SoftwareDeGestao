export default (request, response, next) => {
  if (Object.keys(request.body).length) {
    request.body = Object.assign(
      ...Object.keys(request.body).map(key => ({
        [key]: request.body[key] !== '' ? request.body[key] : null
      }))
    )
  }

  next()
}