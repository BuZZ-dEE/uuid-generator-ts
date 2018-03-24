import {expect} from 'chai';
import 'mocha';
import {UUID} from './uuid';

describe('isValidUUID function', () => {
  it('should return true if it is an uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = UUID.isValidUUID(uuid.toString());
    expect(result).to.equal(true);
  });
});

describe('isValidUUID function', () => {
  it('should return false if it is not an uuid', () => {
    const uuid = '23f088bd-a273-47d2-879d-fac70102eb0';
    const result = UUID.isValidUUID(uuid);
    expect(result).to.equal(false);
  });
});

describe('getDashFreeUUID function', () => {
  it('should return a dash free uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.getDashFreeUUID();
    expect(result).to.equal('23f088bda27347d2879dfac70102eb0b');
  });
});

describe('isValidDashFreeUUID function', () => {
  it('should return true if it is a dash free uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const dashFreeUuid = uuid.getDashFreeUUID();
    const result = UUID.isValidDashFreeUUID(dashFreeUuid);
    expect(result).to.equal(true);
  });
});

describe('isValidDashFreeUUID function', () => {
  it('should return false if it is not a dash free uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = UUID.isValidDashFreeUUID(uuid.toString());
    expect(result).to.equal(false);
  });
});

describe('getDashContainedUUID function', () => {
  it('should return a dash containing uuid', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const dashFreeUuid = uuid.getDashFreeUUID();
    const result = UUID.getDashContainedUUID(dashFreeUuid);
    expect(result).to.equal('23f088bd-a273-47d2-879d-fac70102eb0b');
  });
});
