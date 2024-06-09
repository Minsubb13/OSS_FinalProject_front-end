// const host = "http://44.197.15.175:8080";
const host = "http://127.0.0.1:80";
const guestbookForm = document.getElementById("guestbook-form");
let guestbookEntries;

function getGuestbookEntries() {
  axios
    .get(`${host}/comment`)
    .then((response) => {
      console.log(response.data);
      renderGuestbookEntries(response.data);
    })
    .catch((error) => {
      console.error("Error fetching guestbook entries:", error);
    });
}

function renderGuestbookEntries(data) {
  guestbookEntries.innerHTML = "";
  if (data && data.comments && Array.isArray(data.comments)) {
    data.comments.forEach((entry) => {
      // renderGuestbookEntries 함수를 호출하면, 요소들을 받아 div,p요소로 guestbookEntries에 추가
      // div 요소 생성
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      // div요소 안에 p요소 생성
      const nameElement = document.createElement("p");
      nameElement.classList.add("name");
      nameElement.textContent = entry.name; // name
      commentDiv.appendChild(nameElement);

      const messageElement = document.createElement("p");
      messageElement.textContent = entry.comment; // comment
      commentDiv.appendChild(messageElement);

      guestbookEntries.appendChild(commentDiv);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", function () {
        deleteGuestbookEntry(entry.id);
      });

      commentDiv.appendChild(deleteBtn);
    });
  } else {
    console.error("Invalid response data:", data);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  guestbookEntries = document.getElementById("guestbook-entries");
  const guestbookForm = document.getElementById("guestbook-form");
  guestbookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addGuestbookEntry();
  });

  getGuestbookEntries();
});

function addGuestbookEntry() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  let guestbookData = {
    id: 0,
    name: name,
    comment: message,
  };

  if (name === "" || message === "") return;

  axios
    .post(`${host}/comment`, guestbookData)
    .then((response) => {
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
      getGuestbookEntries();
    })
    .catch((error) => {
      console.error("Error adding guestbook entry: ", error);
    });
}

function deleteGuestbookEntry(entryId) {
  axios
    .delete(`${host}/comment/${entryId}`)
    .then(function (response) {
      console.log("Guestbook entry deleted: ", response.data);
      getGuestbookEntries();
    })
    .catch(function (error) {
      console.error("Error deleting guestbook entry: ", error);
    });
}
