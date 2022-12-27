import { apiUrl } from "../common/Config";

async function fetchGetRewardUserList() {
    try {
        const fetchGetRewardUserList = await fetch(`${apiUrl}/rewards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetRewardUserList.json()
        return data;

    } catch (error) {
        console.warn("fetchGetRewardUserList[error]: ", error)

    }
}

async function fetchGetPurchasedItemList() {
    try {
        const fetchGetPurchasedItemList = await fetch(`${apiUrl}/purchasedItem`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetPurchasedItemList.json()
        return data;

    } catch (error) {
        console.warn("fetchGetPurchasedItemList[error]: ", error)

    }
}

export default { fetchGetRewardUserList, fetchGetPurchasedItemList }
