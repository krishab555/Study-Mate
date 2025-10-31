

export const authorizeRoles = (...allowedRoles) => {
  
  return (req, res, next) => {
     if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    console.log("User role from token:", req.user.role);

    const userRole = req.user.role?.name || req.user.role;
    const allowed = allowedRoles.map((r) => r.toLowerCase());
    
    console.log("User role from token:", userRole);
    console.log("Allowed roles:", allowed);

    if (!userRole || !allowed.includes(userRole.toLowerCase())) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // If role is allowed, continue
    next();
  };
};
