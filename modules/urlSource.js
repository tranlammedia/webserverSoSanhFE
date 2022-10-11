const { FETCH_DATA_URL } = require("../config")

exports.urlSource = (merchant, limit, page) => {
    return `${FETCH_DATA_URL}?domain=${merchant}&limit=${limit}&page=${page}`
}