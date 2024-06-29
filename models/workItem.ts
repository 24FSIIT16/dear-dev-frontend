export interface WorkItem {
  taskId: number;
  buttonLabel?: string;
}

export interface WorkItems {
  message: string[];
  WorkItem: WorkItem[];
}
