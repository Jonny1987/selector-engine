var $ = function(selector) {
    var elements = [];

    function fillArrays() {
        //remove blank first entry in words array that may be their due to the split function
        if (words[0] === "") {
            words.shift();
        }

        //record the selector charactor which is at the beginning of the selector string. 
        //if no selector character at front then it is implicitely 
        //a space (and thus a tag selector type)
        if ((pos = tempSelector.search(/#|\./)) === 0) {
            types.push(tempSelector.charAt(pos));
            tempSelector = replaceCharsWithZeros(tempSelector, pos);
        } else {
            types.push("");
        }

        //find the order of remaining selector characters and save them in the array types
        do {
            pos = tempSelector.search(/#|\./);
            if (pos !== -1) {
                types.push(tempSelector.charAt(pos));
                tempSelector = replaceCharsWithZeros(tempSelector, pos);
            }
        } while (pos !== -1)

    }

    function findElements() {

        var temp = [];

        elements.push(document);

        for (var i = 0; i < types.length; i++) {

            if (types[i] === "") {
                for (var j = 0; j < elements.length; j++) {
                    //include current element if matches tag name
                    if (elements[j].tagName === words[i]) {
                        temp.push(elements[j]);
                    }
                    //find descendents that match
                    for (var k = 0; k < elements[j].getElementsByTagName(words[i]).length; k++) {
                        temp.push(elements[j].getElementsByTagName(words[i])[k]);
                    }
                }
            } else if (types[i] === ".") {
                for (var j = 0; j < elements.length; j++) {
                    //include current element if matches tag name
                    if (hasClass(elements[j], words[i])) {
                        temp.push(elements[j]);
                    }
                    //find descendents that match
                    for (var k = 0; k < elements[j].getElementsByClassName(words[i]).length; k++) {
                        temp.push(elements[j].getElementsByClassName(words[i])[k]);
                    }
                }
            } else if (types[i] === "#") {
                var elementWithId = document.getElementById(words[i]);
                if (elements.indexOf(elementWithId) !== -1 || i === 0) {
                    temp.push(elementWithId);
                }
            }

            elements = temp;
            temp = [];
        }
    }

    function replaceCharsWithZeros(string, position) {
        string = string.substring(0, position) + "0" + string.substring(position + 1, string.length);
        return string;
    }

    function hasClass(elementName, nameOfClass) {
        if (elementName.className === undefined) {
            return false;
        };
        var classArray = elementName.className.split(" ");
        if (classArray.indexOf(nameOfClass) !== -1) {
            return true
        };
        return false;
    }

    //FIRST TASK IS TO CREATE ARRAYS CORRESPONDING TO THE SUB-SELECTORS AND THEIR TYPE
    var words = selector.split(/#|\./),
        types = [];

    var tempSelector = selector,
        result,
        pos;

    fillArrays();

    //NEXT TASK IS TO SEARCH THE DOM FOR THESE ELEMENTS
    findElements();


    return elements;

}
