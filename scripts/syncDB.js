require("dotenv").config();
const db = require("../models");

(async () => {
    try {
        console.log("sincronizando DB cn supabase...");
        await db.sequelize.sync({ alter: true });  // cambiar de force: true  por alter: true

        console.log(" tablas sincronizadas correctamente");
    } catch (error) {
        console.error("error al sincronizar con supabase, error:", error);
    } finally {
        await db.sequelize.close();
        console.log("conexion cerrada");
    }
})();