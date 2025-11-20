import pytest
import sys
import os
from fastapi.testclient import TestClient

# Add parent directory to path to allow imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.main import app

@pytest.fixture(scope="session")
def client():
    return TestClient(app)
