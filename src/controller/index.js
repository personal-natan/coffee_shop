class CRUD {
  constructor(model, req, res) {
    this.model = model;
    this.req = req;
    this.res = res;
    this.result = "";
  }

  async getById(id) {
    await this.model
      .findOne({ where: { id: id } })
      .then((result) => {
        if (result != null) {
          this.res.status(200).json({
            message: "success",
            data: result,
          });
        } else {
          this.res.status(404).json({ message: "data not found" });
        }
      })
      .catch((err) => {
        this.res
          .status(500)
          .json({ message: "get data by ID failed", data: err });
      });
  }

  async getAll() {
    await this.model
      .findAll()
      .then((result) => {
        if (result == null) {
          this.res.status(404).json({
            message: "data not found",
            data: result,
          });
        } else {
          this.res.status(200).json({
            message: "success",
            data: result,
          });
        }
      })
      .catch((err) => {
        console.log("trigger catch");
        this.res.status(500).json({
          message: "error",
          data: err,
        });
      });
  }

  async createNew() {
    await this.model
      .create(this.req.body)
      .then((user) => {
        this.res.status(200).json({ message: "success", data: user });
      })
      .catch((err) => {
        this.res.status(500).json({ data: err });
      });
  }

  async updateData(body, id) {
    await this.model
      .update(body, { where: { id: id } })
      .then((result) => {
        this.res.status(200).json({
          message: "updated",
          data: body,
        });
      })
      .catch((err) => {
        this.res.status(500).json({
          message: "update failed",
          data: err,
        });
      });
  }

  async deleteData(id) {
    await this.model
      .destroy({ where: { id: id } })
      .then((result) => {
        this.res.status(200).json({
          message: "succesfuly deleted",
        });
      })
      .catch((err) => {
        this.res.status(500).json({ message: "error", data: err });
      });
  }

  async login(username) {
    this.result = await this.model
      .findOne({ where: { username: username } })
      .then((result) => {
        if (result != null) {
          return result;
        } else {
          this.res.status(404).json({ message: "data not found" });
        }
      })
      .catch((err) => {
        this.res
          .status(500)
          .json({ message: "get data by ID failed", data: err });
      });
    return this.result;
  }

  async register() {
    this.result = await this.model
      .create(this.req.body)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        this.res.status(500).json({ data: err });
      });
    return this.result;
  }
}

module.exports = CRUD;
