import { Priority, Status, useCreateTaskMutation } from '@/state/api';
import { formatISO } from 'date-fns';
import React from 'react'
import Modal from '../Modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    id?: string | null;
}

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState<Status>(Status.ToDo);
    const [priority, setPriority] = React.useState<Priority>(Priority.Backlog);
    const [tags, setTags] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [authorUserId, setAuthorUserId] = React.useState("");
    const [assignedUserId, setAssignedUserId] = React.useState("");
    const [projectId, setProjectId] = React.useState("");
    
    const handleSubmit = async () => {
        if (!title || !authorUserId || !(id !== null || id !== undefined || projectId)) {
            return;
        }

        const formattedStartDate = formatISO(new Date(startDate), { representation: "complete" });
        const formattedDueDate = formatISO(new Date(dueDate), { representation: "complete" });

        await createTask({
            title,
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate,
            dueDate: formattedDueDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assignedUserId),
            projectId: id !== null ? Number(projectId) : undefined,
        });
    };

    const isFormValid = () => {
        return title && authorUserId && (id !== null  || projectId);
    };

    const inputStyles =
        "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
    const selectStyles =
        "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
    <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select 
          className={selectStyles}
          value={status}
          onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}>
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>

            <select 
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}>
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>     
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`bg-blue-primary hover:ng-blue-600 focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </Modal>

  )
}

export default ModalNewTask