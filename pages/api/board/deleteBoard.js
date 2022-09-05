import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function deleteBoard(req, res) {
  try {
    const { db } = await connectToDatabase();
    const id = await JSON.parse(req.body);

    const result = await db
      .collection("public")
      .deleteOne({ _id: ObjectId(id) });

    res.status(200);
    res.json({ deleteBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to delete board...sorry" });
  }
}
