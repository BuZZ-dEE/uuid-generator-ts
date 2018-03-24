import {expect} from 'chai';
import 'mocha';
import {UUID} from './uuid';

describe('getDashFreeUUID function', () => {

  it('should return a dash free uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.getDashFreeUUID();
    expect(result).to.equal('23f088bda27347d2879dfac70102eb0b');
  });

});
