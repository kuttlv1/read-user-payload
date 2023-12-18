import mongoose from 'mongoose';
const smsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    thread_id: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    dateSent: {
        type: Date,
    },
});
// Create the SMS model
const SmsModel = mongoose.model('Sms', smsSchema);
export default SmsModel;
