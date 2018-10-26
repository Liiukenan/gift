
export function requestApiUrl(apiName){
    console.log("has reward jid:" + window.jid + " lang:" + window.lang + " plat:" + plat)
    var api = '/ranking_activity/has_reward'
    let HOST = process.env.HOST;
    if (HOST === 'dev' || HOST === 'prod'){
        api = 'http://54.222.148.146:46000' + apiName
    }
    if (HOST === 'B0'){
        api = 'http://54.222.148.146:46000' + apiName
    } else if (HOST === 'B1'){
        api = 'http://vshow-api-ra.1-1.io' + apiName
    }
    return api
}

export function getCurrentJid(){
    var currentJid = "user_1021550@bj2.1-1.io";

    if (window.plat == "android" || window.plat == "ios"){
        currentJid = window.jid;
    }

    return currentJid
}

export function buildUserGiftTestData(){
    var data = {}
    data.jid = "user_1021550@bj2.1-1.io"
    data.gift_rate_score = 30
    data.gift_rate_require = 100
    data.bonus = 0
    return data
}

export function buildUserLuckDrawTestData(){
    var data = {}
    data.jid = "user_1021550@bj2.1-1.io"
    data.gift_name = 'gems'
    data.gift_type = 'gems'
    data.gift_num = 100
    return data
}

export function buildAnchorGiftTestData(){
    var data = {}
    data.jid = "user_1021550@bj2.1-1.io"
    data.gifts = []
    for(var index = 0 ; index<4;index++){
        var gift = {}
        gift.gift_id = index
        gift.gift_name = 'test ' + index
        gift.gift_rate_score = 80
        gift.gift_rate_require = 100 * index
        gift.could_get = 1
        data.gifts[index] = gift 
    }
    return data
}

export function buildAnchorLuckDrawTestData(){
    var data = {}
    data.jid = "user_1021550@bj2.1-1.io"
    data.gift_id = 1
    data.status = 1
    return data
}