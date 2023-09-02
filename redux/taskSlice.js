import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload)
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(item => item.id !== action.payload.id)
        },
        markTaskCompleted(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            if(newTasks[currentIndex].completed !== true) {
                newTasks[currentIndex].progress = 100;
            }
            
            newTasks[currentIndex].completed = newTasks[currentIndex].completed === true ? false : true;
            state.tasks = newTasks;
        },
        markTaskImportant(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            newTasks[currentIndex].important = newTasks[currentIndex].important === true ? false : true;
            state.tasks = newTasks;
        },
        resetData(state, action) {
            state.tasks = [];
        },
        editTask(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            newTasks[currentIndex] = action.payload.task;
            state.tasks = newTasks;
        },
        addProgress(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            if( newTasks[currentIndex].progress < 100) {
                newTasks[currentIndex].progress += 5;
            }
            state.tasks = newTasks;
        },
        minusProgress(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            if( newTasks[currentIndex].progress > 0) {
                newTasks[currentIndex].progress -= 5;
            }
            state.tasks = newTasks;
        },
        changeDueDate(state, action) {
            const newTasks = state.tasks;
            const currentIndex = newTasks.findIndex(task => task.id === action.payload.id)
            newTasks[currentIndex].dueDate = action.payload.date;
            state.tasks = newTasks;
        }
    }
})

export const taskReducer = taskSlice.reducer
export const taskAction = taskSlice.actions