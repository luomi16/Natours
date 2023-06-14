007

## BEGIN

1. REPL
   https://nodejs.org/dist/latest-v18.x/docs/api/repl.html

   REPL 指的是“读取-求值-打印循环”，是一个交互式编程环境。在 REPL 环境中，用户可以逐行输入代码，编译器或解释器会立即执行这些代码，并将结果返回给用户。
   REPL 通常用于测试和探索代码，它允许开发人员快速检查代码的行为，而不需要编写完整的程序或脚本。REPL 还可以用于学习编程语言，因为它可以帮助用户立即看到代码执行的结果。
   常见的使用 REPL 的语言包括 Python、Ruby、JavaScript 等。许多现代的集成开发环境（IDE）也包含了 REPL，让开发者可以直接在 IDE 中输入和执行代码，而无需打开一个独立的命令行界面。

2. nodejs.org

3. fs = file system
   fs.readFile(path[, options], callback)
   读完这个文件里面的数据，进入这个 callback 函数
   运行 readFile 的同时可以运行其他的，不阻塞后续进程的执行。

4. synchronous - blocking
   asynchronous - non-blocking

PHP 里面是一个用户一个进程
node.js 可以只运行一个进程，利用回调函数模型，不阻塞

Callbacks ≠ Asynchronous

5. CALLBACK HELL
   using ES6 Promise or ES8 Async/Await

6. HTTP

7. route - express

8. routing 与文件夹内容无关，都要自己定义在 router 上才行，仅针对路线发送特殊响应

9. ./ dot is where the script is running
   \_\_dirname is where the current file is located
   require 函数是一个例外

10. top-level code : to be executed at the beginning

11. map

12. tell blowers what type of this file should recognize?

    ```javascript
    res.writeHead(200, { 'Content-type': 'application/json' });
    // also could be 'Content-type': 'text/html'
    ```

parse the variable in URLs

```javascript
const url = require('url'); // for parsing variables from urls

const server = http.createServer((req, res) => {
const {query, pathname} = url.parse(req.url, true); // add

else if (pathname === '/product'){
     res.writeHead(200, {'Content-type': 'text/html'});
     const product = dataObj[query.id];
     const output = replaceTemplate(tempProduct, product);
     res.end(output);
```

Using modules

finished a node farm demo, which includes absolute fundamentals of Node.JS

## npm

npm: node package manager -> use to install and manage Open source package

in command line
type: _npm init - npm install slugify_
so it add our first "dependencies": { "slugify": "~1.3.4"} in package.json

_npm install nodemon --save-dev_
add a development dependency, "devDependencies": { "nodemon": "^1.18.11"}

_(sudo) npm i nodemon --global_
When performing the command "nodemon index.js", I met a problem and then fixed it following the below pattern.

> cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
> 在 powershell 中打开 angular-cli 的时候，输入 ng 命令，收到了这个提示
> ng : File C:\Users\ysu10\AppData\Roaming\npm\ng.ps1 cannot be loaded because running scripts is disabled on this
> system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
> At line:1 char:1 + ng new + ~~
> CategoryInfo : SecurityError: (:) [], PSSecurityException
> FullyQualifiedErrorId : UnauthorizedAccess
> 这个原因是由于脚本执行策略为严格模式，所以无法执行，可以通过
> Get-ExecutionPolicy
> 来获取当前的脚本执行策略
> 默认为 Restricted，要使脚本能够执行，需要修改为 Unrestricted 或 Bypass.
> 相应的命令分别为
> Set-ExecutioPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass -Force
> 如果设置为 unrestricted，则如果执行从网上下载的未签名脚本时会询问用户。
> 如果设置为 bypass，则会直接执行。
> 建议设置为 unrestricted。

Not local, _npm run start_

## 4 / 20

### Using Modules

3rd party modules

1. add dependencies in package.json

   "dependencies": {
   ​ "slugify": "~1.3.4"
   }

2. create a constant
   const slugify = require('slugify');

3. const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
   console.log(slugs);

4. result:
   [
   'fresh-avocados',
   'goat-and-sheep-cheese',
   'apollo-broccoli',
   'baby-carrots',
   'sweet-corncobs'
   ]

### package version and updating

major version: breaking changes
minor version: new features
patch version: for bug fixed

_npm outdated_
( "slugify": "~1.3.4", "nodemon": "^1.19.4"
"^1.19.4", ^ means that we accept the patch and all the minor releases
"~1.3.4", ~ means we only accept patch releases)

\*includes all releases

