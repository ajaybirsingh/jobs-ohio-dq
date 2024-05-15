// set LeadsTableData
export const SetLeadsStorage = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value));
};
// get LeadsTableData
export const GetLeadsProfile = (items) => {
    return JSON.parse(localStorage.getItem(items) || null);
}
// set LeadsTableData
export const SetProspectStorage = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value));
};
// get LeadsTableData
export const GetProspectStorage = (item) => {
    return JSON.parse(localStorage.getItem(item) || null);
}
export const SetOktaAuthData = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value))
}
export const GetOktaAuthData = () => {
    return JSON.parse(localStorage.getItem("auth") || null);
}
export const setStatsData = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value))
}
export const GetStatsData = () => {
    return JSON.parse(localStorage.getItem("statsData") || null)
}

export const setLeadsFilterStatsData = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value))
}
export const GetLeadsFilterStatsData = () => {
    return JSON.parse(localStorage.getItem("filterstatscount") || null)
}
// for okta authentication
export const SetOktaIssuer = () => {
    return 'https://dev-50224363.okta.com/oauth2/default'
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email) => {
    return emailRegex.test(email);
}
// for api urls
// http://172.214.83.217:8000
export const APIUrlOne = () => {
    return 'http://172.214.83.217:8000'
}
export const APIUrlTwo = () => {
    return 'http://172.214.83.217:8001'
}
export const APIUrlThree = () => {
    return 'http://172.214.83.217:8002'
}
// for login user
export const SetUserId = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value))
}
export const GetUserId = () => {
    return localStorage.getItem('userId') || null
}
// export const ClientId = () => {
//     return '0oaez4a6k38GCrsto5d7'
// }
// export const RedirectUrl = () => {
//     return 'http://localhost:3000/login/callback'
// }