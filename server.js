const app = require("./app");
const db = require("./models");

(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log(" Conectado y sincronizado con Supabase.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error(" Error conectando a Supabase:", error);
  }
})();