Package Current Wanted Latest Location Depended by
nodemon 1.19.4 1.19.4 2.0.22 node*modules/nodemon final
^
slugify 1.3.4 1.3.6 1.6.6 node_modules/slugify final
^
\_npm install slugift@1.0.0* (specify the certain version to be installed)

_npm uninstall express_

folder node_modules

When you share your code with others, you don't necessarily need to share this folder which includes a large number of dependencies.
So how to reconstruct? PLEASE share package.json and package-lock.json to help others to reconstruct basically the mode modules folder.
Setting up Prettier extension in VScode (function: format code)

skipped PP24-45

P23 Section Intro: how the web works, the request-response model, HTTP, TCP/IP, static versus dynamic websites, what APIs are
P28 node.js architecture, event and event loop, streams, modules
P46 start to build big course project

1st step
build our API: using Express(most popular node.js framework)

### EXPRESS

contains a very robust set of features:
complex routing, easier handling of requests and responses, middleware, server-side rendering, etc.

API testing : postman

### 051 REST architecture

REST architecture: most used API architecture

Representational States Transfer

1 separate API into logical resources

2 expose structures resource-based URLs

3 Use HTTP methods(verbs)
![1682058748966](E:\Github\node\notes.assets\1682058748966.png)

4 Send data as JSON(usually)
![1682059022086](E:\Github\node\notes.assets\1682059022086.png)

5 stateless

## Start building our API (using Express)

### handling GET requests

![1682201989687](E:\Github\node\notes.assets\1682201989687.png)

### handling POST requests

emitted

#### middleware

Middleware and request-response cycle

manipulate the request or the response object

use express.json() to get access to the request body on the request object

```javascript
app.use(express.json());
```

everything is middleware. e.g: parsing body, logging, setting headers, router...

middleware stack

![1682222009283](E:\Github\node\notes.assets\1682222009283.png)

#### parse JSON file

```javascript
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
```

### responding to URL parameters

defining, reading, and response parameters in the URL

```javascript
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  // convert string to number
  const id = req.params.id * 1;
  // find: a normal javascript function, we pass a callback function
  // loop through the array, and in each of the iterations, we will have access to the current element and return either true or false
  // create a array which only contains the element where this comparision here turns out to be true
  // real id === specify id and will get returned from the find method, and stored into tour
  const tour = tours.find(el => el.id === id);

  // input a valid id, return error message
  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    // single tour (id = 5)
    data: {
      tour
    }
  });
});
```

### handling patch requests

handling patch requests to actually update data

```javascript
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>'
    }
  });
});
```

handling delete requests

use delete function to delete the data that should be deleted

```javascript
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  // 204 means no content
  res.status(204).json({
    status: 'success',
    data: null
  });
});
```

Finish CRUD: create read update and delete

Create our own middleware

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'A tour must have price']
  }
});

const Tour1 = mongoose.model('Tour1', tourSchema);

const testTour = new Tour1({
  name: 'The Park Camper',
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR !!:', err);
  });
