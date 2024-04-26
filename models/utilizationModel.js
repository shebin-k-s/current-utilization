import mongoose from "mongoose"

const utilizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    unitConsumed: {
        type: Number,
        required: true
    },

})

const Utilization = mongoose.model('Utilization', utilizationSchema);

export default Utilization