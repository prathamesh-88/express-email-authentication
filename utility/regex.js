const regularExpression = {
    //Data Types
    "INTEGER": "^[0-9]+$",
    "FLOAT": "^[0-9]+[.][0-9]+$",
    "STRING": "^[a-zA-Z0-9]+$",
    //User Specific
    'EMAIL': "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",//'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    'PHONE': '^[0-9]{10}$',
    'PASSWORD': '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
    'NAME': '^[a-zA-Z ]{2,30}$',
    //User Location Specific
    'ADDRESS': '^[a-zA-Z0-9\s,.-]{2,30}$',
    'CITY': '^[a-zA-Z ]{2,30}$',
    'STATE': '^[a-zA-Z ]{2,30}$',
    'ZIP': '^[0-9]{5}$',

}

const testRegExp = (type, str) => {
    regStr = regularExpression[type.toUpperCase()];
    let regExp = new RegExp(regStr);
    return regExp.test(str);
}

module.exports=testRegExp;