
const express = require('express')
// const fetch = require('fetch')
const mongoose = require('mongoose')
const fetch = require('node-fetch');

const { PORT, HEADER, FETCH_DATA_URL } = require('./config');
const connectDB = require('./config/db');
const allowCrossDomain = require('./midlewares/allowCrossDomain');
const ProductSchema = require('./models/Product');
const { convertStringToUTC } = require('./modules/convertStringToUTC');
const { fetchData } = require('./modules/fetchData');
const { fetchTotalData } = require('./modules/fetchTotalData');
const { removeVietnamese } = require('./modules/removeVietnamese');
const { stringToArray } = require('./modules/stringToArray');
const { urlSource } = require('./modules/urlSource');

const app = express();

app.use(express.json())
app.use(allowCrossDomain)

//connect DB
connectDB()


var data = {
  data : [],
  total : null
}
var merchants = ['shopee.vn', 'lazada.vn', 'tiki.vn']

//routes
app.get('/fetch', async (req, res) => {

  const limit =200 //max 200

  //fetch pages merchants
  const shopeePages = await fetchTotalData('shopee.vn', limit).then(data => data)
  // const lazadaPages = await fetchTotalData('lazada.vn', limit).then(data => data)
  // const tikiPages = await fetchTotalData('tiki.vn', limit).then(data => data)
  
  //fetchData các sàn: shopee mục 5911-5914 bị lỗi json
  fetchData('shopee.vn',limit, 1, shopeePages)
  //  fetchData('lazada.vn',limit, 1, lazadaPages)
  //  fetchData('tiki.vn',limit, 1, tikiPages)

  res.json(data)
})

app.get('/', async (req, res)=> {

  const products = await ProductSchema.find({})
  // res.send('get')
  res.json({
    success: true,
    data : products
  })
})

app.get('/search', async (req, res)=> {
  const params = req.query
  const {keyword, merchant} = params
  const arrayMerchants = stringToArray(merchant)

  const products = await ProductSchema
    .find(
      {'merchant': {$in: [...arrayMerchants]}, $text :{$search: removeVietnamese(keyword)}}, 
      {score: {$meta: 'textScore'}
    })
    .sort( { score: { $meta: "textScore" }} )

    res.json({
      success: true,
      data : products,  
  })
})

app.post('/create', async(req, res) => {
  const {
    sku,
    aff_link,
    image,
    desc,
    price,
    merchant,
    update_time,
  } = req.body

  const product = await ProductSchema.create({
    sku,
    aff_link,
    image,
    desc,
    price,
    merchant,
    update_time,
  }) 
  res.status(201).json(product)
})

app.listen(PORT, () => {
  console.log('server running ', PORT)
})