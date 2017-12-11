var express = require('express');
var router = express.Router();

/*
 Get menu of the day from a separate file
 When you include a file(or module) the value returned by require method is
the one of module.exports from the included module.
*/
const menu_of_the_day = require('../menu_of_the_day.js');

/*
GET home page.
This method is used to process request to `/` path.
When the user open the following page: http://localhost:3000 the above
middleware is called.
*/

router.get('/', function(req, res, next) {
  // Print in nodejs console `Meniul zilei` and the content of `menu_of_the_day` object
  console.log('Meniul zilei', menu_of_the_day)
  var details = { menu : menu_of_the_day };
  // Render `menu` template(./views/menu) and pass `details` object.
  // `details` object an be accessed from ejs template with the following line of code:
  // <%= menu.title %>
  res.render('menu', details);
});

// Export created router to be used in `app.js`
module.exports = router;
