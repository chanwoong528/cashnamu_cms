
async function fetchGetAdminList() {
    try {


        const fetchGetAdminList = await fetch("http://localhost:3001/adminUsers")
        const data = await fetchGetAdminList.json()
        console.log(data)
        return data.filter((admin => admin.activate !== "N"));
    } catch (error) {
        console.warn("fetchGetAdminList[error]: ", error)
    }
};
async function fetchPatchDeleteAdmin(id) {
    try {
        let params = { id, activate: "N" }
        const fetchPostDeleteAdmin = await fetch(`http://localhost:3001/adminUsers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)

        })
        const data = fetchPostDeleteAdmin.json()
        return data;
    } catch (error) {
        console.warn("fetchPostDeleteAdmin[error]: ", error)
    }

}
async function fetchPatchAuthById(adminAuthData) {
    let params = { adminAuthData }
    console.log("api", adminAuthData)
    try {
        const fetchPatchAuthSingleAdmin = await fetch(`http://localhost:3001/adminUsers/${adminAuthData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        const data = fetchPatchAuthSingleAdmin.json()

        return data

    } catch (error) {
        console.warn("fetchPatchAuthById[error]: ", error)
    }

}




export default { fetchGetAdminList, fetchPatchDeleteAdmin, fetchPatchAuthById };

