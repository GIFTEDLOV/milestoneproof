import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_repo_contains_one_contract():
    r = json.loads((ROOT / "release.json").read_text(encoding="utf-8"))
    assert r["sourceFile"] == "contracts/milestoneproof.py"
    assert sorted(p.name for p in (ROOT / "contracts").glob("*.py")) == ["milestoneproof.py"]
    assert len(r["deployedSourceSha256"]) == 64
    assert r["chainId"] == 61999
    assert r["address"].lower() == "0xD4AdDBe785176EfC96da0B371FfBa03C5ff6c0c9".lower()
    assert "GIFTEDLOV/milestoneproof" in r["githubRepository"]
