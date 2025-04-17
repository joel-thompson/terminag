#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';
import {Mode} from './selectMode/selectMode.js';

const cli = meow(
	`
    Usage
      $ terminag

    Options
      --mode  The mode to run the CLI in

    Examples
      $ terminag --mode=git

  `,
	{
		importMeta: import.meta,
		flags: {
			mode: {
				type: 'string',
			},
		},
	},
);

render(<App startingMode={cli.flags.mode as Mode} />);
