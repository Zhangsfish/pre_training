# Experience: 智能化流动多肽合成仪（SPPS）从 0 到 1 系统开发

> Status: high-value training-environment record. Based on user narrative + archived project repository `Zhangsfish/spps`.  
> Resume claims must distinguish repository-verifiable facts, user recollection, and later unverified feedback.

## Identity

- Organization: 吉林大学（具体实验室 / 导师 TODO）
- Project: 智能化流动多肽合成仪 / automated flow peptide synthesizer
- Period: **2024-03 – 2024-08**（用户毕业后仍继续推进至入学前）
- Source archive: private GitHub repository `Zhangsfish/spps`
- Nature: end-to-end scientific-instrument development integrating chemistry, fluidics, mechanical design, electrical control, procurement, software logic, and experimental validation

## Project background

User-reported context:
- the broader project came from a large national-level program involving Tsinghua University;
- part of the implementation work was assigned / subcontracted to the user's Jilin University supervisor;
- the external technical reference was an MIT-style automated flow peptide synthesis instrument;
- the local side initially lacked a concrete implementation plan, so the user learned the route from papers / doctoral theses and translated it into an executable instrument.

Do not state an exact grant value unless separately verified.

## Multi-party operating environment

A major part of the training environment was not technical; it was incentive misalignment.

### Tsinghua-side priority
- wanted the instrument completed quickly;
- wanted cost kept low;
- wanted a workable / high-quality result.

### Jilin University supervisor-side priority
User reports:
- the task was relatively low priority compared with the supervisor's other work;
- the funding / incentive was insufficient from the supervisor's perspective;
- some electrical-control work nevertheless depended on the supervisor and could not simply be bypassed.

### User's priority
- this project was the user's graduation design;
- the user needed a real artifact / result in time to graduate;
- the user also had a hard personal deadline because graduation and travel / further study were approaching.

This created a practical delivery problem:
- the nominal management chain was slower than the user's required schedule;
- some work could be accelerated independently;
- some work remained blocked on people with different incentives.

## How the user changed the operating model

### Direct requirements interface

Initial path:
user → JLU supervisor → Tsinghua

As delays accumulated, the user discussed the bottleneck with the supervisor and, with agreement, shifted toward:
user → direct Tsinghua-side requirement / resource communication

This reduced coordination latency.

### Funding / reimbursement routing

Initially, some purchases were reimbursed from the JLU supervisor's own research budget.

The user recognized the mismatch:
- the equipment served the Tsinghua-side project;
- using the supervisor's limited internal budget weakened incentives and slowed execution.

The user therefore pushed purchasing / reimbursement requests directly to the Tsinghua-side project so project resources, rather than unrelated internal funds, carried the cost.

This is important evidence of:
- incentive recognition;
- stakeholder negotiation;
- changing a process rather than accepting an inefficient default;
- aligning resource ownership with project responsibility.

## Why this experience matters

Unlike earlier academic research, this project required the user to make a physical product work as an integrated system while coordinating stakeholders whose incentives were not aligned.

The operating loop was:

reference / literature
→ system requirements
→ fluidic & mechanical architecture
→ component selection
→ resource negotiation
→ sourcing / procurement / inventory
→ custom machining & electrical interfaces
→ control logic / synthesis timing
→ assembly & integration
→ chemical / stability testing
→ working instrument
→ customer-side demonstration / handoff

This is currently one of the strongest examples in the experience bank of end-to-end product / system ownership.

## User's personal ownership

### 1. Learned an unfamiliar technical stack

The user:
- read doctoral theses / literature and reference-system materials;
- learned the underlying automated flow peptide synthesis route;
- translated chemistry workflow into hardware / control requirements.

Repository evidence includes:
- literature / patent / vendor-reference archives under `VBFR/`;
- Vapourtec flow-protein-synthesis references;
- multiple patent / reactor references.

### 2. Defined the system architecture

The user reports owning the overall system concept and deciding how the instrument should operate.

Repository evidence contains multiple generations of architecture / process files:
- `设计图/循环草稿.vsdx`
- `设计图/旗舰版.vsdx`
- `设计图/最新版气路.vsdx`
- `设计图/最新版液路.vsdx`
- `设计图/正式版.vsdx`
- `设计图/流程.vsdx`
- `设计图/豪华版+循环.vsdx`

