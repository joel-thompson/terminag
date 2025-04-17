import {Box, Text, useApp, useInput} from 'ink';
import React, {useState} from 'react';

interface Message {
	text: string;
	isUser: boolean;
}

const seedMessages: Message[] = [
	{text: 'hello', isUser: false},
	{text: 'how are you?', isUser: false},
	{text: 'i am good, thank you!', isUser: true},
];

export default function GitMode() {
	const {exit} = useApp();
	const [inputText, setInputText] = useState('');
	const [messages, setMessages] = useState<Message[]>(seedMessages);

	useInput((input, key) => {
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
			setInputText(newInputText);
		}
	});

	return (
		<Box flexDirection="column" padding={1} gap={1}>
			<Box borderStyle="round" borderColor="blue" padding={1}>
				<Text>some box</Text>
			</Box>
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
