var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var str = 123;
    
    var res = isRealString(str);
    expect(res).toBe(false);
  });
  
  it('should reject strings with only spaces', () =>{
    var str = "   ";
    
    var res = isRealString(str);
    expect(res).toBe(false);    
  });
  
  it('should allow strings with non-space characters', () =>{
    var str = "The Great Gatsby";
    
    var res = isRealString(str);
    expect(res).toBe(true);
  })
})