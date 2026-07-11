# uuid-generator-ts

A small TypeScript UUID utility for creating, validating, converting, and comparing UUID strings.

[![CI](https://github.com/BuZZ-dEE/uuid-generator-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/BuZZ-dEE/uuid-generator-ts/actions/workflows/ci.yml)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/BuZZ-dEE/uuid-generator-ts)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/uuid-generator-ts)](https://libraries.io/npm/uuid-generator-ts)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![npm bundle size](https://img.shields.io/bundlephobia/min/uuid-generator-ts)](https://bundlephobia.com/package/uuid-generator-ts)
[![npm](https://img.shields.io/npm/v/uuid-generator-ts)](https://www.npmjs.com/package/uuid-generator-ts)
[![NPM](https://img.shields.io/npm/l/uuid-generator-ts)](https://github.com/BuZZ-dEE/uuid-generator-ts/blob/main/LICENSE)

## Features

- Generate RFC 4122 version 4 UUID strings.
- Use `crypto.randomUUID()` when available.
- Fall back to a timestamp/random based UUID implementation in older runtimes.
- Validate UUID strings with and without dashes.
- Convert dash-free UUID strings back to canonical dashed UUID strings.
- Compare UUID instances and strings.
- Includes TypeScript declarations and source maps.

## Installation

```sh
npm install uuid-generator-ts
```

```sh
pnpm add uuid-generator-ts
```

```sh
yarn add uuid-generator-ts
```

## Usage

```typescript
import {UUID} from 'uuid-generator-ts';

const uuid = new UUID();

console.log(uuid.toString());
// Example: '23f088bd-a273-47d2-879d-fac70102eb0b'

console.log(uuid.getDashFreeUUID());
// Example: '23f088bda27347d2879dfac70102eb0b'
```

Create a UUID from an existing string:

```typescript
import {UUID} from 'uuid-generator-ts';

const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');

console.log(uuid.toString());
// '23f088bd-a273-47d2-879d-fac70102eb0b'
```

Validate UUID strings:

```typescript
import {UUID} from 'uuid-generator-ts';

UUID.isValidUUID('23f088bd-a273-47d2-879d-fac70102eb0b');
// true

UUID.isValidUUID('23f088bda27347d2879dfac70102eb0b');
// false

UUID.isValidDashFreeUUID('23f088bda27347d2879dfac70102eb0b');
// true
```

Convert between dashed and dash-free formats:

```typescript
import {UUID} from 'uuid-generator-ts';

const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
const dashFree = uuid.getDashFreeUUID();

console.log(dashFree);
// '23f088bda27347d2879dfac70102eb0b'

const dashed = UUID.getDashContainedUUID(dashFree);

console.log(dashed.toString());
// '23f088bd-a273-47d2-879d-fac70102eb0b'
```

Compare UUIDs:

```typescript
import {UUID} from 'uuid-generator-ts';

const uuid = new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');

uuid.equals('23f088bd-a273-47d2-879d-fac70102eb0b');
// true

uuid.equals(new UUID('23f088bd-a273-47d2-879d-fac70102eb0b'));
// true
```

## API

### `new UUID(str?)`

Creates a new UUID instance.

If `str` is provided, it must be a valid dashed UUID string. Invalid input throws a `UUIDError`.

```typescript
new UUID();
new UUID('23f088bd-a273-47d2-879d-fac70102eb0b');
```

### `UUID.createUUID()`

Creates a new dashed UUID string.

```typescript
const uuid = UUID.createUUID();
```

### `UUID.isValidUUID(value)`

Returns `true` when `value` is a valid dashed UUID string.

```typescript
UUID.isValidUUID('23f088bd-a273-47d2-879d-fac70102eb0b');
```

### `UUID.isValidDashFreeUUID(value)`

Returns `true` when `value` is a valid UUID string without dashes.

```typescript
UUID.isValidDashFreeUUID('23f088bda27347d2879dfac70102eb0b');
```

### `UUID.getDashFreeUUID(uuid)`

Returns the UUID string without dashes.

```typescript
const dashFree = UUID.getDashFreeUUID(new UUID());
```

### `UUID.getDashContainedUUID(value)`

Converts a valid dash-free UUID string into a `UUID` instance with the canonical dashed representation.

Invalid input throws a `UUIDError`.

```typescript
const uuid = UUID.getDashContainedUUID('23f088bda27347d2879dfac70102eb0b');
```

### `uuid.getDashFreeUUID()`

Returns the UUID instance value without dashes.

```typescript
const dashFree = uuid.getDashFreeUUID();
```

### `uuid.equals(value)`

Compares this UUID with another `UUID` instance or UUID string.

```typescript
uuid.equals('23f088bd-a273-47d2-879d-fac70102eb0b');
uuid.equals(new UUID('23f088bd-a273-47d2-879d-fac70102eb0b'));
```

### `uuid.toString()`

Returns the dashed UUID string.

```typescript
const value = uuid.toString();
```

## Development

This project uses pnpm.

Install dependencies:

```sh
pnpm install
```

Run linting:

```sh
pnpm run lint
```

Build TypeScript output:

```sh
pnpm run build
```

Run tests with coverage:

```sh
pnpm run test
```

## CI and Publishing

GitHub Actions runs linting, building, and tests for pushes to `main` and pull requests.

Publishing to npm is handled by a separate workflow and only runs for version tags matching `v*.*.*`, for example:

```sh
git tag v2.0.0
git push origin v2.0.0
```

The publish workflow is configured for npm trusted publishing with GitHub Actions OIDC. The npm package must have `publish.yml` configured as a trusted publisher on npmjs.com.

## License

MIT
