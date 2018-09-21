# ultree
ultree is a tiny (5kb), javascript library for creating and managing interactive trees.
***

ultree is native javascript library for creating and managing interactive trees that requires no additonal libraries such as jQuery. It wraps around a standard HTML unordered list meaning there is no complex json or coding required to create a tree view. 

Because ultree doesn't effect any element of the HTML list you are passing it, you can use all of the functionality of standard HTML list. So lists can contain any valid HTML elements, such as anchors, divs etc. ultree does not effect any element you create within your unordered list so you can be confident your data won't be hidden or modified.

It's pretty easy to use. To create a tree element, give the UL/OL an id, then simply add another unordered or ordered list as a list item. The text within the list item becomes the heading for that list. 
***


```html
<script src="ultree.min.js"></script>
```
```javascriot
  ultree.generateTree({
    listId: "f1teams",
    bullet: '&#149;'
  });
```