```

## MVC

model - view - controller

REQUEST router

tourRouter.js

userRouter.js

controller

![1685321631771](E:\Github\node\notes.assets\1685321631771.png)

### Creating documents

```js
exports.createTour = (req, res) => {
  const newTour = new Tour({});
  newTour.save();
  res.status(201).json({
    status: 'success'
  });
};
```

The updated code I provided uses an `async/await` approach to handle the asynchronous operation of creating and saving a new tour.

```js
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};
```

Mongoose [models](https://mongoosejs.com/docs/models.html) provide several static helper functions for [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Each of these functions returns a [mongoose `Query` object](https://mongoosejs.com/docs/api/query.html#Query).

- [`Model.deleteMany()`](https://mongoosejs.com/docs/api.html#model_Model-deleteMany)
- [`Model.deleteOne()`](https://mongoosejs.com/docs/api.html#model_Model-deleteOne)
- [`Model.find()`](https://mongoosejs.com/docs/api.html#model_Model-find)
- [`Model.findById()`](https://mongoosejs.com/docs/api.html#model_Model-findById)
- [`Model.findByIdAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model-findByIdAndDelete)
- [`Model.findByIdAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model-findByIdAndRemove)
- [`Model.findByIdAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model-findByIdAndUpdate)
- [`Model.findOne()`](https://mongoosejs.com/docs/api.html#model_Model-findOne)
- [`Model.findOneAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model-findOneAndDelete)
- [`Model.findOneAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model-findOneAndRemove)
- [`Model.findOneAndReplace()`](https://mongoosejs.com/docs/api.html#model_Model-findOneAndReplace)
- [`Model.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model-findOneAndUpdate)
- [`Model.replaceOne()`](https://mongoosejs.com/docs/api.html#model_Model-replaceOne)
- [`Model.updateMany()`](https://mongoosejs.com/docs/api.html#model_Model-updateMany)
- [`Model.updateOne()`](https://mongoosejs.com/docs/api.html#model_Model-updateOne)

### A script about how to import data to the database from JSON file

1. read json file
2. import data into db - (create a constant to store imported data and use create() method)

### 2 ways of writing database queries

1 using filter objects (mongodb section)

```js
const tours = await Tour.find({
  duration: 5,
  difficulty: 'easy'
});
```

2 using some special mongoose methods

```js
const tours = await Tour.find()
  .where('duration')
  .equals(5)
  .where('difficulty')
  .equals('easy');
```

### getAllTours (in tourController.js)

```js
const queryObj = { ...req.query };
// you can't just use const queryObj = req.query; this is hard copy, if you would delete something from queryObj, we would also delete it from req.query object
// { ...req.query } this structure will basically take all the fields out of the object. This step ensures that modifying queryObj does not affect the original req.query.

// ignores page, sort
const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach(el => delete queryObj[el]);

console.log(req.query, queryObj);
const tours = await Tour.find(queryObj);
// find() return a query
```

```js
try {
    console.log(req.query);
    // build query
    // 1A) Filtering
    const queryObj = { ...req.query };
    // ignores page, sort
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));
    // JSON.parse(queryStr)    : { duration: { $gte: 5 }, difficulty: 'easy' }

	let query = Tour.find(JSON.parse(queryStr));
    // execute find({ duration: { $gte: 5 }, difficulty: 'easy' }) ,we get a query
	// l.e. find() method return a query, and then store it to query

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    }
    // test: 127.0.0.1:3000/api/v1/tours?sort=-price,-ratingsAverage

    // 3) field limiting
    // only show the field I provided
    if(req.query.fields) {
      const fields = req.query,fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
      // have everything except the v field, which means we're excluding only this field
    }
    // test: 127.0.0.1:3000/api/v1/tours?fields=name,duration,difficulty,price
    // 127.0.0.1:3000/api/v1/tours?fields=-name,-duration

    // 4)Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if ((req.query, page)) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

```

```js
createdAt: {
    type: Date,
    default: Date.now(),
    select: false
    // exclude fields from the schema
  }
```

// 127.0.0.1:3000/api/v1/tours?page=2&limit=10

// only 10 results per page, and we're displaying page #2 now

```js
//1A) Filtering

const queryObj = { ...req.query };
const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach(el => delete queryObj[el]);
//1B)Advanced Filtering

let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

let query = Tour.find(JSON.parse(queryStr));
// const tours = await Tour.find()
//  .where('difficulty')
//  .equals('easy')
//  .where('duration')
//  .equals(5);

// 2)Sorting
if (req.query.sort) {
  const sortBy = req.query.sort.split(',').join(' ');
  query = query.sort(sortBy);
} else {
  query = query.sort('-ratingsAverage');
}

// 3)fields
if (req.query.fields) {
  const fields = req.query.fields.split(',').join(' ');
  query = query.select(fields);
} else {
  query = query.select('-__v');
}

// 4)Pagination
const page = req.query.page * 1 || 1;
const limit = req.query.limit * 1 || 100;
const skip = (page - 1) * limit;

if (req.query.page) {
  const numberTours = await Tour.countDocuments();
  if (skip >= numberTours) throw new Error('This Page Doesnt Exist');
}

query = query.skip(skip).limit(limit);
// Execute Query
const features = new APIFeatures(Tour.find(), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();

const tours = await features.query;

//Send Response
res.status(200).json({
  status: 'success',
  results: tours.length,
  data: tours
});
```

### provide an alias route ro a request

```js
exports.aliasTopTours = (req, nes, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary, difficulty';
  next();
};
// add router
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
```

### API features class

```js
create a new object of the API features class, in there, we are parsing a query object and the query string that's coning from express.
Then, in each of these four methods here that we call, one after another, we manipulate the query.
we keep adding more methods to it just like we've been doing.
then by the end, we simply await the result, that query so that it can come back with all the documents that were selected

const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

const tours = await features.query;
```

This is a query middleware, which executed before 'const tours = await features.query;' executed.

```js
tourSchema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });
  // not in db
  next();
});
```

### What is 'slugify'

"Slugify"是一个编程术语，指的是将字符串转换为适合在 URL 中使用的"slug"的过程。在 URL 中，slug 是将标题或名称转换为短文本片段的常用做法，以便更好地描述链接的内容。它通常用于创建友好的 URL，使其易于阅读和理解。

Slugify 过程通常包括以下步骤：

1. 移除非字母数字字符（如空格、标点符号等）。
2. 将字符串转换为小写。
3. 替换空格或其他分隔符为连字符（通常是短横线）。
4. 处理重复连字符的情况，以确保 slug 的可读性。

例如，假设有一个标题为"Hello World! How Are You?"的文章，使用 slugify 操作将其转换为"hello-world-how-are-you"，这样可以更好地在 URL 中表示该文章。

Slugify 通常用于网站开发中，特别是在创建动态页面、博客文章链接或任何需要将文本转换为 URL 友好格式的应用程序中。它有助于提高用户体验、搜索引擎优化（SEO）和链接的易读性。

## ndb (debugger)

### 5 variables in each module

\_\_dirname

\_\_filename

require()

module

exports

#### middleware stack

![1685555404861](E:\Github\node\notes.assets\1685555404861.png)

You can even see more details about this router middleware

![1685555538781](E:\Github\node\notes.assets\1685555538781.png)

Some env info at here

![1685555837561](E:\Github\node\notes.assets\1685555837561.png)

## Error handling in express

![1685561496787](E:\Github\node\notes.assets\1685561496787.png)

### Status code

ere are some common HTTP status code ranges and their general meaning:

- **1xx Informational**: These status codes indicate that the server has received the request and is processing it.
- **2xx Success**: These status codes indicate that the request was successfully received, understood, and processed by the server.
- **3xx Redirection**: These status codes indicate that further action is needed to fulfill the request. They are used for redirection and caching purposes.
- **4xx Client Error**: These status codes indicate that there was an error in the client's request. It typically indicates an issue with the client-side.
- **5xx Server Error**: These status codes indicate that there was an error on the server while trying to fulfill the request.

Here are some examples of commonly encountered status codes:

- **200 OK**: The request was successful, and the server is returning the requested data.
- **201 Created**: The request was successful, and a new resource was created as a result.
- **400 Bad Request**: The request was invalid or cannot be processed by the server.
- **404 Not Found**: The requested resource could not be found on the server.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### A better way of catching errors in all our async functions

an asynchronous function return promises.when there is an error inside of an async function, that basically means that the promise gets rejected.

Goal: In order to get rid of our try catch blocks,
we simply wrapped our asynchronous function inside of the catchAsync function that we justed created.
This catchAsync function will then return a new anonymous function, and it is assigned to exports.createTour.

How asynchronous code works

creating new tour request -> catchAsync(return a promise(if there is an error)) -> anonymous function() -> fn -> .catch (error can be catch) -> pass error into the next function -> ends up in global error handling middleware

```js
// in catchAsync.js
module.exports = fn => {
  return (req, res, next) => {
    // fn(req, res, next).catch(err => next(err));
    fn(req, res, next).catch(next);
  };
};

