/**
 * Web Scraper
 *
 * @description :: Tool to scrape myfitnesspal's food list
 */

var cheerio = require('cheerio');
var request = require('request');

// set the url to scrape from
var url = "http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts/";
//var url = "http://www.google.com";

// use request to call the url
console.log("Scraping...");
request({
    uri: url,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, html) {
    console.log(html);
    // ensure no error before proceeding
    if(! error) {
        // load html into cheerio like jquery
        var $ = cheerio.load(html);

        // find the required DOM element
        // iterate through elements to scrape data
        $('#newest_foods li').each(function(i, el) {
            // get food description text
            var name = $(el).find('.food_description a').text();
            console.log("Saving " + name);

            // save new food entry
            Food.create({name: name}).exec(function(error, item) {
                if(error) {
                    return res.status(500).json(error);
                }
            });
        });
    } else {
        console.log("Error: " + error);
    }
});
