
# Fuzzytime jquery time prettifying plugin

## What it does

There are two kinds of times that you can pull out of fuzzytime
 
1. a fuzzy time:
    -    less than an hour ago
    -    a couple of days ago
2. an implicit time
    -    5 minutes ago
    -    3 weeks ago

## Use:

include the jquery.fuzzytime.js or jquery.fuzzytime.min.js after your jquery script inclusion in your html
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.fuzzytime.min.js"></script>

send your Twitter, Facebook, Unix or Javascript formatted timestamp to the $.fuzzytime() function
    var myFaceBookDate = '2010-10-19T02:57:48+0000';
    var myPrettyTime = $.fuzzytime(myFaceBookDate) // returns something like 'a couple weeks ago'

to make the date explicit ex. '35 minutes ago', send a value of true as the second argument to $.fuzzytime()
    var myTwitterDate = 'Tue Oct 19 14:01:57 +0000 2010';
    var myPrettyImplicitTime = $.fuzzytime(myTwitterDate,true); // returns something like '3 days ago'

## Thanks to:
the [Kohana project's](http://kohanaframework.com) date helper 
[rmm5t](http://github.com/rmm5t/jquery-timeago) for the iso8601 method to make facebook possible

## TODO

-    Tests!!!  This development driven testing needs to stop.  I'm soooo lazy.