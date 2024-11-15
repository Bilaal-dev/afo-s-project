class Reminder {
	constructor(title, description) {
	  this.title = title;
	  this.description = description;
	}
  }
  
  class UI {
	addReminderToList(reminder) {
	  const table = document.querySelector(".table");
	  const tableList = document.createElement("ul");
	  tableList.setAttribute("class", "table-list");
	  tableList.innerHTML = `
		<li>${reminder.title}</li>
		<li>${reminder.description}</li>
		<li class="icon-list">
		   <i class="fa fa-check"></i>
		</li>
	  `;
  
	  table.appendChild(tableList);
	}
  
	clearFields() {
	  document.querySelector("#title").value = "";
	  document.querySelector("#description").value = "";
	}
  }
  
  // Fetch all reminders from the backend on page load
  document.addEventListener("DOMContentLoaded", async () => {
	try {
	  const response = await fetch("http://localhost:5000/api/reminders");
	  const reminders = await response.json();
  
	  reminders.forEach((reminder) => {
		const ui = new UI();
		ui.addReminderToList(reminder);
	  });
	} catch (error) {
	  console.error("Error fetching reminders:", error);
	}
  });
  
  const form = document.getElementById("mainForm");
  
  form.addEventListener("submit", async function (e) {
	e.preventDefault();
  
	const [title, description] = [
	  document.querySelector("#title").value,
	  document.querySelector("#description").value,
	];
  
	const reminder = new Reminder(title, description);
	const ui = new UI();
  
	try {
	  const response = await fetch("http://localhost:5000/api/reminders", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(reminder),
	  });
  
	  if (response.ok) {
		ui.addReminderToList(reminder);
		ui.clearFields();
	  } else {
		console.error("Error saving reminder");
	  }
	} catch (error) {
	  console.error("Error:", error);
	}
  });
  
  const table = document.querySelector(".table");
  
  table.addEventListener("click", async function (e) {
	const target = e.target;
	const title =
	  target.parentElement.previousElementSibling.previousElementSibling
		.textContent;
  
	if (target.className === "fa fa-check") {
	  target.parentElement.style.backgroundColor = "#3b3939";
  
	  try {
		const response = await fetch(
		  `http://localhost:5000/api/reminders/${title}`,
		  {
			method: "DELETE",
		  }
		);
  
		if (response.ok) {
		  setTimeout(() => {
			const targetBody = target.parentElement.parentElement;
			targetBody.remove();
		  }, 700);
		} else {
		  console.error("Error deleting reminder");
		}
	  } catch (error) {
		console.error("Error:", error);
	  }
	}
  });
  