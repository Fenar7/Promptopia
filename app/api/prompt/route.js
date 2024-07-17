import {connectToDB} from '@utils/database'
import Prompt from '@models/prompt'
import { stringify } from 'postcss'

export const GET = async(request) => {
    res.setHeader('Cache-Control', 'no-store');
    try{
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts),{
            status:200
        })
    }catch(error){
        return new Response("Failed to fetch the data", {status: 500})
    }
}