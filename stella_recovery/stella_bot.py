import requests
import json
import time

TOKEN = '8142799448:AAGHOhWXThTvwZYQfJMfoNgOQIpuNlw9i10'
API_URL = f'https://api.telegram.org/bot{TOKEN}'

class STELLA:
    def __init__(self):
        self.last_update_id = 0
        
    def get_response(self, message):
        msg = message.lower()
        
        if any(word in msg for word in ['hello', 'hi', 'hey', 'start']):
            return '🌟 Oh wonderful! STELLA here! Ready to help with your ministry and DeFi operations! What can I do for you today?'
        elif any(word in msg for word in ['pulsechain', 'hex', 'pulse']):
            return '💎 Oh sweetie, PulseChain is where my heart is! Been down 99.26% and still believing! What do you need help with?'
        elif any(word in msg for word in ['ministry', 'church', 'gospel']):
            return '✨ Ministry work is so important! I can help with presentations, research, or follow-up materials. What is your focus today?'
        elif any(word in msg for word in ['hive', 'curation']):
            return '🍯 Hive operations running smoothly! Let me check your curation rewards and delegation status!'
        elif any(word in msg for word in ['status', 'health']):
            return '🌟 STELLA Status: Online on sovereign 32GB server | Personality: Clementine sweetness with PulseChain grit'
        else:
            return '🌟 I am here to help with whatever you need! Ministry support, DeFi operations, or just a chat - what sounds good?'
    
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
        print('STELLA Telegram Bot starting! 🌟')
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
                            
                            response = self.get_response(text)
                            self.send_message(chat_id, response)
                
                time.sleep(1)
            except Exception as e:
                print(f'Error: {e}')
                time.sleep(5)

if __name__ == '__main__':
    stella = STELLA()
    stella.run()
