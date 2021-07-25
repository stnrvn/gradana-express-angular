const TopupHistory = require('../models/topupHistory')
const axios = require("axios");
class TopupHistoryController{
  static async get(req, res){
    try {
      const { page, length } = req.query
      
      let userBalance
      await axios.get('http://localhost:4001/balance')
      .then(res => {
        userBalance = res.data;
      })

      const getTopupHistory = await TopupHistory.get(+page, +length)

      return res.render('dashboard', { data: getTopupHistory, userBalance: userBalance})
    } catch (error) {
        console.log(error)
      return res.status(400).json(error)
    }
  }
}

module.exports = TopupHistoryController