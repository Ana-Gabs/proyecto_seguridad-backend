// ./controllers/logs_controller.js
const { db } = require('../config/firebase');

exports.getLogsByLevel = async (req, res) => {
  try {
    const logsSnap = await db.collection('logs').get();
    const logs = logsSnap.docs.map(doc => doc.data());

    const groupedByLevel = logs.reduce((acc, log) => {
      const level = log.logLevel || "unknown";
      if (!acc[level]) {
        acc[level] = 0;
      }
      acc[level] += 1;
      return acc;
    }, {});

    res.status(200).json(groupedByLevel); 
  } catch (error) {
    console.error("Error al obtener los logs por nivel:", error);
    res.status(500).json({ error: "Error al obtener los logs por nivel" });
  }
};

exports.getLogsByResponseTime = async (req, res) => {
  try {
    const logsSnap = await db.collection('logs').get();
    const logs = logsSnap.docs.map(doc => doc.data());

    const responseTimeStats = logs.reduce((acc, log) => {
      const time = log.responseTime || 0;
      const range = Math.floor(time / 1000);

      if (!acc[range]) {
        acc[range] = 0;
      }
      acc[range] += 1;
      return acc;
    }, {});

    res.status(200).json(responseTimeStats); 
  } catch (error) {
    console.error("Error al obtener los logs por tiempo de respuesta:", error);
    res.status(500).json({ error: "Error al obtener los logs por tiempo de respuesta" });
  }
};


exports.getLogsByStatus = async (req, res) => {
  try {
    const logsSnap = await db.collection('logs').get();
    const logs = logsSnap.docs.map(doc => doc.data());

    const groupedByStatus = logs.reduce((acc, log) => {
      const status = log.status || "unknown";
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status] += 1;
      return acc;
    }, {});

    res.status(200).json(groupedByStatus);
  } catch (error) {
    console.error("Error al obtener los logs por código de estado:", error);
    res.status(500).json({ error: "Error al obtener los logs por código de estado" });
  }
};

