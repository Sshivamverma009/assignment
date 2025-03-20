import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/models/todo.models";
import { ApiResponse } from "@/apiResponse/apiResponse";
import { todo } from "node:test";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const todos = await TodoModel.find();
    console.log("Response ::", todos);
    if (!todos || todos.length <= 0) {
      console.log("no todo found");
      // return ApiResponse(false, "no todo found");
      return Response.json({ message: "no todo found!" }, { status: 500 });
    }
    console.log("todos fetched!");
    // return ApiResponse(true, " todos fetched successfully", todos);
    // return todos;
    return Response.json(
      { message: "todos fetched successfully!", todos },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("some error occured while fetching todos");
    // return ApiResponse(false, error.message);
    return Response.json(
      { message: "some error occured while fetching todos!" },
      { status: 400 }
    );
  }
}
