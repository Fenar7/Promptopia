import {connectToDB} from '@utils/database'
import Prompt from '@models/prompt'
import { stringify } from 'postcss'

export const GET = async(request, {params}) => {
    try{
        console.log('api call trigeered #####')
        await connectToDB()

        const prompts = await Prompt.find({creator: params.id}).populate('creator')
        console.log(JSON.stringify(prompts))

        return new Response(JSON.stringify(prompts),{
            status:200
        })
    }catch(error){
        return new Response("Failed to fetch the data", {status: 500})
    }
}