import TodoModel from "@/models/todo.models";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { title } = await req.json();
    if (!title) {
      console.log("title not found");
      return Response.json({ message: "title not found" }, { status: 400 });
    }
    const res = await TodoModel.findOneAndDelete({ title });

    if (!res) {
      console.log("title not found");
      return Response.json({ message: "title not found!" }, { status: 400 });
    }

    console.log("todo deleted successfully!");
    return Response.json(
      { message: "todo deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error ::", error.message);
    return Response.json(
      { message: "Error occured while deleting todo" },
      { status: 400 }
    );
  }
}
