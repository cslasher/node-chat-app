var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Sender';
    var text = 'Message';

    var res = generateMessage(from, text);
    expect(res).toInclude({from, text});
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Sender';
    var lat = 15;
    var long = 12;
    var url = 'https://www.google.com/maps?q=15,12';

    var res = generateLocationMessage(from, lat, long);
    expect(res).toInclude({
    	from,
    	url
    });
    expect(res.createdAt).toBeA('number');
  });
});
