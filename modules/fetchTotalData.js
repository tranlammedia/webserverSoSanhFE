const { default: fetch } = require("node-fetch")
const { HEADER } = require("../config")
const { urlSource } = require("./urlSource")

exports.fetchTotalData = async (merchant, limit) =>{
    const reponse = await fetch(urlSource(merchant, 1, 1), { method: 'GET', headers: HEADER})
    const data = await reponse.json()
    const page = await Math.ceil(data.total/limit)
    return page
}