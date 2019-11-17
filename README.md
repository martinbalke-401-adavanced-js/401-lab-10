# LAB - 10

## API server

### Author: Martin Balke

### Links and Resources
* [submission PR](https://github.com/martinbalke-401-adavanced-js/401-lab-09/pull/1)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)
* [front-end](http://xyz.com) (when applicable)


### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app
* `npm start`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

#### Questions


`Currently, the client is just sending us an object  containing the username and password to us, which is why we can just pass along (req.body). What is a better way to do this?`

I think a better way to handle this would be to base encode the information and send it in the request headers.

`What does .isModified do and why do we use it?`

isModified is a built in mongoose function which checks an input against the data that is saved in the database and returns a boolean. We're using it here to allow us to check if the user has changed their password so that if they do we can resave it.

` What are the pros and cons of setting res.cookie?`

Setting a cookie allows you to persist the users log in acrossed multiple pages but doing that is not very secure.