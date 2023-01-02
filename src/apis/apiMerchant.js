import { apiUrl } from "../common/Config";

async function fetchGetCategory() {
    try {
        const fetchGetBigCategory = await fetch(`${apiUrl}/merchantCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetBigCategory.json();
        return data;
    } catch (error) {
        console.warn("fetchGetBigCategory[error]: ", error)
    }
}
async function fetchGetMerchantsList() {
    try {
        const fetchGetMerchantsList = await fetch(`${apiUrl}/merchants`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetMerchantsList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetMerchantsList[error]: ", error)
    }
}

async function fetchPatchMerchantById(record) {
    try {
        const fetchPatchMerchantById = await fetch(`${apiUrl}/merchants/${record.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
        const data = await fetchPatchMerchantById.json()
        return data;
    } catch (error) {
        console.warn("fetchPatchMerchantById[error]: ", error)
    }
}
async function fetchPostNewMerchant(record) {

    try {
        const fetchPostNewMerchant = await fetch(`${apiUrl}/merchants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
        const data = fetchPostNewMerchant.json();
        return data;
    } catch (error) {
        console.warn("fetchPostNewMerchant[error]: ", error)
    }
}

export default { fetchGetCategory, fetchGetMerchantsList, fetchPatchMerchantById, fetchPostNewMerchant }