// in tourController.js
// const catchAsync = require('./../utils/catchAsync');
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});
```

### marked 3 types errors as operational error

CastError

ValidatorError

MongoError

asynchronous: catch unhandled rejections

synchronous: uncaught exceptions (errors that ocurred in our synchronous code but are not handled anywhere)

## authentication, authorization, and security

### JSON web token (JWT)

![1685667106721](E:\Github\node\notes.assets\1685667106721.png)

### p192 build user account function

1. edit account.pug
2. add route '/me' in viewRoutes.js

```
router.get(
'/me',
authController.isLoggedIn,
authController.protect,
viewsController.getAccount
);
```

3. in authController.js protect
   add `res.locals.user = currentUser;`
4. add route in header.pug
5. write getAccount in viewsController.js

### p193 updating user data (html form submit without javascript)

1. in account.pug
   for form

```
form.form.form-user-data(action='/submit-user-data' method='POST')
```

specify the name of input

2. set route in viewRoutes.js
   /submit-user-data updateUserData
3. in viewsController.js
   implement updateUserData

### p193 updating user data (api)

account.pug
index.js
updateSeting.js

### photo upload

multer

1. npm i multer
2. in userRoutes, require
   set route in updateMe
   create a middleware upload using multer
3. configure multer upload
   create a multer storage and filter

resize user photo using sharp
upload user photo using user-friendly window
(this label will active this input)

```
input.form_upload(type='file', accept='image/*', id='photo', name='photo')
label(for='photo') Choose new photo
```

p204
1 create a multer upload using the memory storage and filter only for images
2 then craete th eupload tour image middleware by using upload fields, which takes in one image cover

npm i sharp

npm i html-to-text
