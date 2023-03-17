import { AsyncEventEmitter } from "events-await"

const queueEmitter = new AsyncEventEmitter({prefix: "workflow-es"})

export { queueEmitter }
