/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/helpers.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/helpers.js":
/*!***********************!*\
  !*** ./js/helpers.js ***!
  \***********************/
/*! exports provided: Helpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Helpers\", function() { return Helpers; });\nfunction _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n// Constants\nvar TRANS_EVENTS = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'];\nvar TRANS_PROPERTIES = ['transition', 'MozTransition', 'webkitTransition', 'WebkitTransition', 'OTransition'];\nvar INLINE_STYLES = \"\\n.layout-menu-fixed .layout-navbar-full .layout-menu,\\n.layout-page {\\n  padding-top: {navbarHeight}px !important;\\n}\\n.content-wrapper {\\n  padding-bottom: {footerHeight}px !important;\\n}\"; // Guard\n\nfunction requiredParam(name) {\n  throw new Error(\"Parameter required\".concat(name ? \": `\".concat(name, \"`\") : ''));\n}\n\nvar Helpers = {\n  // Root Element\n  ROOT_EL: typeof window !== 'undefined' ? document.documentElement : null,\n  // Large screens breakpoint\n  LAYOUT_BREAKPOINT: 1200,\n  // Resize delay in milliseconds\n  RESIZE_DELAY: 200,\n  menuPsScroll: null,\n  mainMenu: null,\n  // Internal variables\n  _curStyle: null,\n  _styleEl: null,\n  _resizeTimeout: null,\n  _resizeCallback: null,\n  _transitionCallback: null,\n  _transitionCallbackTimeout: null,\n  _listeners: [],\n  _initialized: false,\n  _autoUpdate: false,\n  _lastWindowHeight: 0,\n  // *******************************************************************************\n  // * Utilities\n  // ---\n  // Scroll To Active Menu Item\n  _scrollToActive: function _scrollToActive() {\n    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;\n    var layoutMenu = this.getLayoutMenu();\n    if (!layoutMenu) return;\n    var activeEl = layoutMenu.querySelector('li.menu-item.active:not(.open)');\n\n    if (activeEl) {\n      // t = current time\n      // b = start value\n      // c = change in value\n      // d = duration\n      var easeInOutQuad = function easeInOutQuad(t, b, c, d) {\n        t /= d / 2;\n        if (t < 1) return c / 2 * t * t + b;\n        t -= 1;\n        return -c / 2 * (t * (t - 2) - 1) + b;\n      };\n\n      var element = this.getLayoutMenu().querySelector('.menu-inner');\n\n      if (typeof activeEl === 'string') {\n        activeEl = document.querySelector(activeEl);\n      }\n\n      if (typeof activeEl !== 'number') {\n        activeEl = activeEl.getBoundingClientRect().top + element.scrollTop;\n      } // If active element's top position is less than 2/3 (66%) of menu height than do not scroll\n\n\n      if (activeEl < parseInt(element.clientHeight * 2 / 3, 10)) return;\n      var start = element.scrollTop;\n      var change = activeEl - start - parseInt(element.clientHeight / 2, 10);\n      var startDate = +new Date();\n\n      if (animate === true) {\n        var animateScroll = function animateScroll() {\n          var currentDate = +new Date();\n          var currentTime = currentDate - startDate;\n          var val = easeInOutQuad(currentTime, start, change, duration);\n          element.scrollTop = val;\n\n          if (currentTime < duration) {\n            requestAnimationFrame(animateScroll);\n          } else {\n            element.scrollTop = change;\n          }\n        };\n\n        animateScroll();\n      } else {\n        element.scrollTop = change;\n      }\n    }\n  },\n  // ---\n  // Add classes\n  _addClass: function _addClass(cls) {\n    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;\n\n    if (el.length !== undefined) {\n      // Add classes to multiple elements\n      el.forEach(function (e) {\n        cls.split(' ').forEach(function (c) {\n          return e.classList.add(c);\n        });\n      });\n    } else {\n      // Add classes to single element\n      cls.split(' ').forEach(function (c) {\n        return el.classList.add(c);\n      });\n    }\n  },\n  // ---\n  // Remove classes\n  _removeClass: function _removeClass(cls) {\n    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;\n\n    if (el.length !== undefined) {\n      // Remove classes to multiple elements\n      el.forEach(function (e) {\n        cls.split(' ').forEach(function (c) {\n          return e.classList.remove(c);\n        });\n      });\n    } else {\n      // Remove classes to single element\n      cls.split(' ').forEach(function (c) {\n        return el.classList.remove(c);\n      });\n    }\n  },\n  // Toggle classes\n  _toggleClass: function _toggleClass() {\n    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ROOT_EL;\n    var cls1 = arguments.length > 1 ? arguments[1] : undefined;\n    var cls2 = arguments.length > 2 ? arguments[2] : undefined;\n\n    if (el.classList.contains(cls1)) {\n      el.classList.replace(cls1, cls2);\n    } else {\n      el.classList.replace(cls2, cls1);\n    }\n  },\n  // ---\n  // Has class\n  _hasClass: function _hasClass(cls) {\n    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;\n    var result = false;\n    cls.split(' ').forEach(function (c) {\n      if (el.classList.contains(c)) result = true;\n    });\n    return result;\n  },\n  _findParent: function _findParent(el, cls) {\n    if (el && el.tagName.toUpperCase() === 'BODY' || el.tagName.toUpperCase() === 'HTML') return null;\n    el = el.parentNode;\n\n    while (el && el.tagName.toUpperCase() !== 'BODY' && !el.classList.contains(cls)) {\n      el = el.parentNode;\n    }\n\n    el = el && el.tagName.toUpperCase() !== 'BODY' ? el : null;\n    return el;\n  },\n  // ---\n  // Trigger window event\n  _triggerWindowEvent: function _triggerWindowEvent(name) {\n    if (typeof window === 'undefined') return;\n\n    if (document.createEvent) {\n      var event;\n\n      if (typeof Event === 'function') {\n        event = new Event(name);\n      } else {\n        event = document.createEvent('Event');\n        event.initEvent(name, false, true);\n      }\n\n      window.dispatchEvent(event);\n    } else {\n      window.fireEvent(\"on\".concat(name), document.createEventObject());\n    }\n  },\n  // ---\n  // Trigger event\n  _triggerEvent: function _triggerEvent(name) {\n    this._triggerWindowEvent(\"layout\".concat(name));\n\n    this._listeners.filter(function (listener) {\n      return listener.event === name;\n    }).forEach(function (listener) {\n      return listener.callback.call(null);\n    });\n  },\n  // ---\n  // Update style\n  _updateInlineStyle: function _updateInlineStyle() {\n    var navbarHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var footerHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n    if (!this._styleEl) {\n      this._styleEl = document.createElement('style');\n      this._styleEl.type = 'text/css';\n      document.head.appendChild(this._styleEl);\n    }\n\n    var newStyle = INLINE_STYLES.replace(/\\{navbarHeight\\}/gi, navbarHeight).replace(/\\{footerHeight\\}/gi, footerHeight);\n\n    if (this._curStyle !== newStyle) {\n      this._curStyle = newStyle;\n      this._styleEl.textContent = newStyle;\n    }\n  },\n  // ---\n  // Remove style\n  _removeInlineStyle: function _removeInlineStyle() {\n    if (this._styleEl) document.head.removeChild(this._styleEl);\n    this._styleEl = null;\n    this._curStyle = null;\n  },\n  // ---\n  // Redraw layout menu (Safari bugfix)\n  _redrawLayoutMenu: function _redrawLayoutMenu() {\n    var layoutMenu = this.getLayoutMenu();\n\n    if (layoutMenu && layoutMenu.querySelector('.menu')) {\n      var inner = layoutMenu.querySelector('.menu-inner');\n      var scrollTop = inner.scrollTop;\n      var pageScrollTop = document.documentElement.scrollTop;\n      layoutMenu.style.display = 'none'; // layoutMenu.offsetHeight\n\n      layoutMenu.style.display = '';\n      inner.scrollTop = scrollTop;\n      document.documentElement.scrollTop = pageScrollTop;\n      return true;\n    }\n\n    return false;\n  },\n  // ---\n  // Check for transition support\n  _supportsTransitionEnd: function _supportsTransitionEnd() {\n    if (window.QUnit) return false;\n    var el = document.body || document.documentElement;\n    if (!el) return false;\n    var result = false;\n    TRANS_PROPERTIES.forEach(function (evnt) {\n      if (typeof el.style[evnt] !== 'undefined') result = true;\n    });\n    return result;\n  },\n  // ---\n  // Calculate current navbar height\n  _getNavbarHeight: function _getNavbarHeight() {\n    var _this = this;\n\n    var layoutNavbar = this.getLayoutNavbar();\n    if (!layoutNavbar) return 0;\n    if (!this.isSmallScreen()) return layoutNavbar.getBoundingClientRect().height; // Needs some logic to get navbar height on small screens\n\n    var clonedEl = layoutNavbar.cloneNode(true);\n    clonedEl.id = null;\n    clonedEl.style.visibility = 'hidden';\n    clonedEl.style.position = 'absolute';\n    Array.prototype.slice.call(clonedEl.querySelectorAll('.collapse.show')).forEach(function (el) {\n      return _this._removeClass('show', el);\n    });\n    layoutNavbar.parentNode.insertBefore(clonedEl, layoutNavbar);\n    var navbarHeight = clonedEl.getBoundingClientRect().height;\n    clonedEl.parentNode.removeChild(clonedEl);\n    return navbarHeight;\n  },\n  // ---\n  // Get current footer height\n  _getFooterHeight: function _getFooterHeight() {\n    var layoutFooter = this.getLayoutFooter();\n    if (!layoutFooter) return 0;\n    return layoutFooter.getBoundingClientRect().height;\n  },\n  // ---\n  // Get animation duration of element\n  _getAnimationDuration: function _getAnimationDuration(el) {\n    var duration = window.getComputedStyle(el).transitionDuration;\n    return parseFloat(duration) * (duration.indexOf('ms') !== -1 ? 1 : 1000);\n  },\n  // ---\n  // Set menu hover state\n  _setMenuHoverState: function _setMenuHoverState(hovered) {\n    this[hovered ? '_addClass' : '_removeClass']('layout-menu-hover');\n  },\n  // ---\n  // Toggle collapsed\n  _setCollapsed: function _setCollapsed(collapsed) {\n    var _this2 = this;\n\n    if (this.isSmallScreen()) {\n      if (collapsed) {\n        this._removeClass('layout-menu-expanded');\n      } else {\n        setTimeout(function () {\n          _this2._addClass('layout-menu-expanded');\n        }, this._redrawLayoutMenu() ? 5 : 0);\n      }\n    }\n  },\n  // ---\n  // Add layout sivenav toggle animationEnd event\n  _bindLayoutAnimationEndEvent: function _bindLayoutAnimationEndEvent(modifier, cb) {\n    var _this3 = this;\n\n    var menu = this.getMenu();\n    var duration = menu ? this._getAnimationDuration(menu) + 50 : 0;\n\n    if (!duration) {\n      modifier.call(this);\n      cb.call(this);\n      return;\n    }\n\n    this._transitionCallback = function (e) {\n      if (e.target !== menu) return;\n\n      _this3._unbindLayoutAnimationEndEvent();\n\n      cb.call(_this3);\n    };\n\n    TRANS_EVENTS.forEach(function (e) {\n      menu.addEventListener(e, _this3._transitionCallback, false);\n    });\n    modifier.call(this);\n    this._transitionCallbackTimeout = setTimeout(function () {\n      _this3._transitionCallback.call(_this3, {\n        target: menu\n      });\n    }, duration);\n  },\n  // ---\n  // Remove layout sivenav toggle animationEnd event\n  _unbindLayoutAnimationEndEvent: function _unbindLayoutAnimationEndEvent() {\n    var _this4 = this;\n\n    var menu = this.getMenu();\n\n    if (this._transitionCallbackTimeout) {\n      clearTimeout(this._transitionCallbackTimeout);\n      this._transitionCallbackTimeout = null;\n    }\n\n    if (menu && this._transitionCallback) {\n      TRANS_EVENTS.forEach(function (e) {\n        menu.removeEventListener(e, _this4._transitionCallback, false);\n      });\n    }\n\n    if (this._transitionCallback) {\n      this._transitionCallback = null;\n    }\n  },\n  // ---\n  // Bind delayed window resize event\n  _bindWindowResizeEvent: function _bindWindowResizeEvent() {\n    var _this5 = this;\n\n    this._unbindWindowResizeEvent();\n\n    var cb = function cb() {\n      if (_this5._resizeTimeout) {\n        clearTimeout(_this5._resizeTimeout);\n        _this5._resizeTimeout = null;\n      }\n\n      _this5._triggerEvent('resize');\n    };\n\n    this._resizeCallback = function () {\n      if (_this5._resizeTimeout) clearTimeout(_this5._resizeTimeout);\n      _this5._resizeTimeout = setTimeout(cb, _this5.RESIZE_DELAY);\n    };\n\n    window.addEventListener('resize', this._resizeCallback, false);\n  },\n  // ---\n  // Unbind delayed window resize event\n  _unbindWindowResizeEvent: function _unbindWindowResizeEvent() {\n    if (this._resizeTimeout) {\n      clearTimeout(this._resizeTimeout);\n      this._resizeTimeout = null;\n    }\n\n    if (this._resizeCallback) {\n      window.removeEventListener('resize', this._resizeCallback, false);\n      this._resizeCallback = null;\n    }\n  },\n  _bindMenuMouseEvents: function _bindMenuMouseEvents() {\n    var _this6 = this;\n\n    if (this._menuMouseEnter && this._menuMouseLeave && this._windowTouchStart) return;\n    var layoutMenu = this.getLayoutMenu();\n    if (!layoutMenu) return this._unbindMenuMouseEvents();\n\n    if (!this._menuMouseEnter) {\n      this._menuMouseEnter = function () {\n        if (_this6.isSmallScreen() || _this6._hasClass('layout-transitioning')) {\n          return _this6._setMenuHoverState(false);\n        }\n\n        return _this6._setMenuHoverState(false);\n      };\n\n      layoutMenu.addEventListener('mouseenter', this._menuMouseEnter, false);\n      layoutMenu.addEventListener('touchstart', this._menuMouseEnter, false);\n    }\n\n    if (!this._menuMouseLeave) {\n      this._menuMouseLeave = function () {\n        _this6._setMenuHoverState(false);\n      };\n\n      layoutMenu.addEventListener('mouseleave', this._menuMouseLeave, false);\n    }\n\n    if (!this._windowTouchStart) {\n      this._windowTouchStart = function (e) {\n        if (!e || !e.target || !_this6._findParent(e.target, '.layout-menu')) {\n          _this6._setMenuHoverState(false);\n        }\n      };\n\n      window.addEventListener('touchstart', this._windowTouchStart, true);\n    }\n  },\n  _unbindMenuMouseEvents: function _unbindMenuMouseEvents() {\n    if (!this._menuMouseEnter && !this._menuMouseLeave && !this._windowTouchStart) return;\n    var layoutMenu = this.getLayoutMenu();\n\n    if (this._menuMouseEnter) {\n      if (layoutMenu) {\n        layoutMenu.removeEventListener('mouseenter', this._menuMouseEnter, false);\n        layoutMenu.removeEventListener('touchstart', this._menuMouseEnter, false);\n      }\n\n      this._menuMouseEnter = null;\n    }\n\n    if (this._menuMouseLeave) {\n      if (layoutMenu) {\n        layoutMenu.removeEventListener('mouseleave', this._menuMouseLeave, false);\n      }\n\n      this._menuMouseLeave = null;\n    }\n\n    if (this._windowTouchStart) {\n      if (layoutMenu) {\n        window.addEventListener('touchstart', this._windowTouchStart, true);\n      }\n\n      this._windowTouchStart = null;\n    }\n\n    this._setMenuHoverState(false);\n  },\n  // *******************************************************************************\n  // * Methods\n  scrollToActive: function scrollToActive() {\n    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n\n    this._scrollToActive(animate);\n  },\n  // ---\n  // Collapse / expand layout\n  setCollapsed: function setCollapsed() {\n    var _this7 = this;\n\n    var collapsed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('collapsed');\n    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n    var layoutMenu = this.getLayoutMenu();\n    if (!layoutMenu) return;\n\n    this._unbindLayoutAnimationEndEvent();\n\n    if (animate && this._supportsTransitionEnd()) {\n      this._addClass('layout-transitioning');\n\n      if (collapsed) this._setMenuHoverState(false);\n\n      this._bindLayoutAnimationEndEvent(function () {\n        // Collapse / Expand\n        if (_this7.isSmallScreen) _this7._setCollapsed(collapsed);\n      }, function () {\n        _this7._removeClass('layout-transitioning');\n\n        _this7._triggerWindowEvent('resize');\n\n        _this7._triggerEvent('toggle');\n\n        _this7._setMenuHoverState(false);\n      });\n    } else {\n      this._addClass('layout-no-transition');\n\n      if (collapsed) this._setMenuHoverState(false); // Collapse / Expand\n\n      this._setCollapsed(collapsed);\n\n      setTimeout(function () {\n        _this7._removeClass('layout-no-transition');\n\n        _this7._triggerWindowEvent('resize');\n\n        _this7._triggerEvent('toggle');\n\n        _this7._setMenuHoverState(false);\n      }, 1);\n    }\n  },\n  // ---\n  // Toggle layout\n  toggleCollapsed: function toggleCollapsed() {\n    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n    this.setCollapsed(!this.isCollapsed(), animate);\n  },\n  // ---\n  // Set layout positioning\n  setPosition: function setPosition() {\n    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('fixed');\n    var offcanvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('offcanvas');\n\n    this._removeClass('layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas');\n\n    if (!fixed && offcanvas) {\n      this._addClass('layout-menu-offcanvas');\n    } else if (fixed && !offcanvas) {\n      this._addClass('layout-menu-fixed');\n\n      this._redrawLayoutMenu();\n    } else if (fixed && offcanvas) {\n      this._addClass('layout-menu-fixed-offcanvas');\n\n      this._redrawLayoutMenu();\n    }\n\n    this.update();\n  },\n  // *******************************************************************************\n  // * Getters\n  getLayoutMenu: function getLayoutMenu() {\n    return document.querySelector('.layout-menu');\n  },\n  getMenu: function getMenu() {\n    var layoutMenu = this.getLayoutMenu();\n    if (!layoutMenu) return null;\n    return !this._hasClass('menu', layoutMenu) ? layoutMenu.querySelector('.menu') : layoutMenu;\n  },\n  getLayoutNavbar: function getLayoutNavbar() {\n    return document.querySelector('.layout-navbar');\n  },\n  getLayoutFooter: function getLayoutFooter() {\n    return document.querySelector('.content-footer');\n  },\n  // *******************************************************************************\n  // * Update\n  update: function update() {\n    if (this.getLayoutNavbar() && (!this.isSmallScreen() && this.isLayoutNavbarFull() && this.isFixed() || this.isNavbarFixed()) || this.getLayoutFooter() && this.isFooterFixed()) {\n      this._updateInlineStyle(this._getNavbarHeight(), this._getFooterHeight());\n    }\n\n    this._bindMenuMouseEvents();\n  },\n  setAutoUpdate: function setAutoUpdate() {\n    var _this8 = this;\n\n    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('enable');\n\n    if (enable && !this._autoUpdate) {\n      this.on('resize.Helpers:autoUpdate', function () {\n        return _this8.update();\n      });\n      this._autoUpdate = true;\n    } else if (!enable && this._autoUpdate) {\n      this.off('resize.Helpers:autoUpdate');\n      this._autoUpdate = false;\n    }\n  },\n  // *******************************************************************************\n  // * Tests\n  isRtl: function isRtl() {\n    return document.querySelector('body').getAttribute('dir') === 'rtl' || document.querySelector('html').getAttribute('dir') === 'rtl';\n  },\n  isMobileDevice: function isMobileDevice() {\n    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;\n  },\n  isSmallScreen: function isSmallScreen() {\n    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < this.LAYOUT_BREAKPOINT;\n  },\n  isLayoutNavbarFull: function isLayoutNavbarFull() {\n    return !!document.querySelector('.layout-wrapper.layout-navbar-full');\n  },\n  isCollapsed: function isCollapsed() {\n    if (this.isSmallScreen()) {\n      return !this._hasClass('layout-menu-expanded');\n    }\n\n    return this._hasClass('layout-menu-collapsed');\n  },\n  isFixed: function isFixed() {\n    return this._hasClass('layout-menu-fixed layout-menu-fixed-offcanvas');\n  },\n  isNavbarFixed: function isNavbarFixed() {\n    return this._hasClass('layout-navbar-fixed') || !this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull();\n  },\n  isFooterFixed: function isFooterFixed() {\n    return this._hasClass('layout-footer-fixed');\n  },\n  isLightStyle: function isLightStyle() {\n    return document.documentElement.classList.contains('light-style');\n  },\n  // *******************************************************************************\n  // * Events\n  on: function on() {\n    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');\n    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('callback');\n\n    var _event$split = event.split('.'),\n        _event$split2 = _slicedToArray(_event$split, 1),\n        _event = _event$split2[0];\n\n    var _event$split3 = event.split('.'),\n        _event$split4 = _toArray(_event$split3),\n        namespace = _event$split4.slice(1); // let [_event, ...namespace] = event.split('.')\n\n\n    namespace = namespace.join('.') || null;\n\n    this._listeners.push({\n      event: _event,\n      namespace: namespace,\n      callback: callback\n    });\n  },\n  off: function off() {\n    var _this9 = this;\n\n    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');\n\n    var _event$split5 = event.split('.'),\n        _event$split6 = _slicedToArray(_event$split5, 1),\n        _event = _event$split6[0];\n\n    var _event$split7 = event.split('.'),\n        _event$split8 = _toArray(_event$split7),\n        namespace = _event$split8.slice(1);\n\n    namespace = namespace.join('.') || null;\n\n    this._listeners.filter(function (listener) {\n      return listener.event === _event && listener.namespace === namespace;\n    }).forEach(function (listener) {\n      return _this9._listeners.splice(_this9._listeners.indexOf(listener), 1);\n    });\n  },\n  // *******************************************************************************\n  // * Life cycle\n  init: function init() {\n    var _this10 = this;\n\n    if (this._initialized) return;\n    this._initialized = true; // Initialize `style` element\n\n    this._updateInlineStyle(0); // Bind window resize event\n\n\n    this._bindWindowResizeEvent(); // Bind init event\n\n\n    this.off('init._Helpers');\n    this.on('init._Helpers', function () {\n      _this10.off('resize._Helpers:redrawMenu');\n\n      _this10.on('resize._Helpers:redrawMenu', function () {\n        // eslint-disable-next-line no-unused-expressions\n        _this10.isSmallScreen() && !_this10.isCollapsed() && _this10._redrawLayoutMenu();\n      }); // Force repaint in IE 10\n\n\n      if (typeof document.documentMode === 'number' && document.documentMode < 11) {\n        _this10.off('resize._Helpers:ie10RepaintBody');\n\n        _this10.on('resize._Helpers:ie10RepaintBody', function () {\n          if (_this10.isFixed()) return;\n          var scrollTop = document.documentElement.scrollTop;\n          document.body.style.display = 'none'; // document.body.offsetHeight\n\n          document.body.style.display = 'block';\n          document.documentElement.scrollTop = scrollTop;\n        });\n      }\n    });\n\n    this._triggerEvent('init');\n  },\n  destroy: function destroy() {\n    var _this11 = this;\n\n    if (!this._initialized) return;\n    this._initialized = false;\n\n    this._removeClass('layout-transitioning');\n\n    this._removeInlineStyle();\n\n    this._unbindLayoutAnimationEndEvent();\n\n    this._unbindWindowResizeEvent();\n\n    this._unbindMenuMouseEvents();\n\n    this.setAutoUpdate(false);\n    this.off('init._Helpers'); // Remove all listeners except `init`\n\n    this._listeners.filter(function (listener) {\n      return listener.event !== 'init';\n    }).forEach(function (listener) {\n      return _this11._listeners.splice(_this11._listeners.indexOf(listener), 1);\n    });\n  },\n  // ---\n  // Init Password Toggle\n  initPasswordToggle: function initPasswordToggle() {\n    var toggler = document.querySelectorAll('.form-password-toggle i');\n\n    if (typeof toggler !== 'undefined' && toggler !== null) {\n      toggler.forEach(function (el) {\n        el.addEventListener('click', function (e) {\n          e.preventDefault();\n          var formPasswordToggle = el.closest('.form-password-toggle');\n          var formPasswordToggleIcon = formPasswordToggle.querySelector('i');\n          var formPasswordToggleInput = formPasswordToggle.querySelector('input');\n\n          if (formPasswordToggleInput.getAttribute('type') === 'text') {\n            formPasswordToggleInput.setAttribute('type', 'password');\n            formPasswordToggleIcon.classList.replace('bx-show', 'bx-hide');\n          } else if (formPasswordToggleInput.getAttribute('type') === 'password') {\n            formPasswordToggleInput.setAttribute('type', 'text');\n            formPasswordToggleIcon.classList.replace('bx-hide', 'bx-show');\n          }\n        });\n      });\n    }\n  },\n  // ---\n  // Init Speech To Text\n  initSpeechToText: function initSpeechToText() {\n    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;\n    var speechToText = document.querySelectorAll('.speech-to-text');\n\n    if (SpeechRecognition !== undefined && SpeechRecognition !== null) {\n      if (typeof speechToText !== 'undefined' && speechToText !== null) {\n        var recognition = new SpeechRecognition();\n        var toggler = document.querySelectorAll('.speech-to-text i');\n        toggler.forEach(function (el) {\n          var listening = false;\n          el.addEventListener('click', function () {\n            el.closest('.input-group').querySelector('.form-control').focus();\n\n            recognition.onspeechstart = function () {\n              listening = true;\n            };\n\n            if (listening === false) {\n              recognition.start();\n            }\n\n            recognition.onerror = function () {\n              listening = false;\n            };\n\n            recognition.onresult = function (event) {\n              el.closest('.input-group').querySelector('.form-control').value = event.results[0][0].transcript;\n            };\n\n            recognition.onspeechend = function () {\n              listening = false;\n              recognition.stop();\n            };\n          });\n        });\n      }\n    }\n  },\n  // Ajax Call Promise\n  ajaxCall: function ajaxCall(url) {\n    return new Promise(function (resolve, reject) {\n      var req = new XMLHttpRequest();\n      req.open('GET', url);\n\n      req.onload = function () {\n        return req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));\n      };\n\n      req.onerror = function (e) {\n        return reject(Error(\"Network Error: \".concat(e)));\n      };\n\n      req.send();\n    });\n  },\n  // ---\n  // SidebarToggle (Used in Apps)\n  initSidebarToggle: function initSidebarToggle() {\n    var sidebarToggler = document.querySelectorAll('[data-bs-toggle=\"sidebar\"]');\n    sidebarToggler.forEach(function (el) {\n      el.addEventListener('click', function () {\n        var target = el.getAttribute('data-target');\n        var overlay = el.getAttribute('data-overlay');\n        var appOverlay = document.querySelectorAll('.app-overlay');\n        var targetEl = document.querySelectorAll(target);\n        targetEl.forEach(function (tel) {\n          tel.classList.toggle('show');\n\n          if (typeof overlay !== 'undefined' && overlay !== null && overlay !== false && typeof appOverlay !== 'undefined') {\n            if (tel.classList.contains('show')) {\n              appOverlay[0].classList.add('show');\n            } else {\n              appOverlay[0].classList.remove('show');\n            }\n\n            appOverlay[0].addEventListener('click', function (e) {\n              e.currentTarget.classList.remove('show');\n              tel.classList.remove('show');\n            });\n          }\n        });\n      });\n    });\n  }\n}; // *******************************************************************************\n// * Initialization\n\nif (typeof window !== 'undefined') {\n  Helpers.init();\n\n  if (Helpers.isMobileDevice() && window.chrome) {\n    document.documentElement.classList.add('layout-menu-100vh');\n  } // Update layout after page load\n\n\n  if (document.readyState === 'complete') Helpers.update();else document.addEventListener('DOMContentLoaded', function onContentLoaded() {\n    Helpers.update();\n    document.removeEventListener('DOMContentLoaded', onContentLoaded);\n  });\n} // ---\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXJzLmpzPzBiMjEiXSwibmFtZXMiOlsiVFJBTlNfRVZFTlRTIiwiVFJBTlNfUFJPUEVSVElFUyIsIklOTElORV9TVFlMRVMiLCJyZXF1aXJlZFBhcmFtIiwibmFtZSIsIkVycm9yIiwiSGVscGVycyIsIlJPT1RfRUwiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIkxBWU9VVF9CUkVBS1BPSU5UIiwiUkVTSVpFX0RFTEFZIiwibWVudVBzU2Nyb2xsIiwibWFpbk1lbnUiLCJfY3VyU3R5bGUiLCJfc3R5bGVFbCIsIl9yZXNpemVUaW1lb3V0IiwiX3Jlc2l6ZUNhbGxiYWNrIiwiX3RyYW5zaXRpb25DYWxsYmFjayIsIl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0IiwiX2xpc3RlbmVycyIsIl9pbml0aWFsaXplZCIsIl9hdXRvVXBkYXRlIiwiX2xhc3RXaW5kb3dIZWlnaHQiLCJfc2Nyb2xsVG9BY3RpdmUiLCJhbmltYXRlIiwiZHVyYXRpb24iLCJsYXlvdXRNZW51IiwiZ2V0TGF5b3V0TWVudSIsImFjdGl2ZUVsIiwicXVlcnlTZWxlY3RvciIsImVhc2VJbk91dFF1YWQiLCJ0IiwiYiIsImMiLCJkIiwiZWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInNjcm9sbFRvcCIsInBhcnNlSW50IiwiY2xpZW50SGVpZ2h0Iiwic3RhcnQiLCJjaGFuZ2UiLCJzdGFydERhdGUiLCJEYXRlIiwiYW5pbWF0ZVNjcm9sbCIsImN1cnJlbnREYXRlIiwiY3VycmVudFRpbWUiLCJ2YWwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYWRkQ2xhc3MiLCJjbHMiLCJlbCIsImxlbmd0aCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJlIiwic3BsaXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJfcmVtb3ZlQ2xhc3MiLCJyZW1vdmUiLCJfdG9nZ2xlQ2xhc3MiLCJjbHMxIiwiY2xzMiIsImNvbnRhaW5zIiwicmVwbGFjZSIsIl9oYXNDbGFzcyIsInJlc3VsdCIsIl9maW5kUGFyZW50IiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwicGFyZW50Tm9kZSIsIl90cmlnZ2VyV2luZG93RXZlbnQiLCJjcmVhdGVFdmVudCIsImV2ZW50IiwiRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZmlyZUV2ZW50IiwiY3JlYXRlRXZlbnRPYmplY3QiLCJfdHJpZ2dlckV2ZW50IiwiZmlsdGVyIiwibGlzdGVuZXIiLCJjYWxsYmFjayIsImNhbGwiLCJfdXBkYXRlSW5saW5lU3R5bGUiLCJuYXZiYXJIZWlnaHQiLCJmb290ZXJIZWlnaHQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm5ld1N0eWxlIiwidGV4dENvbnRlbnQiLCJfcmVtb3ZlSW5saW5lU3R5bGUiLCJyZW1vdmVDaGlsZCIsIl9yZWRyYXdMYXlvdXRNZW51IiwiaW5uZXIiLCJwYWdlU2Nyb2xsVG9wIiwic3R5bGUiLCJkaXNwbGF5IiwiX3N1cHBvcnRzVHJhbnNpdGlvbkVuZCIsIlFVbml0IiwiYm9keSIsImV2bnQiLCJfZ2V0TmF2YmFySGVpZ2h0IiwibGF5b3V0TmF2YmFyIiwiZ2V0TGF5b3V0TmF2YmFyIiwiaXNTbWFsbFNjcmVlbiIsImhlaWdodCIsImNsb25lZEVsIiwiY2xvbmVOb2RlIiwiaWQiLCJ2aXNpYmlsaXR5IiwicG9zaXRpb24iLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwicXVlcnlTZWxlY3RvckFsbCIsImluc2VydEJlZm9yZSIsIl9nZXRGb290ZXJIZWlnaHQiLCJsYXlvdXRGb290ZXIiLCJnZXRMYXlvdXRGb290ZXIiLCJfZ2V0QW5pbWF0aW9uRHVyYXRpb24iLCJnZXRDb21wdXRlZFN0eWxlIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwicGFyc2VGbG9hdCIsImluZGV4T2YiLCJfc2V0TWVudUhvdmVyU3RhdGUiLCJob3ZlcmVkIiwiX3NldENvbGxhcHNlZCIsImNvbGxhcHNlZCIsInNldFRpbWVvdXQiLCJfYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50IiwibW9kaWZpZXIiLCJjYiIsIm1lbnUiLCJnZXRNZW51IiwidGFyZ2V0IiwiX3VuYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfYmluZFdpbmRvd1Jlc2l6ZUV2ZW50IiwiX3VuYmluZFdpbmRvd1Jlc2l6ZUV2ZW50IiwiX2JpbmRNZW51TW91c2VFdmVudHMiLCJfbWVudU1vdXNlRW50ZXIiLCJfbWVudU1vdXNlTGVhdmUiLCJfd2luZG93VG91Y2hTdGFydCIsIl91bmJpbmRNZW51TW91c2VFdmVudHMiLCJzY3JvbGxUb0FjdGl2ZSIsInNldENvbGxhcHNlZCIsInRvZ2dsZUNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwic2V0UG9zaXRpb24iLCJmaXhlZCIsIm9mZmNhbnZhcyIsInVwZGF0ZSIsImlzTGF5b3V0TmF2YmFyRnVsbCIsImlzRml4ZWQiLCJpc05hdmJhckZpeGVkIiwiaXNGb290ZXJGaXhlZCIsInNldEF1dG9VcGRhdGUiLCJlbmFibGUiLCJvbiIsIm9mZiIsImlzUnRsIiwiZ2V0QXR0cmlidXRlIiwiaXNNb2JpbGVEZXZpY2UiLCJvcmllbnRhdGlvbiIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImlzTGlnaHRTdHlsZSIsIl9ldmVudCIsIm5hbWVzcGFjZSIsImpvaW4iLCJwdXNoIiwic3BsaWNlIiwiaW5pdCIsImRvY3VtZW50TW9kZSIsImRlc3Ryb3kiLCJpbml0UGFzc3dvcmRUb2dnbGUiLCJ0b2dnbGVyIiwicHJldmVudERlZmF1bHQiLCJmb3JtUGFzc3dvcmRUb2dnbGUiLCJjbG9zZXN0IiwiZm9ybVBhc3N3b3JkVG9nZ2xlSWNvbiIsImZvcm1QYXNzd29yZFRvZ2dsZUlucHV0Iiwic2V0QXR0cmlidXRlIiwiaW5pdFNwZWVjaFRvVGV4dCIsIlNwZWVjaFJlY29nbml0aW9uIiwid2Via2l0U3BlZWNoUmVjb2duaXRpb24iLCJzcGVlY2hUb1RleHQiLCJyZWNvZ25pdGlvbiIsImxpc3RlbmluZyIsImZvY3VzIiwib25zcGVlY2hzdGFydCIsIm9uZXJyb3IiLCJvbnJlc3VsdCIsInZhbHVlIiwicmVzdWx0cyIsInRyYW5zY3JpcHQiLCJvbnNwZWVjaGVuZCIsInN0b3AiLCJhamF4Q2FsbCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJzdGF0dXNUZXh0Iiwic2VuZCIsImluaXRTaWRlYmFyVG9nZ2xlIiwic2lkZWJhclRvZ2dsZXIiLCJvdmVybGF5IiwiYXBwT3ZlcmxheSIsInRhcmdldEVsIiwidGVsIiwidG9nZ2xlIiwiY3VycmVudFRhcmdldCIsImNocm9tZSIsInJlYWR5U3RhdGUiLCJvbkNvbnRlbnRMb2FkZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsWUFBWSxHQUFHLENBQUMsZUFBRCxFQUFrQixxQkFBbEIsRUFBeUMsZ0JBQXpDLENBQXJCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFELEVBQWUsZUFBZixFQUFnQyxrQkFBaEMsRUFBb0Qsa0JBQXBELEVBQXdFLGFBQXhFLENBQXpCO0FBQ0EsSUFBTUMsYUFBYSxrTUFBbkIsQyxDQVNBOztBQUNBLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQzNCLFFBQU0sSUFBSUMsS0FBSiw2QkFBK0JELElBQUksZ0JBQVVBLElBQVYsU0FBcUIsRUFBeEQsRUFBTjtBQUNEOztBQUVELElBQU1FLE9BQU8sR0FBRztBQUNkO0FBQ0FDLFNBQU8sRUFBRSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxRQUFRLENBQUNDLGVBQXpDLEdBQTJELElBRnREO0FBSWQ7QUFDQUMsbUJBQWlCLEVBQUUsSUFM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Q0FBNEIsTUFBNUI7QUFDRCxhQUZELE1BRU87QUFDTG9LLHdCQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNySyxTQUFkLENBQXdCRyxNQUF4QixDQUErQixNQUEvQjtBQUNEOztBQUNEa0ssc0JBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY2xGLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFVBQUFyRixDQUFDLEVBQUk7QUFDM0NBLGVBQUMsQ0FBQzJLLGFBQUYsQ0FBZ0J6SyxTQUFoQixDQUEwQkcsTUFBMUIsQ0FBaUMsTUFBakM7QUFDQW9LLGlCQUFHLENBQUN2SyxTQUFKLENBQWNHLE1BQWQsQ0FBcUIsTUFBckI7QUFDRCxhQUhEO0FBSUQ7QUFDRixTQWxCRDtBQW1CRCxPQXpCRDtBQTBCRCxLQTNCRDtBQTRCRDtBQXp5QmEsQ0FBaEIsQyxDQTR5QkE7QUFDQTs7QUFFQSxJQUFJLE9BQU92RCxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDRixTQUFPLENBQUNpTCxJQUFSOztBQUVBLE1BQUlqTCxPQUFPLENBQUNxSyxjQUFSLE1BQTRCbkssTUFBTSxDQUFDOE4sTUFBdkMsRUFBK0M7QUFDN0M3TixZQUFRLENBQUNDLGVBQVQsQ0FBeUJrRCxTQUF6QixDQUFtQ0MsR0FBbkMsQ0FBdUMsbUJBQXZDO0FBQ0QsR0FMZ0MsQ0FPakM7OztBQUNBLE1BQUlwRCxRQUFRLENBQUM4TixVQUFULEtBQXdCLFVBQTVCLEVBQXdDak8sT0FBTyxDQUFDMEosTUFBUixHQUF4QyxLQUVFdkosUUFBUSxDQUFDc0ksZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFNBQVN5RixlQUFULEdBQTJCO0FBQ3ZFbE8sV0FBTyxDQUFDMEosTUFBUjtBQUNBdkosWUFBUSxDQUFDd0ksbUJBQVQsQ0FBNkIsa0JBQTdCLEVBQWlEdUYsZUFBakQ7QUFDRCxHQUhEO0FBSUgsQyxDQUVEIiwiZmlsZSI6Ii4vanMvaGVscGVycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbnN0YW50c1xyXG5jb25zdCBUUkFOU19FVkVOVFMgPSBbJ3RyYW5zaXRpb25lbmQnLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsICdvVHJhbnNpdGlvbkVuZCddXHJcbmNvbnN0IFRSQU5TX1BST1BFUlRJRVMgPSBbJ3RyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICd3ZWJraXRUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nXVxyXG5jb25zdCBJTkxJTkVfU1RZTEVTID0gYFxyXG4ubGF5b3V0LW1lbnUtZml4ZWQgLmxheW91dC1uYXZiYXItZnVsbCAubGF5b3V0LW1lbnUsXHJcbi5sYXlvdXQtcGFnZSB7XHJcbiAgcGFkZGluZy10b3A6IHtuYXZiYXJIZWlnaHR9cHggIWltcG9ydGFudDtcclxufVxyXG4uY29udGVudC13cmFwcGVyIHtcclxuICBwYWRkaW5nLWJvdHRvbToge2Zvb3RlckhlaWdodH1weCAhaW1wb3J0YW50O1xyXG59YFxyXG5cclxuLy8gR3VhcmRcclxuZnVuY3Rpb24gcmVxdWlyZWRQYXJhbShuYW1lKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgcmVxdWlyZWQke25hbWUgPyBgOiBcXGAke25hbWV9XFxgYCA6ICcnfWApXHJcbn1cclxuXHJcbmNvbnN0IEhlbHBlcnMgPSB7XHJcbiAgLy8gUm9vdCBFbGVtZW50XHJcbiAgUk9PVF9FTDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBudWxsLFxyXG5cclxuICAvLyBMYXJnZSBzY3JlZW5zIGJyZWFrcG9pbnRcclxuICBMQVlPVVRfQlJFQUtQT0lOVDogMTIwMCxcclxuXHJcbiAgLy8gUmVzaXplIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xyXG4gIFJFU0laRV9ERUxBWTogMjAwLFxyXG5cclxuICBtZW51UHNTY3JvbGw6IG51bGwsXHJcblxyXG4gIG1haW5NZW51OiBudWxsLFxyXG5cclxuICAvLyBJbnRlcm5hbCB2YXJpYWJsZXNcclxuICBfY3VyU3R5bGU6IG51bGwsXHJcbiAgX3N0eWxlRWw6IG51bGwsXHJcbiAgX3Jlc2l6ZVRpbWVvdXQ6IG51bGwsXHJcbiAgX3Jlc2l6ZUNhbGxiYWNrOiBudWxsLFxyXG4gIF90cmFuc2l0aW9uQ2FsbGJhY2s6IG51bGwsXHJcbiAgX3RyYW5zaXRpb25DYWxsYmFja1RpbWVvdXQ6IG51bGwsXHJcbiAgX2xpc3RlbmVyczogW10sXHJcbiAgX2luaXRpYWxpemVkOiBmYWxzZSxcclxuICBfYXV0b1VwZGF0ZTogZmFsc2UsXHJcbiAgX2xhc3RXaW5kb3dIZWlnaHQ6IDAsXHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAvLyAqIFV0aWxpdGllc1xyXG5cclxuICAvLyAtLS1cclxuICAvLyBTY3JvbGwgVG8gQWN0aXZlIE1lbnUgSXRlbVxyXG4gIF9zY3JvbGxUb0FjdGl2ZShhbmltYXRlID0gZmFsc2UsIGR1cmF0aW9uID0gNTAwKSB7XHJcbiAgICBjb25zdCBsYXlvdXRNZW51ID0gdGhpcy5nZXRMYXlvdXRNZW51KClcclxuXHJcbiAgICBpZiAoIWxheW91dE1lbnUpIHJldHVyblxyXG5cclxuICAgIGxldCBhY3RpdmVFbCA9IGxheW91dE1lbnUucXVlcnlTZWxlY3RvcignbGkubWVudS1pdGVtLmFjdGl2ZTpub3QoLm9wZW4pJylcclxuXHJcbiAgICBpZiAoYWN0aXZlRWwpIHtcclxuICAgICAgLy8gdCA9IGN1cnJlbnQgdGltZVxyXG4gICAgICAvLyBiID0gc3RhcnQgdmFsdWVcclxuICAgICAgLy8gYyA9IGNoYW5nZSBpbiB2YWx1ZVxyXG4gICAgICAvLyBkID0gZHVyYXRpb25cclxuICAgICAgY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XHJcbiAgICAgICAgdCAvPSBkIC8gMlxyXG4gICAgICAgIGlmICh0IDwgMSkgcmV0dXJuIChjIC8gMikgKiB0ICogdCArIGJcclxuICAgICAgICB0IC09IDFcclxuICAgICAgICByZXR1cm4gKC1jIC8gMikgKiAodCAqICh0IC0gMikgLSAxKSArIGJcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpLnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWlubmVyJylcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgYWN0aXZlRWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgYWN0aXZlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFjdGl2ZUVsKVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgYWN0aXZlRWwgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgYWN0aXZlRWwgPSBhY3RpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBlbGVtZW50LnNjcm9sbFRvcFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiBhY3RpdmUgZWxlbWVudCdzIHRvcCBwb3NpdGlvbiBpcyBsZXNzIHRoYW4gMi8zICg2NiUpIG9mIG1lbnUgaGVpZ2h0IHRoYW4gZG8gbm90IHNjcm9sbFxyXG4gICAgICBpZiAoYWN0aXZlRWwgPCBwYXJzZUludCgoZWxlbWVudC5jbGllbnRIZWlnaHQgKiAyKSAvIDMsIDEwKSkgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBzdGFydCA9IGVsZW1lbnQuc2Nyb2xsVG9wXHJcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGFjdGl2ZUVsIC0gc3RhcnQgLSBwYXJzZUludChlbGVtZW50LmNsaWVudEhlaWdodCAvIDIsIDEwKVxyXG4gICAgICBjb25zdCBzdGFydERhdGUgPSArbmV3IERhdGUoKVxyXG5cclxuICAgICAgaWYgKGFuaW1hdGUgPT09IHRydWUpIHtcclxuICAgICAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSArbmV3IERhdGUoKVxyXG4gICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBjdXJyZW50RGF0ZSAtIHN0YXJ0RGF0ZVxyXG4gICAgICAgICAgY29uc3QgdmFsID0gZWFzZUluT3V0UXVhZChjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pXHJcbiAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHZhbFxyXG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGNoYW5nZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhbmltYXRlU2Nyb2xsKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGNoYW5nZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gQWRkIGNsYXNzZXNcclxuICBfYWRkQ2xhc3MoY2xzLCBlbCA9IHRoaXMuUk9PVF9FTCkge1xyXG4gICAgaWYgKGVsLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIEFkZCBjbGFzc2VzIHRvIG11bHRpcGxlIGVsZW1lbnRzXHJcbiAgICAgIGVsLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgY2xzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGUuY2xhc3NMaXN0LmFkZChjKSlcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEFkZCBjbGFzc2VzIHRvIHNpbmdsZSBlbGVtZW50XHJcbiAgICAgIGNscy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlbC5jbGFzc0xpc3QuYWRkKGMpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIC0tLVxyXG4gIC8vIFJlbW92ZSBjbGFzc2VzXHJcbiAgX3JlbW92ZUNsYXNzKGNscywgZWwgPSB0aGlzLlJPT1RfRUwpIHtcclxuICAgIGlmIChlbC5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBSZW1vdmUgY2xhc3NlcyB0byBtdWx0aXBsZSBlbGVtZW50c1xyXG4gICAgICBlbC5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGNscy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoYykpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBSZW1vdmUgY2xhc3NlcyB0byBzaW5nbGUgZWxlbWVudFxyXG4gICAgICBjbHMuc3BsaXQoJyAnKS5mb3JFYWNoKGMgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShjKSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBUb2dnbGUgY2xhc3Nlc1xyXG4gIF90b2dnbGVDbGFzcyhlbCA9IHRoaXMuUk9PVF9FTCwgY2xzMSwgY2xzMikge1xyXG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMxKSkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVwbGFjZShjbHMxLCBjbHMyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlcGxhY2UoY2xzMiwgY2xzMSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBIYXMgY2xhc3NcclxuICBfaGFzQ2xhc3MoY2xzLCBlbCA9IHRoaXMuUk9PVF9FTCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXHJcblxyXG4gICAgY2xzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IHtcclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkgcmVzdWx0ID0gdHJ1ZVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfSxcclxuXHJcbiAgX2ZpbmRQYXJlbnQoZWwsIGNscykge1xyXG4gICAgaWYgKChlbCAmJiBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdCT0RZJykgfHwgZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnSFRNTCcpIHJldHVybiBudWxsXHJcbiAgICBlbCA9IGVsLnBhcmVudE5vZGVcclxuICAgIHdoaWxlIChlbCAmJiBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdCT0RZJyAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpIHtcclxuICAgICAgZWwgPSBlbC5wYXJlbnROb2RlXHJcbiAgICB9XHJcbiAgICBlbCA9IGVsICYmIGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0JPRFknID8gZWwgOiBudWxsXHJcbiAgICByZXR1cm4gZWxcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBUcmlnZ2VyIHdpbmRvdyBldmVudFxyXG4gIF90cmlnZ2VyV2luZG93RXZlbnQobmFtZSkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm5cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcclxuICAgICAgbGV0IGV2ZW50XHJcblxyXG4gICAgICBpZiAodHlwZW9mIEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQobmFtZSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpXHJcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KG5hbWUsIGZhbHNlLCB0cnVlKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5maXJlRXZlbnQoYG9uJHtuYW1lfWAsIGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCkpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gVHJpZ2dlciBldmVudFxyXG4gIF90cmlnZ2VyRXZlbnQobmFtZSkge1xyXG4gICAgdGhpcy5fdHJpZ2dlcldpbmRvd0V2ZW50KGBsYXlvdXQke25hbWV9YClcclxuXHJcbiAgICB0aGlzLl9saXN0ZW5lcnMuZmlsdGVyKGxpc3RlbmVyID0+IGxpc3RlbmVyLmV2ZW50ID09PSBuYW1lKS5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobnVsbCkpXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gVXBkYXRlIHN0eWxlXHJcbiAgX3VwZGF0ZUlubGluZVN0eWxlKG5hdmJhckhlaWdodCA9IDAsIGZvb3RlckhlaWdodCA9IDApIHtcclxuICAgIGlmICghdGhpcy5fc3R5bGVFbCkge1xyXG4gICAgICB0aGlzLl9zdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxyXG4gICAgICB0aGlzLl9zdHlsZUVsLnR5cGUgPSAndGV4dC9jc3MnXHJcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5fc3R5bGVFbClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdTdHlsZSA9IElOTElORV9TVFlMRVMucmVwbGFjZSgvXFx7bmF2YmFySGVpZ2h0XFx9L2dpLCBuYXZiYXJIZWlnaHQpLnJlcGxhY2UoXHJcbiAgICAgIC9cXHtmb290ZXJIZWlnaHRcXH0vZ2ksXHJcbiAgICAgIGZvb3RlckhlaWdodFxyXG4gICAgKVxyXG5cclxuICAgIGlmICh0aGlzLl9jdXJTdHlsZSAhPT0gbmV3U3R5bGUpIHtcclxuICAgICAgdGhpcy5fY3VyU3R5bGUgPSBuZXdTdHlsZVxyXG4gICAgICB0aGlzLl9zdHlsZUVsLnRleHRDb250ZW50ID0gbmV3U3R5bGVcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBSZW1vdmUgc3R5bGVcclxuICBfcmVtb3ZlSW5saW5lU3R5bGUoKSB7XHJcbiAgICBpZiAodGhpcy5fc3R5bGVFbCkgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCh0aGlzLl9zdHlsZUVsKVxyXG4gICAgdGhpcy5fc3R5bGVFbCA9IG51bGxcclxuICAgIHRoaXMuX2N1clN0eWxlID0gbnVsbFxyXG4gIH0sXHJcblxyXG4gIC8vIC0tLVxyXG4gIC8vIFJlZHJhdyBsYXlvdXQgbWVudSAoU2FmYXJpIGJ1Z2ZpeClcclxuICBfcmVkcmF3TGF5b3V0TWVudSgpIHtcclxuICAgIGNvbnN0IGxheW91dE1lbnUgPSB0aGlzLmdldExheW91dE1lbnUoKVxyXG5cclxuICAgIGlmIChsYXlvdXRNZW51ICYmIGxheW91dE1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKSkge1xyXG4gICAgICBjb25zdCBpbm5lciA9IGxheW91dE1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUtaW5uZXInKVxyXG4gICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gaW5uZXJcclxuICAgICAgY29uc3QgcGFnZVNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcclxuXHJcbiAgICAgIGxheW91dE1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAvLyBsYXlvdXRNZW51Lm9mZnNldEhlaWdodFxyXG4gICAgICBsYXlvdXRNZW51LnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICBpbm5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IHBhZ2VTY3JvbGxUb3BcclxuXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gQ2hlY2sgZm9yIHRyYW5zaXRpb24gc3VwcG9ydFxyXG4gIF9zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XHJcbiAgICBpZiAod2luZG93LlFVbml0KSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XHJcblxyXG4gICAgaWYgKCFlbCkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXHJcbiAgICBUUkFOU19QUk9QRVJUSUVTLmZvckVhY2goZXZudCA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgZWwuc3R5bGVbZXZudF0gIT09ICd1bmRlZmluZWQnKSByZXN1bHQgPSB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiByZXN1bHRcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBDYWxjdWxhdGUgY3VycmVudCBuYXZiYXIgaGVpZ2h0XHJcbiAgX2dldE5hdmJhckhlaWdodCgpIHtcclxuICAgIGNvbnN0IGxheW91dE5hdmJhciA9IHRoaXMuZ2V0TGF5b3V0TmF2YmFyKClcclxuXHJcbiAgICBpZiAoIWxheW91dE5hdmJhcikgcmV0dXJuIDBcclxuICAgIGlmICghdGhpcy5pc1NtYWxsU2NyZWVuKCkpIHJldHVybiBsYXlvdXROYXZiYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XHJcblxyXG4gICAgLy8gTmVlZHMgc29tZSBsb2dpYyB0byBnZXQgbmF2YmFyIGhlaWdodCBvbiBzbWFsbCBzY3JlZW5zXHJcblxyXG4gICAgY29uc3QgY2xvbmVkRWwgPSBsYXlvdXROYXZiYXIuY2xvbmVOb2RlKHRydWUpXHJcbiAgICBjbG9uZWRFbC5pZCA9IG51bGxcclxuICAgIGNsb25lZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG4gICAgY2xvbmVkRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcblxyXG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2xvbmVkRWwucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNlLnNob3cnKSkuZm9yRWFjaChlbCA9PiB0aGlzLl9yZW1vdmVDbGFzcygnc2hvdycsIGVsKSlcclxuXHJcbiAgICBsYXlvdXROYXZiYXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVkRWwsIGxheW91dE5hdmJhcilcclxuXHJcbiAgICBjb25zdCBuYXZiYXJIZWlnaHQgPSBjbG9uZWRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcclxuXHJcbiAgICBjbG9uZWRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lZEVsKVxyXG5cclxuICAgIHJldHVybiBuYXZiYXJIZWlnaHRcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBHZXQgY3VycmVudCBmb290ZXIgaGVpZ2h0XHJcbiAgX2dldEZvb3RlckhlaWdodCgpIHtcclxuICAgIGNvbnN0IGxheW91dEZvb3RlciA9IHRoaXMuZ2V0TGF5b3V0Rm9vdGVyKClcclxuXHJcbiAgICBpZiAoIWxheW91dEZvb3RlcikgcmV0dXJuIDBcclxuXHJcbiAgICByZXR1cm4gbGF5b3V0Rm9vdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gIH0sXHJcblxyXG4gIC8vIC0tLVxyXG4gIC8vIEdldCBhbmltYXRpb24gZHVyYXRpb24gb2YgZWxlbWVudFxyXG4gIF9nZXRBbmltYXRpb25EdXJhdGlvbihlbCkge1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkudHJhbnNpdGlvbkR1cmF0aW9uXHJcblxyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZHVyYXRpb24pICogKGR1cmF0aW9uLmluZGV4T2YoJ21zJykgIT09IC0xID8gMSA6IDEwMDApXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gU2V0IG1lbnUgaG92ZXIgc3RhdGVcclxuICBfc2V0TWVudUhvdmVyU3RhdGUoaG92ZXJlZCkge1xyXG4gICAgdGhpc1tob3ZlcmVkID8gJ19hZGRDbGFzcycgOiAnX3JlbW92ZUNsYXNzJ10oJ2xheW91dC1tZW51LWhvdmVyJylcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBUb2dnbGUgY29sbGFwc2VkXHJcbiAgX3NldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcclxuICAgIGlmICh0aGlzLmlzU21hbGxTY3JlZW4oKSkge1xyXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xhc3MoJ2xheW91dC1tZW51LWV4cGFuZGVkJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzcygnbGF5b3V0LW1lbnUtZXhwYW5kZWQnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKSA/IDUgOiAwXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gQWRkIGxheW91dCBzaXZlbmF2IHRvZ2dsZSBhbmltYXRpb25FbmQgZXZlbnRcclxuICBfYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50KG1vZGlmaWVyLCBjYikge1xyXG4gICAgY29uc3QgbWVudSA9IHRoaXMuZ2V0TWVudSgpXHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IG1lbnUgPyB0aGlzLl9nZXRBbmltYXRpb25EdXJhdGlvbihtZW51KSArIDUwIDogMFxyXG5cclxuICAgIGlmICghZHVyYXRpb24pIHtcclxuICAgICAgbW9kaWZpZXIuY2FsbCh0aGlzKVxyXG4gICAgICBjYi5jYWxsKHRoaXMpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjayA9IGUgPT4ge1xyXG4gICAgICBpZiAoZS50YXJnZXQgIT09IG1lbnUpIHJldHVyblxyXG4gICAgICB0aGlzLl91bmJpbmRMYXlvdXRBbmltYXRpb25FbmRFdmVudCgpXHJcbiAgICAgIGNiLmNhbGwodGhpcylcclxuICAgIH1cclxuXHJcbiAgICBUUkFOU19FVkVOVFMuZm9yRWFjaChlID0+IHtcclxuICAgICAgbWVudS5hZGRFdmVudExpc3RlbmVyKGUsIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjaywgZmFsc2UpXHJcbiAgICB9KVxyXG5cclxuICAgIG1vZGlmaWVyLmNhbGwodGhpcylcclxuXHJcbiAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjay5jYWxsKHRoaXMsIHsgdGFyZ2V0OiBtZW51IH0pXHJcbiAgICB9LCBkdXJhdGlvbilcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBSZW1vdmUgbGF5b3V0IHNpdmVuYXYgdG9nZ2xlIGFuaW1hdGlvbkVuZCBldmVudFxyXG4gIF91bmJpbmRMYXlvdXRBbmltYXRpb25FbmRFdmVudCgpIHtcclxuICAgIGNvbnN0IG1lbnUgPSB0aGlzLmdldE1lbnUoKVxyXG5cclxuICAgIGlmICh0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0KVxyXG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0ID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtZW51ICYmIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjaykge1xyXG4gICAgICBUUkFOU19FVkVOVFMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBtZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgdGhpcy5fdHJhbnNpdGlvbkNhbGxiYWNrLCBmYWxzZSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjayA9IG51bGxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBCaW5kIGRlbGF5ZWQgd2luZG93IHJlc2l6ZSBldmVudFxyXG4gIF9iaW5kV2luZG93UmVzaXplRXZlbnQoKSB7XHJcbiAgICB0aGlzLl91bmJpbmRXaW5kb3dSZXNpemVFdmVudCgpXHJcblxyXG4gICAgY29uc3QgY2IgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9yZXNpemVUaW1lb3V0KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVvdXQpXHJcbiAgICAgICAgdGhpcy5fcmVzaXplVGltZW91dCA9IG51bGxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3Jlc2l6ZScpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVzaXplQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9yZXNpemVUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5fcmVzaXplVGltZW91dClcclxuICAgICAgdGhpcy5fcmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoY2IsIHRoaXMuUkVTSVpFX0RFTEFZKVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemVDYWxsYmFjaywgZmFsc2UpXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gVW5iaW5kIGRlbGF5ZWQgd2luZG93IHJlc2l6ZSBldmVudFxyXG4gIF91bmJpbmRXaW5kb3dSZXNpemVFdmVudCgpIHtcclxuICAgIGlmICh0aGlzLl9yZXNpemVUaW1lb3V0KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lb3V0KVxyXG4gICAgICB0aGlzLl9yZXNpemVUaW1lb3V0ID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9yZXNpemVDYWxsYmFjaykge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplQ2FsbGJhY2ssIGZhbHNlKVxyXG4gICAgICB0aGlzLl9yZXNpemVDYWxsYmFjayA9IG51bGxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfYmluZE1lbnVNb3VzZUV2ZW50cygpIHtcclxuICAgIGlmICh0aGlzLl9tZW51TW91c2VFbnRlciAmJiB0aGlzLl9tZW51TW91c2VMZWF2ZSAmJiB0aGlzLl93aW5kb3dUb3VjaFN0YXJ0KSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBsYXlvdXRNZW51ID0gdGhpcy5nZXRMYXlvdXRNZW51KClcclxuICAgIGlmICghbGF5b3V0TWVudSkgcmV0dXJuIHRoaXMuX3VuYmluZE1lbnVNb3VzZUV2ZW50cygpXHJcblxyXG4gICAgaWYgKCF0aGlzLl9tZW51TW91c2VFbnRlcikge1xyXG4gICAgICB0aGlzLl9tZW51TW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc1NtYWxsU2NyZWVuKCkgfHwgdGhpcy5faGFzQ2xhc3MoJ2xheW91dC10cmFuc2l0aW9uaW5nJykpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zZXRNZW51SG92ZXJTdGF0ZShmYWxzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXRNZW51SG92ZXJTdGF0ZShmYWxzZSlcclxuICAgICAgfVxyXG4gICAgICBsYXlvdXRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9tZW51TW91c2VFbnRlciwgZmFsc2UpXHJcbiAgICAgIGxheW91dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX21lbnVNb3VzZUVudGVyLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX21lbnVNb3VzZUxlYXZlKSB7XHJcbiAgICAgIHRoaXMuX21lbnVNb3VzZUxlYXZlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3NldE1lbnVIb3ZlclN0YXRlKGZhbHNlKVxyXG4gICAgICB9XHJcbiAgICAgIGxheW91dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX21lbnVNb3VzZUxlYXZlLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1RvdWNoU3RhcnQpIHtcclxuICAgICAgdGhpcy5fd2luZG93VG91Y2hTdGFydCA9IGUgPT4ge1xyXG4gICAgICAgIGlmICghZSB8fCAhZS50YXJnZXQgfHwgIXRoaXMuX2ZpbmRQYXJlbnQoZS50YXJnZXQsICcubGF5b3V0LW1lbnUnKSkge1xyXG4gICAgICAgICAgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fd2luZG93VG91Y2hTdGFydCwgdHJ1ZSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfdW5iaW5kTWVudU1vdXNlRXZlbnRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9tZW51TW91c2VFbnRlciAmJiAhdGhpcy5fbWVudU1vdXNlTGVhdmUgJiYgIXRoaXMuX3dpbmRvd1RvdWNoU3RhcnQpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IGxheW91dE1lbnUgPSB0aGlzLmdldExheW91dE1lbnUoKVxyXG5cclxuICAgIGlmICh0aGlzLl9tZW51TW91c2VFbnRlcikge1xyXG4gICAgICBpZiAobGF5b3V0TWVudSkge1xyXG4gICAgICAgIGxheW91dE1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX21lbnVNb3VzZUVudGVyLCBmYWxzZSlcclxuICAgICAgICBsYXlvdXRNZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9tZW51TW91c2VFbnRlciwgZmFsc2UpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWVudU1vdXNlRW50ZXIgPSBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21lbnVNb3VzZUxlYXZlKSB7XHJcbiAgICAgIGlmIChsYXlvdXRNZW51KSB7XHJcbiAgICAgICAgbGF5b3V0TWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fbWVudU1vdXNlTGVhdmUsIGZhbHNlKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX21lbnVNb3VzZUxlYXZlID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl93aW5kb3dUb3VjaFN0YXJ0KSB7XHJcbiAgICAgIGlmIChsYXlvdXRNZW51KSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl93aW5kb3dUb3VjaFN0YXJ0LCB0cnVlKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3dpbmRvd1RvdWNoU3RhcnQgPSBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXHJcbiAgfSxcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gIC8vICogTWV0aG9kc1xyXG5cclxuICBzY3JvbGxUb0FjdGl2ZShhbmltYXRlID0gZmFsc2UpIHtcclxuICAgIHRoaXMuX3Njcm9sbFRvQWN0aXZlKGFuaW1hdGUpXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gQ29sbGFwc2UgLyBleHBhbmQgbGF5b3V0XHJcbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCA9IHJlcXVpcmVkUGFyYW0oJ2NvbGxhcHNlZCcpLCBhbmltYXRlID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgbGF5b3V0TWVudSA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpXHJcblxyXG4gICAgaWYgKCFsYXlvdXRNZW51KSByZXR1cm5cclxuXHJcbiAgICB0aGlzLl91bmJpbmRMYXlvdXRBbmltYXRpb25FbmRFdmVudCgpXHJcblxyXG4gICAgaWYgKGFuaW1hdGUgJiYgdGhpcy5fc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkpIHtcclxuICAgICAgdGhpcy5fYWRkQ2xhc3MoJ2xheW91dC10cmFuc2l0aW9uaW5nJylcclxuICAgICAgaWYgKGNvbGxhcHNlZCkgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXHJcblxyXG4gICAgICB0aGlzLl9iaW5kTGF5b3V0QW5pbWF0aW9uRW5kRXZlbnQoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgLy8gQ29sbGFwc2UgLyBFeHBhbmRcclxuICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxTY3JlZW4pIHRoaXMuX3NldENvbGxhcHNlZChjb2xsYXBzZWQpXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9yZW1vdmVDbGFzcygnbGF5b3V0LXRyYW5zaXRpb25pbmcnKVxyXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlcldpbmRvd0V2ZW50KCdyZXNpemUnKVxyXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50KCd0b2dnbGUnKVxyXG4gICAgICAgICAgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9hZGRDbGFzcygnbGF5b3V0LW5vLXRyYW5zaXRpb24nKVxyXG4gICAgICBpZiAoY29sbGFwc2VkKSB0aGlzLl9zZXRNZW51SG92ZXJTdGF0ZShmYWxzZSlcclxuXHJcbiAgICAgIC8vIENvbGxhcHNlIC8gRXhwYW5kXHJcbiAgICAgIHRoaXMuX3NldENvbGxhcHNlZChjb2xsYXBzZWQpXHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9yZW1vdmVDbGFzcygnbGF5b3V0LW5vLXRyYW5zaXRpb24nKVxyXG4gICAgICAgIHRoaXMuX3RyaWdnZXJXaW5kb3dFdmVudCgncmVzaXplJylcclxuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3RvZ2dsZScpXHJcbiAgICAgICAgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXHJcbiAgICAgIH0sIDEpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gVG9nZ2xlIGxheW91dFxyXG4gIHRvZ2dsZUNvbGxhcHNlZChhbmltYXRlID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoIXRoaXMuaXNDb2xsYXBzZWQoKSwgYW5pbWF0ZSlcclxuICB9LFxyXG5cclxuICAvLyAtLS1cclxuICAvLyBTZXQgbGF5b3V0IHBvc2l0aW9uaW5nXHJcbiAgc2V0UG9zaXRpb24oZml4ZWQgPSByZXF1aXJlZFBhcmFtKCdmaXhlZCcpLCBvZmZjYW52YXMgPSByZXF1aXJlZFBhcmFtKCdvZmZjYW52YXMnKSkge1xyXG4gICAgdGhpcy5fcmVtb3ZlQ2xhc3MoJ2xheW91dC1tZW51LW9mZmNhbnZhcyBsYXlvdXQtbWVudS1maXhlZCBsYXlvdXQtbWVudS1maXhlZC1vZmZjYW52YXMnKVxyXG5cclxuICAgIGlmICghZml4ZWQgJiYgb2ZmY2FudmFzKSB7XHJcbiAgICAgIHRoaXMuX2FkZENsYXNzKCdsYXlvdXQtbWVudS1vZmZjYW52YXMnKVxyXG4gICAgfSBlbHNlIGlmIChmaXhlZCAmJiAhb2ZmY2FudmFzKSB7XHJcbiAgICAgIHRoaXMuX2FkZENsYXNzKCdsYXlvdXQtbWVudS1maXhlZCcpXHJcbiAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKVxyXG4gICAgfSBlbHNlIGlmIChmaXhlZCAmJiBvZmZjYW52YXMpIHtcclxuICAgICAgdGhpcy5fYWRkQ2xhc3MoJ2xheW91dC1tZW51LWZpeGVkLW9mZmNhbnZhcycpXHJcbiAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKClcclxuICB9LFxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgLy8gKiBHZXR0ZXJzXHJcblxyXG4gIGdldExheW91dE1lbnUoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxheW91dC1tZW51JylcclxuICB9LFxyXG5cclxuICBnZXRNZW51KCkge1xyXG4gICAgY29uc3QgbGF5b3V0TWVudSA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpXHJcblxyXG4gICAgaWYgKCFsYXlvdXRNZW51KSByZXR1cm4gbnVsbFxyXG5cclxuICAgIHJldHVybiAhdGhpcy5faGFzQ2xhc3MoJ21lbnUnLCBsYXlvdXRNZW51KSA/IGxheW91dE1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKSA6IGxheW91dE1lbnVcclxuICB9LFxyXG5cclxuICBnZXRMYXlvdXROYXZiYXIoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxheW91dC1uYXZiYXInKVxyXG4gIH0sXHJcblxyXG4gIGdldExheW91dEZvb3RlcigpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1mb290ZXInKVxyXG4gIH0sXHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAvLyAqIFVwZGF0ZVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLmdldExheW91dE5hdmJhcigpICYmXHJcbiAgICAgICAgKCghdGhpcy5pc1NtYWxsU2NyZWVuKCkgJiYgdGhpcy5pc0xheW91dE5hdmJhckZ1bGwoKSAmJiB0aGlzLmlzRml4ZWQoKSkgfHwgdGhpcy5pc05hdmJhckZpeGVkKCkpKSB8fFxyXG4gICAgICAodGhpcy5nZXRMYXlvdXRGb290ZXIoKSAmJiB0aGlzLmlzRm9vdGVyRml4ZWQoKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLl91cGRhdGVJbmxpbmVTdHlsZSh0aGlzLl9nZXROYXZiYXJIZWlnaHQoKSwgdGhpcy5fZ2V0Rm9vdGVySGVpZ2h0KCkpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYmluZE1lbnVNb3VzZUV2ZW50cygpXHJcbiAgfSxcclxuXHJcbiAgc2V0QXV0b1VwZGF0ZShlbmFibGUgPSByZXF1aXJlZFBhcmFtKCdlbmFibGUnKSkge1xyXG4gICAgaWYgKGVuYWJsZSAmJiAhdGhpcy5fYXV0b1VwZGF0ZSkge1xyXG4gICAgICB0aGlzLm9uKCdyZXNpemUuSGVscGVyczphdXRvVXBkYXRlJywgKCkgPT4gdGhpcy51cGRhdGUoKSlcclxuICAgICAgdGhpcy5fYXV0b1VwZGF0ZSA9IHRydWVcclxuICAgIH0gZWxzZSBpZiAoIWVuYWJsZSAmJiB0aGlzLl9hdXRvVXBkYXRlKSB7XHJcbiAgICAgIHRoaXMub2ZmKCdyZXNpemUuSGVscGVyczphdXRvVXBkYXRlJylcclxuICAgICAgdGhpcy5fYXV0b1VwZGF0ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gIC8vICogVGVzdHNcclxuXHJcbiAgaXNSdGwoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuZ2V0QXR0cmlidXRlKCdkaXInKSA9PT0gJ3J0bCcgfHxcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmdldEF0dHJpYnV0ZSgnZGlyJykgPT09ICdydGwnXHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgaXNNb2JpbGVEZXZpY2UoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdy5vcmllbnRhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdJRU1vYmlsZScpICE9PSAtMVxyXG4gIH0sXHJcblxyXG4gIGlzU21hbGxTY3JlZW4oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIDwgdGhpcy5MQVlPVVRfQlJFQUtQT0lOVFxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIGlzTGF5b3V0TmF2YmFyRnVsbCgpIHtcclxuICAgIHJldHVybiAhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXlvdXQtd3JhcHBlci5sYXlvdXQtbmF2YmFyLWZ1bGwnKVxyXG4gIH0sXHJcblxyXG4gIGlzQ29sbGFwc2VkKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTbWFsbFNjcmVlbigpKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5faGFzQ2xhc3MoJ2xheW91dC1tZW51LWV4cGFuZGVkJylcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9oYXNDbGFzcygnbGF5b3V0LW1lbnUtY29sbGFwc2VkJylcclxuICB9LFxyXG5cclxuICBpc0ZpeGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0NsYXNzKCdsYXlvdXQtbWVudS1maXhlZCBsYXlvdXQtbWVudS1maXhlZC1vZmZjYW52YXMnKVxyXG4gIH0sXHJcblxyXG4gIGlzTmF2YmFyRml4ZWQoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLl9oYXNDbGFzcygnbGF5b3V0LW5hdmJhci1maXhlZCcpIHx8ICghdGhpcy5pc1NtYWxsU2NyZWVuKCkgJiYgdGhpcy5pc0ZpeGVkKCkgJiYgdGhpcy5pc0xheW91dE5hdmJhckZ1bGwoKSlcclxuICAgIClcclxuICB9LFxyXG5cclxuICBpc0Zvb3RlckZpeGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0NsYXNzKCdsYXlvdXQtZm9vdGVyLWZpeGVkJylcclxuICB9LFxyXG5cclxuICBpc0xpZ2h0U3R5bGUoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHQtc3R5bGUnKVxyXG4gIH0sXHJcblxyXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAvLyAqIEV2ZW50c1xyXG5cclxuICBvbihldmVudCA9IHJlcXVpcmVkUGFyYW0oJ2V2ZW50JyksIGNhbGxiYWNrID0gcmVxdWlyZWRQYXJhbSgnY2FsbGJhY2snKSkge1xyXG4gICAgY29uc3QgW19ldmVudF0gPSBldmVudC5zcGxpdCgnLicpXHJcbiAgICBsZXQgWywgLi4ubmFtZXNwYWNlXSA9IGV2ZW50LnNwbGl0KCcuJylcclxuICAgIC8vIGxldCBbX2V2ZW50LCAuLi5uYW1lc3BhY2VdID0gZXZlbnQuc3BsaXQoJy4nKVxyXG4gICAgbmFtZXNwYWNlID0gbmFtZXNwYWNlLmpvaW4oJy4nKSB8fCBudWxsXHJcblxyXG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2goeyBldmVudDogX2V2ZW50LCBuYW1lc3BhY2UsIGNhbGxiYWNrIH0pXHJcbiAgfSxcclxuXHJcbiAgb2ZmKGV2ZW50ID0gcmVxdWlyZWRQYXJhbSgnZXZlbnQnKSkge1xyXG4gICAgY29uc3QgW19ldmVudF0gPSBldmVudC5zcGxpdCgnLicpXHJcbiAgICBsZXQgWywgLi4ubmFtZXNwYWNlXSA9IGV2ZW50LnNwbGl0KCcuJylcclxuICAgIG5hbWVzcGFjZSA9IG5hbWVzcGFjZS5qb2luKCcuJykgfHwgbnVsbFxyXG5cclxuICAgIHRoaXMuX2xpc3RlbmVyc1xyXG4gICAgICAuZmlsdGVyKGxpc3RlbmVyID0+IGxpc3RlbmVyLmV2ZW50ID09PSBfZXZlbnQgJiYgbGlzdGVuZXIubmFtZXNwYWNlID09PSBuYW1lc3BhY2UpXHJcbiAgICAgIC5mb3JFYWNoKGxpc3RlbmVyID0+IHRoaXMuX2xpc3RlbmVycy5zcGxpY2UodGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpLCAxKSlcclxuICB9LFxyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgLy8gKiBMaWZlIGN5Y2xlXHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHJldHVyblxyXG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlXHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBgc3R5bGVgIGVsZW1lbnRcclxuICAgIHRoaXMuX3VwZGF0ZUlubGluZVN0eWxlKDApXHJcblxyXG4gICAgLy8gQmluZCB3aW5kb3cgcmVzaXplIGV2ZW50XHJcbiAgICB0aGlzLl9iaW5kV2luZG93UmVzaXplRXZlbnQoKVxyXG5cclxuICAgIC8vIEJpbmQgaW5pdCBldmVudFxyXG4gICAgdGhpcy5vZmYoJ2luaXQuX0hlbHBlcnMnKVxyXG4gICAgdGhpcy5vbignaW5pdC5fSGVscGVycycsICgpID0+IHtcclxuICAgICAgdGhpcy5vZmYoJ3Jlc2l6ZS5fSGVscGVyczpyZWRyYXdNZW51JylcclxuICAgICAgdGhpcy5vbigncmVzaXplLl9IZWxwZXJzOnJlZHJhd01lbnUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xyXG4gICAgICAgIHRoaXMuaXNTbWFsbFNjcmVlbigpICYmICF0aGlzLmlzQ29sbGFwc2VkKCkgJiYgdGhpcy5fcmVkcmF3TGF5b3V0TWVudSgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBGb3JjZSByZXBhaW50IGluIElFIDEwXHJcbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSAnbnVtYmVyJyAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPCAxMSkge1xyXG4gICAgICAgIHRoaXMub2ZmKCdyZXNpemUuX0hlbHBlcnM6aWUxMFJlcGFpbnRCb2R5JylcclxuICAgICAgICB0aGlzLm9uKCdyZXNpemUuX0hlbHBlcnM6aWUxMFJlcGFpbnRCb2R5JywgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNGaXhlZCgpKSByZXR1cm5cclxuICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wIH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgLy8gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHRcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuX3RyaWdnZXJFdmVudCgnaW5pdCcpXHJcbiAgfSxcclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHJldHVyblxyXG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuX3JlbW92ZUNsYXNzKCdsYXlvdXQtdHJhbnNpdGlvbmluZycpXHJcbiAgICB0aGlzLl9yZW1vdmVJbmxpbmVTdHlsZSgpXHJcbiAgICB0aGlzLl91bmJpbmRMYXlvdXRBbmltYXRpb25FbmRFdmVudCgpXHJcbiAgICB0aGlzLl91bmJpbmRXaW5kb3dSZXNpemVFdmVudCgpXHJcbiAgICB0aGlzLl91bmJpbmRNZW51TW91c2VFdmVudHMoKVxyXG4gICAgdGhpcy5zZXRBdXRvVXBkYXRlKGZhbHNlKVxyXG5cclxuICAgIHRoaXMub2ZmKCdpbml0Ll9IZWxwZXJzJylcclxuXHJcbiAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBleGNlcHQgYGluaXRgXHJcbiAgICB0aGlzLl9saXN0ZW5lcnNcclxuICAgICAgLmZpbHRlcihsaXN0ZW5lciA9PiBsaXN0ZW5lci5ldmVudCAhPT0gJ2luaXQnKVxyXG4gICAgICAuZm9yRWFjaChsaXN0ZW5lciA9PiB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSwgMSkpXHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gSW5pdCBQYXNzd29yZCBUb2dnbGVcclxuICBpbml0UGFzc3dvcmRUb2dnbGUoKSB7XHJcbiAgICBjb25zdCB0b2dnbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0tcGFzc3dvcmQtdG9nZ2xlIGknKVxyXG4gICAgaWYgKHR5cGVvZiB0b2dnbGVyICE9PSAndW5kZWZpbmVkJyAmJiB0b2dnbGVyICE9PSBudWxsKSB7XHJcbiAgICAgIHRvZ2dsZXIuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgY29uc3QgZm9ybVBhc3N3b3JkVG9nZ2xlID0gZWwuY2xvc2VzdCgnLmZvcm0tcGFzc3dvcmQtdG9nZ2xlJylcclxuICAgICAgICAgIGNvbnN0IGZvcm1QYXNzd29yZFRvZ2dsZUljb24gPSBmb3JtUGFzc3dvcmRUb2dnbGUucXVlcnlTZWxlY3RvcignaScpXHJcbiAgICAgICAgICBjb25zdCBmb3JtUGFzc3dvcmRUb2dnbGVJbnB1dCA9IGZvcm1QYXNzd29yZFRvZ2dsZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgaWYgKGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3Bhc3N3b3JkJylcclxuICAgICAgICAgICAgZm9ybVBhc3N3b3JkVG9nZ2xlSWNvbi5jbGFzc0xpc3QucmVwbGFjZSgnYngtc2hvdycsICdieC1oaWRlJylcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdwYXNzd29yZCcpIHtcclxuICAgICAgICAgICAgZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKVxyXG4gICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJY29uLmNsYXNzTGlzdC5yZXBsYWNlKCdieC1oaWRlJywgJ2J4LXNob3cnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gLS0tXHJcbiAgLy8gSW5pdCBTcGVlY2ggVG8gVGV4dFxyXG4gIGluaXRTcGVlY2hUb1RleHQoKSB7XHJcbiAgICBjb25zdCBTcGVlY2hSZWNvZ25pdGlvbiA9IHdpbmRvdy5TcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cud2Via2l0U3BlZWNoUmVjb2duaXRpb25cclxuICAgIGNvbnN0IHNwZWVjaFRvVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcGVlY2gtdG8tdGV4dCcpXHJcbiAgICBpZiAoU3BlZWNoUmVjb2duaXRpb24gIT09IHVuZGVmaW5lZCAmJiBTcGVlY2hSZWNvZ25pdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodHlwZW9mIHNwZWVjaFRvVGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3BlZWNoVG9UZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgcmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKVxyXG4gICAgICAgIGNvbnN0IHRvZ2dsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3BlZWNoLXRvLXRleHQgaScpXHJcbiAgICAgICAgdG9nZ2xlci5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgIGxldCBsaXN0ZW5pbmcgPSBmYWxzZVxyXG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRyb2wnKS5mb2N1cygpXHJcbiAgICAgICAgICAgIHJlY29nbml0aW9uLm9uc3BlZWNoc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5pbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgcmVjb2duaXRpb24uc3RhcnQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlY29nbml0aW9uLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNvZ25pdGlvbi5vbnJlc3VsdCA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICBlbC5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb250cm9sJykudmFsdWUgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNvZ25pdGlvbi5vbnNwZWVjaGVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICBsaXN0ZW5pbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHJlY29nbml0aW9uLnN0b3AoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBBamF4IENhbGwgUHJvbWlzZVxyXG4gIGFqYXhDYWxsKHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybClcclxuICAgICAgcmVxLm9ubG9hZCA9ICgpID0+IChyZXEuc3RhdHVzID09PSAyMDAgPyByZXNvbHZlKHJlcS5yZXNwb25zZSkgOiByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQpKSlcclxuICAgICAgcmVxLm9uZXJyb3IgPSBlID0+IHJlamVjdChFcnJvcihgTmV0d29yayBFcnJvcjogJHtlfWApKVxyXG4gICAgICByZXEuc2VuZCgpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8vIC0tLVxyXG4gIC8vIFNpZGViYXJUb2dnbGUgKFVzZWQgaW4gQXBwcylcclxuICBpbml0U2lkZWJhclRvZ2dsZSgpIHtcclxuICAgIGNvbnN0IHNpZGViYXJUb2dnbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYnMtdG9nZ2xlPVwic2lkZWJhclwiXScpXHJcblxyXG4gICAgc2lkZWJhclRvZ2dsZXIuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcmxheScpXHJcbiAgICAgICAgY29uc3QgYXBwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcHAtb3ZlcmxheScpXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldClcclxuXHJcbiAgICAgICAgdGFyZ2V0RWwuZm9yRWFjaCh0ZWwgPT4ge1xyXG4gICAgICAgICAgdGVsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKVxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0eXBlb2Ygb3ZlcmxheSAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgICAgICAgb3ZlcmxheSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBvdmVybGF5ICE9PSBmYWxzZSAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgYXBwT3ZlcmxheSAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAodGVsLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XHJcbiAgICAgICAgICAgICAgYXBwT3ZlcmxheVswXS5jbGFzc0xpc3QuYWRkKCdzaG93JylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhcHBPdmVybGF5WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwcE92ZXJsYXlbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXHJcbiAgICAgICAgICAgICAgdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAqIEluaXRpYWxpemF0aW9uXHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBIZWxwZXJzLmluaXQoKVxyXG5cclxuICBpZiAoSGVscGVycy5pc01vYmlsZURldmljZSgpICYmIHdpbmRvdy5jaHJvbWUpIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsYXlvdXQtbWVudS0xMDB2aCcpXHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgbGF5b3V0IGFmdGVyIHBhZ2UgbG9hZFxyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSBIZWxwZXJzLnVwZGF0ZSgpXHJcbiAgZWxzZVxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uIG9uQ29udGVudExvYWRlZCgpIHtcclxuICAgICAgSGVscGVycy51cGRhdGUoKVxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb25Db250ZW50TG9hZGVkKVxyXG4gICAgfSlcclxufVxyXG5cclxuLy8gLS0tXHJcbmV4cG9ydCB7IEhlbHBlcnMgfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/helpers.js\n");

/***/ })

