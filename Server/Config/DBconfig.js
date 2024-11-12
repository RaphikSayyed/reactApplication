const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://sadmalearn2310:TMZ4MahDgmYWDMGr@cluster0.5yw5b.mongodb.net/studentDB?retryWrites=true&w=majority');
    // const connect = await mongoose.connect(`mongodb+srv://raphik2599:raphik2599@cluster0.njgnexl.mongodb.net/?retryWrites=true&w=majority`);
    console.log(
      "Database connected succefully: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;