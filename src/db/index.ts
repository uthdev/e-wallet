import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const MONGO_URI = <string>process.env.MONGO_URI;

export default async () => {
  
  const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI);  
      return console.info(`Successfully connected to database`);
    } catch (error) {
      console.error('Error connecting to database: ', error);
      return process.exit(1);  
    }
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};


// import User from './entities/User';
// import UserSession from './entities/UserSession'

// let connection: Connection;

// export const initConnection = async (): Promise<Connection> => {
//   connection = await createConnection({
//     type: "mongodb",
//     url: process.env.DATABASE_URL,
//     entities: [UserEntity, TeamEntity, FixtureEntity],
//   });
//   return connection;
// };

// const getConnection = () => connection



// export default getConnection