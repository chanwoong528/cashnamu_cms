import { apiUrl } from "../common/Config";



async function fetchGetUserList() {
    try {
        const fetchGetUserList = await fetch(`${apiUrl}/users`)
        const data = await fetchGetUserList.json()
        console.log(data)
        return data.filter((user => user.activate));
    } catch (error) {
        console.warn("fetchGetUserList[error]: ", error)
    }

}



export default { fetchGetUserList }