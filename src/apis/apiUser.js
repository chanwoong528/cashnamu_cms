import { apiUrl } from "../common/Config";



async function fetchGetUserList() {
    try {
        const fetchGetUserList = await fetch(`${apiUrl}/users`)
        const data = await fetchGetUserList.json()
        return data.filter((user => user.activate));
    } catch (error) {
        console.warn("fetchGetUserList[error]: ", error)
    }
}
async function fetchPatchUser(record) {
    let params = { ...record };
    try {
        const fetchPatchUser = await fetch(`${apiUrl}/users/${record.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        const data = await fetchPatchUser.json()
        return data;
    } catch (error) {
        console.warn("fetchPatchUser[error]: ", error)
    }
}
async function fetchPatchDeleteUser(id) {
    try {
        let params = { id, activate: false }
        const fetchPatchDeleteUser = await fetch(`${apiUrl}/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        const data = fetchPatchDeleteUser.json();
        return data;
    } catch (error) {
        console.warn("fetchPatchDeleteUser[error]: ", error)
    }
}

async function fetchGetBankList() {
    try {
        const fetchGetBankList = await fetch(`${apiUrl}/bankNames`)
        const data = await fetchGetBankList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetBankList[error]: ", error)
    }
}



export default { fetchGetUserList, fetchGetBankList, fetchPatchUser, fetchPatchDeleteUser }