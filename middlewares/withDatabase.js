import { connect, connection } from 'mongoose';

const withDatabase = (handler) => async (req, res) => {
  if (connection.readyState === 0) {
    try {
      await connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Failed to connect to database',
        details: ex.message,
      });
    }
  }

  return handler(req, res);
};

export default withDatabase;
