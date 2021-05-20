const jwt = require('jsonwebtoken');
const authConfig = process.env.GERANDO_TOKEN_LOGIN

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({not_provided: 'No token provided'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token malformatted'});

    jwt.verify(token, authConfig, (err, decoded) => {
        if (err) return res.status(401).send({inspired_session: 'Token invalided'});
  
        req.userId = decoded.id;

        return next();
    })
}