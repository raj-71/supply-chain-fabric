
# node-couchdb-query-engine [![Build Status](https://travis-ci.org/wearetheledger/node-couchdb-query-engine.svg?branch=master)](https://travis-ci.org/wearetheledger/node-couchdb-query-engine)

Criteria queries filters on JSON objects couchdb style.

## Installation
```bash
    npm install @theledger/couchdb-query-engine --save
```

## Usage

### Node
```javascript
    import queryEngine from "@theledger/couchdb-query-engine";

    
    // Test whether or not the query matches the content
    // return a boolean
    queryEngine.test( {foo:1}, {foo:{$gt:0}} )
    
    // Filter using a query
    // returns array of key value
    queryEngine.parseQuery( {key:{foo:1}}, {selector:{foo:{$gt:0}}} )
```

## Ops

Criteria queries follow CouchDB convention. You can use operators described at docs.couchdb.org/en/2.1.0/api/database/find.html?highlight=find#post--db-_find

* logical ops
  * `{ $and: [ ... ] }` - all of
  * `{ $or: [ ... ] }` - any of
  * `{ $nor: [ ... ] }` - none of
  * `{ $not: ... }` - not, ie. `{ $not: { $gt: 0, $lt: 1 } }`
* comparison ops
  * `{ field: ... }` - is equal (implicit)
  * `{ field: { $eq: ... } }` - is equal (explicit)
  * `{ field: { $ne: ... } }` - is not equal
  * `{ field: { $gt: ... } }` - is greater than
  * `{ field: { $gte: ... } }` - is greater than or equal
  * `{ field: { $lt: ... } }` - is lower than
  * `{ field: { $lte: ... } }` - is lower than or equal
  * `{ field: { $in: [ ... ] } }` - at least one element matches value (or value's elements if array)
  * `{ field: { $nin: [ ... ] } }` - none of elements match value (or value's elements if array)
* element ops
  * `{ field: { $exists: true/false } }` - field exists
  * `{ field: { $type: 'number|string|...' } }` - matches field type
* evaluation ops
  * `{ field: { $mod: [ div, rem ] } }` - divided by div has reminder rem
  * `{ field: { $regex: '...', $options: 'i' } }` - matches regular expression with optional options
* array ops
  * `{ field: { $all: [ ... ] } }` - all of the values are in the field's value
  * `{ field: { $elemMatch: ... } }` - at least one element matches
  * `{ field: { $size: ... } }` - matches length of field's array value

For more examples have a look at specs.

# Example Use Case

Let's say you've got JSON based RESTful API that you want to test using mocha:
```javascript

import queryEngine from "@theledger/couchdb-query-engine";

const cars =  {
  "vin-num-x":{
      make:"Volvo",
      year:2015,
      color:"red"
  }, 
  "vin-num-y":{
      make:"VW",
      year:2018,
      color:"red"
  }, 
  "vin-num-z":{
      make:"Fiat",
      year:2017,
      color:"green"
  }, 
};

// Will return 2 cars
const filteredResult = queryEngine.parseQuery( cars, {selector:{year:{$gt:2016}}} )
```

## License

    The MIT License (MIT)

    Copyright (c) 2014 Mirek Rusin http://github.com/mirek

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.