#!/usr/bin/env python3
"""
Simple test script to verify HydraSync setup
"""
import requests
import json
import time
import sys

API_BASE = "http://localhost:8000"

def test_api_health():
    """Test if the API is running"""
    try:
        response = requests.get(f"{API_BASE}/")
        if response.status_code == 200:
            print("✅ Backend API is running")
            return True
        else:
            print(f"❌ Backend API returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend API")
        return False

def test_user_registration():
    """Test user registration"""
    try:
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "testpass123",
            "daily_goal": 2000
        }
        
        response = requests.post(f"{API_BASE}/auth/register", json=user_data)
        if response.status_code == 200:
            print("✅ User registration works")
            return response.json()
        else:
            print(f"❌ User registration failed: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None

def test_water_logging(token):
    """Test water logging"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        water_data = {"amount": 250}
        
        response = requests.post(f"{API_BASE}/water/log", json=water_data, headers=headers)
        if response.status_code == 200:
            print("✅ Water logging works")
            return True
        else:
            print(f"❌ Water logging failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Water logging error: {e}")
        return False

def main():
    print("🧪 Testing HydraSync Setup...\n")
    
    # Test API health
    if not test_api_health():
        print("\n❌ Backend is not running. Please start it first:")
        print("cd backend && uvicorn main:app --reload")
        sys.exit(1)
    
    # Test user registration
    user_response = test_user_registration()
    if not user_response:
        sys.exit(1)
    
    token = user_response.get("access_token")
    if not token:
        print("❌ No access token received")
        sys.exit(1)
    
    # Test water logging
    if not test_water_logging(token):
        sys.exit(1)
    
    print("\n🎉 All tests passed! HydraSync is working correctly.")
    print("\n📝 Next steps:")
    print("1. Open http://localhost:5173 in your browser")
    print("2. Register a new account")
    print("3. Start logging water intake")
    print("4. Add friends and test real-time updates")

if __name__ == "__main__":
    main()