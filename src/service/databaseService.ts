import mongoose from "mongoose"
import config from "../config/config"



export default {
    connect: async () => {
        try {
            // Attempt to connect to the MongoDB database
            await mongoose.connect(config.DATABASE_URL as string);
            // Return a connection object for further logging if needed
            return mongoose.connection;            
        } catch (error) {
            throw error
            
        }
    }
}