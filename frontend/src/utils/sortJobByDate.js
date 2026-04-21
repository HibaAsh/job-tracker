export const sortJobByDate = (jobs) => {
  return [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date));
};
