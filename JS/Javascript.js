
//--------------------------------- Tower of HANOI -----------------------------------------
// Created by Muhammad Abdullah & Awais Ali
// Students of Bahria Univeristy Islamabad Campus - Department of Computer Science (BsCS)
//------------------------------------------------------------------------------------------

// Arrays are generated
first = new Array();
second = new Array();
third = new Array();

var checkDiv = null;
tryGame = 0;
won = false;

first.push(["Circle4", 4]);
first.push(["Circle3", 3]);
first.push(["Circle2", 2]);
first.push(["Circle1", 1]);

// Initializes all elements into the array, there are nested arrays

function buildStacks() {
	try {
		for (var i = 0; i < first.length; i++) {
			var html = '<div class="element' + i + ' stack1element" id="' + first[i][0] + '"></div>';
			//var html = '<li class="ui-state-default"><div id="'+first[i]+'"></div></li>';
			$("#stack1").append(html);
		}
		for (var i = 0; i < second.length; i++) {
			var html = '<div class="element' + i + ' stack2element" id="' + second[i][0] + '"></div>';
			//var html = '<li class="ui-state-default"><div id="'+second[i]+'"></div></li>';
			$("#stack2").append(html);
		}
		for (var i = 0; i < third.length; i++) {
			var html = '<div class="element' + i + ' stack3element" id="' + third[i][0] + '"></div>';
			//var html = '<li class="ui-state-default"><div id="'+third[i]+'"></div></li>';
			$("#stack3").append(html);
		} // Creates the Circles
		for (var i = 0; i < 1; i++) {
			var html = '<p id="counter">Moves:</p><p id="counterout">' + tryGame + '</p>';
			//var html = '<li class="ui-state-default"><div id="'+third[i]+'"></div></li>';
			$("#counterbox").append(html);
		}  // Creates the Counter Box
		if (won == true) {
			var html = '<div id="winbox"><p id="wintext">You have won</p><p class="wintextunter">with ' + tryGame + ' moves!</p>' +
				'<p class="wintextunter">Do you want to play again?</p>' + '<input class="selectbuttons" onclick="reset()" type="button" value="Yes"/>' +
				'<input style="margin-left:10px;" class="selectbuttons" onclick="" type="button" value="No"/>' + '</div>';
			$("#oberdiv").append(html);
		}
		console.log(first.length)

		// makes the elements of the stack draggable

		if (first.length != 0) {
			$("#" + first[(first.length - 1)][0] + ".stack1element").draggable({ revert: true });
		}
		if (second.length != 0) {
			$("#" + second[(second.length - 1)][0] + ".stack2element").draggable({ revert: true });
		}
		if (third.length != 0) {
			$("#" + third[(third.length - 1)][0] + ".stack3element").draggable({ revert: true });
		}


		$("#stack3").droppable({
			drop: function (ui, event) {
				if ($(".ui-draggable-dragging").is(".stack1element") == true) {
					ganzrechts();
				}
				if ($(".ui-draggable-dragging").hasClass("stack2element") == true) {
					brechts2();
				}
			}
		});

		$("#stack2").droppable({
			drop: function (ui, event) {
				if ($(".ui-draggable-dragging").hasClass("stack3element") == true) {
					blinks3();
				}
				if ($(".ui-draggable-dragging").hasClass("stack1element") == true) {
					brechts1();
				}
			}
		});

		$("#stack1").droppable({ // makes the elements of the stack dropppable.
			drop: function (ui, event) {
				if ($(".ui-draggable-dragging").hasClass("stack3element") == true) {
					ganzlinks();
				}
				if ($(".ui-draggable-dragging").hasClass("stack2element") == true) {
					blinks2();
				}
			}
		});
	}
	catch (e) {
		console.log(e);
	}
}

// Reset Everything

function reset() {
	first = new Array();
	second = new Array();
	third = new Array();
	tryGame = 0;
	won = false;
	first.push(["Circle4", 4]);
	first.push(["Circle3", 3]);
	first.push(["Circle2", 2]);
	first.push(["Circle1", 1]);
	$('#oberdiv').load('ajax.html', function () {
		buildStacks();
	});
}

function brechts1() {
	if (first.length > 0) {
		checkint = true;
		second.push(first[first.length - 1]);
		console.log(first[first.length - 1] + " to Second, Total(first):" + first);
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(first, second, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			first.pop();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (first.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of second: " + second);
}

function blinks2() {
	if (second.length > 0) {
		checkint = true;
		first.push(second[second.length - 1]);
		console.log(second[second.length - 1] + " to First, Total(second): " + second);
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(second, first, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			second.pop();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (second.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of first: " + first);
}

function brechts2() {
	if (second.length > 0) {
		checkint = true;
		third.push(second[second.length - 1]);
		console.log(second[second.length - 1] + " to Third, Total(second): " + second);
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(second, third, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			second.pop();
			hastduwon();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (second.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of third:" + third);
}

function blinks3() {
	if (third.length > 0) {
		checkint = true;
		second.push(third[third.length - 1]);
		console.log(third[third.length - 1] + " to Second, Total(third): " + third);
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(third, second, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			third.pop();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (third.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of second: " + second);
}

function ganzrechts() {
	if (first.length > 0) {
		checkint = true;
		third.push(first[first.length - 1]);
		console.log(first[first.length - 1] + " to Third, Total(first): " + first);
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(first, third, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			first.pop();
			hastduwon();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (first.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of third: " + third);
}

function ganzlinks() {
	if (third.length > 0) {
		checkint = true;
		first.push(third[third.length - 1]);
		console.log(third[third.length - 1] + " to First, Total(third): " + third)
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(third, first, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++
			third.pop();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	}
	else if (third.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of first: " + first);
}


// The recurrence algorithm function
function solveHanoi(n, source, destination, auxiliary) {
	if (n === 1) {
		moveDisk(source, destination);
	} else {
		solveHanoi(n - 1, source, auxiliary, destination);
		moveDisk(source, destination);
		solveHanoi(n - 1, auxiliary, destination, source);
	}
}

// Move disk from source to destination
function moveDisk(source, destination) {
	if (source.length > 0) {
		checkint = true;
		destination.push(source[source.length - 1]);
		console.log(source[source.length - 1] + " to " + destination + ", Total(" + source + ")");
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
		check(source, destination, checkint);
		console.log(checkint);
		if (checkint == true) {
			tryGame++;
			source.pop();
			hastduwon();
			$('#oberdiv').load('ajax.html', function () {
				buildStacks();
			});
		}
	} else if (source.length == 0) {
		console.log("Array is empty, nothing will be moved");
	}
	console.log("Amount of " + destination + ": " + destination);
}
//checks if the rules are followed

function check(ary, nextary) {
	console.log(ary[ary.length - 1][1]);
	console.log(nextary[nextary.length - 1][1])
	if (nextary.length > 1) {
		if (ary[ary.length - 1][1] > nextary[nextary.length - 2][1]) {
			console.log("Not possible, the circle being moved is larger than the next one");
			nextary.pop();
			checkint = false;
		}
		else {
			console.log("test23551")
		}
	}
}

// check if the player has won or not

function hastduwon() {
	if (third.length == 4) {
		console.log("You have won and it took you " + tryGame + " tries");
		won = true;
		$('#oberdiv').load('ajax.html', function () {
			buildStacks();
		});
	}
}

// Call the solveHanoi function with the number of disks to solve the puzzle
solveHanoi(first.length, first, third, second);
