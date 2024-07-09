import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log("Error getting prompt: ", err.message);
    return new Response("Failed to get the prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag, isPublic } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById({ _id: params.id });

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.isPublic = isPublic;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    console.log("Error updating prompt: ", err.message);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    console.log("Error deleting prompt: ", err.message);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
