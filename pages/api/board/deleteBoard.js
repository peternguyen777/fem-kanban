import { connectToDatabase } from "../../../util/mongodb";

export default async function (req, res) {
  try {
    const { db } = await connectToDatabase();
    const body = await JSON.parse(req.body);

    const result = await db.collection("public").deleteOne({ slug: body.slug });

    res.status(200);
    res.json({ deleteBoard: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to delete board...sorry" });
  }
}
