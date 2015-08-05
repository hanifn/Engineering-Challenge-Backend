/**
 * FoodController
 *
 * @description :: Server-side logic for managing foods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cheerio = require('cheerio');
var request = require('request');

module.exports = {

    scrape: function(req, res) {
        // set the url to scrape from
        var url = "http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts";
        var default_headers = {
                'User-Agent': 'Mozilla/5.0',
                'Cookie': 'tracker=id%3D%3E%7Cuser_id%3D%3E%7Csource%3D%3E%7Csource_domain%3D%3E%7Ckeywords%3D%3E%7Cclicked_at%3D%3E2015-08-02+15%3A49%3A55+%2B0000%7Clanding_page%3D%3Ehttp%3A%2F%2Fwww.myfitnesspal.com%2Ffood%2Fcalories%2F179990009%7Csearch_engine%3D%3E%7Clp_category%3D%3E%7Clp_subcategory%3D%3E%7Ccp%3D%3E%7Ccr%3D%3E%7Cs1%3D%3E%7Cs2%3D%3E%7Ckw%3D%3E%7Cmt%3D%3E; mobile_seo_test_guid=b720a983-daab-e61c-c430-abee2a3d0383; __utmt=1; _dc_gtm_UA-273418-97=1; _gat=1; _session_id=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJWM5MjZhNzAxMmY3YTIzYmQ0ZjdiNTM3NjgxNzVlN2FkBjsAVEkiEGV4cGlyeV90aW1lBjsARlU6IEFjdGl2ZVN1cHBvcnQ6OlRpbWVXaXRoWm9uZVsISXU6CVRpbWUNsdwcwFuavRQJOg1zdWJtaWNybyIHhpA6DW5hbm9fZGVuaQY6C0Bfem9uZUkiCFVUQwY7AFQ6DW5hbm9fbnVtaQJlA0kiH1BhY2lmaWMgVGltZSAoVVMgJiBDYW5hZGEpBjsARkl1OwcNqtwcwFuavRQJOwgiB4aQOwlpBjsKSSIIVVRDBjsAVDsLaQJlA0kiEF9jc3JmX3Rva2VuBjsARkkiMTB5WUp4Y0tGSmwwUktWbHRyaytjZWlYZ0JjMXJ5UE14ZWFXUFFwQ1p1RW89BjsARg%3D%3D--907501c179643679e2dc80b301e183a00d944b2c; __utma=213187976.394893471.1438530596.1438530596.1438786545.2; __utmb=213187976.5.10.1438786545; __utmc=213187976; __utmz=213187976.1438530596.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ki_t=1438530597246%3B1438786546893%3B1438787116543%3B2%3B10; ki_r=; _ga=GA1.2.394893471.1438530596'
        };
        var tagUrls = [];
        var foodUrls = [];

        // use request to call the url
        console.log("Scraping...");
        request({
            uri: url,
            method: "GET",
            timeout: 10000,
            followRedirect: false,
            maxRedirects: 10,
            headers: default_headers
        }, function(error, response, html) {
            // ensure no error before proceeding
            if(! error && response.statusCode == 200) {
                // load html into cheerio like jquery
                var $ = cheerio.load(html);

                // find the required DOM element
                // iterate through elements to scrape data
                $('#popular_tags a').each(function(i, el) {
                    // get food description text
                    // save tag urls to array
                    tagUrls.push($(el).prop('href'));
                    console.log("Saving " + name);

                    // save new food entry
                    Food.create({name: name}).exec(function(error, item) {
                        if(error) {
                            return res.status(500).json(error);
                        }
                    });
                });

                return res.redirect('/food');
            } else {
                console.log("Error: " + error);
                console.log("status: " + response.statusCode);
                console.log(html);
            }
        });
    },

    search: function(q) {
    }
};

