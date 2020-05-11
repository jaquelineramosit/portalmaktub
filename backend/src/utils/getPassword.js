const bcrypt = require('bcryptjs');

module.exports =  function getPassword( password ) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}