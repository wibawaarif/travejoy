const { app, connectDB, port } = require('./api/index')

//Connect to the database before listening
connectDB().then(() => {
  app.listen(process.env.PORT || port, () => {
      console.log("listening for requests");
  })
})
