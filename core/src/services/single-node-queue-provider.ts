import { injectable, inject } from "inversify";
import { IQueueProvider, QueueType } from "../abstractions";
import { queueEmitter } from "./event-emitter"

var processQueue: Array<string> = [];
var publishQueue: Array<string> = [];

@injectable()
export class SingleNodeQueueProvider implements IQueueProvider {

    public async queueForProcessing(id: string, queue: any): Promise<void> {
        switch (queue) {
            case QueueType.Workflow:
                processQueue.push(id);
                break;
            case QueueType.Event:
                publishQueue.push(id);
                break;
        }
        queueEmitter.emit("queue")
    }

    public async dequeueForProcessing(queue: any): Promise<string> {
        switch (queue) {
            case QueueType.Workflow:
                return processQueue.shift();
            case QueueType.Event:
                return publishQueue.shift();
        }
        queueEmitter.emit("dequeue")
    }
}