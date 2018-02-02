export function getCalendarLink(job) {
    var newTitle = 'BlinkedIn: Prepare for ' + job.company;
    var description = 'Role: ' + job.title + '\n\nDetails: ' + job.notes;
    return 'https://calendar.google.com/calendar/r/eventedit?text=' + encodeURIComponent(newTitle) + '&location=Home&details=' + encodeURIComponent(description);
}