import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://guptaabhishek1886:a1b7h7i0s1h3ek@cluster0.cd9v7gq.mongodb.net/todolist?retryWrites=true&w=majority"
    );
    const db = client.db();

    const todoCollection = db.collection("todolist");

    try {
      const obj = new ObjectId(data._id);
      
      const filter = { _id: obj };

      const updatedData = {
        $set: {
          title: data.title,
          isCompleted: data.isCompleted,
        },
      };
      const result = await todoCollection.updateOne(filter, updatedData);

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Document not found" });
      } else {
        res
          .status(200)
          .json({ message: "Successfully updated!", data: result });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      client.close();
    }
  }
}

export default handler;
