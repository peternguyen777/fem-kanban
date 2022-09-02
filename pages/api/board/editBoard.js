import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();

    const result = await db.collection("public").deleteOne({ slug: body.slug });

    res.status(200);
    res.json({ editBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to edit board...sorry" });
  }
}
