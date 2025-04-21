import React from 'react';
import {Text, Box, useInput, useApp} from 'ink';

export type Mode = 'select' | 'git-chat' | 'actions';
const modes: Mode[] = ['git-chat', 'actions'] as const;

export default function SelectMode({
	setMode,
	selectedIndex,
	setSelectedIndex,
}: {
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
	selectedIndex: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
	const {exit} = useApp();
	useInput((input, key) => {
		if (input === 'q') {
			exit();
			return;
		}

		if (key.upArrow) {
			setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
		}
		if (key.downArrow) {
			setSelectedIndex(prev => (prev < modes.length - 1 ? prev + 1 : prev));
		}
		if (key.return && modes[selectedIndex]) {
			setMode(modes[selectedIndex]);
		}

		const inputNumber = Number(input);
		const mode = modes[inputNumber - 1];
		if (inputNumber <= modes.length && inputNumber >= 1 && mode) {
			setMode(mode);
			return;
		}
		return;
	});

	return (
		<Box flexDirection="column" padding={1} gap={1}>
			<Text>Select a mode:</Text>
			<Box flexDirection="column">
				{modes.map((m, index) => (
					<Text key={m} color={index === selectedIndex ? 'green' : undefined}>
						{index === selectedIndex ? `> ${index + 1}. ` : `  ${index + 1}. `}
						{m}
					</Text>
				))}
			</Box>
		</Box>
	);
}
