import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function dndBoard(req, res) {
  try {
    const { db } = await connectToDatabase();

    const { dndBoard } = req.body;

    // const result = await db.collection("public").updateOne(
    //   { _id: ObjectId(_id) },
    //   {
    //     $set: {
    //       name: name,
    //       columns: columns,
    //     },
    //   }
    // );

    res.status(200);
    res.json({ dndBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to dnd board...sorry" });
  }
}
