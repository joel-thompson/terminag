import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';

export default function App() {
	const [input, setInput] = useState('');
	const [submitted, setSubmitted] = useState(false);

	useInput((input, key) => {
		if (key.return) {
			// When Enter is pressed, show the response
			setSubmitted(true);
			return;
		}

		if (key.backspace || key.delete) {
			// Handle backspace
			setInput(prev => prev.slice(0, -1));
			return;
		}

		// Add typed character to input
		setInput(prev => prev + input);
	});

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
