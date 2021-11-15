export const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
