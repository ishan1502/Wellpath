import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock session reminders
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Upcoming Session',
        message: 'You have a session with Dr. Smith tomorrow at 10:00 AM.',
        read: false,
        time: '10 mins ago',
      },
      {
        id: '2',
        title: 'Session Reminder',
        message: 'Your session with Jane Doe starts in 30 minutes.',
        read: false,
        time: '30 mins ago',
      },
      {
        id: '3',
        title: 'New Message',
        message: 'You have a new message from Dr. Smith.',
        read: true,
        time: '1 hour ago',
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}
