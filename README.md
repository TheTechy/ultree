# ultree
ultree is a tiny (5kb) native javascript library for creating and managing interactive trees that requires no external libraries such as jQuery.

It wraps around a standard HTML unordered list meaning there is no complex json data structures to learn or coding required to create a interactive tree view.

Because ultree doesn't effect any element of the HTML you are passing it, lists can contain any valid elements such as anchors, divs etc. 

ultree maintains your data integrity so you can be confident your data won't be hidden or modified.

ultree has full search functionality which can interogate multiple nested elements up to 100 deep. There is also a filter function that will filter your list based on a quick text input.

ultree can also programmaitically expand and colapse lists in a single function call.

It also has full control over the bullets used in the list ranging from none to using unicode characters to display simple bullets • or more complex images such as &#129412;

Because each instance of ultree is fully self contained, you can have any number of lists on the same page.

Performance is also critical and ultree takes account of this. It has been tested with lists of up to 15,000 nodes and also tested with a list of over 200 nested child nodes.
***
## Getting started
ultree has two componants, a stylesheet and the javascript library itself.

Begin by downloading the ultree zip file from https://github.com/TheTechy/ultree/archive/master.zip or cloning the repo from this link https://github.com/TheTechy/ultree.git

Once you have the files, create a link to the css file in your HTML page. For example:
```HTML
  <link rel="stylesheet" href="ultree.css"/>
```
Next build your unordered list. This will become your tree.

There is a more detailed explanation in zip file on how to build your unordered list, but here is a quick example. As you can see, it is a standard, nested, unordered list.
```HTML
<ul id='f1teams' class='ultree'>
  <li>Formula One Teams (2018)
    <ul>
      <li>Scuderia Ferrari</li>
      <li>Sahara Force India F1 Team</li>
      <li>Haas F1 Team</li>
      <li>McLaren F1 Team</li>
      <li>Mercedes AMG Petronas Motorsport</li>
      <li>Aston Martin Red Bull Racing</li>
      <li>Renault Sport Formula One Team</li>
      <li>Alfa Romeo Sauber F1 Team</li>
      <li>Red Bull Toro Rosso Honda</li>
      <li>Williams Martini Racing</li>
    </ul>
  </li>
</ul>
```
Once you have your unordered list setup, you can now add the ultree library.
(The hope is to have ultree available via a CDN very soon) Add the file in the usual way via a script tag and point the src to the ultree.min.js (The unminified source is included in the zip file)
```HTML
<script src="ultree.min.js"></script>
```
With your list and script in place, you can now call the generateTree method. This performs an analysis of the unordered list, collates the relevant child node and displays the result inline. Notice in this example, the standard bullet point has been applied. This would match a normal unordered list bullet point.
```HTML
<script>
  ultree.generateTree({
    listId: "f1teams",
    bullet: '&#149;'
  });
</script>
```

And that's all there is to it!

You have just created an interactive tree from simple HTML.
***
# API
ultree's API is simple. There are only five functions:

generateTree  
search  
filterTree  
openAll  
closeAll

## ultree.generateTree
As the name suggest, **generateTree** is the function called to transform your unordered list into an interactive tree. The function takes a javascript object as a single parameter.  
When you search for an item within a tree, ultree will firsly find the item and then traverse up the tree opening parent nodes where applicable.

That function two properties:  
  listId: {Required} String  
  bullet: {Optional} String

listId: The first property is a string which is the id of the unordered list. Any unordered list that you want to change into an interactive tree require a DOM id.  

bullet: This can be any string but you will usually want to use a character icon. The best way to generate an icon is to use unicode characters. A great resource to find unicode characters is amp-what http://www.amp-what.com/unicode/search/ If you omit this parameter, the tree will be built as normal but the list items will not have a bullet point.  

The below example shows how to call ultree.generateTree against a unordered list with an id of 'f1teams'. The example will also add a bullet point [•] to each item.
```HTML
<script>
  ultree.generateTree({
    listId: "f1teams",
    bullet: '&#149;'
  });
</script>
```  
## ultree.search  
The search function takes a javascript object as a single parameter. It has two properties:  
  listId:       {Required} String  
  searchValue:  {Required} String  

listId: The first property is a string which is the id of the unordered list. Any unordered list that you want to change into an interactive tree require a DOM id.  
searchValue: The value that you want to search for.

The below example shows how to call ultree.search against a unordered list with an id of 'f1teams' searching for 'Red Bull.  
```HTML
<script>
  ultree.search({
    listId: 'f1teams',
    searchValue: 'Red Bull'
  });
</script>
```

## ultree.filterTree
The filterTree function takes a javascript object as a single parameter. It has two properties:  
  listId:       {Required} String  
  filterValue:  {Required} String  

listId: The first property is a string which is the id of the unordered list. Any unordered list that you want to change into an interactive tree require a DOM id.  
filterValue: The value that you want to filter for.  

The below example shows how to call ultree.filterTree against a unordered list with an id of 'f1teams' searching for 'Red Bull. It will filter the tree to only display the 'Red Bull' item.  
```HTML
<script>
  ultree.filterTree({
    listId: 'f1teams',
    filterValue: 'Red Bull'
  });
</script>
```
