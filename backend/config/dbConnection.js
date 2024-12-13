// const mongoose = require("mongoose");
// const colors = require("colors");

//  const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit(1); // Exit with a non-zero status code to indicate an error
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");
const colors = require("colors");

class DBConnection {
  constructor() {
    this.isConnected = false; // Track if the DB is already connected
  }

  // Method to connect to the database
  async connect() {
    if (this.isConnected) {
      console.log("MongoDB is already connected.".cyan.underline);
      return;
    }

    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.isConnected = true; // Set the connection flag to true once connected
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      console.error(`Error: ${error.message}`.red.bold);
      process.exit(1); // Exit with a non-zero status code to indicate an error
    }
  }

  // Method to disconnect from the database
  async disconnect() {
    if (!this.isConnected) {
      console.log("MongoDB is not connected.".yellow);
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("MongoDB disconnected.".cyan.underline);
    } catch (error) {
      console.error(`Error: ${error.message}`.red.bold);
    }
  }
}

module.exports = new DBConnection(); // Export the instance of the DBConnection class

