document.getElementById("more-info").addEventListener("click", function () {
  const additionalInfo = document.querySelector(".additional-info");
  if (additionalInfo.style.display === "none") {
    additionalInfo.style.display = "block";
  } else {
    additionalInfo.style.display = "none";
  }
});

document
  .getElementById("guestbook-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const timestamp = new Date().toLocaleString();

    const entry = document.createElement("li");
    entry.innerHTML = `<strong>${name}</strong> <em>${timestamp}</em><p>${message}</p><button class="delete-button">Delete</button>`;

    document.getElementById("guestbook-entries").appendChild(entry);

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    entry
      .querySelector(".delete-button")
      .addEventListener("click", function () {
        entry.remove();
      });
  });
