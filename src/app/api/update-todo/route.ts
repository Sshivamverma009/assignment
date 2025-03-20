import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/apiResponse/apiResponse";
import TodoModel from "@/models/todo.models";

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { title, description } = await req.json();
    const { searchParams } = new URL(req.url);

    const preTitle = searchParams.get("title");
    console.log("pretitle", preTitle);

    const res = await TodoModel.findOneAndUpdate(
      { title : preTitle },
      { title, description },
    );

    console.log("res ::", res);

    if (!res) {
      console.log("some error occured while updating todo");
      // return ApiResponse(false, "some error occured while updating todo!");
      return Response.json(
        { message: "some error occured while updating todo!" },
        { status: 400 }
      );
    }

    console.log("todo updated successfully!");
    // return ApiResponse(true, "todo updated successfully!");
    return Response.json(
      { message: "todo updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("some error occured while updating todos!");
    // return ApiResponse(false, "some error occured while updating todos!");
    return Response.json({ message: "some error occured while updating todo" });
  }
}
