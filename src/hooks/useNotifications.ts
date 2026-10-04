import { useState } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const stored = localStorage.getItem('wellpath_notifications');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('wellpath_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('wellpath_notifications', JSON.stringify(updated));
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
      return updated;
    });
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead, addNotification };
}
