export class DiscordClient {
	private token: string;

	constructor(token: string) {
		if (!token) {
			throw new Error('Discord bot token is required');
		}
		this.token = token;
	}

	// Create a DM channel with a user
	async createDM(userId: string): Promise<any> {
		const response = await fetch('https://discord.com/api/v10/users/@me/channels', {
			method: 'POST',
			headers: {
				Authorization: `Bot ${this.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ recipient_id: userId }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Failed to create DM channel: ${JSON.stringify(error)}`);
		}

		return response.json();
	}

	// Send an embed message to a channel
	async sendEmbed(channelId: string, embed: any): Promise<any> {
		const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
			method: 'POST',
			headers: {
				Authorization: `Bot ${this.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ embeds: [embed] }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Failed to send message: ${JSON.stringify(error)}`);
		}

		return response.json();
	}
}
