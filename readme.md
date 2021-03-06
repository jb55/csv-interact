
# csv-interact

  Transform csv over stdin -> stdout

## Installation

  Install with npm

    $ npm install csv-interact

## API

```js
var interact = require('csv-interact')

// generate a new csv, only including the name and age if they're over 20
interact(function(record, done){
  if (+record.age > 20)
    this.push({ name: record.name, age: record.age })
  done();
});
```

### Examples

Streaming in constant space by specifying fields

```js
interact(function (record, done) {
  this.push({ name: record.name })
  done();
}, { fields: ["name" ] });
```

Or just pass `fast` to indicate you won't be adding or removing fields

```js
interact(function (record, done) {
  record.name = record.name.toUpperCase();
  this.push(record)
  done();
}, { fast: true });
```

## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
