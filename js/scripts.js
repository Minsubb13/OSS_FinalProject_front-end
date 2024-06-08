const host = "http://44.197.15.175:8080";
const guestbookForm = document.querySelector("#guestbook-form");
const guestbookEntries = document.querySelector("#guestbook-entries");

function getGuestbookEntries() {
  axios
    .get(`${host}/comment`)
    .then((response) => {
      renderGuestbookEntries(response.data);
    })
    .catch((error) => {
      console.error("Error fetching guestbook entries: ", error);
    });
}

function renderGuestbookEntries(entries) {
  guestbookEntries.innerHTML = "";
  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.message}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", function () {
      deleteGuestbookEntry(entry.id);
    });

    li.appendChild(deleteBtn);
    guestbookEntries.appendChild(li);
  });
}

function addGuestbookEntry(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (name === "" || message === "") return;

  const entryData = {
    id: Date.now().toString(), // 고유한 ID 생성
    comment: message,
  };

  axios
    .post(`${host}/comment`, entryData)
    .then((response) => {
      const entry = response.data;

      const li = document.createElement("li");
      li.textContent = `${name}: ${message}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-button");
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", function () {
        deleteGuestbookEntry(entry.id);
      });

      li.appendChild(deleteBtn);
      guestbookEntries.appendChild(li);

      guestbookForm.reset();
    })
    .catch((error) => {
      console.error("Error adding guestbook entry: ", error);
    });
}

function deleteGuestbookEntry(entryId) {
  axios
    .delete(`${host}/comment/${entryId}`)
    .then(function (response) {
      console.log("Guestbook entry deleted successfully");
      getGuestbookEntries();
    })
    .catch(function (error) {
      console.error("Error deleting guestbook entry: ", error);
    });
}

guestbookForm.addEventListener("submit", addGuestbookEntry);

window.addEventListener("DOMContentLoaded", function () {
  getGuestbookEntries();
});

const moreInfoBtn = document.querySelector("#more-info");
const additionalInfo = document.querySelector(".additional-info");

moreInfoBtn.addEventListener("click", function () {
  if (additionalInfo.style.display === "none") {
    additionalInfo.style.display = "block";
  } else {
    additionalInfo.style.display = "none";
  }
});
