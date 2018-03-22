/**
 * A UUID related error.
 */
export class UUIDError extends Error {
  constructor(m: string) {
    super('Can not parse string as UUID: ' + m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UUIDError.prototype);
  }
}
