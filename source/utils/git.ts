import {simpleGit, SimpleGit} from 'simple-git';

export interface GitInfo {
	currentBranch: string;
	remoteUrl?: string;
	status: {
		staged: string[];
		modified: string[];
		untracked: string[];
	};
	lastCommit?: {
		hash: string;
		message: string;
		author: string;
		date: Date;
	};
}

/**
 * Get Git information from the current directory
 * @returns Promise<GitInfo> Object containing Git repository information
 * @throws Error if not in a Git repository
 */
export async function getGitInfo(): Promise<GitInfo> {
	const git: SimpleGit = simpleGit();

	// Check if we're in a Git repository
	const isRepo = await git.checkIsRepo();
	if (!isRepo) {
		throw new Error('Not in a Git repository');
	}

	// Get current branch
	const branchResult = await git.branch();
	const currentBranch = branchResult.current;

	// Get remote URL (if available)
	let remoteUrl: string | undefined;
	try {
		const remotes = await git.getRemotes(true);
		remoteUrl = remotes[0]?.refs.fetch;
	} catch {
		// Remote might not be set up
	}

	// Get status
	const status = await git.status();

	// Get last commit
	let lastCommit: GitInfo['lastCommit'] | undefined;
	try {
		const log = await git.log({maxCount: 1});
		if (log.latest) {
			lastCommit = {
				hash: log.latest.hash,
				message: log.latest.message,
				author: log.latest.author_name,
				date: new Date(log.latest.date),
			};
		}
	} catch {
		// Repository might be empty
	}

	return {
		currentBranch,
		remoteUrl,
		status: {
			staged: status.staged,
			modified: status.modified,
			untracked: status.not_added,
		},
		lastCommit,
	};
}
