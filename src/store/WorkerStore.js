import {makeAutoObservable} from "mobx"

export default class WorkerStore {
    constructor() {
        this._workers = []

        makeAutoObservable(this)
    }

    setWorkers(workers) {
        this._workers = workers
    }

    get workers() {
        return this._workers
    }
}