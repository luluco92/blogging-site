async function newFormHandler(event) {
  event.preventDefault();
    const content = document.querySelector('textarea').value;
  document.querySelector('#displayerr').textContent = ""
if (content.trim() === "") {document.querySelector('#displayerr').textContent += "Content cannot be empty!";
return;}

// window.location gives us access to the URL. To pull the id out of the URL, We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Send fetch request to add a new comment
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if it is added, the page is reloaded
  if (response.ok) {
    document.querySelector('textarea').value = "";
    document.location.reload();
  } else {
    alert('Failed to add comment');
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
  