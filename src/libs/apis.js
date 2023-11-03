export const getAllUsers = async (page) => {
    let res = await fetch(`https://consultants365.net/apis/getUsers.php?page=${page}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const getOneUser = async (uniqId) => {
    let res = await fetch(`https://consultants365.net/apis/getOneUser.php?uniqId=${uniqId}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const searchUsers = async (search) => {
    let res = await fetch(`https://consultants365.net/apis/searchUsers.php?search=${search}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const deleteUser = async (userId) => {
    let res = await fetch(`https://consultants365.net/apis/deleteUser.php?userId=${userId}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const getAllConversation = async (page) => {
    let res = await fetch(`https://consultants365.net/apis/getChats.php?page=${page}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const searchChats = async (search) => {
    let res = await fetch(`https://consultants365.net/apis/searchChats.php?search=${search}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const deleteChat = async (chatId) => {
    let res = await fetch(`https://consultants365.net/apis/deleteChat.php?chatId=${chatId}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const getOneChat = async (chatID) => {
    let res = await fetch(`https://consultants365.net/apis/getConversation.php?chatId=${chatID}`);
    res = res.ok ? await res.json() : null
    return res;
}


export const chartData = async () => {
    let res = await fetch(`https://consultants365.net/apis/chartReport.php`);
    res = res.ok ? await res.json() : null
    return res;
}

export const reportData = async () => {
    let res = await fetch(`https://consultants365.net/apis/report.php`);
    res = res.ok ? await res.json() : null
    return res;
}

export const login = async (email) => {
    let res = await fetch(`https://consultants365.net/apis/login.php?email=${email}`);
    res = res.ok ? await res.json() : null
    return res;
}

export const otp = async (email, otp) => {
    let res = await fetch(`https://consultants365.net/apis/checkOtp.php?otp=${otp}&email=${email}`);
    res = res.ok ? await res.json() : null
    return res;
}





