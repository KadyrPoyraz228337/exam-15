const permit = role => (req, res, next) => {
    if (!req.currentUser) return res.status(401).send({error: 'User is unauthenticated'});
    if (!req.currentUser.role === role) return res.status(403).send({message: `You are not ${role}`});

    next();
};

module.exports = permit;