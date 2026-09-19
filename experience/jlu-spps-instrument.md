# Experience: 智能化流动多肽合成仪（SPPS）从 0 到 1 系统开发

> Status: high-value training-environment record. Based on user narrative + archived project repository `Zhangsfish/spps`. Final resume wording awaits outcome / scale clarification.

## Identity

- Organization: 吉林大学（具体实验室 / 导师 TODO）
- Project: 智能化流动多肽合成仪 / automated flow peptide synthesizer
- Period: 大四阶段；repository artifacts span at least late 2023–2024; exact start/end TODO
- Source archive: private GitHub repository `Zhangsfish/spps`
- Nature: end-to-end scientific-instrument development integrating chemistry, fluidics, mechanical design, electrical control, procurement, software logic, and experimental validation

## Project background

User-reported context:
- the broader project originated from a large national-level program led / commissioned through Tsinghua University;
- part of the work was subcontracted / transferred to the user's Jilin University supervisor;
- the external starting point was an existing MIT-style automated / flow peptide synthesis instrument;
- the local team initially had limited concrete implementation definition, so the user learned the technical route from literature / theses and translated it into an executable instrument.

These background details are user-reported and should not be converted into precise funding / grant claims until documentary evidence is checked.

## Why this experience matters

Unlike earlier academic research, this project required the user to make a physical product work as an integrated system.

The operating loop was:

reference / literature
→ system requirements
→ fluidic & mechanical architecture
→ component selection
→ sourcing / procurement / inventory
→ custom machining & electrical interfaces
→ control logic / synthesis timing
→ assembly & integration
→ chemical / stability testing
→ working instrument

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
- sourcing parts, including Taobao / domestic alternatives where appropriate;
- considering stock / inventory;
- handling procurement work;
- managing practical purchasing and reimbursement tasks.

Repository evidence includes at least:
- 13 files / sub-items under `需求表/`, including first / second / third / fourth requirement versions, gas-path component requirements, supplemental requirements, and supplier quotation files;
- ~30 vendor manuals / catalogs under `说明书/`, including pumps, valves, connectors, microreactors, optics, mixers, and pressure / fluidic hardware;
- ~30 invoice / purchase records under `发票/`;
- files explicitly labeled `询价` and component requirement lists.

Do not yet claim a cost-saving percentage or total procurement value until quantified.

### 4. Cross-disciplinary engineering coordination

