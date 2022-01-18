import {UUIDError} from './uuiderror';
import * as crypto from 'crypto';

export class UUID {
  /**
   * Check if the given test string is a valid uuid string.
   * https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-UUID/13653180#13653180
   * @param {string} uuidTestString
   * @returns {boolean} True if it is a valid uuid string, otherwise false.
   */
  public static isValidUUID(uuidTestString: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuidTestString
    );
  }

  /**
   * Check if the given test string is a valid uuid dash free string.
   *
   * @param {string} uuidTestString
   * @returns {boolean} True if it is a valid dash free uuid string, otherwise false.
   */
  public static isValidDashFreeUUID(uuidTestString: string): boolean {
    return /^[0-9a-f]{8}[0-9a-f]{4}[1-5][0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i.test(
      uuidTestString
    );
  }

  /**
   * Get a dash free UUID.
   * @param {UUID} uuid
   * @returns {string} A dash free UUID.
   */
  public static getDashFreeUUID(uuid: UUID): string {
    return uuid.toString().replace(/-/g, '');
  }

  /**
   * Get UUID which contains the dashes.
   * @param {string} dashFreeUuid - A dash free UUID.
   * @returns {UUID} A dash containing UUID.
   * @throws {UUIDError}
   */
  public static getDashContainedUUID(dashFreeUuid: string): UUID {
    // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    if (UUID.isValidDashFreeUUID(dashFreeUuid)) {
      return new UUID(
        `${dashFreeUuid.slice(0, 8)}-${dashFreeUuid.slice(
          8,
          12
        )}-${dashFreeUuid.slice(12, 16)}-${dashFreeUuid.slice(
          16,
          20
        )}-${dashFreeUuid.slice(20, 33)}`
      );
    } else {
      throw new UUIDError('Got a non valid dash free UUID: ' + dashFreeUuid);
    }
  }

  /**
   * Creates a UUID string.
   * @returns {string} A UUID string.
   */
  public static createUUID(): string {
    // your favourite UUID generation function could go here
    // ex: http://stackoverflow.com/a/8809472/188246
    // let d: number = new Date().getTime();
    // if (typeof window?.performance?.now === 'function') {
    //   d += performance.now(); // use high-precision timer if available
    // }
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    //   const r = (d + Math.random() * 16) % 16 | 0;
    //   d = Math.floor(d / 16);
    //   return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    // });
    // return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c: number) =>
    //   (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    // );
    return crypto.randomUUID();
  }

  // /**
  //  * Get the uuid string, if the passed string is a valid uuid string.
  //  * @param {string} str
  //  * @returns {string} The uuid string, if it is a valid uuid, otherwise null.
  //  */
  // private static getValidUUID(str: string): string {
  //   if (UUID.isValidUUID(str)) {
  //     return str;
  //   }
  //   return null;
  // }

  readonly uuid: string;

  /**
   * Constructs a new UUID from the given parameter, if it is a valid UUID string.
   * If no parameter is passed, an UUID will be generated.
   * @param {string} [str]
   * @throws {UUIDError}
   */
  constructor(str?: string) {
    if (str) {
      if (!UUID.isValidUUID(str)) {
        throw new UUIDError('Can not parse string as UUID: ' + str);
      } else {
        this.uuid = str;
      }
    } else {
      this.uuid = UUID.createUUID();
    }
  }

  /**
   * Checks if the given UUID string or class is equal to this UUID.
   * @param {string|UUID} uuid
   * @returns {boolean}
   * @public
   */
  public equals(uuid: string | UUID): boolean {
    if (uuid instanceof UUID) {
      return this.uuid === uuid.toString();
    } else if (typeof uuid === 'string') {
      return this.uuid === uuid;
    } else {
      return false;
    }
  }

  /**
   * @see @link {UUID.getDashFreeUUID}
   * @public
   */
  public getDashFreeUUID(): string {
    return UUID.getDashFreeUUID(this);
  }

  /**
   * Get the UUID in string representation.
   * @returns {string} UUID as string.
   * @public
   */
  public toString(): string {
    return this.uuid;
  }
}
