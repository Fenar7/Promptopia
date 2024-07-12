const mongoose = require('mongoose');
const { model, models, Schema } = mongoose;

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'] // Fixed typo
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'] // Fixed typo
    }
});

const Prompt = (models && models.Prompt) || model('Prompt', PromptSchema);

export default Prompt;
