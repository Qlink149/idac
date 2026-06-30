"""Seed default users from seed_users.json (idempotent)."""
from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

from app.core.security import hash_password

_SEED_FILE = Path(__file__).resolve().parent / "seed_users.json"


async def seed_users(db) -> int:
    """Insert users from seed_users.json when email is not already registered."""
    if not _SEED_FILE.exists():
        return 0

    raw = json.loads(_SEED_FILE.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        return 0

    created = 0
    now = datetime.now(timezone.utc).isoformat()

    for entry in raw:
        email = str(entry.get("email") or "").strip().lower()
        password = str(entry.get("password") or "")
        full_name = str(entry.get("full_name") or email.split("@")[0]).strip()
        role = str(entry.get("role") or "sales").strip().lower()
        if role not in ("admin", "sales"):
            role = "sales"
        if not email or not password:
            continue

        existing = await db.users.find_one({"email": email})
        if existing:
            continue

        user_id = str(uuid.uuid4())
        await db.users.insert_one(
            {
                "id": user_id,
                "email": email,
                "full_name": full_name,
                "role": role,
                "hashed_password": hash_password(password),
                "is_active": True,
                "current_session_id": None,
                "notification_dismissals": [],
                "created_at": now,
                "updated_at": now,
            }
        )
        created += 1

    return created
