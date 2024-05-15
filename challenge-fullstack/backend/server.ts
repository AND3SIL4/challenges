import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors()) //Enable cors

//Endpoint to get the file
app.post('/api/files', async (req, res) => {
  //1. Extract the file from the request
  //2. Validate that we have the file
  //3. Validate the mimetype (csv)
  //4. Transform the buffer
  //5. Transform the string to csv
  //6.  Save the json to db (or memory)
  //7. Return 200 with the message and the json
  return res.status(200).json({ data: [], message: 'El archivo se cargo correctamente'})
})

//Endpoint to get the file
app.get('/api/users', async (req, res) => {
  //1. Extract the param q? from the request
  //2. Validate that we have the param q?
  //3. Filter the data with the query param
  //4. Return 200 with the filtered data
  return res.status(200).json({ data: []})

})



//Know where the server is executing
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})





