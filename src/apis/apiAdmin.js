import { apiUrl } from "../common/Config";


async function fetchGetAdminItem(id) {

    try {
        const fetchGetAdminItem = await fetch(`${apiUrl}/adminUsers/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        const data = await fetchGetAdminItem.json()
        return data
    } catch (error) {
        console.warn("fetchGetAdminList[error]: ", error)
    }
}


async function fetchGetAdminList() {
    try {
        const fetchGetAdminList = await fetch(`${apiUrl}/adminUsers`)
        const data = await fetchGetAdminList.json()

        return data.filter((admin => admin.activate));
    } catch (error) {
        console.warn("fetchGetAdminList[error]: ", error)
    }
};
async function fetchPatchDeleteAdmin(id) {
    try {
        let params = { id, activate: false }
        const fetchPostDeleteAdmin = await fetch(`${apiUrl}/adminUsers/${id}`, {
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
    let params = { ...adminAuthData }
    try {
        const fetchPatchAuthSingleAdmin = await fetch(`${apiUrl}/adminUsers/${adminAuthData.id}`, {
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
async function fetchGetAllCategory() {
    try {
        const merchantCate = await fetch(`${apiUrl}/merchantCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const pointCate = await fetch(`${apiUrl}/pointCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const hotdealCate = await fetch(`${apiUrl}/hotdealCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let allCate = [];
        allCate.push({ title: "merchant", cate: await merchantCate.json() })
        allCate.push({ title: "point", cate: await pointCate.json() })
        allCate.push({ title: "hotdeal", cate: await hotdealCate.json() })
        // console.log(allCate)
        // const data = 
        return allCate;

    } catch (error) {

    }


}



export default { fetchGetAdminList, fetchPatchDeleteAdmin, fetchPatchAuthById, fetchGetAdminItem, fetchGetAllCategory };

