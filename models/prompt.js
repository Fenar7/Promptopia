import mongoose, {Schema, model, models} from 'mongoose'

const PromptSchema = new Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        requried: [true, 'Prompt is requried']
    },
    tag: {
        type: String,
        required: [true,'tag is requried']
    }
})

const Prompt = models.Prompt || model ('Prompt',PromptSchema)

export default Prompt