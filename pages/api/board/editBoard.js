import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const {
      editBoard: { columns, name, _id },
    } = req.body;

    // const colNames = columns.map((col) => col.name);

    const result = await db.collection("public").update(
      { _id: ObjectId(_id) },
      {
        $set: {
          name: name,
        },
        // $set: {
        //   "columns.$[].name": columns.name,
        // },
      }
    );

    res.status(200);
    res.json({ editBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to edit board...sorry" });
  }
}
