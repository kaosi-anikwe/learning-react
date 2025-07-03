import Tasks from "./Tasks";
import TaskHeader from "./TaskHeader";

export default function Project({
  project,
  onTaskSave,
  onTaskDelete,
  onProjectDelete,
}) {
  return (
    <div className="w-[35rem] mt-16">
      <TaskHeader project={project} onProjectDelete={onProjectDelete} />
      <Tasks
        tasks={project.tasks}
        title={project.title}
        onTaskSave={onTaskSave}
        onTaskDelete={onTaskDelete}
      />
    </div>
  );
}
