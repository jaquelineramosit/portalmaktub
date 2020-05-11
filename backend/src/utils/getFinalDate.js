const dateFormat = require('dateformat');

module.exports =  function getFinalDate() {
    const today = new Date();
    const finalDate = new Date().setDate(today.getDate() + 3);
    return dateFormat(finalDate, "yyyy-mm-dd");
}