// ./utils/logger.js
// ./utils/logger.js
const { db } = require("../config/firebase");
const os = require("os");

/**
 * Registra una acción en la colección "logs" de Firestore.
 * @param {Object} req - Objeto de solicitud HTTP para obtener IP y User-Agent.
 * @param {Object} res - Objeto de respuesta HTTP para medir el tiempo de respuesta.
 * @param {string} email - Correo del usuario relacionado con la acción.
 * @param {string} action - Acción realizada (ejemplo: "login", "register", etc.).
 * @param {string} logLevel - Nivel de log ("info", "warn", "error").
 */
const logAction = async (req, res, email, action, logLevel = "info") => {
  try {
    const startTime = process.hrtime(); // Inicia el temporizador

    res.on("finish", async () => {
      const diff = process.hrtime(startTime); // Obtiene el tiempo transcurrido
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6; // Convierte a ms

      await db.collection("logs").add({
        email,
        action,
        logLevel, // Nivel de log
        timestamp: new Date(),
        ip: req.ip || "Unknown",
        userAgent: req.headers["user-agent"] || "Unknown",
        referer: req.headers["referer"] || "Unknown",
        origin: req.headers["origin"] || "Unknown",
        method: req.method || "Unknown",
        url: req.originalUrl || "Unknown",
        status: res.statusCode, // Código de estado de la respuesta
        responseTime: responseTime.toFixed(2), // Tiempo de respuesta en ms
        protocol: req.protocol || "Unknown",
        hostname: os.hostname(), // Nombre del servidor
        environment: process.env.NODE_ENV || "development",
        nodeVersion: process.version,
        pid: process.pid,
      });
    });
  } catch (error) {
    console.error("Error al registrar log:", error);
  }
};

module.exports = { logAction };
