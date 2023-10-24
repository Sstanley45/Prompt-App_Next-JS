import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response(`Prompt with Id ${params.id} Not Found`, {
        status: 404,
      });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response(`prompt with id ${params.id} Not found`, {
        status: 404,
      });
    }

    //update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("error updating Prompt");
  }
};


export const DELETE = async (request, {params}) => {
    try {
        //MUST CONNECT TO DB EACH AND EVERY TIME PERFORMING A REQUEST
        await connectDB();

         const prompt = await Prompt.findById(params.id).populate("creator");
         if (!prompt)
           return new Response(`Prompt with Id ${params.id} Not Found`, {
             status: 404,
           });
        
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
        
        
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}