// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//   const client = await MongoClient.connect(
//     "mongodb+srv://guptaabhishek1886:a1b7h7i0s1h3ek@cluster0.cd9v7gq.mongodb.net/todolist?retryWrites=true&w=majority"
//   );
//   const db = client.db();

//   const todoCollection = db.collection('todolist');
//   const result = await todoCollection.find().toArray();

//   res.status(200).json({ data: result })
// }
