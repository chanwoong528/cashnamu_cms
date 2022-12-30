import { apiUrl } from "../common/Config";



async function fetchGetUserListByTerms(terms, dateType) {
    let queryString = `users?`
    if (terms.date) {
        queryString = queryString + `&${dateType}_gte=${terms.date[0]}&${dateType}_lte=${terms.date[1]}`
    }
    if (terms.userInfoCate) {
        queryString = queryString + `&${terms.userInfoCate}_like=${!terms.searchInfo ? "" : terms.searchInfo}`
    }
    if (terms.type) {
        queryString = queryString + `&type=${terms.type}`
    }
    try {
        const fetchGetUserListByTerms = await fetch(`${apiUrl}/${queryString}`)
        const data = await fetchGetUserListByTerms.json();
        return data.filter((user => user.activate));
    } catch (error) {
        console.warn("fetchGetUserListByTerms[error]: ", error)
    }
}
async function fetchGetUserList() {
    try {
        //TODO: have to have limit -> now does not have limit
        const fetchGetUserList = await fetch(`${apiUrl}/users`)
        const data = await fetchGetUserList.json()
        return data.filter((user => user.activate));
    } catch (error) {
        console.warn("fetchGetUserList[error]: ", error)
    }
}
async function fetchPatchUserList(records) {

    console.log("api>> ", records)
    try {
        const fetchPatchUserList = await records.map(async (user) => {
            return await fetch(`${apiUrl}/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

        })
        const data = await Promise.all([fetchPatchUserList]);
        return data;
    } catch (error) {
        console.warn("fetchPatchUser[error]: ", error)

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



export default { fetchGetUserList, fetchGetBankList, fetchPatchUser, fetchPatchDeleteUser, fetchGetUserListByTerms, fetchPatchUserList }