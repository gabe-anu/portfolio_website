import PROJECTS_DATA from './projects.js';

const PROJECTS_JSON = JSON.parse(PROJECTS_DATA);



function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const projectsContainer = document.getElementById("projects-container");

function addProjectsToPage(projects) {
    for (let i = 0; i < projects.length; i++){
        let div = document.createElement("div");
        div.classList.add("projects-card");
        div.innerHTML = `
            <img class="project-img" src="${projects[i].img}" />
            <h1 class="project-name">${projects[i].name}</h1>
            <h2 class="project-text">Languages: ${projects[i].languages}</h2>
            <h2 class="project-text">Frameworks: ${projects[i].frameworks}</h2>
            <h2 class="project-text">Status: ${projects[i].status}</h2>
            <div class="project-buttons">
                <a href="${projects[i].sourceUrl}" target="_blank" class="project-btn source-btn">Source</a>
                <a href="${projects[i].demoUrl}" target="_blank" class="project-btn demo-btn">Live Demo</a>
            </div>
        `;
        projectsContainer.append(div);
    }
}
addProjectsToPage(PROJECTS_JSON);

function showAllprojects() {
    deleteChildElements(projectsContainer);
    addProjectsToPage(PROJECTS_JSON); // shows all projects
}

function filterInProgressOnly() {
    deleteChildElements(projectsContainer);
    let inProgressProjects = PROJECTS_JSON.filter(project => project.status === "In Progress");
    addProjectsToPage(inProgressProjects);
}

function filterCompletedOnly() {
    deleteChildElements(projectsContainer);
    let completedProjects = PROJECTS_JSON.filter(project => project.status === "Completed");
    addProjectsToPage(completedProjects);
}

// Match these IDs to your HTML
const inProgressBtn = document.getElementById("in-progress-btn");
const completedBtn = document.getElementById("completed-btn");
const allBtn = document.getElementById("all-btn");

inProgressBtn.addEventListener("click", filterInProgressOnly);
completedBtn.addEventListener("click", filterCompletedOnly);
allBtn.addEventListener("click", showAllprojects);

const projectsSection = document.getElementById("projects-description");
const filterButtons = [inProgressBtn, completedBtn, allBtn];

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        projectsSection.scrollIntoView({ behavior: "smooth" });
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Use it on page load
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('gallery-header');
    typeWriter(header, 'Welcome', 150);
});