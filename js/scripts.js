const host = "http://127.0.0.1:80";
const guestbookForm = document.querySelector("#guestbook-form");
const guestbookEntries = document.querySelector("#guestbook-entries");

function getGuestbookEntries() {
  axios
    .get(`${host}/guestbook`)
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
    name: name,
    message: message,
  };

  axios
    .post(`${host}/guestbook`, entryData)
    .then((response) => {
      const entry = response.data;

      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.message}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-button");
      deleteBtn.textContent = "Delete";
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
    .delete(`${host}/guestbook/${entryId}`)
    .then(function (response) {
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
