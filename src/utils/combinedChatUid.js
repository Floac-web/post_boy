


export const combinedChatUid = (uid1,uid2) => {
    return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1
}