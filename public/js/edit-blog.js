async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#blog_title').value;
  const content = document.querySelector('#content').value;
document.querySelector('#displayerr').textContent = ""
if (title.trim() === "") {document.querySelector('#displayerr').textContent += "Title is required!";
return;}
if (content.trim() === "") {document.querySelector('#displayerr').textContent += "Content cannot be empty!";
return;}

// window.location gives us access to the URL. To pull the id out of the URL, We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // linked to PUT route in controller/api/blog-routes
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ok response causes redirect to id
  if (response.ok) {
    document.location.replace(`/my`);
  } else {
    alert('Failed to edit blog');
  }
}

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);
