import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";
import { get } from "http";

export interface Project{
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}

export enum Priority{
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog"
}

export enum Status{
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed"
}

export interface User{
    userId: number;
    username: string;
    email: string;
    profilePictureUrl: string;
    cognitoId?: string;
    teamId?: number;
}



export interface Attachment{
    id: number;
    fileUrl: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
    
}

export interface Task{
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    tags: string;
    startDate: string;
    dueDate: string;
    points: number;
    projectId: number;
    authorUserId: number;
    assignedUserId: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export interface SearchResults{
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
}

export interface Team{
    teamId: number;
    teamName: string;
    productOwnerId: number;
    projectManagerId: number;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks", "SearchResults", "Users", "Teams"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "/projects",
            providesTags: ["Projects"],
        }),

        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "/projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),

        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `/tasks?projectId=${projectId}`,  // Destructure projectId
            providesTags: (result) =>
              result ? result.map(({ id }) => ({ type: "Tasks", id })) : [{ type: "Tasks" }],
          }),

        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),

        updateTaskStatus: build.mutation<Task, {taskId: number, status: string}>({
            query: ({taskId, status}) => ({
                url: `/tasks/${taskId}/status`,
                method: "PATCH",
                body: {status},
            }),
            invalidatesTags: (result, error, {taskId}) => [{type: "Tasks" as const, id: taskId}],
        }),

        getUsers: build.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),

        getTeams: build.query<Team[], void>({
            query: () => "/teams",
            providesTags: ["Teams"],
          }),

        search: build.query<SearchResults, string>({
            query: (query) => `search?query=${query}`,
          }),
    })
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery
} = api;