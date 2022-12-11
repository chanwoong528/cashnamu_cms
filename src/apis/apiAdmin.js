
async function fetchGetAdminList() {
    try {


        const fetchGetAdminList = await fetch("http://localhost:3001/adminUsers")
        const data = await fetchGetAdminList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetAdminList[error]: ", error)
    }
};
async function fetchPostDeleteAdmin(id) {
    try {
        const fetchPostDeleteAdmin = await fetch("http://localhost:3001/adminUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        })
    } catch (error) {

    }

}



export default { fetchGetAdminList, fetchPostDeleteAdmin };

