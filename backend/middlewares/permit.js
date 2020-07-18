const permit = permit => (req, res, next) => {
    if (!req.currentUser) return res.status(401).send({error: 'User is unauthenticated'});
    if (!req.currentUser.role === permit) return res.status(403).send({error: `You dont have "${permit}" permission!`});

    next();
};

module.exports = permit;