Interpretation: this was an iterated system design rather than a one-shot assembly task.

### 3. Component selection, sourcing, procurement, and substitution

The user reports:
- deciding what parts were needed and in what quantities;
- selecting components and specifications;
- sourcing parts;
- managing stock / inventory needs;
- handling practical purchasing;
- actively searching for domestic / Taobao substitutes for expensive imported parts.

Repository evidence includes:
- 13 requirement / sourcing records under `需求表/`;
- multiple versions of BOM-like component requirements;
- quotation / inquiry files;
- ~30 vendor manuals / catalogs under `说明书/`;
- ~30 purchase / invoice records under `发票/`.

### Resource scale — user recollection, not yet independently totaled
The user estimates that resources personally pushed / secured for the project — including pumps, UV-related hardware, valves, consumables, and other components — were on the order of **~RMB 1.5 million**.

Do not present this as an audited procurement total until invoice / purchase evidence is reconciled.

### Domestic substitution — user estimate
The user reports replacing imported component families such as:
- IDEX;
- Swagelok / 世伟洛克;

with domestic alternatives including:
- 润泽流体;
- 熊川 / similar domestic suppliers.

The user estimates certain substitute components reduced cost by **roughly an order of magnitude (≈10×)**.

Repository evidence supports that both imported and domestic vendor catalogs were reviewed, but the exact cost ratio still needs price-level verification before becoming a resume metric.

### 4. Cross-disciplinary engineering coordination

