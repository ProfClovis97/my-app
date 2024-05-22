function addProject() {
  const projectName = document.getElementById('project-name').value;
  if (projectName === '') return;

  const projectRef = window.database.ref('projects').push();
  projectRef.set({
    name: projectName,
    stages: []
  });

  document.getElementById('project-name').value = '';
}

function addStage(projectId) {
  const stageName = prompt('Enter stage name:');
  if (stageName === null || stageName === '') return;

  const stageRef = window.database.ref(`projects/${projectId}/stages`).push();
  stageRef.set({
    name: stageName,
    done: false
  });
}

function toggleStage(projectId, stageId, done) {
  const stageRef = window.database.ref(`projects/${projectId}/stages/${stageId}`);
  stageRef.update({
    done: !done
  });
}

function renderProjects() {
  const projectsDiv = document.getElementById('projects');
  projectsDiv.innerHTML = '';

  window.database.ref('projects').on('value', (snapshot) => {
    const projects = snapshot.val();
    projectsDiv.innerHTML = ''; // Limpar antes de adicionar novamente

    if (projects) {
      for (let projectId in projects) {
        const project = projects[projectId];
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.name;
        projectDiv.appendChild(projectTitle);

        for (let stageId in project.stages) {
          const stage = project.stages[stageId];
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
          stageButton.onclick = () => toggleStage(projectId, stageId, stage.done);
          stageDiv.appendChild(stageButton);

          projectDiv.appendChild(stageDiv);
        }

        const addStageButton = document.createElement('button');
        addStageButton.textContent = 'Add Stage';
        addStageButton.onclick = () => addStage(projectId);
        projectDiv.appendChild(addStageButton);

        projectsDiv.appendChild(projectDiv);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
