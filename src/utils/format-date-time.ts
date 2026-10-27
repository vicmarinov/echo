export default function formatDateTime (dateTimeISO: string): string {
    const date = new Date(dateTimeISO);

    const datePart = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);

    const timePart = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(date);

    return `${datePart} at ${timePart}`;
}