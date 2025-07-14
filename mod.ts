interface IOptions {
  default: any
}

interface ISwitchObject {
  case: (variable: any) => boolean
  value: any
}

/**
 * A simple switcher function that can handle both object and array based switch cases.
 * 
 * @param variable - The variable to be checked against the cases.
 * @param switchObjectOrArray - An object or an array of switch objects to check against.
 * @param options - Optional parameter to specify a default value if no case matches.
 * @returns The value corresponding to the matched case, or the default value if no match is found.
 */

export default function switcher(
  variable: any,
  switchObjectOrArray: object | ISwitchObject[] | undefined,
  options?: IOptions
): any {
  if((typeof switchObjectOrArray === 'object' && switchObjectOrArray !== null)) {
    for (const [key, value] of Object.entries(switchObjectOrArray)) {
      if(key == variable) {
        return value
      }
    }
  } 
  if(Array.isArray(switchObjectOrArray) && switchObjectOrArray.length) {
    for(const switchObject of switchObjectOrArray) {
      if(typeof switchObject.case === 'function' && switchObject.case(variable)) {
        return switchObject.value 
      }
    }
  }
  return options?.default
}


