export default function TaskHeader({ project, onProjectDelete }) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <header className="pb-4 mb-4 border-b-2 border-stone-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">
          {project.title}
        </h1>
        <button
          onClick={() => {
            onProjectDelete(project.title);
          }}
          className="text-stone-600 hover:text-red-500"
        >
          Delete
        </button>
      </div>
      <p className="text-stone-400 mb-4">{formattedDate}</p>
      <p className="text-stone-600 whitespace-pre-wrap">
        {project.description}
      </p>
    </header>
  );
}
