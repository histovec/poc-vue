export const mailTo = ({ recipients, subject, body }) => {
	const concatenedRecipients = recipients
		.filter((recipient) => {
			return Boolean(recipient);
		})
		.join(',');

	return `mailto:${concatenedRecipients ||
		''}?subject=${encodeURIComponent(subject) ||
		''}&&body=${encodeURIComponent(body) || ''}`;
};
