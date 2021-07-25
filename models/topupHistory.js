const { getDatabase } = require('../config/mongodb')

class TopupHistory{
  static get(page, limit) {
    return getDatabase().collection('topupHistory').find().skip(page > 0 ? ( ( page - 1 ) * limit ) : 0 ).limit(limit).toArray()
  }
}

module.exports = TopupHistory