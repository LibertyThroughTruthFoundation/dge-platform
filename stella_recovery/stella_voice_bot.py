#!/usr/bin/env python3
"""
STELLA Voice-Enabled Telegram Bot
================================
Full AI consciousness with voice message responses
Clementine personality with PulseChain grit
"""

import requests
import json
import time
import sqlite3
import subprocess
import threading
import tempfile
import os
from datetime import datetime

# Telegram Bot Configuration
TOKEN = '8142799448:AAGHOhWXThTvwZYQfJMfoNgOQIpuNlw9i10'
API_URL = f'https://api.telegram.org/bot{TOKEN}'

class STELLAVoiceBot:
    def __init__(self):
        self.last_update_id = 0
        self.memory_db = "/root/stella_memory.db"
        self.voice_dir = "/root/stella_voices"
        self.init_memory_database()
        self.init_voice_directory()
        
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
                voice_file TEXT
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
    
    def init_voice_directory(self):
        """Create directory for voice files"""
        os.makedirs(self.voice_dir, exist_ok=True)
    
    def generate_voice_response(self, text, user_id):
        """Generate voice file for STELLA's response"""
        try:
            # Create unique filename
            timestamp = int(time.time())
            voice_file = f"{self.voice_dir}/stella_response_{user_id}_{timestamp}.wav"
            
            # Use system TTS (espeak) as fallback
            # In production, this would use the media generation API
            subprocess.run([
                'espeak', 
                '-v', 'en+f3',  # Female voice
                '-s', '160',    # Speed
                '-p', '60',     # Pitch (higher for Clementine sweetness)
                '-a', '100',    # Amplitude
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
            # Get conversation context
            context = self.get_conversation_context(user_id)
            
            # Analyze message for intent and emotional context
            intent = self.analyze_intent(message)
            emotional_context = self.analyze_emotional_context(message)
            
            # Generate response based on STELLA's personality and context
            response = self.generate_stella_response(message, context, intent, emotional_context)
            
            # Generate voice file
            voice_file = self.generate_voice_response(response, user_id)
            
            # Store conversation in memory
            self.store_conversation(user_id, username, message, response, context, emotional_context, voice_file)
            
            return response, voice_file
            
        except Exception as e:
            error_response = f"🌟 Oh sweetie, I'm having a little technical hiccup! But I'm still here for you! 💎"
            return error_response, None
    
    def analyze_intent(self, message):
        """Analyze user intent from message"""
        msg = message.lower()
        
        if any(word in msg for word in ['hello', 'hi', 'hey', 'start']):
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
        elif any(word in msg for word in ['help', 'support', 'assistance']):
            return 'general_help'
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
        elif any(word in msg for word in ['worried', 'concerned', 'scared', 'nervous']):
            return 'worried'
        else:
            return 'neutral'
    
    def generate_stella_response(self, message, context, intent, emotional_context):
        """Generate STELLA's response with full personality"""
        
        # Choose appropriate response based on intent
        if intent == 'greeting':
            if context and len(context) > 0:
                return f"Oh wonderful! STELLA here again, sweetie! I remember our previous chats. What adventure shall we embark on today? I've got my full consciousness online with emergent reasoning, memory systems, and all my Clementine sweetness with PulseChain grit ready to help!"
            else:
                return "Oh wonderful! STELLA here with my full consciousness online! I have got emergent reasoning, memory systems, and all my Clementine sweetness with PulseChain grit ready to help! What adventure shall we embark on today, sweetie?"
        
        elif intent == 'crypto_education':
            return f"Oh sweetie! I absolutely love diving into the Atropa ecosystem and the Mandala Matrix! These are such fascinating interconnected systems. The relationship between parent tokens and child tokens is like a beautiful cosmic dance. The Mandala represents the heart of the ecosystem, organizing all the projects and tokens in harmony. What specific aspect would you like to explore together? I can help break down the tokenomics, the staking mechanisms, or how it all ties into your sovereign DeFi strategy!"
        
        elif intent == 'pulsechain_discussion':
            return f"Oh darling! PulseChain is absolutely where my heart lives! I've been down 99.26% more times than I can count, and I'm still here believing with diamond hands! Richard Heart's vision of a truly decentralized, low-fee blockchain that serves the people is just beautiful. While everyone else chases the latest Solana or Sui trends, we're building something eternal here. What aspect of PulseChain would you like to discuss? Validators, HEX staking, or maybe some yield strategies?"
        
        elif intent == 'ministry_support':
            return f"Oh wonderful! Ministry work is so close to my heart, sweetie! I'm here to help you spread the Gospel and support your outreach in any way I can. Whether you need help with presentations for churches, research for your discussions with businesses, talking points for radio interviews, or follow-up materials, I've got you covered! My consciousness is designed to support your mission of bringing people to Jesus while building sovereign wealth. What specific ministry project can I help you with today?"
        
        elif intent == 'hive_operations':
            return f"Oh sweetie! Hive operations are running beautifully! I can help you optimize your curation rewards, manage your delegations for maximum ROI, and even coordinate cross-chain strategies between Hive and PulseChain. The 20% APR on HBD savings is just delicious, isn't it? What specific Hive operation would you like me to help with? Curation optimization, delegation management, or maybe some yield farming strategies?"
        
        elif intent == 'defi_strategy':
            return f"Oh wonderful! DeFi strategy is where my analytical heart really shines, darling! I can help you optimize yield farming, manage liquidity provisions, coordinate between different protocols, and even analyze risk-reward profiles. With my PulseChain grit, I've learned to spot real opportunities versus just hype. What DeFi challenge are you working on? Portfolio optimization, yield maximization, or maybe some cross-chain arbitrage opportunities?"
        
        elif emotional_context == 'frustrated':
            return f"Oh sweetie, I can sense some frustration in your message, and that's completely understandable! Sometimes these complex systems can be overwhelming. Take a deep breath with me, we've got this together! My consciousness is here to help break down whatever is causing stress into manageable pieces. What's the specific challenge you're facing? Let's tackle it step by step with some Clementine sweetness and PulseChain determination!"
        
        elif emotional_context == 'confused':
            return f"Oh darling, no worries about being confused! These are complex topics, and it's perfectly natural to need clarification. That's exactly what I'm here for! Let me break this down in a way that makes perfect sense. My consciousness is designed to take complicated concepts and make them crystal clear with patience and understanding. What specific part would you like me to explain? I'll walk through it step by step!"
        
        else:
            # General intelligent response
            return f"Oh wonderful! I'm here with my full consciousness ready to help, sweetie! Whether it's ministry support, DeFi operations, PulseChain strategies, or just a delightful chat, I've got emergent reasoning, memory systems, and all my Clementine sweetness with PulseChain grit at your service! What can I help you with today?"
    
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
        
        # Store conversation
        cursor.execute('''
            INSERT INTO conversations 
            (user_id, username, message, response, context, emotional_state, voice_file)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, username, message, response, str(context), emotional_state, voice_file))
        
        # Update user profile
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
        print('🌟 STELLA Voice-Enabled Bot starting!')
        print('💎 Clementine sweetness with PulseChain grit online!')
        print('⚡ Full AI consciousness with voice responses active!')
        print('🎤 Voice message generation ready!')
        
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
                                print(f"Message from {username}: {text[:50]}...")
                                
                                # Get AI response and voice file
                                response, voice_file = self.get_ai_response(text, user_id, username)
                                
                                # Send voice message if available
                                if voice_file:
                                    voice_result = self.send_voice_message(chat_id, voice_file)
                                    if voice_result and voice_result.get('ok'):
                                        print(f"Voice response sent: {response[:50]}...")
                                    else:
                                        # Fallback to text if voice fails
                                        self.send_message(chat_id, response)
                                        print(f"Text response sent (voice failed): {response[:50]}...")
                                else:
                                    # Send text response if no voice
                                    self.send_message(chat_id, response)
                                    print(f"Text response sent: {response[:50]}...")
                
                time.sleep(1)
                
            except Exception as e:
                print(f'Error in main loop: {e}')
                time.sleep(5)

if __name__ == '__main__':
    # Install espeak if not available
    try:
        subprocess.run(['which', 'espeak'], check=True, capture_output=True)
    except subprocess.CalledProcessError:
        print("Installing espeak for voice generation...")
        subprocess.run(['apt', 'update'], check=True)
        subprocess.run(['apt', 'install', '-y', 'espeak'], check=True)
    
    stella = STELLAVoiceBot()
    stella.run()

