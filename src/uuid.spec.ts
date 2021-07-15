import {assert, expect} from 'chai';
import 'mocha';
import {UUID} from './uuid';
import {UUIDError} from './uuiderror';

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
    const dashFreeUuid = '23f088bda27347d2879dfac70102eb0b';
    const result = UUID.getDashContainedUUID(dashFreeUuid);
    expect(result.toString()).to.equal('23f088bd-a273-47d2-879d-fac70102eb0b');
  });

  it('should throw an error', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    assert.throw(
      () => UUID.getDashContainedUUID(uuid.toString()),
      UUIDError,
      'Got a non valid dash free UUID: ' + uuid
    );
  });
});

describe('toString function', () => {
  it('should return a uuid string', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.toString();
    expect(result)
      .an('string')
      .to.equal('23f088bd-a273-47d2-879d-fac70102eb0b');
  });
});

describe('equals function', () => {
  it('should return true if two uuid values are the same', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.equals('23f088bd-a273-47d2-879d-fac70102eb0b');
    expect(result).an('boolean').to.equal(true);
  });

  it('should return false if two uuid values are not the same', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.equals('23f088bd-a273-47d2-879d-fac70102eb0c');
    expect(result).an('boolean').to.equal(false);
  });

  it('should return true if two uuid values are the same', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.equals(
      new UUID('23f088bd-a273-47d2-879d-fac70102eb0b')
    );
    expect(result).an('boolean').to.equal(true);
  });

  it('should return false if two uuid values are not the same', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.equals(
      new UUID('23f088bd-a273-47d2-879d-fac70102eb0c')
    );
    expect(result).an('boolean').to.equal(false);
  });

  it('should return false if parameter is not of type string or instanceof UUID', () => {
    const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
    const result = uuid.equals(null);
    expect(result).to.be.false;
  });
});

describe('test throw uuid parse error', () => {
  it('should throw an error, if given uuid string is not valid', () => {
    const uuid = '3f088bd-a273-47d2-879d-fac70102eb0b';
    assert.throw(
      () => new UUID(uuid),
      UUIDError,
      'Can not parse string as UUID: ' + uuid
    );
  });
});

describe('createUUID should be return a valid uuid string', () => {
  it('should create an valid uuid string', () => {
    const uuid = UUID.createUUID();
    const isValidUUID = UUID.isValidUUID(uuid);
    expect(isValidUUID).to.be.true;
  });
});

describe('constructor test without parameter', () => {
  it('should create an valid uuid string', () => {
    const uuid = new UUID();
    const isValidUUID = UUID.isValidUUID(uuid.toString());
    expect(isValidUUID).to.be.true;
  });
});
