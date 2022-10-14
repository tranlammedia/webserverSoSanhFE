var keyword = 'điện thoại redmi xiaomi'
var array = keyword.split(' ')

var result = array.flatMap(
    (v, i) => array.slice(i+1).map( w => `/${v} ${w}/`)
);

exports.stringToArray = (str) => {
 if(str.includes(' ')) {
    return str.split(' ')
 }
 if(str.includes(',')) {
    return str.split(',')
 }
 return [str]
}