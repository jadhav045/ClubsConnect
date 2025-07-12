



// Notification Schema
const notificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    type: {
        type: String,
        enum: ['event_created', 'registration_confirmation', 'event_reminder', 'event_cancelled', 'certificate_ready', 'feedback_request', 'approval_required'],
        required: true
    },
    channel: {
        type: String,
        enum: ['email', 'sms', 'push', 'in_app'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: mongoose.Schema.Types.Mixed, // additional data for the notification
    status: {
        type: String,
        enum: ['pending', 'sent', 'delivered', 'failed', 'read'],
        default: 'pending'
    },
    scheduledTime: Date,
    sentTime: Date,
    deliveredTime: Date,
    readTime: Date,
    retryCount: {
        type: Number,
        default: 0
    },
    errorMessage: String
}, {
    timestamps: true
});

notificationSchema.index({ recipient: 1, status: 1, 'scheduledTime': 1 });




const Notification = mongoose.model('Notification', notificationSchema);
