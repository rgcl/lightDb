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

## Usage

lightDb is a Dojo-centrist

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

## Licence

MIT Licence