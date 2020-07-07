[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/BuZZ-dEE/uuid-generator-ts)

# uuid-generator-ts

A UUID generator in Typescript

[![Build Status](https://travis-ci.org/BuZZ-dEE/uuid-generator-ts.svg)](https://travis-ci.org/BuZZ-dEE/uuid-generator-ts)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/BuZZ-dEE/uuid-generator-ts)

# Installation

    npm install uuid-generator-ts

# Usage

    import {UUID} from 'uuid-generator-ts';

    const uuid = new UUID();

    // Get a dash free UUID as string 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
    uuid.getDashFreeUUID();
