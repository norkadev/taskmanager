import * as mongoose from 'mongoose';
import Task from './task.interface';

const taskSchema = new mongoose.Schema({
    owner: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    name: String,
    priority: String,
    dueDate: Date
});

const taskModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema);

export default taskModel;