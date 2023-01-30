async function putblog(x) {
const findid = x.parentElement.children[0].getAttribute("href").split("/");
 const id = findid[findid.length-1];
  document.location.replace('/editblog/' + id);
}

async function delblog(x) {
  
 const findid = x.parentElement.children[0].getAttribute("href").split("/");
 const id = findid[findid.length-1];

// linked to DELETE route in controller/api/blog-routes
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
    });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete blog');
  }
}