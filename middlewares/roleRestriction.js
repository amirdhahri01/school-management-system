const roleRestriction = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.userAuth?.role)) {
            next(new Error(`Access denied, ${req.userAuth?._role} only`));
        }
        next();
    }
}

export default roleRestriction