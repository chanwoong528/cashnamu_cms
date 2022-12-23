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
async function fetchGetBankList() {
    try {
        const fetchGetBankList = await fetch(`${apiUrl}/bankNames`)
        const data = await fetchGetBankList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetBankList[error]: ", error)
    }
}



export default { fetchGetUserList, fetchGetBankList }