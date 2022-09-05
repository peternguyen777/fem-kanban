import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function statusChange(req, res) {
  try {
    const { db } = await connectToDatabase();

    const { boardId, colId, taskId, colToId } = req.body;

    const result = await db
      .collection("public")
      .updateOne({ _id: ObjectId(boardId) }, [
        {
          $set: {
            columns: {
              $map: {
                input: "$columns",
                as: "column",
                in: {
                  $switch: {
                    branches: [
                      {
                        case: {
                          $eq: [
                            // ID of the column to move data to
                            ObjectId(colToId),
                            "$$column._id",
                          ],
                        },
                        then: {
                          $mergeObjects: [
                            "$$column",
                            {
                              tasks: {
                                $concatArrays: [
                                  "$$column.tasks",
                                  [
                                    {
                                      $function: {
                                        body: 'function(tasks) {if(!tasks._id) throw Error("[_id] is not valid!");return tasks;}',
                                        args: [
                                          {
                                            $reduce: {
                                              input: {
                                                $filter: {
                                                  input: "$columns",
                                                  as: "fromColumn",
                                                  cond: {
                                                    $eq: [
                                                      "$$fromColumn._id",
                                                      // ID of the data from which data is moved
                                                      ObjectId(colId),
                                                    ],
                                                  },
                                                },
                                              },
                                              initialValue: {},
                                              in: {
                                                $mergeObjects: [
                                                  "$$value",
                                                  {
                                                    $arrayElemAt: [
                                                      {
                                                        $filter: {
                                                          input: "$$this.tasks",
                                                          as: "tasks",
                                                          cond: {
                                                            $eq: [
                                                              "$$tasks._id",
                                                              // ID of the element to move
                                                              ObjectId(taskId),
                                                            ],
                                                          },
                                                        },
                                                      },
                                                      0,
                                                    ],
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                        lang: "js",
                                      },
                                    },
                                  ],
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        case: {
                          $eq: [
                            // ID of the column from which to move data
                            ObjectId(colId),
                            "$$column._id",
                          ],
                        },
                        then: {
                          $mergeObjects: [
                            "$$column",
                            {
                              tasks: {
                                $filter: {
                                  input: "$$column.tasks",
                                  as: "tasks",
                                  cond: {
                                    $ne: [
                                      "$$tasks._id",
                                      // ID of the data to move
                                      ObjectId(taskId),
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                    default: "$$column",
                  },
                },
              },
            },
          },
        },
      ]);

    res.status(200);
    res.json({ statusChange: result });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to change task status...sorry" });
  }
}
