module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // formats it as M/D/YYYY
 format_date: (date) => {
    return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },

  truncate: (blog) => {
    let j = blog.slice(0,100);
    if (j.length < blog.length) { j += "..." }
    return j;
  },
};
