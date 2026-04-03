#!/usr/bin/env python
import os
import sys
import subprocess

# Change to ml-service directory
ml_service_dir = os.path.join(os.path.dirname(__file__), 'ml-service')
os.chdir(ml_service_dir)
sys.path.insert(0, ml_service_dir)

# Run uvicorn
subprocess.run([
    sys.executable, '-m', 'uvicorn', 
    'api.app:app', 
    '--reload', 
    '--port', '8000'
])
