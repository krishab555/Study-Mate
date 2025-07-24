

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user should be set by authentication middleware (e.g., authenticateUser)
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    // If role is allowed, continue
    next();
  };
};
