/**
 * A UUID related error.
 */
export class UUIDError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UUIDError.prototype);
  }
}
