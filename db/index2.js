var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'okc.ciqkxj8b112q.us-east-2.rds.amazonaws.com',
  user: 'okC',
  password: 'okcoupon',
  database: 'okc'
});

module.exports.authenticateUser = function(user, password, callback) {
  connection.query(`SELECT id FROM users WHERE (user_name, password) = ('${user}', '${password}')`, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.addUser = function(user, password, callback) {
  connection.query(`SELECT user_name FROM users WHERE (user_name) = ('${user}')`, function(err, results) {
      // console.log('results ', results)
      if (results.length === 0) {
        connection.query(`INSERT INTO users (user_name, password) VALUES ('${user}', '${password}')`, function(err, results) {
          if (err) {
            callback(err, null);
          } else {
            console.log('results in database ', results)
            callback(null, results);
          }
        })
      } else {
      callback(null, [])
    }
  });
};

module.exports.addSaved = function(userID, coupon, callback) {
  connection.query(`INSERT INTO coupons (coupon_id, user_id, latitude, longitude, imgUrl, title, price, discount, merchant, url, pureUrl) VALUES
    ('${coupon.id}', '${userID}', '${coupon.lat}', '${coupon.lon}', '${coupon.image_url}', '${coupon.title.split(`'`).join('').split(`"`).join('')}', '${coupon.price}', '${coupon.discount_percentage}',
    '${coupon.merchant_name.split(`'`).join('').split(`"`).join('')}', '${coupon.url}', '${coupon.pureUrl}')`, function (err, result) {
      if (err) {
        console.log(err)
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};

module.exports.getSaved = function(userID, callback) {
  connection.query(`SELECT * from coupons WHERE (user_id) = ('${userID}')`, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


module.exports.deleteSaved = function(userID, couponURL, callback) {
  connection.query(`DELETE FROM coupons WHERE (user_id, imgUrl) = ('${userID}', '${couponURL}')`, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports.getSaveCount = (image_url, callback) => {
  connection.query(`SELECT * FROM COUPONS WHERE (imgUrl) = ('${image_url}')`, (err, results) => {
    if ( err ) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.addReview = function(userID, couponURL, description, callback) {
  console.log('database ', userID, couponURL, description)
  connection.query(`INSERT INTO reviews (user_id, coupon_URL, description) VALUES ('${userID}', '${couponURL}', '${description}')`, function(err, results) {
    if ( err ) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getReviews = (couponURL, callback) => {
  connection.query(`SELECT * FROM reviews WHERE (coupon_URL) = ('${couponURL}')`, (err, results) => {
    if ( err ) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.getUserInfo = (userID, callback) => {
  console.log('whats the big id here ', userID)
  connection.query(`SELECT * FROM users WHERE (id) = ('${userID}')`, (err, results) => {
    if ( err ) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.deleteReview = function(userID, couponURL, callback) {
  connection.query(`DELETE FROM reviews WHERE (user_id, coupon_URL) = ('${userID}', '${couponURL}')`, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
