const bugForm = document.getElementById('bugForm');
const bugList = document.getElementById('bugList');
const search = document.getElementById('search');

let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

function renderBugs(filteredBugs = bugs) {
  bugList.innerHTML = '';
  filteredBugs.forEach((bug, index) => {
    const bugDiv = document.createElement('div');
    bugDiv.className = 'bug';
    bugDiv.innerHTML = `
      <div class="bug-header">
        <strong>${bug.title}</strong>
        <div class="bug-actions">
          <button onclick="editBug(${index})">✏️</button>
          <button onclick="deleteBug(${index})">🗑️</button>
        </div>
      </div>
      <p>${bug.description}</p>
      <small>Priority: ${bug.priority} | Status: ${bug.status}</small>
    `;
    bugList.appendChild(bugDiv);
  });
}

bugForm.onsubmit = (e) => {
  e.preventDefault();
  const bug = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: status.value
  };
  bugs.push(bug);
  localStorage.setItem('bugs', JSON.stringify(bugs));
  bugForm.reset();
  renderBugs();
};

function deleteBug(index) {
  bugs.splice(index, 1);
  localStorage.setItem('bugs', JSON.stringify(bugs));
  renderBugs();
}

function editBug(index) {
  const bug = bugs[index];
  title.value = bug.title;
  description.value = bug.description;
  priority.value = bug.priority;
  status.value = bug.status;
  bugs.splice(index, 1); // Remove old, add edited on submit
  renderBugs();
}

search.oninput = () => {
  const term = search.value.toLowerCase();
  const filtered = bugs.filter(b => b.title.toLowerCase().includes(term) || b.status.toLowerCase().includes(term));
  renderBugs(filtered);
};

renderBugs();
