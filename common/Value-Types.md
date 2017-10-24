## number
Number can be either a integer or float number


## string

#### editors (optional)
  * password
    * Masks the input box.
  * daterange
    * Opens a date range editor.
  * date
    * Opens a date editor.
  * textarea
    * Allows for multi-line input.
  * enum
    * enum editors, fisrt option will be the default value
      * special character in options should be url encoded
      * example: editor=`enum[off,on,auto]`

## bool

#### editors (optional)
* bool enum, first option will be false and second will be true
  * special character in options should be url encoded
  * example: editor=`bool[off, on]`

## binary
Byte array

## map
Map object with key/value pairs. Key is always a string, and value is always of type dynamic.

#### Examples
* {"name":"Rick", "email":"rick\@iot-dsa.org"}
* {"primes":[2,3,5,7,11]}

## array
An array, children values are always of type dynamic.

### Examples
* [{"name":"Rick", "email":"rick\@iot-dsa.org"}, {"name":"Dennis", "email":"dennis\@iot-dsa.org"}]
* [2,3,5,7,11]

## dynamic
The dynamic value type can be any type listed above.
