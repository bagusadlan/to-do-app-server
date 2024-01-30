const User = require('../models/User')
const Todo = require('../models/Todo')
// const {
//   setQueryPagination,
//   getPagingData
// } = require('../helper/modulePartials')
// const { successPagination } = require('../helper/responseApi')

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body
      const userExist = await User.findOne({ email })

      if (userExist) {
        return res.status(403).send({
          message: 'User is already exist!'
        })
      }

      const user = await User.create({
        username,
        email,
        password
      })

      const userResponse = {
        username: user.username,
        email: user.email
      }

      res
        .status(201)
        .json({ message: 'Register successfull', data: userResponse })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Register failed' })
    }
  },

  async login(req, res) {
    try {
      const { page, limit, offset, sortBy, sortDesc, where } =
        setQueryPagination(req)

      const results = await Pengaduan.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, sortDesc]]
      })

      const { data, pageData } = getPagingData(results, page, limit)

      res.json(successPagination('pengaduan', data, pageData))
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Pengaduan gagal ditampilkan' })
    }
  },

  async logout(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      res.status(200).json(report)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal ditampilkan' })
    }
  },

  async getProfile(req, res) {
    try {
      const report = await Pengaduan.findOne({
        where: {
          id_report: req.params.id_report
        }
      })

      if (!report) {
        res.status(400).json({ message: 'Report tidak dapat ditemukan' })
        return
      }

      await Pengaduan.update(req.body, {
        where: {
          id_report: req.params.id_report
        }
      })

      res.status(200).json({ message: 'Report berhasil diupdate' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Report gagal diupdate' })
    }
  }
}
