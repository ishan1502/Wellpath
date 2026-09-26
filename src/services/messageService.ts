import { supabase } from '../lib/supabase';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  patient_id: string;
  professional_id: string;
  created_at: string;
  // We'll map the joined data into these UI fields
  name?: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
}

export const messageService = {
  async getConversations(userId: string, role: 'patient' | 'professional') {
    const column = role === 'patient' ? 'patient_id' : 'professional_id';
    
    // We assume there are profiles/users tables that we might join, but for now we'll do a basic fetch
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages (
          content,
          created_at
        )
      `)
      .eq(column, userId);

    if (error) throw error;
    return data;
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        sender_id: senderId,
        content
      }])
      .select();

    if (error) throw error;
    return data ? data[0] : null;
  },

  subscribeToMessages(callback: (payload: any) => void) {
    return supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        callback
      )
      .subscribe();
  }
};
