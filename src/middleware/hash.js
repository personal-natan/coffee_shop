const bcrypt = require("bcrypt");
const saltRounds = 10;

class HashPass {
  constructor() {
    this.hashValue = "";
    this.valid;
  }

  async hash(password) {
    this.hashValue = await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        return hash;
      })
      .catch((err) => console.error(err.message));
    return this.hashValue;
  }
  async validateUser(hash, password) {
    this.valid = await bcrypt
      .compare(password, hash)
      .then((res) => {
        return res; // return true
      })
      .catch((err) => console.error(err.message));
    return this.valid;
  }
}
module.exports = HashPass;
