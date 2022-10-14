const { default: fetch } = require("node-fetch")
const { HEADER } = require("../config")
const ProductSchema = require("../models/Product")
const { convertStringToUTC } = require("./convertStringToUTC")
const { urlSource } = require("./urlSource")


async function fetchOnePage(merchant, limit, position, pages) {
    if(position <= 50 ) {
        const reponse = await fetch(urlSource(merchant, limit, position), { method: 'GET', headers: HEADER})
        try {
            const data = await reponse.json()
            dataCreateDB = data.data.map((data) => {
                var {
                  sku,
                  aff_link,
                  name,
                  image,
                  desc,
                  price,
                  merchant,
                  update_time,
                } = data
        
                return {
                  sku,
                  aff_link,
                  name,
                  image,
                  desc,
                  price,
                  merchant,
                  update_time: convertStringToUTC(update_time),
                }
              })
            await ProductSchema.create(dataCreateDB)
            console.log(merchant, 'page',position,'/', pages)
            position++
        } catch(err) {
            if(err.type == "invalid-json") {
                position++
            }
            console.log(err)
        }
        setTimeout(() => fetchOnePage(merchant, limit, position, pages), 12000)
    } else {
        console.log('finished:', merchant)
    }
}

exports.fetchData = async (merchant, limit, start, pages) => {
    fetchOnePage(merchant, limit, start, pages)
}

