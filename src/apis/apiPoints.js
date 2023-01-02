
import { apiUrl } from "../common/Config";

async function fetchGetCategory() {
    try {
        const fetchGetBigCategory = await fetch(`${apiUrl}/pointCategory`, {
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
async function fetchGetPointShopList() {
    try {
        const fetchGetPointShopList = await fetch(`${apiUrl}/pointShops`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetPointShopList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetPointShopList[error]: ", error)
    }
}


async function fetchPostNewPointShop(record) {
    console.log("api: ", record)
    try {
        const fetchPostNewPointShop = await fetch(`${apiUrl}/pointShops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
        const data = fetchPostNewPointShop.json();
        return data;
    } catch (error) {
        console.warn("fetchPostNewPointShop[error]: ", error)
    }
}
async function fetchGetBoughtCouponList() {
    try {
        const fetchGetBoughtCouponList = await fetch(`${apiUrl}/boughtCoupons`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetBoughtCouponList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetBoughtCouponList[error]: ", error)
    }
}
async function fetchGetCouponListByTerm(term) {

}


export default { fetchGetCategory, fetchPostNewPointShop, fetchGetPointShopList, fetchGetBoughtCouponList }