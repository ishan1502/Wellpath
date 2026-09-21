export const generateGoogleCalendarLink = (
  title: string,
  description: string,
  location: string,
  startDate: string, // format: YYYYMMDDTHHMMSSZ (UTC)
  endDate: string    // format: YYYYMMDDTHHMMSSZ (UTC)
) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${startDate}/${endDate}`,
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
};
