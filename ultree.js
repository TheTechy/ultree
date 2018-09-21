/*
	*	ultree v1.0.1
	*	© 2018 George Duff
	* 	Release date: 20/09/2018
	*	The MIT License (MIT)
	*	Copyright (c) 2018 George Duff
	*	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	*	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	*	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Array.from polyfill - Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// The length property of the from method is 1.
		return function from(arrayLike/*, mapFn, thisArg */) {
			// 1. Let C be the this value.
			var C = this;
			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);
			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}
			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}
				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}
			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);
			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method 
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);
			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}

(function() {
	"use strict";
    function define_ultree() {
		var ultree = {};

		ultree.search = function(searchData) {
			// error handling
			if(typeof searchData.listId === 'undefined' || typeof searchData.listId === null) {
				throw('Error: Missing id for unordered list!');
			};

			if(typeof searchData.searchValue === 'undefined' || typeof searchData.searchValue === null) {
				throw('Error: Missing searchValue!');
			};

			let liElems = document.getElementById(searchData.listId).getElementsByTagName('LI');
			let searchValue = searchData.searchValue.toLowerCase();
			let toggleBtns = new Array();
			let foundLiNodes = new Array();
			for (let index = 0; index < liElems.length; index++) {
				let tempVal = liElems[index].innerText.toLowerCase();
				if(tempVal.indexOf(searchValue) > -1 && liElems[index].firstChild.tagName != 'DIV') { // Found the node
					foundLiNodes.push(liElems[index]);
					// create a temp node list to toggle/click as when you 'click' a div, it makes that the element again
					let element = liElems[index];
					while(element = element.parentNode) {
						if(element.firstChild.tagName == 'DIV') {
							toggleBtns.push(element.firstChild.id);
						};
					};
				// } else if(liElems[index].innerText.indexOf(searchValue) > -1) {
				} else if(tempVal.indexOf(searchValue) > -1) {
					foundLiNodes.push(liElems[index]);
					let element = liElems[index];
					while(element = element.parentNode) {
						if(element.firstChild.tagName == 'DIV') {
							toggleBtns.push(element.firstChild.id);
						};
					};
				}	
			};

			// Remove any button duplicates
			toggleBtns = toggleBtns.filter(function(item, index){
				return toggleBtns.indexOf(item) >= index;
			});
			
			// now toggle the relevant buttons to path
			for (let index = 0; index < toggleBtns.length; index++) {
				if(!document.getElementById(toggleBtns[index]).classList.contains('ultree-list-open')) {
					document.getElementById(toggleBtns[index]).click();
				}
			};
		};

		ultree.openAll = function(listId){
			let classList = document.getElementById(listId).getElementsByClassName('ultree-closed');
			Array.from(classList).forEach(element => {
				if(!document.getElementById(element.id).classList.contains('ultree-list-open')) {
					document.getElementById(element.id).click();
				}
			});
		};

		ultree.closeAll = function(listId){
			let classList = document.getElementById(listId).getElementsByClassName('ultree-list-open');
			Array.from(classList).forEach(element => {
				document.getElementById(element.id).click();
			});
		};

		ultree.filterTree = function(filterData) {
			// error handling
			if(typeof filterData.listId === 'undefined' || typeof filterData.listId === null) {
				throw('Error: Missing id for unordered list!');
			};

			if(typeof filterData.filterValue === 'undefined' || typeof filterData.filterValue === null) {
				throw('Error: Missing filterValue!');
			};

			let filterValue = filterData.filterValue.toLowerCase();
			this.openAll(filterData.listId)
			let liElems = document.getElementById(filterData.listId).getElementsByTagName('LI');
			for (let i = 0; i < liElems.length; i++) {
				let tempVal = liElems[i].innerText.toLowerCase();
				if (tempVal.indexOf(filterValue) > -1) {
					liElems[i].style.display = "";
				} else {
					liElems[i].style.display = "none";
				}
			}
		};

		// var padLists = function(listId) {
		ultree.padLists = function(listId) {
			var i, li = document.getElementById(listId).getElementsByTagName("LI");
			var ul = document.getElementById(listId).getElementsByTagName("UL");
			
			for(i=0; i<ul.length; i++) {
				ul[i].classList.add('ultree-ul');
			}

			// ** Here add bullet point, order number or nothing
			for(i=1; i<li.length; i++) {
				if(li[i].childNodes.length < 2) {
					if(this.bullet != null) {
						li[i].innerHTML = this.bullet + ' ' + li[i].innerText
					} 
				}
			}
		};

        ultree.createTree = function(listId, bulletPoint) {
			document.getElementById(listId).style.display = "none;"
			var i, j, curElem, ulCount, listItems = document.getElementById(listId).getElementsByTagName('LI'); //this should be the main parent
			for(i=0; i<listItems.length; i++) {
				if(listItems[i].id.length > 0) {
					curElem = document.getElementById(listItems[i].id);
                    ulCount = document.getElementById(listItems[i].id).getElementsByTagName("UL");
                    if(ulCount.length > 0){
                        for(j=0; j<ulCount.length; j++) {
                            if(ulCount[j].nodeName == "UL") {
                                break;
                            }
                        }
                        ulCount[j].setAttribute('class', 'ultree-collapsed');
                        var tglDiv = document.createElement("div");
                        tglDiv.setAttribute('class', 'ultree-closed');
                        tglDiv.setAttribute("id", listItems[i].id + i +'_tgl');
                        curElem.insertBefore(tglDiv, curElem.childNodes[0]);

                        document.getElementById(listItems[i].id + i +'_tgl').addEventListener('click', function(e) {
                            document.getElementById(e.target.id).classList.toggle('ultree-list-open');
                            document.getElementById(e.target.id).parentElement.lastElementChild.classList.toggle('ultree-open');
                            e.stopPropagation();
                        },true);
                    }
                } else {
					listItems[i].setAttribute("id", listId+"tmp"+i);
					curElem = document.getElementById(listId+"tmp"+i);
					ulCount = document.getElementById(listItems[i].id).getElementsByTagName("UL");

					if(ulCount.length > 0) { //There is a nested UL in this LI element, now find the position of the UL
						for(j=0; j<ulCount.length; j++) {
							if(ulCount[j].nodeName == "UL") {
								break; //Multiple UL's? //Set class collapseAll here
							}
						}
						ulCount[j].setAttribute('class', 'ultree-collapsed');
						var tglDiv = document.createElement("div");
						tglDiv.setAttribute('class', 'ultree-closed');
						tglDiv.setAttribute("id", listItems[i].id + i +'_tgl');
						curElem.insertBefore(tglDiv, curElem.childNodes[0]);

						document.getElementById(listItems[i].id + i +'_tgl').addEventListener('click', function(e){
							e.stopPropagation();
							document.getElementById(e.target.id).classList.toggle('ultree-list-open');
							document.getElementById(e.target.id).parentElement.lastElementChild.classList.toggle('ultree-open');
						},true);
					}
					listItems[i].removeAttribute("id");
				}
			}
			setTimeout(function() {
				document.getElementById(listId).style.display = "block;"
			}, 99); // stops FOUC!

			this.padLists(listId, bulletPoint);
		};

		ultree.generateTree = function(listData) {
			this.bullet = null; // default to a null

			// error handling
			if(typeof listData.listId === 'undefined' || typeof listData.listId === null) {
				throw('Error: Missing id for unordered list!');
			};

			// Is dom elem an UL?
			if(document.getElementById(listData.listId).tagName !== 'UL') {
				throw('Error: Unordered list not found. ultree only works on unordered lists');
			}

			// Add a bullet point?
			if(listData.bullet !== undefined || listData.bullet != null) {
				if(listData.bullet.slice(-1) !== ' ') { // is there a space at the end?
					this.bullet = listData.bullet + ' ';
				} else {
					this.bullet = listData.bullet;
				}
			} else {
				this.bullet = null;
			}

			// create the tree
			this.createTree(listData.listId);
		};
	return ultree;
    }

	//define the ultree library in the global namespace if it doesn't already exist
	if(typeof(ultree) === 'undefined') {
		window.ultree = define_ultree();
	} else {
		console.log("ultree already defined.");
	}
})();