User-reported collaborator structure:
- two mechanical-engineering contributors primarily supporting physical build / assembly;
- one machining / mechanical-design contributor who turned requested custom-part functions / geometry into manufacturable parts;
- one electrical-control contributor (also one of the user's supervisors), who implemented low-level pump / tube / valve driving;
- user acted as the integrator: specifying what the system needed to do, what parts / movements were required, and how the modules fit into the overall workflow.

Ownership boundary:
- user did not independently design every mechanical CAD detail;
- user did not solely implement low-level electrical driver electronics;
- user owned system requirements / integration logic and directed the required behavior.

### 5. Control logic and synthesis sequencing

The user reports personally writing the operating logic / sequence.

Repository evidence strongly supports a real instrument-control layer:
- `软件核心/氨基酸脚本/` contains 27 script / definition entries;
- amino-acid-specific shell scripts exist for the standard amino acids plus deprotection, swelling, washing, hardware definitions, etc.;
- `apss_hw_def` defines 3 pumps and 6 valve addresses / port maps;
- scripts such as `A.sh` explicitly switch valves, run multiple pumps in parallel, insert millisecond delays, execute deprotection, washing, coupling, and wash cycles.

This is not merely conceptual software: it encodes timed physical operations of the instrument.

### 6. Data / traceability design

Repository `软件核心/README.txt` specifies that each synthesis run should generate a dated process package containing at least:
1. target sequence;
2. pump / valve work log;
3. raw spectral data;
4. processed spectral data;
5. LC data (UV and MS);
6. the script information used for each amino acid.

This suggests the user was designing not just actuation but also process traceability / experiment records.

Exact authorship of this README should be confirmed if used as a personal claim.

### 7. Experimental validation

The user reports personally:
- running stability experiments;
- performing synthesis experiments;
- bringing the integrated instrument to a genuinely operational state.

Repository evidence contains:
- `核磁与稳定性/`
- `筛选/反应时间的筛选/`
- `筛选/脱保护时间的筛选/`
- synthesis / cleavage / analysis documents;
- peptide / amino-acid script artifacts.

The exact final performance metrics still need to be extracted / confirmed.

### 8. External communication

User reports:
- attending meetings with the client / principal side;
- giving project-status / technical presentations to Tsinghua-side stakeholders.

User explicitly states that formal grant application materials and bidding were handled by supervisors / others, not by the user.

## What the repository independently demonstrates

Without relying only on memory, the archive shows that the project involved:

- iterative system / flow-path design;
- fluidic, mechanical, pump, valve, connector, reactor, optics, and control-component research;
- repeated requirements / procurement revisions;
- supplier / quotation work;
- actual purchase / invoice records;
- physical control scripts for multiple pumps / valves;
- amino-acid-specific synthesis logic;
- stability / NMR / reaction-time / deprotection-time experimental work;
- final / formal design artifacts rather than only literature notes.

## Capability primitives trained

### Product / system
- starting from an external reference and defining an implementable product;
- requirements definition;
- system architecture;
- hardware-software-chemistry integration;
- iterative product design;
- end-to-end ownership.

### Supply / delivery
- component research and selection;
- supplier / catalog comparison;
- procurement and substitute sourcing;
- quantity / inventory thinking;
- custom-part specification and machining coordination.

### Cross-functional leadership
- translating chemistry requirements into mechanical / electrical requirements;
- directing specialists without personally being the deepest expert in every subsystem;
- integration ownership across multiple engineering disciplines;
- customer / stakeholder communication.

### Execution / feedback
- control-sequence implementation;
- physical assembly integration;
- experimental validation;
- stability testing;
- debugging until the instrument actually ran.

## Transferability hypothesis

This experience is likely to be especially strong evidence for:
- commercial / hardware product management;
- NPI / new product development;
- product commercialization roles that bridge R&D, supply, engineering, and delivery;
- supply-chain / sourcing roles with technical-product context;
- 0→1 business / product ownership;
- roles requiring leadership of domain experts without being the deepest specialist in each domain.

For consumer / brand roles, the chemistry is secondary; the valuable signal is the ability to learn a new system, define a product, allocate work across specialists, source resources, integrate modules, and deliver a working physical result.

## Critical open questions

Only questions that materially affect recruiting evidence remain:

1. Exact dates of the project?
2. What was the final delivered / demonstrated result?
   - peptide sequence(s) successfully synthesized;
   - longest peptide / number of residues;
   - purity / yield if meaningful;
   - cycle time / speed;
   - number of successful full runs;
   - stability / continuous-running duration.
3. Was the instrument formally delivered / accepted by the Tsinghua-side project? What external feedback exists?
4. Approximate procurement scale:
   - total spend / budget under user control;
   - number of meaningful component categories / suppliers;
   - any concrete example where a domestic / Taobao substitute materially reduced cost or lead time.
5. How many people did the user practically coordinate at peak, and what were their exact roles?
6. Which mechanical / fluidic architecture decisions were original modifications rather than direct replication of the reference design?
7. Did the user personally author the shell scripts now archived in `软件核心/氨基酸脚本/` and the process-record design in `README.txt`?
8. Is there a usable instrument-operation video / photo that can serve as portfolio evidence?

## Claim boundaries

- Do not call the user the formal PI / project director.
- Do not claim the user won the national grant or wrote the bid.
- Do not claim sole authorship of mechanical CAD or electrical drivers.
- Do not state a multi-million-RMB project value until verified.
- Do not describe reference-inspired design as a wholly original scientific invention.
- Strong claim that is currently supportable: the user acted as the end-to-end system integrator / product owner for building a working instrument from an initially underdefined external reference.
