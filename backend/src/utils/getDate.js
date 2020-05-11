const dateFormat = require('dateformat');

module.exports =  function getDate() {
    return dateFormat(new Date(), "yyyy-mm-dd");
}