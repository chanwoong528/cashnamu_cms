import { apiUrl } from "../common/Config";

async function fetchGetFAQCategory() {
    try {
        const fetchGetFAQCategory = await fetch(`${apiUrl}/FAQCategory`);
        const data = await fetchGetFAQCategory.json();
        return data;
    } catch (error) {
        console.warn("fetchGetFAQCategory[error]: ", error);
    }
}
/*
Type for API
- FAQ=> "FAQ"
- notice=> "notice"
*/

async function fetchPatchBoardTypeById(type, record) {
    let params = { ...record }
    try {
        const fetchPatchBoardTypeById = await fetch(`${apiUrl}/${type}/${record.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        const data = fetchPatchBoardTypeById.json()
        return data;
    } catch (error) {
        console.warn(`fetchPatchBoardTypeById[error(${type})]: `, error);
    }
}
async function fetchDeleteBoardTypeById(type, id) {
    try {
        const fetchDeleteBoardTypeById = await fetch(`${apiUrl}/${type}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await fetchDeleteBoardTypeById.json();
        return data;
    } catch (error) {
        console.warn(`fetchDeleteBoardTypeById[error(${type})]: `, error);
    }
}


async function fetchGetBoardTypeList(type) {

    try {
        const fetchGetBoardTypeList = await fetch(`${apiUrl}/${type}`);
        const data = await fetchGetBoardTypeList.json();
        return data;
    } catch (error) {
        console.warn(`fetchGetBoardTypeList[error(${type})]: `, error);
    }
}
async function fetchGetBoardTypeById(type, id) {
    try {
        const fetchGetFAQById = await fetch(`${apiUrl}/${type}/${id}`);
        const data = await fetchGetFAQById.json();
        return data;
    } catch (error) {
        console.warn(`fetchGetBoardTypeById[error(${type})]: `, error);
    }
}

async function fetchPostBoardType(type, content) {
    try {
        const fetchPostBoardType = await fetch(`${apiUrl}/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        const data = fetchPostBoardType.json();
        return data;
    } catch (error) {
        console.warn(`fetchPostBoardType[error(${type})]: `, error);
    }
}





export default {
    fetchGetFAQCategory, fetchGetBoardTypeList, fetchGetBoardTypeById,//get
    fetchPatchBoardTypeById,//patch
    fetchDeleteBoardTypeById,//delete
    fetchPostBoardType//post
}; 