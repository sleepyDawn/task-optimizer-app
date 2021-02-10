const selectUsers = (users, { text }) =>
  users
    .filter((user) => user.userName.toLowerCase().includes(text.toLowerCase()))
    .sort((a, b) => a.userName - b.userName);

export { selectUsers as default };
