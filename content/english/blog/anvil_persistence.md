---
title: "Anvil Persistence"
date: 2024-10-18T11:17:53+01:00
author: Owen
draft: true
---
## A Common Pattern
In many of the apps we create with Anvil, we find a common pattern that crops up repeatedly...

We need to store data in Anvil's data tables, retrieve it and display a list of existing records and then allow users to update and delete those records as well as create new ones.

We also often find that there is a difference between the data we want to store and the data we want to display - e.g. we might want to store a date as a Python `datetime` object but display it as a string in whatever format the user prefers.

Often, especially if the number of records is large, the user wants to filter, sort and search the records and we want that to work quickly and efficiently.

And, like all good programmers, as soon as we spot a repeating pattern, we want to abstract it away to something we can reuse rather than writing the same code over and over again.

There are several approaches to that problem. Let's have a look at a few of those and see what we've settled on as our preferred solution...

## Approach 1: Data Tables Rows and Data Grids
Anvil's docs and tutorials show how to use Data Tables Rows and Data Grids to retrieve and display data. Those are built-in components that are easy to use and work well for many applications.

It's also a reasonably efficient system - if a server side function returns a Data Tables `SearchIterator` object, the DataGrid component handles the pagination and only fetches the data it needs to display.

However, they don't meet all our needs out of the box and we still have to handle the conversion between the data we want to store and the data we want to display. We also have to write code to handle filtering, sorting and searching the data.

## Approach 2: Custom Serialisation
We can write serialisation and de-serialisation functions on the server side to convert between the data we want to store and the data we want to display.
Typically, those would convert between a Data Tables `Row` object and a dictionary of values and our server functions would return lists of those dictionaries.

However, those are almost always bespoke to the specific app we're working on and we can't easily reuse them in other apps. We also lose the lazy-loading and pagination that the SearchIterator provides - and there's no way we can create our own iterator for those serialised dictionaries.

## Approach 3: Portable Classes
Anvil has the `anvil.server.portable_class` decorator that us to define a class that can be serialised and de-serialised automatically by Anvil. We can use that to define a class that represents the data we want to store and the data we want to display and write methods on that class to handle the conversion between the two.

That's a solution that moves towards what's common in other web frameworks - a model layer where instances of classes we define are passed around within client side code and UI components can bind to their properties.

However, similar to Approach #2, we lose the lazy-loading and pagination that the SearchIterator provides - and there's no way we can create our own iterator for those portable classes.

## Our Approach: Persistence, Tabulator and Views
We've settled on a pattern that uses the Anvil Extras' `persistence` module, the `Tabulator` custom component and Anvil's Data Tables Views.

The `persistence` module allows to create model layer classes, much like the portable classes in Approach #3 but, crucially, those classes are instantiated from a Data Tables `Row` instance and it's the `Row` object that's passed between server and client. That means we can take advantage of the lazy-loading capability of the `SearchIterator` or a client readable view.

Any conversion between what's stored in the row and what we want to display is handled, much like in Approach #3, by methods on the model class.

Instead of Anvil's DataGrid component, we use Tabulator. It has a lot of features that we find useful - especially the ability to filter, sort and search the data on the client side. It also has a lot of customisation options that allow us to make the table look and behave exactly as we want.

If we return a client readable view from a server side function, we can bind the Tabulator component to that view and it will handle the pagination and lazy-loading for us.

If we go one step further, we can pass our model class to tabulator as a 'mutator' and it will instantiate model objects from rows dynamically as it needs to display them.


