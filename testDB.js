const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado correctamente a Supabase');
  } catch (error) {
    console.error('❌ Error al conectar:', error);
  } finally {
    await sequelize.close();
  }
})();
