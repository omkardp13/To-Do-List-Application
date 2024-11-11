export interface Task {
  taskId: number;          // Task ID of type number
  userId: number;          // Foreign key linking to User ID         // User object for relational data
  title: string;           // Task title
  description: string;     // Task description
  isCompleted: boolean;    // Task completion status
  createdAt: Date;         // Task creation date
}
