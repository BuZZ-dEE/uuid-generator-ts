import {UUIDError} from './uuiderror';

export type UUIDString = `${string}-${string}-${string}-${string}-${string}`;

export class UUID {
  /**
   * Check if the given test string is a valid UUID string.
   * https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-UUID/13653180#13653180
   * @param {string} uuidTestString
   * @returns {boolean} True if it is a valid UUID string, otherwise false.
   */
  public static isValidUUID(uuidTestString: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuidTestString,
    );
  }

  /**
   * Check if the given test string is a valid dash-free UUID string.
   *
   * @param {string} uuidTestString
   * @returns {boolean} True if it is a valid dash-free UUID string, otherwise false.
   */
  public static isValidDashFreeUUID(uuidTestString: string): boolean {
    return /^[0-9a-f]{8}[0-9a-f]{4}[1-5][0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i.test(
      uuidTestString,
    );
  }

  /**
   * Get a dash-free UUID.
   * @param {UUID} uuid
   * @returns {string} A dash-free UUID.
   */
  public static getDashFreeUUID(uuid: UUID): string {
    return uuid.toString().replace(/-/g, '');
  }

  /**
   * Get UUID which contains the dashes.
   * @param {string} dashFreeUuid - A dash-free UUID.
   * @returns {UUID} A dash-containing UUID.
   * @throws {UUIDError}
   */
  public static getDashContainedUUID(dashFreeUuid: string): UUID {
    // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    if (UUID.isValidDashFreeUUID(dashFreeUuid)) {
      return new UUID(
        `${dashFreeUuid.slice(0, 8)}-${dashFreeUuid.slice(
          8,
          12,
        )}-${dashFreeUuid.slice(12, 16)}-${dashFreeUuid.slice(
          16,
          20,
        )}-${dashFreeUuid.slice(20, 32)}`,
      );
    } else {
      throw new UUIDError('Got a non valid dash free UUID: ' + dashFreeUuid);
    }
  }

  /**
   * Creates a UUID string.
   * @returns {UUIDString} A UUID string.
   */
  public static createUUID(): UUIDString {
    if (typeof globalThis.crypto?.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }

    // your favourite UUID generation function could go here
    // ex: http://stackoverflow.com/a/8809472/188246
    let d: number = new Date().getTime();
    if (typeof globalThis.performance?.now === 'function') {
      d += globalThis.performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }) as UUIDString;
  }

  readonly uuid: UUIDString;

  /**
   * Constructs a new UUID from the given parameter, if it is a valid UUID string.
   * If no parameter is passed, a UUID will be generated.
   * @param {string} [str]
   * @throws {UUIDError}
   */
  constructor(str?: string) {
    if (str === undefined) {
      this.uuid = UUID.createUUID();
    } else if (!UUID.isValidUUID(str)) {
      throw new UUIDError('Can not parse string as UUID: ' + str);
    } else {
      this.uuid = str as UUIDString;
    }
  }

  /**
   * Checks whether this UUID is equal to another UUID instance or UUID string.
   * Unsupported value types always return false.
   * @param uuid - The value to compare with this UUID.
   * @returns True when the value is an equal UUID instance or UUID string, otherwise false.
   * @public
   */
  public equals(uuid: unknown): boolean {
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
   * @returns {UUIDString} UUID as string.
   * @public
   */
  public toString(): UUIDString {
    return this.uuid;
  }
}
