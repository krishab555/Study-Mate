

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
     const userRole = req.user.role?.name || req.user.role; // fallback if not populated

     console.log("User role from token:", userRole);
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // If role is allowed, continue
    next();
  };
};
