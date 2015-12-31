var globalProps = [ ];

function readGlobalProps() {
    globalProps = Object.getOwnPropertyNames( window );
}

function findNewEntries() {
    var currentPropList = Object.getOwnPropertyNames( window );
    return currentPropList.filter( findDuplicate );

    function findDuplicate( propName ) {
        return globalProps.indexOf( propName ) === -1;
    }
}

readGlobalProps();

var code_to_execute = 'a = 10;' ;
var script = document.createElement('script');script.innerHTML = code_to_execute;document.head.appendChild(script);var elements = findNewEntries();window.elements.forEach(function(elem){ document.write(elem + '=' + eval(elem)); });
