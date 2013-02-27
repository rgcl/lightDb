# lightDb

A simple wrapper for the HTML5 localStorage.

## Description

### Question 1:
What do if localStorage is not available?

#### Huge response:
Make a complex model to retrieve and save data in a server-side or with a third party plugin, etc etc.

#### Light response:
IE7 is not worthy to my attention, so in that case use a volatile memory instead.

### Question 2:
What if I need more than a storable object?

#### Huge response:
Use IndexedDB with a complex wrapper and an alternative model for those browsers that not support IndexedDB... server-side or with a third party plugin, etc etc.

#### Light response:
Uff, why not use a simple localStorage with a prefix in each key? :)

So,

```
lightDb := Light_response(Question_1, Quiestion_2)
```

## Installation

A simple installation consists of copying and pasting the content of lightDb.js file:
```html
<script src="lightDb.js"></script>
```
This create a global variable called lightDb:

````
<scritp>
    // create a collection for 'Monsters', or calls it if it exists
	var monsters = lightDb.get('Monsters');
</script>
````

You aslo can use the [cpm](https://github.com/kriszyp/cpm)
```
cpm install lightDb
```

Finally, the [RequireJs](https://github.com/jrburke/requirejs) style and AMD (example with [Dojo](https://github.com/dojo/dojo)) style aslo is supported.

```
require(['lightDb'], function(lightDb) {
    // create a collection for 'Monsters', or calls it if it exists
	var monsters = lightDb.get('Monsters');	
});
```

## Usage 
lightDb is a NO-SQL database for the web that use the localStorage for simple and light collections 
of persistent data on the client-side.

In this example, we have a collection of monsters:

```javascript
require(['lightDb'], function(lightDb) {
	
	// create a 'Monsters' collection, or retrive if it exists
	var monsters = lightDb.get('Monsters');
	
	// set a data
	monsters.set('empanao', {
		power: 45,
		health: 56,
		weapons: ['pine', 'egg']
	});
	
	// get a data
	var canela = monsters.get('canela');
	
	// iterate
	monsters.forEach(function(monster, key) {
		// do stuff
		monster.health += 5;
		
		// and save the changes
		monsters.set(key, monster);
		
	});
	
	// drop the collection
	lightDb.remove('Monsters');
	
});
```

## API

###lightDb.get(/* string */ collectionName)
Retrive a collection or create a new collection.

**Parameters:**
* collectionName {string}: The name for the collection use as constant and unique for each collection.

**Return:** {lightDb.Persistent|lightDb.Volatile} a collection instante, this is lightDb.Persistent if localStorage is supported, else lightDb.Volatile for memory collection. 

###lightDb.remove(/* string */ collectionName)
drop the collection.

**Parameters:**
* collectionName {string}: The name for the collection use as constant and unique for each collection.

**Return:** {undefined}

###lightDb.setJsonUtil(/* object */ JSON)
set the JSON utility used for serialize the data.

**Example**
```
require(['lightDb', 'dojo/json'], function(lightDb, JSON) {
	// So, IE 7 also can use lightDb!
	lightDb.setJsonUtil(JSON);	
});
```

**Parameters:**
* JSON {object}: A object that have the parse and stringify method.

**Return:** {undefined}

###{lightDb.Persistent|lightDb.Volatile}.get(/* string */ key)
Retrive the data stored in the collection and associated with that key.

**Parameters:**
* key {string}: The identifier of that data use as constant and unique for each data of its collection.

**Return:** {object} the data

###{lightDb.Persistent|lightDb.Volatile}.set(/* string */ key, /* object */ data)
Set a data stored in the collection.

**Parameters:**
* key {string}: The identifier of that data use as constant and unique for each data of its collection.
* data {object} : The data, an object that can be parsed by JSON.parse

**Return:** {undefined}       

###{lightDb.Persistent|lightDb.Volatile}.remove(/* string */ key)
Remove a data stored in the collection.

**Parameters:**
* key {string}: The identifier of that data use as constant and unique for each data of its collection.

**Return:** {undefined}                           

###{lightDb.Persistent|lightDb.Volatile}.forEach(/* function */ iterator)
Utility for iterar for each data stored in the collection

**Parameters:**
* iterator {function}: Method passes each item. It takes two parameters, the first is the data and the second is the key

**Return:** {undefined}

## TODO

* Make test
* Learn English :)

## Licence

The MIT License (MIT)
Copyright (c) 2013 sapienlab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.