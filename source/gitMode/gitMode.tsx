import {Box, Text, useApp, useInput} from 'ink';
import React, {useState} from 'react';
import {generateText} from 'ai';
import openai from '../ai/openai.js';
import Spinner from 'ink-spinner';

interface Message {
	text: string;
	isUser: boolean;
}

const seedMessages: Message[] = [
	{
		text: 'Welcome to Git Assistant! I can help you with Git commands, workflows, and best practices.',
		isUser: false,
	},
	{
		text: 'Feel free to ask any Git-related questions or type "exit" to quit.',
		isUser: false,
	},
];

export default function GitMode() {
	const {exit} = useApp();
	const [inputText, setInputText] = useState('');
	const [messages, setMessages] = useState<Message[]>(seedMessages);
	const [isLoading, setIsLoading] = useState(false);

	const handleMessage = async (message: string) => {
		setIsLoading(true);
		setInputText('');
		const newMessages = [...messages, {text: message, isUser: true}];
		setMessages(newMessages);
		const {text} = await generateText({
			model: openai.responses('gpt-4.1'),
			tools: {
				web_search_preview: openai.tools.webSearchPreview({
					// optional configuration:
					// searchContextSize: 'high',
				}),
			},
			system:
				'You are a Git expert assistant who specializes in version control best practices. You can help with Git commands, workflows, branching strategies, merge conflicts, repository management, and other Git-related tasks. You provide clear, practical solutions and explain Git concepts in an easy-to-understand way.',
			messages: newMessages.map(m => ({
				role: m.isUser ? 'user' : 'assistant',
				content: m.text,
			})),
		});
		setIsLoading(false);

		setMessages(prev => [...prev, {text, isUser: false}]);
	};

	useInput((input, key) => {
		if (key.return) {
			if (isLoading || !inputText.trim()) return;
			if (inputText.trim() === 'exit' || inputText.trim() === 'quit') {
				exit();
				return;
			}

			void handleMessage(inputText);
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
			<Box borderStyle="round" flexDirection="column" marginBottom={1}>
				{messages.map((message, index) => (
					<Box
						paddingBottom={index === messages.length - 1 ? undefined : 1}
						// eslint-disable-next-line react-x/no-array-index-key
						key={index}
					>
						<Text color={message.isUser ? 'yellow' : 'green'}>
							{message.isUser ? 'You: ' : 'Bot: '}
							{message.text}
						</Text>
					</Box>
				))}
			</Box>

			<Box flexDirection="row" gap={1}>
				<Box>
					{isLoading ? (
						<Text color="cyan">
							<Spinner type="dots" />
						</Text>
					) : (
						<Text color="cyan">_</Text>
					)}
				</Box>
				<Text>{inputText}</Text>
				{!isLoading && <Text color="cyan">_</Text>}
			</Box>
		</Box>
	);
}
