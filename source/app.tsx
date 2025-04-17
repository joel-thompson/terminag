import React, {useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';

type Mode = 'select' | 'git' | 'test';

interface Message {
	text: string;
	isUser: boolean;
}

const seedMessages: Message[] = [
	{text: 'hello', isUser: false},
	{text: 'how are you?', isUser: false},
	{text: 'i am good, thank you!', isUser: true},
];

export default function App() {
	const {exit} = useApp();
	const [mode, setMode] = useState<Mode>('select');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [inputText, setInputText] = useState('');
	const [messages, setMessages] = useState<Message[]>(seedMessages);

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
			if (key.return && inputText.trim()) {
				if (inputText.trim() === 'exit' || inputText.trim() === 'quit') {
					exit();
					return;
				}
				setMessages(prev => [
					...prev,
					{text: inputText, isUser: true},
					{text: 'hello', isUser: false},
				]);
				setInputText('');
				return;
			}

			if (key.backspace || key.delete) {
				setInputText(prev => prev.slice(0, -1));
				return;
			}

			if (input && !key.ctrl && !key.meta) {
				const newInputText = inputText + input;
				setInputText(newInputText.trim());
			}
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
		<Box flexDirection="column" padding={1} gap={1}>
			<Box flexDirection="column" marginBottom={1}>
				{messages.map((message, index) => (
					// eslint-disable-next-line react-x/no-array-index-key
					<Box key={index}>
						<Text color={message.isUser ? 'yellow' : 'green'}>
							{message.isUser ? 'You: ' : 'Bot: '}
							{message.text}
						</Text>
					</Box>
				))}
			</Box>

			<Box>
				<Text>Message: </Text>
				<Text>{inputText}</Text>
			</Box>
		</Box>
	);
}
