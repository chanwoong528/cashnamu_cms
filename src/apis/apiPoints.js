
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
async function fetchGetPointItemList() {
    try {
        const fetchGetPointItemList = await fetch(`${apiUrl}/pointItems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetPointItemList.json()
        return data;
    } catch (error) {
        console.warn("fetchGetPointItemList[error]: ", error)
    }
}
async function fetchGetPointItemListByBrandCode(brandCode) {
    console.log("api>>> ", brandCode)
    try {
        const fetchGetPointItemListByBrandCode = await fetch(`${apiUrl}/pointItems?brandCode=${brandCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetPointItemListByBrandCode.json()
        console.log("api>>>   ", data)
        return data;
    } catch (error) {
        console.warn("fetchGetPointItemListByBrandCode[error]: ", error)
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
async function fetchGetPointShopById(id) {
    try {
        const fetchGetPointShopById = await fetch(`${apiUrl}/pointShops/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await fetchGetPointShopById.json()
        return data;
    } catch (error) {
        console.warn("fetchGetPointShopById[error]: ", error)
    }
}


async function fetchPostNewPointShop(record) {
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
async function fetchPatchPointShop(record) {
    try {
        const fetchPatchPointShop = await fetch(`${apiUrl}/pointShops/${record.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record)
        })
        const data = fetchPatchPointShop.json();
        return data;
    } catch (error) {

    } console.warn("fetchPatchPointShop[error]: ", error)

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


export default {
    fetchGetCategory, fetchGetPointItemList, fetchGetPointItemListByBrandCode, fetchGetPointShopList, fetchGetPointShopById, fetchGetBoughtCouponList,
    fetchPostNewPointShop,
    fetchPatchPointShop,
}