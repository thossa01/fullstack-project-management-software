import React, { use } from "react";
import { Task } from "@/state/api";
import Image from "next/image";
import { format } from "date-fns";
import { useAppSelector } from "@/app/redux";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="dark:bg-dark-secondary mb-3 rounded bg-white p-4 shadow dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={`/${isDarkMode ? "attachedWhite.png" : "attached.png"}`}
                  alt={task.attachments[0].fileName}
                  width={400}
                  height={200}
                  className="m2x-h-[40px] max-w-[40px] cursor-pointer rounded-t-md pb-2 pt-2"
                />
                <span className="items-center pt-2 text-sm text-gray-700 dark:text-white">
                  {task.attachments[0].fileName}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description || "No description"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Not set"}
      </p>
      <p>
        <strong>Assignee:</strong>
        {task.assignee ? task.assignee.username : "Not set"}
      </p>
    </div>
  );
};

export default TaskCard;
