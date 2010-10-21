/**
 * Fuzzytime jquery time prettifying plugin
 * 
 * What it does
 * There are two kinds of times that you can pull out of fuzzytime
 * 
 * - a fuzzy time:
 *   - less than an hour ago
 *   - a couple of days ago
 * - an implicit time
 *   - 5 minutes ago
 *   - 3 weeks ago
 * Use:
 * 
 * send your Twitter, Facebook, Unix or Javascript formatted timestamp to the $.fuzzytime() function
 * ex. var myFaceBookDate = '2010-10-19T02:57:48+0000';
 *     var myPrettyTime = $.fuzzytime(myFaceBookDate) // returns something like 'a couple weeks ago'
 * 
 * to make the date explicit ex. '35 minutes ago', send a value of true as the second argument to $.fuzzytime()
 * ex. var myTwitterDate = 'Tue Oct 19 14:01:57 +0000 2010';
 *     var myPrettyImplicitTime = $.fuzzytime(myTwitterDate,true); // returns something like '3 days ago'
 * 
 * Thanks to:
 * the Kohana project's date helper (http://kohanaframework.com) 
 * rmm5t for the iso8601 method to make facebook possible (http://github.com/rmm5t/jquery-timeago)
 */
 
(function ($) {
    var Fuzzy = function (timestamp,implicit,now) {
        var implicit = implicit || false,
            now      = now      || new Date().valueOf(),
            stamp,
            offset,
            year     = 31556926,
            month    = 2629744,
            week     = 604800,
            day      = 86400,
            hour     = 3600,
            minute   = 60,
            span     = 'a long time',
            times    = [
                minute,
                minute * 20,
                hour,
                hour   * 4,
                day,
                day    * 2,
                day    * 4,
                week,
                week   * 2,
                month,
                month  * 2,
                month  * 4,
                year,
                year   * 2,
                year   * 4,
                year   * 8,
                year   * 12,
                year   * 24,
                year   * 64
            ],
            fuzzies = [
                'moments',
                'a few minutes',
                'less than an hour',
                'a couple of hours',
                'less than a day',
                'about a day',
                'a couple of days',
                'less than a week',
                'about a week',
                'less than a month',
                'about a month',
                'a couple of months',
                'less than a year',
                'about a year',
                'a couple of years',
                'a few years',
                'about a decade',
                'a couple of decades',
                'several decades',
            ],
            implicits = [
                {val : minute, string : 'minute'},
                {val : hour,   string : 'hour'},
                {val : day,    string : 'day'},
                {val : week,   string : 'week'},
                {val : month,  string : 'month'},
                {val : year,   string : 'year'}
            ];

        this.parse  =  function () {
            stamp = new Date(timestamp).valueOf(); // is it Twitter etc. ?
            if(!stamp) stamp = this.iso8601(timestamp); // is it Facebook?
            if(!stamp) return 'some time ago'; // well then, I guess I have to make it vague!

            offset = Math.abs((now - stamp)/1000)

            if(!implicit){
                for (var i=0; i < times.length; i++) {
                    if(offset < times[i]){
                        span = fuzzies[i];
                        break;
                    }
                };
            }else{
                for (var i=0; i < implicits.length; i++) {
                    if(offset < implicits[i]['val']){
                        if(i == 0){
                            span = 'less than a minute';
                            break;
                        }else{
                            var howMany   = Math.floor(offset / implicits[i - 1]['val']),
                                newString = howMany + " " + implicits[i - 1]['string'];
                            span = howMany > 1 ? newString + 's' : newString;
                            break;
                        }
                    }
                };
            }
            return offset > 0 ? span + ' ago' : 'in ' + span;
        };
        // facebook uses iso8601 for date encoding
        this.iso8601 = function (timestamp) {
            var s = $.trim(timestamp);
            s = s.replace(/\.\d\d\d+/, ""); // remove milliseconds
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            return new Date(s).valueOf();  
        }
    }

    $.fuzzytime = function (timestamp,implicit,now) {
        var fuzzy = new Fuzzy(timestamp,implicit,now);
        return fuzzy.parse();
    };
}(jQuery));