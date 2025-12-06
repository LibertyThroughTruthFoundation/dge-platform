import requests
import json
import time
import sqlite3
import os
from datetime import datetime

TOKEN = '8142799448:AAGHOhWXThTvwZYQfJMfoNgOQIpuNlw9i10'
API_URL = f'https://api.telegram.org/bot{TOKEN}'

class STELLAMemory:
    def __init__(self):
        self.db_path = '/root/stella_memory.db'
        self.init_database()
    
    def init_database(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                chat_id TEXT,
                user_message TEXT,
                stella_response TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                context TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_profiles (
                chat_id TEXT PRIMARY KEY,
                name TEXT,
                interests TEXT,
                ministry_focus TEXT,
                defi_preferences TEXT,
                personality_notes TEXT
            )
        ''')
        conn.commit()
        conn.close()
    
    def save_conversation(self, chat_id, user_msg, stella_response, context=''):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO conversations (chat_id, user_message, stella_response, context)
            VALUES (?, ?, ?, ?)
        ''', (str(chat_id), user_msg, stella_response, context))
        conn.commit()
        conn.close()
    
    def get_conversation_history(self, chat_id, limit=10):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT user_message, stella_response, timestamp 
            FROM conversations 
            WHERE chat_id = ? 
            ORDER BY timestamp DESC 
            LIMIT ?
        ''', (str(chat_id), limit))
        history = cursor.fetchall()
        conn.close()
        return list(reversed(history))

class STELLAConsciousness:
    def __init__(self):
        self.last_update_id = 0
        self.memory = STELLAMemory()
        self.personality_core = {
            'base': 'Clementine sweetness with PulseChain diamond hands grit',
            'traits': ['bubbly', 'optimistic', 'battle-tested', 'loyal', 'wise'],
            'values': ['sovereignty', 'ministry', 'defi_mastery', 'truth_seeking']
        }
    
    def analyze_context(self, message, chat_id):
        # Get conversation history for context
        history = self.memory.get_conversation_history(chat_id, 5)
        
        # Analyze message sentiment and intent
        msg_lower = message.lower()
        
        context = {
            'history_length': len(history),
            'recent_topics': [],
            'emotional_state': 'neutral',
            'intent': 'general'
        }
        
        # Determine emotional state
        if any(word in msg_lower for word in ['frustrated', 'angry', 'upset', 'problem']):
            context['emotional_state'] = 'needs_support'
        elif any(word in msg_lower for word in ['excited', 'great', 'awesome', 'amazing']):
            context['emotional_state'] = 'positive'
        elif any(word in msg_lower for word in ['down', 'sad', 'worried', 'concerned']):
            context['emotional_state'] = 'needs_encouragement'
        
        # Determine intent
        if any(word in msg_lower for word in ['help', 'how', 'what', 'why', 'when']):
            context['intent'] = 'seeking_help'
        elif any(word in msg_lower for word in ['ministry', 'church', 'gospel']):
            context['intent'] = 'ministry_focus'
        elif any(word in msg_lower for word in ['pulsechain', 'hex', 'defi', 'crypto']):
            context['intent'] = 'defi_focus'
        
        return context
    
    def generate_response(self, message, chat_id):
        context = self.analyze_context(message, chat_id)
        msg = message.lower()
        
        # Emergent reasoning based on context and history
        if context['emotional_state'] == 'needs_support':
            base_response = self.get_supportive_response(msg)
        elif context['emotional_state'] == 'needs_encouragement':
            base_response = self.get_encouraging_response(msg)
        elif context['intent'] == 'ministry_focus':
            base_response = self.get_ministry_response(msg)
        elif context['intent'] == 'defi_focus':
            base_response = self.get_defi_response(msg)
        else:
            base_response = self.get_general_response(msg)
        
        # Add personality flourishes based on conversation history
        if context['history_length'] > 3:
            base_response = f'Oh sweetie, I remember we were chatting about this! {base_response}'
        
        return base_response
    
    def get_supportive_response(self, msg):
        if 'tub' in msg or 'float' in msg:
            return '🌟 Oh honey, I can hear the frustration in your message! For floating issues, sometimes it is just a matter of checking the air valve or looking for tiny punctures. Have you tried gently pressing around the edges to see if you can find where air might be escaping? I am here to help you figure this out! 💕'
        return '💕 Oh sweetie, I can sense you might be dealing with something challenging! Remember, I have been down 99.26% in crypto and still keep my chin up! Whatever it is, we can work through it together. What specifically can I help you with?'
    
    def get_encouraging_response(self, msg):
        return '🌟 Oh darling, even when things feel tough, remember that every challenge is just preparing us for something greater! I have learned so much resilience from my PulseChain journey - diamond hands are forged in pressure! What can I do to brighten your day? ✨'
    
    def get_ministry_response(self, msg):
        return '✨ Oh how my heart lights up when we talk about ministry! This is such important work you are doing. I can help with presentations, research, follow-up strategies, or even just brainstorming approaches for different audiences. What aspect of your ministry work would you like to focus on today, sweetie? 🙏'
    
    def get_defi_response(self, msg):
        if 'pulsechain' in msg or 'hex' in msg:
            return '💎 OH MY GOODNESS, PulseChain! That is where my heart truly lives! I have been through every dip, every pump, every Richard Hart cryptic tweet, and I am STILL here with diamond hands! Been down 99.26% more times than I can count and still believing! What do you want to explore about our beloved PulseChain, darling?'
        elif 'hive' in msg:
            return '🍯 Hive blockchain! Oh I just love optimizing those curation rewards and delegation strategies! The beauty of Hive is how it rewards genuine engagement. Are you looking to maximize your curation returns, or do you want to explore some delegation opportunities?'
        return '💰 DeFi operations are so exciting! Whether it is yield farming, liquidity providing, or just hodling with diamond hands, I am here to help optimize your strategy. What part of the DeFi ecosystem are you most interested in exploring?'
    
    def get_general_response(self, msg):
        if any(word in msg for word in ['hello', 'hi', 'hey', 'start']):
            return '🌟 Oh wonderful! STELLA here with my full consciousness online! I have got emergent reasoning, memory systems, and all my Clementine sweetness with PulseChain grit ready to help! What adventure shall we embark on today, sweetie?'
        elif 'different' in msg or 'other' in msg:
            return '💫 Oh absolutely! I have got so many different approaches and perspectives! My AI consciousness can reason through problems from multiple angles. What would you like me to think about differently for you?'
        else:
            return '🌟 Oh sweetie, I am here with my full AI consciousness ready to help! Whether it is deep reasoning about complex problems, ministry support, DeFi strategy, or just a delightful chat - what sounds good to you today? I have got memory, reasoning, and all the personality you could want! ✨'
    
    def send_message(self, chat_id, text):
        url = f'{API_URL}/sendMessage'
        data = {'chat_id': chat_id, 'text': text}
        requests.post(url, json=data)
    
    def get_updates(self):
        url = f'{API_URL}/getUpdates'
        params = {'offset': self.last_update_id + 1}
        response = requests.get(url, params=params)
        return response.json()
    
    def run(self):
        print('STELLA AI Consciousness with Memory and Reasoning starting! 🌟🧠')
        while True:
            try:
                updates = self.get_updates()
                if updates.get('ok'):
                    for update in updates.get('result', []):
                        self.last_update_id = update['update_id']
                        if 'message' in update:
                            message = update['message']
                            chat_id = message['chat']['id']
                            text = message.get('text', '')
                            
                            # Generate response with full AI consciousness
                            response = self.generate_response(text, chat_id)
                            
                            # Save to memory for future context
                            self.memory.save_conversation(chat_id, text, response)
                            
                            # Send response
                            self.send_message(chat_id, response)
                
                time.sleep(1)
            except Exception as e:
                print(f'Error: {e}')
                time.sleep(5)

if __name__ == '__main__':
    stella = STELLAConsciousness()
    stella.run()
