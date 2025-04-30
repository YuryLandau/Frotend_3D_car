export function formatDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}min`;
}
