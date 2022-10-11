// demo var update_time = '17-09-2022T01:30:16'

exports.convertStringToUTC= (update_time) => {
    var parts = update_time.split('-')
    parts2= parts[2].split('T')
    return new Date(`${parts2[0]}-${parts[1]}-${parts[0]}T${parts2[1]}`)
}