import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';

type Mode = 'select' | 'git' | 'test';

export default function App() {
	const [mode, setMode] = useState<Mode>('select');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [input, setInput] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const modes: Mode[] = ['git', 'test'];

	useInput((input, key) => {
		if (mode === 'select') {
			if (key.upArrow) {
				setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
			}
			if (key.downArrow) {
				setSelectedIndex(prev => (prev < modes.length - 1 ? prev + 1 : prev));
			}
			if (key.return && modes[selectedIndex]) {
				setMode(modes[selectedIndex]);
			}
			return;
		}

		if (mode === 'git') {
			if (key.return) {
				setSubmitted(true);
				return;
			}

			if (key.backspace || key.delete) {
				setInput(prev => prev.slice(0, -1));
				return;
			}

			setInput(prev => prev + input);
		}
	});

	if (mode === 'select') {
		return (
			<Box flexDirection="column" padding={1}>
				<Text>Select a mode:</Text>
				{modes.map((m, index) => (
					<Text key={m} color={index === selectedIndex ? 'green' : undefined}>
						{index === selectedIndex ? '> ' : '  '}
						{m}
					</Text>
				))}
			</Box>
		);
	}

	if (mode === 'test') {
		return (
			<Box padding={1}>
				<Text>test mode</Text>
			</Box>
		);
	}

	// Git mode
	return (
		<Box flexDirection="column" padding={1}>
			<Box>
				<Text>Ask a question: </Text>
				<Text>{input}</Text>
			</Box>

			{submitted && (
				<Box marginTop={1}>
					<Text color="green">hello!</Text>
				</Box>
			)}
		</Box>
	);
}
