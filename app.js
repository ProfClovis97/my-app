let projects = [];

function addProject() {
  const projectName = document.getElementById('project-name').value;
  if (projectName === '') return;
  
  const project = {
    name: projectName,
    stages: []
  };
  
  projects.push(project);
  document.getElementById('project-name').value = '';
  renderProjects();
}

function addStage(projectIndex) {
  const stageName = prompt('Enter stage name:');
  if (stageName === null || stageName === '') return;

  projects[projectIndex].stages.push({ name: stageName, done: false });
  renderProjects();
}

function toggleStage(projectIndex, stageIndex) {
  projects[projectIndex].stages[stageIndex].done = !projects[projectIndex].stages[stageIndex].done;
  renderProjects();
}

function renderProjects() {
  const projectsDiv = document.getElementById('projects');
  projectsDiv.innerHTML = '';

  projects.forEach((project, projectIndex) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.name;
    projectDiv.appendChild(projectTitle);

    project.stages.forEach((stage, stageIndex) => {
      const stageDiv = document.createElement('div');
      stageDiv.className = 'stage';

      const stageName = document.createElement('input');
      stageName.type = 'text';
      stageName.value = stage.name;
      stageName.disabled = true;
      stageDiv.appendChild(stageName);

      const stageButton = document.createElement('button');
      stageButton.textContent = stage.done ? 'Undo' : 'Done';
      stageButton.className = stage.done ? 'done' : '';
      stageButton.onclick = () => toggleStage(projectIndex, stageIndex);
      stageDiv.appendChild(stageButton);

      projectDiv.appendChild(stageDiv);
    });

    const addStageButton = document.createElement('button');
    addStageButton.textContent = 'Add Stage';
    addStageButton.onclick = () => addStage(projectIndex);
    projectDiv.appendChild(addStageButton);

    projectsDiv.appendChild(projectDiv);
  });
}
