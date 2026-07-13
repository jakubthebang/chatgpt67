export type TaskStatus =
    | "waiting"
    | "running"
    | "completed"
    | "failed";

export interface Task {
    id: string;
    type: string;
    priority: number;
    status: TaskStatus;
    data?: any;
}
