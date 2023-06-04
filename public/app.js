document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const titleElement = event.target.closest("li").firstElementChild;
    const currentTitle = titleElement.innerText;

    const res = prompt("Enter a new title", currentTitle);

    if (res === currentTitle || res === null) {
      return;
    } else {
      await edit(id, res);
      titleElement.innerText = res;
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, data) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: data }),
  });
}
