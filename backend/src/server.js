const app = require('./app');

const env = require('./config/env');
const connectDB = require('./config/db');

const startServer = async () => {
  try {
    await connectDB(env.mongoUri);

    app.listen(env.port, () => {
      console.log(`
🚀 Server running
🌍 Environment: ${env.nodeEnv}
🔌 Port: ${env.port}
`);
    });
  } catch (error) {
    console.error('Server startup failed', error);

    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);

  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);

  process.exit(1);
});

startServer();
