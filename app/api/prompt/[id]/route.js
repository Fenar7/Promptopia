// get read
//patch update
// delete to delete
import {connectToDB} from '@utils/database'
import Prompt from '@models/prompt'
import { stringify } from 'postcss'

export const GET = async(request, {params}) => {
    try{
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response("Prompt not found ",{status: 404})
        }else{
            return new Response(JSON.stringify(prompt),{status : 200})
        }
    }catch(error){
        return new Response("Failed to fetch the data", {status: 500})
    }
}

//update
export const PATCH = async(request, {params}) => {
    const{prompt,tag} = await request.json()
    try{
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt){
            return new Response("Prompt not found",{status: 404})
        }else{
            console.log('prompt udapted')
            existingPrompt.prompt = prompt
            existingPrompt.tag = tag
            await existingPrompt.save()
            return new Response(JSON.stringify(existingPrompt), {status: 200})
        }
    }catch(error){
        return new Response("Failed to update prompt", {status: 500})
    }
}

//delete
export const DELETE = async (request, {params}) => {
    try{
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted succesffully", {status: 200})
    }catch(error){
        return new Response("Failed to delete prompt",{status: 500})
    }
}