import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const id = req.body.id;

    const client = await MongoClient.connect(
      "mongodb+srv://guptaabhishek1886:a1b7h7i0s1h3ek@cluster0.cd9v7gq.mongodb.net/todolist?retryWrites=true&w=majority"
    );
    const db = client.db();

    const todoCollection = db.collection("todolist");

    try {
      const obj = new ObjectId(id);
      const filter = { _id: obj }; 

      const result = await todoCollection.deleteOne(filter);

      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Document not found" });
      } else {
        console.log(result);
        res.status(200).json({ message: "Successfully deleted todo!", _id: id });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      client.close();
    }
  }
}

export default handler;
