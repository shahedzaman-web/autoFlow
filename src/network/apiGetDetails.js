import baseApi from "../api/baseApi";

export const getProductDetails = async (id, token) => {
  try {
    const response = await baseApi.get(`/app/part/${id}`, {
      headers: { "Content-type": "application/json", Authorization: token },
    });

    if (response.status !== 200) {
      console.log("Something Went Wrong");
      alert("Something Went Wrong");
    } else {
      return response.data;
    }
  } catch (e) {
    alert("Something Went Wrong");

    console.log(e.response);
  }
};
