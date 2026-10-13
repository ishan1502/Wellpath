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
  participant_ids: string[];
  updated_at: string;
  last_message?: string;
  // UI fields
  name?: string;
  avatar?: string;
  otherUser?: any;
  otherUserName?: string;
  otherUserAvatar?: string | null;
  lastMessage?: string;
  time?: string;
  unread?: number;
  messages?: Message[];
}

export const messageService = {
  async getConversations(userId: string, _role?: 'patient' | 'professional') {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages (
            id,
            conversation_id,
            sender_id,
            content,
            created_at
          )
        `)
        .contains('participant_ids', [userId])
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations via participant_ids:', error);
        return [];
      }

      const conversations = data || [];
      const otherParticipantIds = Array.from(new Set(
        conversations
          .flatMap((c: any) => (Array.isArray(c.participant_ids) ? c.participant_ids : []))
          .filter((id: string) => id !== userId)
      ));

      let userMap: Record<string, any> = {};
      if (otherParticipantIds.length > 0) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, first_name, last_name, avatar_url, role')
          .in('id', otherParticipantIds);
        if (userData) {
          userMap = Object.fromEntries(userData.map((u: any) => [u.id, u]));
        }
      }

      return conversations.map((c: any) => {
        const otherId = Array.isArray(c.participant_ids) 
          ? c.participant_ids.find((id: string) => id !== userId) 
          : null;
        const otherUser = otherId ? userMap[otherId] : null;
        const fullName = otherUser 
          ? `${otherUser.first_name || ''} ${otherUser.last_name || ''}`.trim() 
          : 'User';

        return {
          ...c,
          otherUser: otherUser || null,
          otherUserName: fullName || 'User',
          otherUserAvatar: otherUser?.avatar_url || null
        };
      });
    } catch (err) {
      console.error('Failed to get conversations:', err);
      return [];
    }
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
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

    // Best-effort update of conversation last_message & timestamp
    await supabase
      .from('conversations')
      .update({
        last_message: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    return data ? data[0] : null;
  },

  async getOrCreateConversation(user1Id: string, user2Id: string) {
    // Check if conversation already exists with both participants
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participant_ids', [user1Id]);

    if (!error && data) {
      const existing = data.find((c: any) => 
        Array.isArray(c.participant_ids) && c.participant_ids.includes(user2Id)
      );
      if (existing) return existing;
    }

    // Create new conversation
    const { data: newConv, error: createError } = await supabase
      .from('conversations')
      .insert([{
        participant_ids: [user1Id, user2Id],
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) throw createError;
    return newConv;
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
