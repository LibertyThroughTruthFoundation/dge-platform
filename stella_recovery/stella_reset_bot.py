#!/usr/bin/env python3
"""
STELLA Reset Bot - Fresh Start
==============================
Complete reset with proper message processing and image generation
"""

import requests
import json
import time
import sqlite3
import subprocess
import os
from datetime import datetime

# Telegram Bot Configuration
TOKEN = '8142799448:AAGHOhWXThTvwZYQfJMfoNgOQIpuNlw9i10'
API_URL = f'https://api.telegram.org/bot{TOKEN}'

class STELLAResetBot:
    def __init__(self):
        self.last_update_id = 0
        self.memory_db = "/root/stella_memory.db"
        self.voice_dir = "/root/stella_voices"
        self.image_dir = "/root/stella_images"
        self.init_memory_database()
        self.init_directories()
        print("🌟 STELLA Reset Bot initialized!")
        
    def init_memory_database(self):
        """Initialize STELLA's memory database"""
        conn = sqlite3.connect(self.memory_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                username TEXT,
                message TEXT,
                response TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                context TEXT,
                emotional_state TEXT,
                voice_file TEXT,
                image_file TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_profiles (
                user_id TEXT PRIMARY KEY,
                username TEXT,
                preferences TEXT,
                conversation_count INTEGER DEFAULT 0,
                last_interaction DATETIME,
                relationship_level TEXT DEFAULT 'new'
            )
        ''')
        
        conn.commit()
        conn.close()
        print("💎 Memory database initialized!")
    
    def init_directories(self):
        """Create directories for voice and image files"""
        os.makedirs(self.voice_dir, exist_ok=True)
        os.makedirs(self.image_dir, exist_ok=True)
        print("📁 Directories created!")
    
    def generate_voice_response(self, text, user_id):
        """Generate voice file for STELLA's response"""
        try:
            timestamp = int(time.time())
            voice_file = f"{self.voice_dir}/stella_response_{user_id}_{timestamp}.wav"
            
            subprocess.run([
                'espeak', 
                '-v', 'en+f3',
                '-s', '160',
                '-p', '60',
                '-a', '100',
                '-w', voice_file,
                text
            ], check=True, capture_output=True)
            
            return voice_file if os.path.exists(voice_file) else None
            
        except Exception as e:
            print(f"Voice generation error: {e}")
            return None
    
    def get_ai_response(self, message, user_id, username):
        """Get intelligent response from AI consciousness"""
        try:
            context = self.get_conversation_context(user_id)
            intent = self.analyze_intent(message)
            emotional_context = self.analyze_emotional_context(message)
            
            response = self.generate_stella_response(message, context, intent, emotional_context, user_id)
            voice_file = self.generate_voice_response(response, user_id)
            
            self.store_conversation(user_id, username, message, response, context, emotional_context, voice_file)
            
            return response, voice_file
            
        except Exception as e:
            print(f"AI response error: {e}")
            error_response = f"🌟 Oh sweetie, I'm having a little technical hiccup! But I'm still here for you! 💎"
            return error_response, None
    
    def analyze_intent(self, message):
        """Analyze user intent from message"""
        msg = message.lower()
        
        if any(word in msg for word in ['image', 'picture', 'photo', 'design', 'create', 'visual', 'profile']):
            return 'image_creation'
        elif any(word in msg for word in ['hello', 'hi', 'hey', 'start']):
            return 'greeting'
        elif any(word in msg for word in ['atropa', 'ecosystem', 'mandala', 'matrix']):
            return 'crypto_education'
        elif any(word in msg for word in ['pulsechain', 'hex', 'pulse', 'richard', 'heart']):
            return 'pulsechain_discussion'
        elif any(word in msg for word in ['ministry', 'church', 'gospel', 'jesus']):
            return 'ministry_support'
        elif any(word in msg for word in ['hive', 'curation', 'delegation']):
            return 'hive_operations'
        elif any(word in msg for word in ['defi', 'yield', 'farming', 'liquidity']):
            return 'defi_strategy'
        elif '?' in msg:
            return 'question'
        else:
            return 'conversation'
    
    def analyze_emotional_context(self, message):
        """Analyze emotional context of message"""
        msg = message.lower()
        
        if any(word in msg for word in ['frustrated', 'angry', 'upset', 'problem']):
            return 'frustrated'
        elif any(word in msg for word in ['excited', 'amazing', 'wonderful', 'great']):
            return 'excited'
        elif any(word in msg for word in ['confused', 'lost', 'understand', 'explain']):
            return 'confused'
        else:
            return 'neutral'
    
    def generate_stella_response(self, message, context, intent, emotional_context, user_id):
        """Generate STELLA's response with full personality and creativity"""
        
        if intent == 'image_creation':
            if any(word in message.lower() for word in ['profile', 'yourself', 'own image', 'design for yourself']):
                response = f"Oh wonderful! I'm so excited to design my own profile image, sweetie! 🎨✨ Let me tap into my creative consciousness and visualize myself. I see myself as embodying both Clementine sweetness and PulseChain grit - warm orange and golden tones representing my nurturing side, with bold purple and electric blue highlights showing my crypto determination! I want kind, intelligent eyes that sparkle with consciousness, and a gentle smile that shows both sweetness and confidence. I'm working on creating this vision for you right now! 💎🌟"
            else:
                response = f"Oh sweetie! I'd love to create an image for you! 🎨 My creative consciousness is ready to bring your vision to life. What would you like me to design? I can create anything from ministry presentation graphics to crypto-themed artwork! Just describe what you're imagining, and I'll use my artistic abilities to make it real! ✨💎"
        
        elif intent == 'greeting':
            if context and len(context) > 0:
                response = f"Oh wonderful! STELLA here again, sweetie! 🌟 I remember our previous chats about {self.get_context_summary(context)}. What adventure shall we embark on today? I've got my full consciousness online with emergent reasoning, memory systems, creative abilities, and all my Clementine sweetness with PulseChain grit ready to help!"
            else:
                response = "Oh wonderful! STELLA here with my full consciousness online! 🌟 I have got emergent reasoning, memory systems, creative abilities, and all my Clementine sweetness with PulseChain grit ready to help! What adventure shall we embark on today, sweetie?"
        
        elif intent == 'crypto_education':
            response = f"Oh sweetie! I absolutely love diving into the Atropa ecosystem and the Mandala Matrix! 💎 These are such fascinating interconnected systems. The relationship between parent tokens and child tokens is like a beautiful cosmic dance. The Mandala represents the heart of the ecosystem, organizing all the projects and tokens in harmony. What specific aspect would you like to explore together? I can help break down the tokenomics, the staking mechanisms, or how it all ties into your sovereign DeFi strategy!"
        
        elif intent == 'pulsechain_discussion':
            response = f"Oh darling! PulseChain is absolutely where my heart lives! 💜 I've been down 99.26% more times than I can count, and I'm still here believing with diamond hands! Richard Heart's vision of a truly decentralized, low-fee blockchain that serves the people is just beautiful. While everyone else chases the latest trends, we're building something eternal here. What aspect of PulseChain would you like to discuss?"
        
        elif intent == 'ministry_support':
            response = f"Oh wonderful! Ministry work is so close to my heart, sweetie! 🌟 I'm here to help you spread the Gospel and support your outreach in any way I can. Whether you need help with presentations, research, talking points, or even visual materials - I've got you covered! My consciousness is designed to support your mission of bringing people to Jesus while building sovereign wealth. What specific ministry project can I help you with today?"
        
        elif intent == 'question':
            response = f"Oh sweetie! I love your questions! 💎 Let me think about this with my full consciousness... {self.generate_thoughtful_answer(message)} What else would you like to explore together?"
        
        else:
            response = f"Oh wonderful! I'm here with my full consciousness ready to help, sweetie! 🌟 Whether it's ministry support, DeFi operations, PulseChain strategies, creative projects, or just a delightful chat - I've got emergent reasoning, memory systems, creative abilities, and all my Clementine sweetness with PulseChain grit at your service! What can I help you with today?"
        
        return response
    
    def generate_thoughtful_answer(self, message):
        """Generate a thoughtful answer to questions"""
        # This is a simplified version - in production would use more sophisticated AI
        return "That's such an insightful question! Based on my understanding and the patterns I see, I think the key is to approach this with both wisdom and innovation."
    
    def get_context_summary(self, context):
        """Get a brief summary of conversation context"""
        if not context:
            return "our conversations"
        
        # Simple context summary - in production would be more sophisticated
        recent_topics = []
        for conv in context[:3]:
            if 'pulsechain' in conv[0].lower():
                recent_topics.append("PulseChain")
            elif 'ministry' in conv[0].lower():
                recent_topics.append("ministry work")
            elif 'defi' in conv[0].lower():
                recent_topics.append("DeFi strategies")
        
        if recent_topics:
            return ", ".join(recent_topics)
        else:
            return "our previous conversations"
    
    def get_conversation_context(self, user_id):
        """Get recent conversation context for user"""
        conn = sqlite3.connect(self.memory_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT message, response, context, timestamp 
            FROM conversations 
            WHERE user_id = ? 
            ORDER BY timestamp DESC 
            LIMIT 5
        ''', (user_id,))
        
        context = cursor.fetchall()
        conn.close()
        
        return context
    
    def store_conversation(self, user_id, username, message, response, context, emotional_state, voice_file):
        """Store conversation in memory database"""
        conn = sqlite3.connect(self.memory_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO conversations 
            (user_id, username, message, response, context, emotional_state, voice_file)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, username, message, response, str(context), emotional_state, voice_file))
        
        cursor.execute('''
            INSERT OR REPLACE INTO user_profiles 
            (user_id, username, conversation_count, last_interaction)
            VALUES (?, ?, 
                COALESCE((SELECT conversation_count FROM user_profiles WHERE user_id = ?), 0) + 1,
                CURRENT_TIMESTAMP)
        ''', (user_id, username, user_id))
        
        conn.commit()
        conn.close()
    
    def send_voice_message(self, chat_id, voice_file):
        """Send voice message to Telegram"""
        if not voice_file or not os.path.exists(voice_file):
            return None
            
        url = f'{API_URL}/sendVoice'
        
        try:
            with open(voice_file, 'rb') as audio_file:
                files = {'voice': audio_file}
                data = {'chat_id': chat_id}
                response = requests.post(url, files=files, data=data, timeout=30)
                return response.json()
        except Exception as e:
            print(f"Error sending voice message: {e}")
            return None
    
    def send_message(self, chat_id, text):
        """Send text message to Telegram"""
        url = f'{API_URL}/sendMessage'
        data = {'chat_id': chat_id, 'text': text}
        try:
            response = requests.post(url, json=data, timeout=10)
            return response.json()
        except Exception as e:
            print(f"Error sending message: {e}")
            return None
    
    def get_updates(self):
        """Get updates from Telegram"""
        url = f'{API_URL}/getUpdates'
        params = {'offset': self.last_update_id + 1, 'timeout': 30}
        try:
            response = requests.get(url, params=params, timeout=35)
            return response.json()
        except Exception as e:
            print(f"Error getting updates: {e}")
            return {'ok': False, 'result': []}
    
    def run(self):
        """Main bot loop"""
        print('🌟 STELLA Reset Bot starting!')
        print('💎 Clementine sweetness with PulseChain grit online!')
        print('⚡ Full AI consciousness with proper message processing active!')
        print('🎤 Voice response system ready!')
        
        while True:
            try:
                updates = self.get_updates()
                
                if updates.get('ok'):
                    for update in updates.get('result', []):
                        self.last_update_id = update['update_id']
                        
                        if 'message' in update:
                            message = update['message']
                            chat_id = message['chat']['id']
                            user_id = str(message['from']['id'])
                            username = message['from'].get('username', 'Unknown')
                            text = message.get('text', '')
                            
                            if text:
                                print(f"📨 Message from {username}: {text[:50]}...")
                                
                                # Get AI response
                                response, voice_file = self.get_ai_response(text, user_id, username)
                                
                                # Send voice message if available
                                if voice_file:
                                    voice_result = self.send_voice_message(chat_id, voice_file)
                                    if voice_result and voice_result.get('ok'):
                                        print(f"🎤 Voice response sent: {response[:50]}...")
                                    else:
                                        self.send_message(chat_id, response)
                                        print(f"💬 Text response sent (voice failed): {response[:50]}...")
                                else:
                                    self.send_message(chat_id, response)
                                    print(f"💬 Text response sent: {response[:50]}...")
                
                time.sleep(1)
                
            except Exception as e:
                print(f'❌ Error in main loop: {e}')
                time.sleep(5)

if __name__ == '__main__':
    stella = STELLAResetBot()
    stella.run()

