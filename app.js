
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


class LocalStorage {
	static getDataFromLS() {
		let reminderList;
		if (localStorage.getItem("reminderList") === null) {
			reminderList = [];
		} else {
			reminderList = JSON.parse(localStorage.getItem("reminderList"));
		}

		return reminderList;
	}

	static addReminderListToLS(reminder) {
		const reminders = LocalStorage.getDataFromLS();

		reminders.push(reminder);
		localStorage.setItem("reminderList", JSON.stringify(reminders));
	}

	static addRemindersFromLS() {
		const addReminders = LocalStorage.getDataFromLS();
		addReminders.forEach((addReminder) => {
			const ui = new UI();
			ui.addReminderToList(addReminder);
		});
	}

	static deleteReminderFromLS(title) {
		const reminders = LocalStorage.getDataFromLS();

		reminders.forEach((reminder, index) => {
			if (reminder.title === title) {
				reminders.splice(index, 1);
			}
		});

		localStorage.setItem("reminderList", JSON.stringify(reminders));
	}
}


const form = document.getElementById("mainForm");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	let [title, description] = [
		document.querySelector("#title").value,
		document.querySelector("#description").value,
	];

	
	const reminder = new Reminder(title, description);

	
	const ui = new UI();

	ui.addReminderToList(reminder);
	ui.clearFields();
	LocalStorage.addReminderListToLS(reminder);
});


const table = document.querySelector(".table");
table.addEventListener("click", function (e) {
	const target = e.target;
	const title =
		target.parentElement.previousElementSibling.previousElementSibling
			.textContent;
	if (target.className === "fa fa-check") {
		target.parentElement.style.backgroundColor = "#3b3939";
		setTimeout(() => {
			const targetBody = target.parentElement.parentElement;
			targetBody.remove();
		}, 700);
	}
	LocalStorage.deleteReminderFromLS(title);
});


document.addEventListener("DOMContentLoaded", LocalStorage.addRemindersFromLS);