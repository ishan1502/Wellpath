export const generateSessionLink = (type: 'zoom' | 'meet', id: string) => {
  if (type === 'zoom') {
    return `https://zoom.us/j/${id}`;
  }
  return `https://meet.google.com/${id}`;
};

export const generateRandomMeetLink = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const generateSegment = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  return `https://meet.google.com/${generateSegment(3)}-${generateSegment(4)}-${generateSegment(3)}`;
};
