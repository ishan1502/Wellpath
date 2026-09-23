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
    // Read from localStorage to ensure it's working but not placeholder
    const stored = localStorage.getItem('wellpath_notifications');
    const loadedNotifications: Notification[] = stored ? JSON.parse(stored) : [];
    setNotifications(loadedNotifications);
    setUnreadCount(loadedNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('wellpath_notifications', JSON.stringify(updated));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('wellpath_notifications', JSON.stringify(updated));
      setUnreadCount(0);
      return updated;
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'time'>) => {
    setNotifications(prev => {
      const updated = [{
        ...notification,
        id: Date.now().toString(),
        read: false,
        time: 'Just now'
      }, ...prev];
      localStorage.setItem('wellpath_notifications', JSON.stringify(updated));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead, addNotification };
}
