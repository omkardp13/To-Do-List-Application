export interface Task {
  taskId: number;          
  userId: number;         
  title: string;           
  description: string;  
  isCompleted: boolean;    
  createdAt: Date;     
}