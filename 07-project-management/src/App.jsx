import { useState } from "react";
import NoProjects from "./components/NoProjects";
import ProjectForm from "./components/ProjectForm";
import SideMenu from "./components/SideMenu";
import Project from "./components/Project";

function App() {
  const [projects, setProjects] = useState([]);
  const [currentProjectTitle, setCurrentProjectTitle] = useState(null);
  const [creatingProject, setCreatingProject] = useState(false);

  const currentProject = projects.find(
    (project) => project.title === currentProjectTitle
  );

  function handleProjectSelect(title) {
    setCurrentProjectTitle(title);
    setCreatingProject(false);
  }

  function handleCreateProjectClick() {
    setCreatingProject(true);
  }

  function handleCancelCrateProject() {
    setCreatingProject(false);
  }

  function handleProjectSave(newProject) {
    setProjects((currProjects) => {
      return [...currProjects, newProject];
    });
    handleProjectSelect(newProject.title);
    setCreatingProject(false);
  }

  function handleAddTask(taskTitle, task) {
    setProjects((currProjects) => {
      const project = currProjects.find((proj) => proj.title === taskTitle);
      const projIdx = currProjects.indexOf(project);
      currProjects[projIdx].tasks.push(task);
      return currProjects;
    });
  }

  function handleTaskDelete(taskTitle, task) {
    setProjects((currProjects) => {
      const project = currProjects.find((proj) => proj.title === taskTitle);
      const projIdx = currProjects.indexOf(project);
      const taskIdx = currProjects[projIdx].tasks.indexOf(task);
      currProjects[projIdx].tasks.splice(taskIdx, 1);
      return currProjects;
    });
  }

  function handleProjectDelete(taskTitle) {
    setProjects((currProjects) =>
      currProjects.filter((proj) => proj.title !== taskTitle)
    );
    setCurrentProjectTitle(null);
  }

  let content;

  if (!currentProject && !creatingProject) {
    content = <NoProjects onCreateProjectClick={handleCreateProjectClick} />;
  } else if (currentProjectTitle && !creatingProject) {
    content = (
      <Project
        project={currentProject}
        onTaskSave={handleAddTask}
        onTaskDelete={handleTaskDelete}
        onProjectDelete={handleProjectDelete}
      />
    );
  } else if (creatingProject) {
    content = (
      <ProjectForm
        onProjectCreateCancel={handleCancelCrateProject}
        onProjectSave={handleProjectSave}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideMenu
        projects={projects}
        onProjectClick={handleProjectSelect}
        onProjectCreateClick={handleCreateProjectClick}
        selectedProject={currentProjectTitle}
      />
      {content}
    </main>
  );
}

export default App;
