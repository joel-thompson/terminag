import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import {Mode} from '../selectMode/selectMode.js';

interface Action {
	name: string;
	description: string;
	action: (inputText?: string) => void;
	requiresInput?: boolean;
}

const actions: Action[] = [
	{
		name: 'test',
		description: 'Test',
		action: () => {
			console.log('test');
		},
	},
	{
		name: 'test2',
		description: 'Test2',
		action: () => {
			console.log('test2');
		},
	},
	{
		name: 'test3',
		description: 'Test3',
		requiresInput: true,
		action: (inputText?: string) => {
			console.log('test3', inputText);
		},
	},
];

export default function ActionsMode({
	setMode,
}: {
	setMode: (mode: Mode) => void;
}) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedAction = actions[selectedIndex];
	const [inputText, setInputText] = useState('');

	useInput((input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
			return;
		}
		if (key.downArrow) {
			setSelectedIndex(prev => (prev < actions.length - 1 ? prev + 1 : prev));
			return;
		}

		if (selectedAction?.requiresInput && !key.return) {
			if (key.backspace || key.delete) {
				setInputText(prev => prev.slice(0, -1));
				return;
			}

			if (input && !key.ctrl && !key.meta) {
				const newInputText = inputText + input;
				setInputText(newInputText);
			}
			return;
		}

		if (input === 'q' && !selectedAction?.requiresInput) {
			setMode('select');
			return;
		}

		if (key.return && actions[selectedIndex]) {
			if (selectedAction?.requiresInput) {
				if (inputText !== '' && !!inputText.trim()) {
					actions[selectedIndex].action(inputText);
				}
				setInputText('');
			} else {
				actions[selectedIndex].action();
			}
			return;
		}

		const inputNumber = Number(input);
		const action = actions[inputNumber - 1];
		if (inputNumber <= actions.length && inputNumber >= 1 && action) {
			setSelectedIndex(inputNumber - 1);
			if (!action.requiresInput) {
				action.action();
			}
			return;
		}
		return;
	});

	return (
		<Box flexDirection="column" padding={1} gap={1}>
			<Text>Select an action:</Text>
			<Box flexDirection="column">
				{actions.map((a, index) => (
					<Text
						key={a.name}
						color={index === selectedIndex ? 'green' : undefined}
					>
						{index === selectedIndex ? `> ${index + 1}. ` : `  ${index + 1}. `}
						{a.name}
					</Text>
				))}
			</Box>
			<Text>{actions[selectedIndex]?.description}</Text>
			{actions[selectedIndex]?.requiresInput && (
				<Text>
					Enter input for {actions[selectedIndex]?.name}: {inputText}
				</Text>
			)}
		</Box>
	);
}
