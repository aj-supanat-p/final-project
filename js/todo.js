document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    const taskContainer = document.getElementById("taskContainer");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskInput = document.getElementById("taskInput").value;
        const descriptionInput = document.getElementById("descriptionInput").value;
        const dueDateInput = document.getElementById("dueDateInput").value;
        const priorityInput = document.getElementById("priorityInput").value;

        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.innerHTML = `
            <h3>${taskInput}</h3>
            <p>${descriptionInput}</p>
            <p>Due Date: ${dueDateInput}</p>
            <p>Priority: ${priorityInput}</p>
            <button class="deleteButton">Delete</button>
        `;

        taskContainer.appendChild(newTask);
        form.reset();
    });

    taskContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteButton")) {
            event.target.parentElement.remove();
        }
    });
});