/******/ })));
/**
 * Config
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage In order to see the config changes in the template.
 * ! To clear local storage: (https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/).
 */

'use strict';

// JS global variables
let config = {
  colors: {
    primary: '#696cff',
    secondary: '#8592a3',
    success: '#71dd37',
    info: '#03c3ec',
    warning: '#ffab00',
    danger: '#ff3e1d',
    dark: '#233446',
    black: '#000',
    white: '#fff',
    body: '#f4f5fb',
    headingColor: '#566a7f',
    axisColor: '#a1acb8',
    borderColor: '#eceef1'
  }
};
/*! For license information please see bs-stepper.js.LICENSE.txt */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var s in n)("object"==typeof exports?exports:e)[s]=n[s]}}(self,(function(){return function(){var e={7082:function(e){e.exports=function(){"use strict";function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},e.apply(this,arguments)}var t=window.Element.prototype.matches,n=function(e,t){return e.closest(t)},s=function(e,t){return new window.Event(e,t)},i=function(e,t){return new window.CustomEvent(e,t)};!function(){if(window.Element.prototype.matches||(t=window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector),window.Element.prototype.closest||(n=function(e,n){if(!document.documentElement.contains(e))return null;do{if(t.call(e,n))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}),window.Event&&"function"==typeof window.Event||(s=function(e,t){t=t||{};var n=document.createEvent("Event");return n.initEvent(e,Boolean(t.bubbles),Boolean(t.cancelable)),n}),"function"!=typeof window.CustomEvent){var e=window.Event.prototype.preventDefault;i=function(t,n){var s=document.createEvent("CustomEvent");return n=n||{bubbles:!1,cancelable:!1,detail:null},s.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),s.preventDefault=function(){this.cancelable&&(e.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}))},s}}}();var r="active",o="linear",c="dstepper-block",a="dstepper-none",l="fade",u="vertical",p="transitionend",d="bsStepper",f=function(e,t,n,s){var o=e[d];if(!o._steps[t].classList.contains(r)&&!o._stepsContents[t].classList.contains(r)){var a=i("show.bs-stepper",{cancelable:!0,detail:{from:o._currentIndex,to:t,indexStep:t}});e.dispatchEvent(a);var l=o._steps.filter((function(e){return e.classList.contains(r)})),p=o._stepsContents.filter((function(e){return e.classList.contains(r)}));a.defaultPrevented||(l.length&&l[0].classList.remove(r),p.length&&(p[0].classList.remove(r),e.classList.contains(u)||o.options.animation||p[0].classList.remove(c)),v(e,o._steps[t],o._steps,n),h(e,o._stepsContents[t],o._stepsContents,p,s))}},v=function(e,t,n,s){n.forEach((function(t){var n=t.querySelector(s.selectors.trigger);n.setAttribute("aria-selected","false"),e.classList.contains(o)&&n.setAttribute("disabled","disabled")})),t.classList.add(r);var i=t.querySelector(s.selectors.trigger);i.setAttribute("aria-selected","true"),e.classList.contains(o)&&i.removeAttribute("disabled")},h=function(e,t,n,s,o){var u=e[d],f=n.indexOf(t),v=i("shown.bs-stepper",{cancelable:!0,detail:{from:u._currentIndex,to:f,indexStep:f}});if(t.classList.contains(l)){t.classList.remove(a);var h=_(t);t.addEventListener(p,(function n(){t.classList.add(c),t.removeEventListener(p,n),e.dispatchEvent(v),o()})),s.length&&s[0].classList.add(a),t.classList.add(r),m(t,h)}else t.classList.add(r),t.classList.add(c),e.dispatchEvent(v),o()},_=function(e){if(!e)return 0;var t=window.getComputedStyle(e).transitionDuration;return parseFloat(t)?(t=t.split(",")[0],1e3*parseFloat(t)):0},m=function(e,t){var n=!1,i=t+5;function r(){n=!0,e.removeEventListener(p,r)}e.addEventListener(p,r),window.setTimeout((function(){n||e.dispatchEvent(s(p)),e.removeEventListener(p,r)}),i)},L={linear:!0,animation:!1,selectors:{steps:".step",trigger:".step-trigger",stepper:".bs-stepper"}};return function(){function t(t,n){var s,i=this;void 0===n&&(n={}),this._element=t,this._currentIndex=0,this._stepsContents=[],this.options=e({},L,{},n),this.options.selectors=e({},L.selectors,{},this.options.selectors),this.options.linear&&this._element.classList.add(o),this._steps=[].slice.call(this._element.querySelectorAll(this.options.selectors.steps)),this._steps.filter((function(e){return e.hasAttribute("data-target")})).forEach((function(e){i._stepsContents.push(i._element.querySelector(e.getAttribute("data-target")))})),s=this._stepsContents,this.options.animation&&s.forEach((function(e){e.classList.add(l),e.classList.add(a)})),this._setLinkListeners(),Object.defineProperty(this._element,d,{value:this,writable:!0}),this._steps.length&&f(this._element,this._currentIndex,this.options,(function(){}))}var s=t.prototype;return s._setLinkListeners=function(){var e=this;this._steps.forEach((function(t){var s,i=t.querySelector(e.options.selectors.trigger);e.options.linear?(e._clickStepLinearListener=(e.options,function(e){e.preventDefault()}),i.addEventListener("click",e._clickStepLinearListener)):(e._clickStepNonLinearListener=(s=e.options,function(e){e.preventDefault();var t=n(e.target,s.selectors.steps),i=n(t,s.selectors.stepper),r=i[d],o=r._steps.indexOf(t);f(i,o,s,(function(){r._currentIndex=o}))}),i.addEventListener("click",e._clickStepNonLinearListener))}))},s.next=function(){var e=this,t=this._currentIndex+1<=this._steps.length-1?this._currentIndex+1:this._steps.length-1;f(this._element,t,this.options,(function(){e._currentIndex=t}))},s.previous=function(){var e=this,t=this._currentIndex-1>=0?this._currentIndex-1:0;f(this._element,t,this.options,(function(){e._currentIndex=t}))},s.to=function(e){var t=this,n=e-1,s=n>=0&&n<this._steps.length?n:0;f(this._element,s,this.options,(function(){t._currentIndex=s}))},s.reset=function(){var e=this;f(this._element,0,this.options,(function(){e._currentIndex=0}))},s.destroy=function(){var e=this;this._steps.forEach((function(t){var n=t.querySelector(e.options.selectors.trigger);e.options.linear?n.removeEventListener("click",e._clickStepLinearListener):n.removeEventListener("click",e._clickStepNonLinearListener)})),this._element[d]=void 0,this._element=void 0,this._currentIndex=void 0,this._steps=void 0,this._stepsContents=void 0,this._clickStepLinearListener=void 0,this._clickStepNonLinearListener=void 0},t}()}()}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return function(){"use strict";n.r(s),n.d(s,{Stepper:function(){return t.a}});var e=n(7082),t=n.n(e);document.querySelectorAll(".bs-stepper").forEach((function(e){e.addEventListener("show.bs-stepper",(function(t){for(var n=t.detail.indexStep,s=e.querySelectorAll(".line").length,i=e.querySelectorAll(".step"),r=0;r<n;r++){i[r].classList.add("crossed");for(var o=n;o<s;o++)i[o].classList.remove("crossed")}if(0==t.detail.to){for(var c=n;c<s;c++)i[c].classList.remove("crossed");i[0].classList.remove("crossed")}}))}))}(),s}()}));
"use strict";(function(){var e=$(".select2"),t=$(".selectpicker");t.length&&t.selectpicker(),e.length&&e.each(function(){var e=$(this);e.wrap('<div class="position-relative"></div>'),e.select2({placeholder:"Select value",dropdownParent:e.parent()})})}),function(){var e=document.querySelector(".wizard-numbered"),t=[].slice.call(e.querySelectorAll(".btn-next")),l=[].slice.call(e.querySelectorAll(".btn-prev")),r=e.querySelector(".btn-submit");if(null!==e){const c=new Stepper(e,{linear:!1});t&&t.forEach(e=>{e.addEventListener("click",e=>{c.next()})}),l&&l.forEach(e=>{e.addEventListener("click",e=>{c.previous()})}),r&&r.addEventListener("click",e=>{alert("Submitted..!!")})}e=document.querySelector(".wizard-vertical"),t=[].slice.call(e.querySelectorAll(".btn-next")),l=[].slice.call(e.querySelectorAll(".btn-prev")),r=e.querySelector(".btn-submit");if(null!==e){const n=new Stepper(e,{linear:!1});t&&t.forEach(e=>{e.addEventListener("click",e=>{n.next()})}),l&&l.forEach(e=>{e.addEventListener("click",e=>{n.previous()})}),r&&r.addEventListener("click",e=>{alert("Submitted..!!")})}e=document.querySelector(".wizard-modern-example"),t=[].slice.call(e.querySelectorAll(".btn-next")),l=[].slice.call(e.querySelectorAll(".btn-prev")),r=e.querySelector(".btn-submit");if(null!==e){const i=new Stepper(e,{linear:!1});t&&t.forEach(e=>{e.addEventListener("click",e=>{i.next()})}),l&&l.forEach(e=>{e.addEventListener("click",e=>{i.previous()})}),r&&r.addEventListener("click",e=>{alert("Submitted..!!")})}e=document.querySelector(".wizard-modern-vertical"),t=[].slice.call(e.querySelectorAll(".btn-next")),l=[].slice.call(e.querySelectorAll(".btn-prev")),r=e.querySelector(".btn-submit");if(null!==e){const a=new Stepper(e,{linear:!1});t&&t.forEach(e=>{e.addEventListener("click",e=>{a.next()})}),l&&l.forEach(e=>{e.addEventListener("click",e=>{a.previous()})}),r&&r.addEventListener("click",e=>{alert("Submitted..!!")})}};
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("jQuery"));else if("function"==typeof define&&define.amd)define(["jQuery"],t);else{var n="object"==typeof exports?t(require("jQuery")):t(e.jQuery);for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(self,(function(e){return function(){var t={8901:function(e,t,n){var o,s;n.amdD,o=[n(1145)],void 0===(s=function(e){return function(){var t,n,o,s=0,i={clear:function(n,o){var s=u();t||r(s),a(n,s,o)||function(n){for(var o=t.children(),s=o.length-1;s>=0;s--)a(e(o[s]),n)}(s)},remove:function(n){var o=u();t||r(o),n&&0===e(":focus",n).length?d(n):t.children().length&&t.remove()},error:function(e,t,n){return l({type:"error",iconClass:u().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:r,info:function(e,t,n){return l({type:"info",iconClass:u().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){n=e},success:function(e,t,n){return l({type:"success",iconClass:u().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.4",warning:function(e,t,n){return l({type:"warning",iconClass:u().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return i;function r(n,o){return n||(n=u()),(t=e("#"+n.containerId)).length||o&&(t=function(n){return(t=e("<div/>").attr("id",n.containerId).addClass(n.positionClass)).appendTo(e(n.target)),t}(n)),t}function a(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length||(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){d(t)}}),0))}function c(e){n&&n(e)}function l(n){var i=u(),a=n.iconClass||i.iconClass;if(void 0!==n.optionsOverride&&(i=e.extend(i,n.optionsOverride),a=n.optionsOverride.iconClass||a),!function(e,t){if(e.preventDuplicates){if(t.message===o)return!0;o=t.message}return!1}(i,n)){s++,t=r(i,!0);var l=null,p=e("<div/>"),f=e("<div/>"),m=e("<div/>"),g=e("<div/>"),v=e(i.closeHtml),h={intervalId:null,hideEta:null,maxHideTime:null},C={toastId:s,state:"visible",startTime:new Date,options:i,map:n};return n.iconClass&&p.addClass(i.toastClass).addClass(a),function(){if(n.title){var e=n.title;i.escapeHtml&&(e=b(n.title)),f.append(e).addClass(i.titleClass),p.append(f)}}(),function(){if(n.message){var e=n.message;i.escapeHtml&&(e=b(n.message)),m.append(e).addClass(i.messageClass),p.append(m)}}(),i.closeButton&&(v.addClass(i.closeClass).attr("role","button"),p.prepend(v)),i.progressBar&&(g.addClass(i.progressClass),p.prepend(g)),i.rtl&&p.addClass("rtl"),i.newestOnTop?t.prepend(p):t.append(p),function(){var e="";switch(n.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}p.attr("aria-live",e)}(),p.hide(),p[i.showMethod]({duration:i.showDuration,easing:i.showEasing,complete:i.onShown}),i.timeOut>0&&(l=setTimeout(w,i.timeOut),h.maxHideTime=parseFloat(i.timeOut),h.hideEta=(new Date).getTime()+h.maxHideTime,i.progressBar&&(h.intervalId=setInterval((function(){var e=(h.hideEta-(new Date).getTime())/h.maxHideTime*100;g.width(e+"%")}),10))),i.closeOnHover&&p.hover((function(){clearTimeout(l),h.hideEta=0,p.stop(!0,!0)[i.showMethod]({duration:i.showDuration,easing:i.showEasing})}),(function(){(i.timeOut>0||i.extendedTimeOut>0)&&(l=setTimeout(w,i.extendedTimeOut),h.maxHideTime=parseFloat(i.extendedTimeOut),h.hideEta=(new Date).getTime()+h.maxHideTime)})),!i.onclick&&i.tapToDismiss&&p.click(w),i.closeButton&&v&&v.click((function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),i.onCloseClick&&i.onCloseClick(e),w(!0)})),i.onclick&&p.click((function(e){i.onclick(e),w()})),c(C),i.debug&&console&&console.log(C),p}function b(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function w(t){var n=t&&!1!==i.closeMethod?i.closeMethod:i.hideMethod,o=t&&!1!==i.closeDuration?i.closeDuration:i.hideDuration,s=t&&!1!==i.closeEasing?i.closeEasing:i.hideEasing;if(!e(":focus",p).length||t)return clearTimeout(h.intervalId),p[n]({duration:o,easing:s,complete:function(){d(p),clearTimeout(l),i.onHidden&&"hidden"!==C.state&&i.onHidden(),C.state="hidden",C.endTime=new Date,c(C)}})}}function u(){return e.extend({},{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1},i.options)}function d(e){t||(t=r()),e.is(":visible")||(e.remove(),e=null,0===t.children().length&&(t.remove(),o=void 0))}}()}.apply(t,o))||(e.exports=s)},1145:function(t){"use strict";t.exports=e}},n={};function o(e){var s=n[e];if(void 0!==s)return s.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.amdD=function(){throw new Error("define cannot be used indirect")},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return function(){"use strict";o.r(s),o.d(s,{toastr:function(){return e}});var e=o(8901)}(),s}()}));
/*!
 * github-buttons v2.27.0
 * (c) 2023 なつき
 * @license BSD-2-Clause
 */
!(function () {
  "use strict";
  var o = window.document,
    e = o.location,
    t = window.Math,
    r = window.HTMLElement,
    a = window.XMLHttpRequest,
    n = "github-button",
    i = "https://buttons.github.io/buttons.html",
    c = "github.com",
    l = "https://api." + c,
    d = a && "prototype" in a && "withCredentials" in a.prototype,
    s = d && r && "attachShadow" in r.prototype && !("prototype" in r.prototype.attachShadow),
    u = function (o, e) {
      for (var t = 0, r = o.length; t < r; t++) e(o[t]);
    },
    f = function (o) {
      return function (e, t, r) {
        var a = o.createElement(e);
        if (null != t)
          for (var n in t) {
            var i = t[n];
            null != i && (null != a[n] ? (a[n] = i) : a.setAttribute(n, i));
          }
        return (
          null != r &&
            u(r, function (e) {
              a.appendChild("string" == typeof e ? o.createTextNode(e) : e);
            }),
          a
        );
      };
    },
    h = f(o),
    g = function (o) {
      var e;
      return function () {
        e || ((e = 1), o.apply(this, arguments));
      };
    },
    b = function (o, e) {
      return {}.hasOwnProperty.call(o, e);
    },
    p = function (o) {
      return ("" + o).toLowerCase();
    },
    v = function (o, e, t, r) {
      null == e && (e = "&"), null == t && (t = "="), null == r && (r = window.decodeURIComponent);
      var a = {};
      return (
        u(o.split(e), function (o) {
          if ("" !== o) {
            var e = o.split(t);
            a[r(e[0])] = null != e[1] ? r(e.slice(1).join(t)) : void 0;
          }
        }),
        a
      );
    },
    m = function (o, e, t) {
      o.addEventListener ? o.addEventListener(e, t, !1) : o.attachEvent("on" + e, t);
    },
    w = function (o, e, t) {
      o.removeEventListener ? o.removeEventListener(e, t, !1) : o.detachEvent("on" + e, t);
    },
    k = function (o, e, t) {
      var r = function () {
        return w(o, e, r), t.apply(this, arguments);
      };
      m(o, e, r);
    },
    x = function (o, e, t) {
      if (null != o.readyState) {
        var r = "readystatechange",
          a = function () {
            if (e.test(o.readyState)) return w(o, r, a), t.apply(this, arguments);
          };
        m(o, r, a);
      }
    },
    y = {
      light:
        ".btn:focus-visible,.social-count:focus-visible{outline:2px solid #0969da;outline-offset:-2px}.btn{color:#24292f;background-color:#ebf0f4;border-color:#ccd1d5;border-color:rgba(31,35,40,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f6f8fa'/%3e%3cstop offset='90%25' stop-color='%23ebf0f4'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f6f8fa, #ebf0f4 90%);background-image:linear-gradient(180deg, #f6f8fa, #ebf0f4 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF6F8FA', endColorstr='#FFEAEFF3')}:root .btn{filter:none}.btn:hover,.btn:focus{background-color:#e9ebef;background-position:0 -0.5em;border-color:#cbcdd1;border-color:rgba(31,35,40,.15);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);background-image:linear-gradient(180deg, #f3f4f6, #e9ebef 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF3F4F6', endColorstr='#FFE8EAEE')}:root .btn:hover,:root .btn:focus{filter:none}.btn:active{background-color:#e5e9ed;border-color:#c7cbcf;border-color:rgba(31,35,40,.15);background-image:none;filter:none}.social-count{color:#24292f;background-color:#fff;border-color:#dddedf;border-color:rgba(31,35,40,.15)}.social-count:hover,.social-count:focus{color:#0969da}.octicon-heart{color:#bf3989}",
      light_high_contrast:
        ".btn:focus-visible,.social-count:focus-visible{outline:2px solid #0349b4;outline-offset:-2px}.btn{color:#0e1116;background-color:#e7ecf0;border-color:#2f3237;border-color:rgba(1,4,9,.8);background-image:none;filter:none}.btn:hover,.btn:focus{background-color:#c4cdd5;background-position:0 -0.5em;border-color:#282c32;border-color:rgba(1,4,9,.8);background-image:none;filter:none}.btn:active{background-color:#d8dde1;border-color:#2c2f34;border-color:rgba(1,4,9,.8)}.social-count{color:#0e1116;background-color:#fff;border-color:#34363a;border-color:rgba(1,4,9,.8)}.social-count:hover,.social-count:focus{color:#0349b4}.octicon-heart{color:#971368}",
      dark: ".btn:focus-visible,.social-count:focus-visible{outline:2px solid #2f81f7;outline-offset:-2px}.btn{color:#c9d1d9;background-color:#1a1e23;border-color:#2f3439;border-color:rgba(240,246,252,.1);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2321262d'/%3e%3cstop offset='90%25' stop-color='%231a1e23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #21262d, #1a1e23 90%);background-image:linear-gradient(180deg, #21262d, #1a1e23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF21262D', endColorstr='#FF191D22')}:root .btn{filter:none}.btn:hover,.btn:focus{background-color:#292e33;background-position:0 -0.5em;border-color:#8b949e;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2330363d'/%3e%3cstop offset='90%25' stop-color='%23292e33'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #30363d, #292e33 90%);background-image:linear-gradient(180deg, #30363d, #292e33 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF30363D', endColorstr='#FF282D32')}:root .btn:hover,:root .btn:focus{filter:none}.btn:active{background-color:#161719;border-color:#8b949e;background-image:none;filter:none}.social-count{color:#c9d1d9;background-color:#0d1117;border-color:#24282e;border-color:rgba(240,246,252,.1)}.social-count:hover,.social-count:focus{color:#2f81f7}.octicon-heart{color:#db61a2}",
      dark_dimmed:
        ".btn:focus-visible,.social-count:focus-visible{outline:2px solid #539bf5;outline-offset:-2px}.btn{color:#adbac7;background-color:#30363d;border-color:#40464e;border-color:rgba(205,217,229,.1);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23373e47'/%3e%3cstop offset='90%25' stop-color='%2330363d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #373e47, #30363d 90%);background-image:linear-gradient(180deg, #373e47, #30363d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF373E47', endColorstr='#FF2F353C')}:root .btn{filter:none}.btn:hover,.btn:focus{background-color:#3c444d;background-position:0 -0.5em;border-color:#768390;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23444c56'/%3e%3cstop offset='90%25' stop-color='%233c444d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #444c56, #3c444d 90%);background-image:linear-gradient(180deg, #444c56, #3c444d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF444C56', endColorstr='#FF3B434C')}:root .btn:hover,:root .btn:focus{filter:none}.btn:active{background-color:#2e3031;border-color:#768390;background-image:none;filter:none}.social-count{color:#adbac7;background-color:#22272e;border-color:#333940;border-color:rgba(205,217,229,.1)}.social-count:hover,.social-count:focus{color:#539bf5}.octicon-heart{color:#c96198}",
      dark_high_contrast:
        ".btn:focus-visible,.social-count:focus-visible{outline:2px solid #71b7ff;outline-offset:-2px}.btn{color:#f0f3f6;background-color:#272b33;border-color:#7a828e;background-image:none;filter:none}.btn:hover,.btn:focus{background-color:#4a515b;background-position:0 -0.5em;border-color:#bdc4cc;background-image:none;filter:none}.btn:active{background-color:#1d1d1f;border-color:#bdc4cc}.social-count{color:#f0f3f6;background-color:#0a0c10;border-color:#7a828e}.social-count:hover,.social-count:focus{color:#71b7ff}.octicon-heart{color:#ef6eb1}",
    },
    C = function (o, e) {
      return "@media(prefers-color-scheme:" + o + "){" + y[b(y, e) ? e : o] + "}";
    },
    M = {
      "comment-discussion": {
        heights: {
          16: {
            width: 16,
            path: '<path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z"></path>',
          },
        },
      },
      download: {
        heights: {
          16: {
            width: 16,
            path: '<path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path>',
          },
        },
      },
      eye: {
        heights: {
          16: {
            width: 16,
            path: '<path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path>',
          },
        },
      },
      heart: {
        heights: {
          16: {
            width: 16,
            path: '<path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>',
          },
        },
      },
      "issue-opened": {
        heights: {
          16: {
            width: 16,
            path: '<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>',
          },
        },
      },
      "mark-github": {
        heights: {
          16: {
            width: 16,
            path: '<path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>',
          },
        },
      },
      package: {
        heights: {
          16: {
            width: 16,
            path: '<path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path>',
          },
        },
      },
      play: {
        heights: {
          16: {
            width: 16,
            path: '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"></path>',
          },
        },
      },
      "repo-forked": {
        heights: {
          16: {
            width: 16,
            path: '<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>',
          },
        },
      },
      "repo-template": {
        heights: {
          16: {
            width: 16,
            path: '<path d="M13.25 8a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-.75a.75.75 0 0 1 0-1.5h.75v-.25a.75.75 0 0 1 .75-.75ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2ZM2.75 8a.75.75 0 0 1 .75.75v.268c.083-.012.166-.018.25-.018h.5a.75.75 0 0 1 0 1.5h-.5a.25.25 0 0 0-.25.25v.75c0 .28.114.532.3.714a.75.75 0 1 1-1.05 1.072A2.495 2.495 0 0 1 2 11.5V8.75A.75.75 0 0 1 2.75 8ZM11 .75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V1.5h-.75A.75.75 0 0 1 11 .75Zm-5 0A.75.75 0 0 1 6.75 0h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 .75Zm0 9A.75.75 0 0 1 6.75 9h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 9.75ZM4.992.662a.75.75 0 0 1-.636.848c-.436.063-.783.41-.846.846a.751.751 0 0 1-1.485-.212A2.501 2.501 0 0 1 4.144.025a.75.75 0 0 1 .848.637ZM2.75 4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 2.75 4Zm10.5 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z"></path>',
          },
        },
      },
      star: {
        heights: {
          16: {
            width: 16,
            path: '<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>',
          },
        },
      },
    },
    Z = function (o, e) {
      (o = p(o).replace(/^octicon-/, "")), b(M, o) || (o = "mark-github");
      var t = e >= 24 && 24 in M[o].heights ? 24 : 16,
        r = M[o].heights[t];
      return (
        '<svg viewBox="0 0 ' +
        r.width +
        " " +
        t +
        '" width="' +
        (e * r.width) / t +
        '" height="' +
        e +
        '" class="octicon octicon-' +
        o +
        '" aria-hidden="true">' +
        r.path +
        "</svg>"
      );
    },
    A = {},
    F = function (o, e) {
      var t = A[o] || (A[o] = []);
      if (!(t.push(e) > 1)) {
        var r = g(function () {
          for (delete A[o]; (e = t.shift()); ) e.apply(null, arguments);
        });
        if (d) {
          var n = new a();
          m(n, "abort", r),
            m(n, "error", r),
            m(n, "load", function () {
              var o;
              try {
                o = JSON.parse(this.responseText);
              } catch (o) {
                return void r(o);
              }
              r(200 !== this.status, o);
            }),
            n.open("GET", o),
            n.send();
        } else {
          var i = this || window;
          i._ = function (o) {
            (i._ = null), r(200 !== o.meta.status, o.data);
          };
          var c = f(i.document)("script", {
              async: !0,
              src: o + (-1 !== o.indexOf("?") ? "&" : "?") + "callback=_",
            }),
            l = function () {
              i._ && i._({ meta: {} });
            };
          m(c, "load", l),
            m(c, "error", l),
            x(c, /de|m/, l),
            i.document.getElementsByTagName("head")[0].appendChild(c);
        }
      }
    },
    L = function (o, e, t) {
      var r = f(o.ownerDocument),
        a = o.appendChild(r("style", { type: "text/css" })),
        n =
          "body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;line-height:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;display:inline-flex;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:16px;padding:5px 10px;font-size:12px;line-height:16px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor;overflow:visible}" +
          (function (o) {
            if (null == o) return y.light;
            if (b(y, o)) return y[o];
            var e = v(o, ";", ":", function (o) {
              return o.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g, "");
            });
            return (
              y[b(y, e["no-preference"]) ? e["no-preference"] : "light"] +
              C("light", e.light) +
              C("dark", e.dark)
            );
          })(e["data-color-scheme"]);
      a.styleSheet ? (a.styleSheet.cssText = n) : a.appendChild(o.ownerDocument.createTextNode(n));
      var i = "large" === p(e["data-size"]),
        d = r(
          "a",
          {
            className: "btn",
            href: e.href,
            rel: "noopener",
            target: "_blank",
            title: e.title || void 0,
            "aria-label": e["aria-label"] || void 0,
            innerHTML: Z(e["data-icon"], i ? 16 : 14) + "&nbsp;",
          },
          [r("span", {}, [e["data-text"] || ""])]
        ),
        s = o.appendChild(r("div", { className: "widget" + (i ? " widget-lg" : "") }, [d])),
        u = d.hostname.replace(/\.$/, "");
      if (("." + u).substring(u.length - c.length) !== "." + c) return d.removeAttribute("href"), void t(s);
      var h = (" /" + d.pathname).split(/\/+/);
      if (
        ((((u === c || u === "gist." + c) && "archive" === h[3]) ||
          (u === c &&
            "releases" === h[3] &&
            ("download" === h[4] || ("latest" === h[4] && "download" === h[5]))) ||
          u === "codeload." + c) &&
          (d.target = "_top"),
        "true" === p(e["data-show-count"]) &&
          u === c &&
          "marketplace" !== h[1] &&
          "sponsors" !== h[1] &&
          "orgs" !== h[1] &&
          "users" !== h[1] &&
          "-" !== h[1])
      ) {
        var g, m;
        if (!h[2] && h[1]) (m = "followers"), (g = "?tab=followers");
        else if (!h[3] && h[2]) (m = "stargazers_count"), (g = "/stargazers");
        else if (h[4] || "subscription" !== h[3])
          if (h[4] || "fork" !== h[3]) {
            if ("issues" !== h[3]) return void t(s);
            (m = "open_issues_count"), (g = "/issues");
          } else (m = "forks_count"), (g = "/forks");
        else (m = "subscribers_count"), (g = "/watchers");
        var w = h[2] ? "/repos/" + h[1] + "/" + h[2] : "/users/" + h[1];
        F.call(this, l + w, function (o, e) {
          if (!o) {
            var a = e[m];
            s.appendChild(
              r(
                "a",
                {
                  className: "social-count",
                  href: e.html_url + g,
                  rel: "noopener",
                  target: "_blank",
                  "aria-label":
                    a +
                    " " +
                    m
                      .replace(/_count$/, "")
                      .replace("_", " ")
                      .slice(0, a < 2 ? -1 : void 0) +
                    " on GitHub",
                },
                [("" + a).replace(/\B(?=(\d{3})+(?!\d))/g, ",")]
              )
            );
          }
          t(s);
        });
      } else t(s);
    },
    _ = window.devicePixelRatio || 1,
    E = function (o) {
      return (_ > 1 ? t.ceil((t.round(o * _) / _) * 2) / 2 : t.ceil(o)) || 0;
    },
    G = function (o, e) {
      (o.style.width = e[0] + "px"), (o.style.height = e[1] + "px");
    },
    T = function (e, r) {
      if (null != e && null != r)
        if (
          (e.getAttribute &&
            (e = (function (o) {
              var e = { href: o.href, title: o.title, "aria-label": o.getAttribute("aria-label") };
              return (
                u(["icon", "color-scheme", "text", "size", "show-count"], function (t) {
                  var r = "data-" + t;
                  e[r] = o.getAttribute(r);
                }),
                null == e["data-text"] && (e["data-text"] = o.textContent || o.innerText),
                e
              );
            })(e)),
          s)
        ) {
          var a = h("span");
          L(a.attachShadow({ mode: "closed" }), e, function () {
            r(a);
          });
        } else {
          var n = h("iframe", {
            src: "javascript:0",
            title: e.title || void 0,
            allowtransparency: !0,
            scrolling: "no",
            frameBorder: 0,
          });
          G(n, [0, 0]), (n.style.border = "none");
          var c = function () {
            var a,
              l = n.contentWindow;
            try {
              a = l.document.body;
            } catch (e) {
              return void o.body.appendChild(n.parentNode.removeChild(n));
            }
            w(n, "load", c),
              L.call(l, a, e, function (o) {
                var a = (function (o) {
                  var e = o.offsetWidth,
                    r = o.offsetHeight;
                  if (o.getBoundingClientRect) {
                    var a = o.getBoundingClientRect();
                    (e = t.max(e, E(a.width))), (r = t.max(r, E(a.height)));
                  }
                  return [e, r];
                })(o);
                n.parentNode.removeChild(n),
                  k(n, "load", function () {
                    G(n, a);
                  }),
                  (n.src =
                    i +
                    "#" +
                    (n.name = (function (o, e, t, r) {
                      null == e && (e = "&"),
                        null == t && (t = "="),
                        null == r && (r = window.encodeURIComponent);
                      var a = [];
                      for (var n in o) {
                        var i = o[n];
                        null != i && a.push(r(n) + t + r(i));
                      }
                      return a.join(e);
                    })(e))),
                  r(n);
              });
          };
          m(n, "load", c), o.body.appendChild(n);
        }
    };
  e.protocol + "//" + e.host + e.pathname === i
    ? L(o.body, v(window.name || e.hash.replace(/^#/, "")), function () {})
    : (function (e) {
        if ("complete" === o.readyState || ("loading" !== o.readyState && !o.documentElement.doScroll))
          setTimeout(e);
        else if (o.addEventListener) {
          var t = g(e);
          k(o, "DOMContentLoaded", t), k(window, "load", t);
        } else x(o, /m/, e);
      })(function () {
        var e,
          t = o.querySelectorAll
            ? o.querySelectorAll("a." + n)
            : ((e = []),
              u(o.getElementsByTagName("a"), function (o) {
                -1 !== (" " + o.className + " ").replace(/[ \t\n\f\r]+/g, " ").indexOf(" " + n + " ") &&
                  e.push(o);
              }),
              e);
        u(t, function (o) {
          T(o, function (e) {
            o.parentNode.replaceChild(e, o);
          });
        });
      });
})();







