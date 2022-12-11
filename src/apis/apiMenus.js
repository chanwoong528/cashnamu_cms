
async function fetchGetMenusCMS() {
    try {


        const fetchMenus = await fetch("http://localhost:3001/menus")
        const data = await fetchMenus.json()
        return data;
    } catch (error) {
        console.warn("fetchGetMenusCMS[error]: ", error)
    }
};



export default { fetchGetMenusCMS };



// const fetchGetMenusCMS = async () => {
//     try {
//         const fetchMenus = await axios.get("../data/menu.json");
//         // return fetchMenus.data;
//         return fetchMenus;
//     } catch (error) { }
// };
// export { fetchGetMenusCMS };
