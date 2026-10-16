---
{
  "id": "quickmap",
  "source_path": "publication/projects/quickmap.md",
  "source_sha256": "a6f417d25f951d9f314569e1330c5852ca0ff29bb687aaf3f55872d077f5757e",
  "title": "QuickMap | Answering geographic questions on a map",
  "status_label": "Windows prototype · Driven from a Codex conversation · PR under review",
  "period": "October 2026",
  "summary": "Ask what an Arctic route could mean for Dalian Port and see the explanation beside a map: routes, ports, evidence, and limits in one view.",
  "ownership": "I defined the geographic Q&A goal, chose the Dalian question, and set the boundaries for the explanation. Codex helped research, implement, and verify the prototype.",
  "result": "Built a prototype that sends a structured answer from a Codex conversation to QuickMap. Paragraphs reference map layers and sources; the map shows schematic northern and southern routes and port locations. The example and code are in QuickMap PR #2.",
  "boundary": "This is a static portfolio case and a local prototype under review, not a live AI chat on this website. Map lines indicate direction; they are not AIS tracks, precise routes, or navigation advice. Possible benefit to Dalian is not proven economic gain.",
  "claim_ids": ["quickmap.prototype", "quickmap.dalian"],
  "link_ids": ["quickmap-repo", "quickmap-pr", "quickmap-liaoning-2018", "quickmap-liaoning-2025", "quickmap-nsidc", "quickmap-imo"],
  "publication": "approved",
  "media_ids": ["quickmap-dalian-arctic"]
}
---

## One question needs both an explanation and a sense of place

“Would an Arctic route benefit Dalian Port?” A one-line answer about shorter distance misses the origin, passage, and destination. It can also turn a possible benefit into an implied economic result. This case separates the conclusion, connections, recorded voyages, cargo examples, the conventional southern route, and operating limits.

## How Codex puts the answer on the map

In the current prototype, I ask in a Codex conversation. Codex prepares an answer document with paragraphs, `layerIds`, and source IDs; QuickMap validates and displays it. Selecting a paragraph locates its map layers. The blue line shows a schematic direction from Dalian via the Bering Strait and Russia's northern coast to Europe. The orange line compares a southern direction via Malacca and Suez. Points mark Dalian, the Bering Strait, and Rotterdam. The screenshot shows the actual prototype from this iteration.

## An opportunity, not a guaranteed windfall

Liaoning's transport authority records that the Yong Sheng departed Dalian in 2013 and reached Rotterdam via the Northeast Passage. It also records a Dalian–Arkhangelsk Arctic container service in 2024. These are real examples connected to Dalian. A 2018 steel sheet pile voyage departed from Yingkou, a different port; it does not establish Dalian's usual cargo mix. Sustained benefit would also depend on the navigable season, cargo supply, suitable vessels and insurance, port calls, and inland connections.

## What this map can and cannot show

NSIDC's observations from autumn 2026 show how quickly seasonal ice conditions can change. The IMO Polar Code sets requirements for ships, equipment, training, and operations in polar waters. Less sea ice does not mean safe year-round access. These lines and points explain geography; they are not AIS tracks, live ice conditions, or navigation advice. This static page also does not replace open-ended in-map chat.
