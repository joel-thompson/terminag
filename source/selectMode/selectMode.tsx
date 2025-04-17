import React from 'react';
import {Text, Box, useInput} from 'ink';

export type Mode = 'select' | 'git' | 'test';
const modes: Mode[] = ['git', 'test'] as const;

export default function SelectMode({
	setMode,
	selectedIndex,
	setSelectedIndex,
}: {
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
	selectedIndex: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
	useInput((_input, key) => {
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
	});

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
