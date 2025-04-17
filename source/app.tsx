import React, {useState} from 'react';
import {Text, Box} from 'ink';
import GitMode from './gitMode/gitMode.js';
import SelectMode, {Mode} from './selectMode/selectMode.js';

export default function App() {
	const [mode, setMode] = useState<Mode>('select');
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

	if (mode === 'test') {
		return (
			<Box padding={1}>
				<Text>test mode</Text>
			</Box>
		);
	}

	if (mode === 'git') {
		return <GitMode />;
	}

	return (
		<Box padding={1}>
			<Text>Mode {mode} is not implemented</Text>
		</Box>
	);
}
