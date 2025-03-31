export interface Task {
    created?: string,
    description: string,
    id?: number,
    status: 'pending' | 'progress' | 'completed',
    title: string,
    updated?: string,
    user_email?: string
}

export interface ResponseTask {
    
}