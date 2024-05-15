import express from "express";
import cors from "cors";
import multer from "multer";
import convertCsvToJson from "convert-csv-to-json";

const app = express();
const port = process.env.PORT ?? 3000;
const storage = multer.memoryStorage(); //Create storage
const upload = multer({ storage: storage }); //Upload storage in memory
let userData: Array<Record<string, string>> = [];

app.use(cors()); //Enable cors

//Endpoint to get the file
app.post("/api/files", upload.single("file"), async (req, res) => {
  //1. Extract the file from the request
  const { file } = req;
  //2. Validate that we have the file
  if (!file) {
    return res.status(500).json({ message: "File is required" });
  }
  //3. Validate the mimetype (csv)
  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "The file must be type csv" });
  }
  //4. Transform the buffer
  let json: Array<Record<string, string>> = [];
  try {
    const csv = Buffer.from(file.buffer).toString("utf-8");
    console.log(csv);
    //5. Transform the string to json
    json = convertCsvToJson.csvStringToJson(csv);
  } catch (error) {
    return res.status(500).json({ message: "Error transforming the file" });
  }
  //6.  Save the json to db (or memory)
  userData = json;
  //7. Return 200 with the message and the json
  return res
    .status(200)
    .json({ data: json, message: "El archivo se cargo correctamente" });
});

//Endpoint to get the file
app.get("/api/users", async (req, res) => {
  //1. Extract the param q? from the request
  const { q } = req.query;
  //2. Validate that we have the param q?
  if (!q) {
    return res.status(500).json({ message: "Param q not found" });
  }
  // Validate if the param q is an Array
  if (Array.isArray(q)) {
    return res
      .status(500)
      .json({ message: "The param q must not be an array of strings" });
  }
  //3. Filter the data with the query param
  const search = q.toString().toLowerCase();

  const filterData = userData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLocaleLowerCase().includes(search)
    );
  });
  //4. Return 200 with the filtered data
  return res.status(200).json({ data: filterData });
});

//Know where the server is executing
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`);
});
