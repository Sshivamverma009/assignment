import TodoModel from "@/models/todo.models";
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/apiResponse/apiResponse";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      console.log("Title and Description are required");
      // return ApiResponse(false, "Title and Description is required");
      return Response.json(
        { message: "Title and Description is Required" },
        { status: 400 }
      );
    }
    console.log("title ::", title, "description ::", description);
    const existingOne = await TodoModel.findOne({ title });
    if (existingOne) {
      console.log("This task is already exist, please enter by different name");
      // return ApiResponse(
      //   false,
      //   "This task is already exist, please enter by different name"
      // );
      return Response.json(
        { message: "todo exist, add by different name" },
        { status: 400 }
      );
    }

    const newTask = new TodoModel({
      title,
      description,
      date: Date.now(),
    });

    await newTask.save();

    console.log("Todo added successfully");
    // return ApiResponse(true, "Todo added successfully");
    return Response.json(
      { message: "todo added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("some error occured while adding todo");
    // return ApiResponse(false, error.message);
    return Response.json(
      { message: "Error occured while adding todo" },
      { status: 400 }
    );
  }
}