User-reported collaborator structure:
- two mechanical-engineering contributors supporting physical build / assembly;
- one machining / mechanical-design contributor who translated the user's functional / geometry requirements into manufacturable parts;
- one electrical-control contributor (also one of the user's supervisors), who implemented low-level pump / valve driving;
- user acted as the integrator: specifying system behavior, architecture, required movements, part interfaces, and end-to-end operating logic.

Ownership boundary:
- user did not independently design every CAD detail;
- user did not write the low-level pump / valve driver functions;
- user owned system requirements, operating logic, integration decisions, and delivery pressure.

### 5. Control logic and synthesis sequencing

The user confirms that the archived synthesis shell scripts were written personally.

Repository evidence:
- `软件核心/氨基酸脚本/` contains 27 script / definition entries;
- amino-acid-specific scripts plus deprotection, swelling, washing, and hardware definitions;
- `apss_hw_def` defines 3 pumps and 6 valves / port mappings;
- scripts such as `A.sh` switch valves, run pumps in parallel, insert timed delays, and execute deprotection / wash / coupling cycles.

The low-level primitives such as `run_pump` / `switch_valve` were implemented by the supervisor / electrical-control contributor; the user wrote the higher-level sequencing that determined what the instrument should do and when.

### 6. Data / traceability design

Repository `软件核心/README.txt` specifies that each synthesis run should generate a dated process package containing:
1. target sequence;
2. pump / valve work log;
3. raw spectral data;
4. processed spectral data;
5. LC data (UV and MS);
6. script information used for each amino acid.

Treat this as process / traceability design evidence; exact authorship should be confirmed if used as an explicit personal claim.

### 7. Experimental validation and final technical state

User-reported final state before handoff / departure:
- the integrated instrument could run repeatedly for demonstration;
- it successfully performed automated synthesis of approximately a **10-residue peptide**;
- reported purity at the time was approximately **95%**;
- synthesis speed was approximately **40 seconds per residue / coupling step** (user recollection);
- longer sequences remained problematic / not fully validated before the user left;
- later participants continued optimization after the user's departure.

Important uncertainty:
- the user later heard that the reported ~95% purity may have had issues, but did not personally participate in the later re-evaluation;
- therefore resume wording should prefer "demonstrated automated synthesis of a ~10-mer peptide" over claiming a definitive validated 95% purity unless later documentation confirms it.

Repository evidence also contains:
- `核磁与稳定性/`
- reaction-time screening;
- deprotection-time screening;
- peptide synthesis / cleavage / analysis documents.

### 8. Delivery and customer communication

User reports:
- approximately **4 formal project presentations / reviews** to Tsinghua-side stakeholders;
- many additional practical communications around requirements, procurement, and parts;
- the working instrument was handed off / delivered at the end of the user's involvement;
- the user does not know the instrument's current physical location after leaving;
- it may have subsequently gone to Tsinghua, but this is not confirmed.

User explicitly states:
- formal grant-application writing was handled by the supervisor;
- bidding / tendering was handled by others.

## What the repository independently demonstrates

Without relying only on memory, the archive shows:
- iterative system / flow-path design;
- pump / valve / connector / reactor / optics / control-component selection;
- repeated requirement revisions;
- supplier / quotation work;
- actual procurement / invoice records;
- amino-acid-specific physical-control scripts;
- stability / NMR / reaction-time / deprotection-time experimental work;
- final / formal design artifacts rather than literature-only research.

## Capability primitives trained

### Product / system
- translating a benchmark / external reference into implementable requirements;
- end-to-end system architecture;
- hardware-software-chemistry integration;
- iterative product development;
- physical-product delivery ownership.

### Stakeholder / organization
- diagnosing incentive misalignment;
- bypassing unnecessary coordination latency with permission;
- negotiating direct requirement / resource interfaces;
- aligning project cost with the stakeholder that owned the requirement;
- pushing delivery despite asymmetric urgency across stakeholders.

### Supply / delivery
- component research and selection;
- domestic substitution;
- supplier / catalog comparison;
- procurement and reimbursement routing;
- quantity / inventory thinking;
- custom-part specification and machining coordination.

### Cross-functional leadership
- translating chemistry needs into mechanical / electrical requirements;
- directing specialists without being the deepest expert in every subsystem;
- integration ownership;
- external stakeholder communication.

### Execution / feedback
- control-sequence implementation;
- physical assembly integration;
- experimental validation;
- stability testing;
- debugging until the instrument repeatedly ran.

## Transferability

Especially strong evidence for:
- hardware / commercial product management;
- NPI / new product development;
- product commercialization;
- sourcing / supply-chain roles with product context;
- cross-functional 0→1 product ownership;
- roles requiring leadership of experts without formal authority;
- business / operations environments where incentive structure and resource routing matter.

For brand / consumer roles, the technical details are secondary; the high-value story is:
**learn fast → define the product → align resources → coordinate specialists → change broken processes → deliver a working physical outcome.**

## Portfolio evidence available / expected

Already in repository:
- architecture / flow diagrams;
- component requirements / procurement evidence;
- control scripts;
- test / stability artifacts.

User also reports having:
- instrument photos;
- instrument-running videos.

These should later be turned into a clean public portfolio artifact rather than exposing the raw private project archive.

## Remaining open questions

Only a few facts still matter:
1. Exact formal project / grant name if it is safe and useful to disclose.
2. Exact number of people regularly coordinated during the instrument build.
3. Whether any acceptance / handoff document or final presentation survives.
4. Whether the ~RMB 1.5m resource total and ~10× substitution savings can be reconstructed from archived purchase records.
5. Whether a redacted photo / video set can be made public without violating confidentiality.

## Claim boundaries

- Do not call the user the formal PI / project director.
- Do not claim the user won the national grant or wrote the bid.
- Do not claim sole authorship of mechanical CAD or low-level electrical drivers.
- Do not state an audited RMB 1.5m procurement total until reconciled.
- Do not state a verified 10× cost reduction until component-price comparisons are reconstructed.
- Do not state validated 95% peptide purity unless primary evidence is found.
- Do not describe the reference-inspired design as wholly original scientific invention.

Strong current claim:
**the user acted as the de facto end-to-end system integrator / product owner who turned an underdefined benchmark into a working automated flow-peptide-synthesis instrument under real resource and stakeholder constraints.**


## Visual evidence received

Raw SPPS visual proof has been archived privately for future portfolio use:

- 4 instrument photos;
- 2 operating videos.

See `site/SPPS_ASSETS.md` for the private-archive location, media metadata and publication workflow.

These raw assets must not be copied directly into the public repository without a confidentiality / visible-information review.
