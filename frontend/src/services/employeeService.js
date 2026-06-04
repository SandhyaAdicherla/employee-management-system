import api from "./api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getEmployees = async () => {
  return await api.get("/employees", {
    headers: getHeaders()
  });
};

export const deleteEmployee = async (id) => {
  return await api.delete(
    `/employees/${id}`,
    {
      headers: getHeaders()
    }
  );
};
export const changePassword = async (
    data
) => {

    return await api.put(
        "/auth/change-password",
        data,
        {
           headers: getHeaders()
        }
    );

};