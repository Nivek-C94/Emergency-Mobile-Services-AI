export default class SessionService {
  static sessions = new Map();

  static getSession(id) {
    if (!this.sessions.has(id)) this.sessions.set(id, { conversation: [] });
    return this.sessions.get(id);
  }

  static addMessage(id, role, text) {
    const session = this.getSession(id);
    session.conversation.push({ role, text, ts: Date.now() });
    if (session.conversation.length > 50) session.conversation.shift();
    this.sessions.set(id, session);
  }

  static getConversation(id) {
    return this.getSession(id).conversation;
  }
}