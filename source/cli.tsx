#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
// import meow from 'meow';
import App from './app.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ terminag

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ terminag --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

render(<App />);
