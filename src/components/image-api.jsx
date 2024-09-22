import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com/";

const API_KEY = "kWqpEwYiE-Cp6LGRv-dCdb0lkjA_T1dWD0j7W3SzjcA";

export const searchImg = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
      per_page: 15,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return {
    photos: response.data.results,
    totalPages: response.data.total_pages,
  };
};
