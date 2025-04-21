import React, {useState} from 'react';
import {Text, Box} from 'ink';
import GitMode from './gitMode/gitMode.js';
import SelectMode, {Mode} from './selectMode/selectMode.js';
import ActionsMode from './actions/ActionsMode.js';

export default function App({startingMode}: {startingMode: Mode}) {
	const [mode, setMode] = useState<Mode>(startingMode || 'select');
	const [selectedIndex, setSelectedIndex] = useState(0);

	if (mode === 'select') {
		return (
			<SelectMode
				setMode={setMode}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
		);
	}

	if (mode === 'git-chat') {
		return <GitMode setMode={setMode} />;
	}

	if (mode === 'actions') {
		return <ActionsMode setMode={setMode} />;
	}

	return (
		<Box padding={1}>
			<Text>Mode {mode} is not implemented</Text>
		</Box>
	);
}
