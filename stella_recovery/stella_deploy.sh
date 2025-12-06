#!/bin/bash
echo "STELLA DEPLOYMENT STARTING..."
apt update && apt install -y docker.io docker-compose git curl wget python3 python3-pip
systemctl enable docker && systemctl start docker
git clone https://github.com/huggingface/transformers.git /opt/stella
cd /opt/stella
pip3 install torch transformers accelerate
echo "STELLA READY FOR DEPLOYMENT"
