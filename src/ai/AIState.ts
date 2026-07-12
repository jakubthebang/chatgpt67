export type AIStatus =
    | "idle"
    | "thinking"
    | "working"
    | "error";


export interface AIState {


status: AIStatus;


currentGoal?: string;


currentTask?: string;


progress:number;


}
