const securityLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();

  // Log the end of the request to capture status codes
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      console.warn(
        `[SECURITY ALERT] ${timestamp} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | IP: ${req.ip}`,
      );
    } else if (
      req.originalUrl.includes("admin") ||
      req.originalUrl.includes("login")
    ) {
      console.info(
        `[AUDIT] ${timestamp} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode}`,
      );
    }
  });
  next();
};

module.exports = { securityLogger };
