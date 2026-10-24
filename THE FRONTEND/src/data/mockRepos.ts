import type { OrphanedProject } from '../types/project';

export const MOCK_REPOS: OrphanedProject[] = [
  {
    id: 'vapor-p2p',
    name: 'vapor-p2p',
    owner: 'vapor-mesh',
    githubUrl: 'https://github.com/vapor-mesh/vapor-p2p',
    lastCommitDate: '2024-06-19',
    commitCount: 84,
    stars: 342,
    primaryLanguage: 'TypeScript',
    languageColor: '#3178C6',
    techStack: ['TypeScript', 'WebRTC', 'Ed25519', 'STUN/TURN', 'Node.js'],
    state: 'Stalled Prototype',
    curatedCollection: 'hackathon',
    abandonmentReason: 'Severe WebRTC ICE restart synchronization race conditions across cross-carrier cellular connections. Core author shifted full-time to new enterprise employment.',
    documentedGoal: 'A decentralized browser-to-browser encrypted data tunnel using WebRTC mesh without centralized relay servers, intended for realtime sensor synchronization.',
    observedEvidence: [
      'Core cryptographic envelope: Ed25519 keypair generation and verification passing unit tests.',
      'Local SDP offer/answer serialization engine operating cleanly in Node runtime.',
      'WebRTC DataChannel packet fragmentation engine handles up to 1MB chunks without memory leak.',
      'In-memory peer connection pool manager holds active state for 3 peers.',
    ],
    unfinishedGaps: [
      'Symmetric NAT traversal fails on cellular networks due to missing automated TURN relay fallback.',
      'React UI client stalled at static connection button; zero reactive peer listing.',
      'Zero integration test coverage for mesh clusters exceeding 3 nodes.',
    ],
    recommendedPath: 'Continue',
    revivalPlaybook: {
      Restart: 'Scaffold a fresh Vite + React 19 client. Replace deprecated node-wrtc with standard WebRTC APIs and modern libp2p transports.',
      Continue: 'Fork repository, add Coturn fallback server credentials in peerConnectionConfig, and patch ICE restart state machine in src/mesh/ice.ts.',
      Change: 'Pivot architecture from arbitrary file sharing into an encrypted ephemeral chat room for high-privacy journalism collectives.',
      Repurpose: 'Extract the Ed25519 payload fragmentation engine into a standalone zero-dependency npm package `@vapor/packet-crypto`.',
      Archive: 'Publish detailed retrospective on browser-to-browser NAT traversal limits and freeze master branch with deprecation banner.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: High-value cryptographic core. The author solved the hardest math (Ed25519 handshake and MTU packet splitting) but stalled on cellular NAT traversal. 80% ready for a Coturn-backed revival.',
    rawReadme: `# vapor-p2p: Decentralized Mesh Data Tunnel

## Architecture Overview
Vapor-p2p provides high-speed zero-trust data synchronization between browser nodes without centralized WebSocket relays.

### Verified Modules:
- \`src/crypto/ed25519.ts\`: Constant-time signature verification.
- \`src/protocol/fragmenter.ts\`: Chunk binary payloads into 16KB WebRTC-safe frames.

### Roadmap (Unfinished):
- [ ] Cellular NAT traversal with coturn
- [ ] Reactive cluster status UI
- [ ] Multi-hop routing tables`,
    timelineEvents: [
      { date: '2023-11-10', title: 'Initial Commit: Cryptographic Handshake', type: 'commit', detail: 'Implemented Ed25519 curve25519 encryption envelope.' },
      { date: '2024-02-14', title: 'v0.2.0 Release: In-Memory Peer Mesh', type: 'release', detail: 'Demonstrated 3-node in-memory WebRTC cluster under localhost conditions.' },
      { date: '2024-05-02', title: 'Issue #18: Cellular ICE Restart Failure', type: 'issue', detail: 'Community reported packet drops on AT&T/Verizon carrier CGNAT.' },
      { date: '2024-06-19', title: 'Final Commit: WIP Coturn Stub', type: 'commit', detail: 'Work stalled midway through TURN credential rotation logic.' },
    ],
  },
  {
    id: 'campus-ar-nav',
    name: 'campus-ar-nav',
    owner: 'student-labs',
    githubUrl: 'https://github.com/student-labs/campus-ar-nav',
    lastCommitDate: '2024-05-11',
    commitCount: 142,
    stars: 215,
    primaryLanguage: 'Kotlin',
    languageColor: '#A97BFF',
    techStack: ['Kotlin', 'Android SDK 34', 'ARCore', 'Mapbox', 'SQLite'],
    state: 'Architecture Solid / UI Incomplete',
    curatedCollection: 'student',
    abandonmentReason: 'Core student dev team graduated in May 2024. Handover to campus IT failed due to lack of municipal Wi-Fi beacon calibration budget.',
    documentedGoal: 'Decentralized Campus Navigation App with AR Wayfinding, offline indoor blueprint rendering, and sub-meter BLE beacon positioning.',
    observedEvidence: [
      'Offline indoor floor vector rendering parses custom GeoJSON maps into native Canvas.',
      'Mapbox 2D route computation with Dijkstra shortest-path navigation fully functional.',
      'SQLite database pre-loaded with 4 major campus building floor schematics.',
    ],
    unfinishedGaps: [
      'ARCore camera overlay module is an empty stub with uninstantiated anchor points.',
      'BLE beacon RSSI signal noise causes erratic position jumping without a Kalman filter.',
      'No background GPS throttling; rapid battery drain observed in 20-minute field test.',
    ],
    recommendedPath: 'Repurpose',
    revivalPlaybook: {
      Restart: 'Rebuild in Flutter or React Native to achieve dual Android/iOS deployment without native Kotlin bindings.',
      Continue: 'Implement 1D Kalman filter on BLE signal stream and link ARCore camera anchors to indoor waypoints.',
      Change: 'Reposition from university campuses to hospital and airport indoor navigation kiosks.',
      Repurpose: 'Extract the offline floor vector parsing engine into a reusable Android library for any indoor mapping app.',
      Archive: 'Catalog the building blueprint GeoJSON schemas in the university open repository and archive the repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: The indoor routing algorithms and SQLite schemas are production-grade. The AR module was an over-scoped graduation requirement. Stripping AR reveals a lightweight, lightning-fast 2D indoor map.',
    rawReadme: `# campus-ar-nav: Smart University Wayfinding

## Objectives (Slide 2 Presentation Scenario)
Empower freshmen and visitors to navigate complex university architectural structures offline.

### What Actually Works:
- Dijkstra shortest path routing across 4 multi-story campus buildings.
- Offline GeoJSON parser converting blueprint CAD files into 60fps Android vector layers.

### What Stalled:
- ARCore camera anchor placement.
- BLE beacon triangulation in noisy hallways.`,
    timelineEvents: [
      { date: '2023-09-01', title: 'Senior Design Project Kickoff', type: 'commit', detail: 'Project architected for campus engineering capstone.' },
      { date: '2024-01-20', title: 'v1.0-alpha: 2D Blueprint Engine', type: 'release', detail: 'Rendered indoor CAD vector layers on mobile.' },
      { date: '2024-04-15', title: 'Issue #34: Beacon RSSI Drift', type: 'issue', detail: 'Beacon reflection off locker walls caused 8m coordinate errors.' },
      { date: '2024-05-11', title: 'Commencement Graduation Flatline', type: 'commit', detail: 'Team graduated; final commit noted repository handover pending.' },
    ],
  },
  {
    id: 'zeroth-auth-engine',
    name: 'zeroth-auth-engine',
    owner: 'zeroth-systems',
    githubUrl: 'https://github.com/zeroth-systems/zeroth-auth-engine',
    lastCommitDate: '2023-11-04',
    commitCount: 68,
    stars: 580,
    primaryLanguage: 'Go',
    languageColor: '#00ADD8',
    techStack: ['Go 1.21', 'JWT', 'Redis', 'OAuth2', 'Docker'],
    state: 'Architecture Solid / UI Incomplete',
    curatedCollection: 'auth',
    abandonmentReason: 'Corporate sponsor acquired by enterprise competitor; team mandated to migrate all internal microservices to Okta.',
    documentedGoal: 'Lightweight reverse-proxy authentication gateway enforcing zero-trust JWT validation and automated token rotation without latency overhead.',
    observedEvidence: [
      'Go HTTP middleware validates RS256 JWT signatures in under 1.2 milliseconds.',
      'Redis sliding-window rate limiter prevents brute-force token exhaustion attacks.',
      'Automated RSA-4096 keypair rotation background worker functions flawlessly in Docker.',
    ],
    unfinishedGaps: [
      'Admin management dashboard UI was never built; configuration is purely static YAML.',
      'Missing WebAuthn / FIDO2 hardware passkey endpoints.',
      'OpenID Connect discovery endpoint (\`/.well-known/openid-configuration\`) returns incomplete metadata.',
    ],
    recommendedPath: 'Continue',
    revivalPlaybook: {
      Restart: 'Re-implement in Rust using Axum to eliminate GC pauses for ultra-high throughput edge gateways.',
      Continue: 'Add standard OIDC discovery handlers and build a minimal React 19 Tailwind admin dashboard.',
      Change: 'Reposition as a micro-gateway specifically designed for local self-hosted Home Assistant and homelab clusters.',
      Repurpose: 'Extract the Go token rotation middleware into a drop-in Gin/Echo handler package.',
      Archive: 'Document performance benchmarks comparing Zeroth against Envoy and freeze the repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Highly stable backend infrastructure. The Go HTTP proxy handles 45,000 req/sec in benchmarks. Only lacks an administrative GUI and OIDC endpoints. Prime candidate for immediate continuation.',
    rawReadme: `# zeroth-auth-engine: Zero-Trust Gateway

Microsecond-latency reverse proxy performing stateless JWT verification at the edge.

### Core Capabilities
- Sub-millisecond RS256 token verification.
- Sliding window Redis token bucket rate limiting.
- Automatic key rotation with zero downtime.`,
    timelineEvents: [
      { date: '2023-04-12', title: 'Proxy Architecture Setup', type: 'commit', detail: 'High-throughput reverse proxy core created in Go.' },
      { date: '2023-08-01', title: 'v0.9 Benchmark Release', type: 'release', detail: '45,000 req/sec verified on 8-core c6i instance.' },
      { date: '2023-11-04', title: 'Corporate Sponsor Deprecation', type: 'issue', detail: 'Sponsor acquired; team transferred to enterprise legacy stack.' },
    ],
  },
  {
    id: 'pulse-webrtc-mesh',
    name: 'pulse-webrtc-mesh',
    owner: 'telemetry-corp',
    githubUrl: 'https://github.com/telemetry-corp/pulse-webrtc-mesh',
    lastCommitDate: '2023-08-14',
    commitCount: 112,
    stars: 189,
    primaryLanguage: 'Rust',
    languageColor: '#DEA584',
    techStack: ['Rust', 'Tokio', 'WebRTC', 'Protobuf', 'Wasm'],
    state: 'Stalled Prototype',
    curatedCollection: 'hackathon',
    abandonmentReason: 'Wasm compilation size exceeded target micro-controller budget; lead systems architect moved to robotics laboratory.',
    documentedGoal: 'High-throughput binary telemetry mesh compiled to WebAssembly for real-time robotic swarm communication over WebRTC data channels.',
    observedEvidence: [
      'Rust Tokio async peer coordinator with deterministic Protobuf packet serialization.',
      'Zero-allocation ring buffer for high-frequency sensor readings (1000 Hz).',
      'Wasm bindings compile cleanly and instantiate in modern Chromium engines.',
    ],
    unfinishedGaps: [
      'Peer discovery relies on hardcoded WebSocket signaling server URL without fallback.',
      'No automated reconnection logic when peer drops out of Wi-Fi range.',
      'Unresolved memory leak in Wasm shared memory buffer during 60+ minute test runs.',
    ],
    recommendedPath: 'Restart',
    revivalPlaybook: {
      Restart: 'Scaffold fresh Rust workspace with modern `wasm-bindgen` and `tokio-tungstenite`. Implement automated ping-pong keepalives.',
      Continue: 'Profile Wasm heap allocations to locate the buffer leak and add mDNS local network discovery.',
      Change: 'Pivot from robotics telemetry into real-time collaborative audio synthesizer synchronization in the browser.',
      Repurpose: 'Extract the zero-allocation Protobuf ring buffer into a general-purpose Rust crate.',
      Archive: 'Publish Wasm telemetry benchmark results to arXiv and archive repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Exceptional low-level systems engineering. The Protobuf telemetry encoder runs at wire-speed. A modern Wasm cleanup will make this a premier browser-to-robotics bridge.',
    rawReadme: `# pulse-webrtc-mesh: High-Rate Telemetry Mesh

Compiles high-frequency binary telemetry pipelines to Wasm for low-latency robotics communication.`,
    timelineEvents: [
      { date: '2023-03-01', title: 'Rust Telemetry Engine Initialized', type: 'commit', detail: 'Zero-copy Protobuf serialization.' },
      { date: '2023-08-14', title: 'Wasm Micro-controller Memory Freeze', type: 'commit', detail: 'Memory budget exceeded on ESP32 runtime.' },
    ],
  },
  {
    id: 'verilog-risc-simulator',
    name: 'verilog-risc-simulator',
    owner: 'arch-researchers',
    githubUrl: 'https://github.com/arch-researchers/verilog-risc-simulator',
    lastCommitDate: '2022-09-30',
    commitCount: 52,
    stars: 412,
    primaryLanguage: 'Python',
    languageColor: '#3572A5',
    techStack: ['Python', 'Verilog', 'PySide6', 'RISC-V', 'NumPy'],
    state: 'Stalled Prototype',
    curatedCollection: 'stalled-gems',
    abandonmentReason: 'Grant funding cycle concluded. Author completed PhD dissertation and accepted industry silicon role.',
    documentedGoal: 'Visual educational simulator for 5-stage pipelined RISC-V RV32I microarchitectures with cycle-by-cycle hazard detection.',
    observedEvidence: [
      'Instruction set decoder supports all 37 base RV32I integer instructions.',
      'Forwarding unit and hazard detection correctly simulates data stalls and branch flushes.',
      'Registers and memory state visualization prints formatted terminal traces.',
    ],
    unfinishedGaps: [
      'PySide6 graphical user interface freezes on step-execution exceeding 500 clock cycles.',
      'Floating-point RV32F extension parsing raises uncaught NotImplementedError.',
      'Zero automated regression tests comparing simulated register files against QEMU.',
    ],
    recommendedPath: 'Repurpose',
    revivalPlaybook: {
      Restart: 'Port simulator execution core from Python to WebAssembly/TypeScript for instantaneous zero-install in-browser learning.',
      Continue: 'Fix Qt threading deadlocks with QThread and add RV32M integer multiplication/division support.',
      Change: 'Embed simulator inside an interactive browser-based gamified educational curriculum like Turing Complete.',
      Repurpose: 'Extract the Python RISC-V instruction disassembler module into a CLI tool for reverse engineering.',
      Archive: 'Deposit simulator source code and research paper supplementary code into ACM Digital Library.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Pedagogically brilliant instruction pipeline simulator. Python Qt GUI threading is flawed, but the mathematical pipeline simulator is 100% correct. Prime candidate for a WebAssembly browser port.',
    rawReadme: `# verilog-risc-simulator: RV32I Pipeline Simulator

Cycle-accurate educational visualization of 5-stage classic RISC pipeline hazards.`,
    timelineEvents: [
      { date: '2022-02-15', title: 'Dissertation Code Release', type: 'commit', detail: 'Cycle-accurate RV32I simulator verified against Verilog testbench.' },
      { date: '2022-09-30', title: 'Final Commit: PhD Defense Complete', type: 'commit', detail: 'Academic grant closed.' },
    ],
  },
  {
    id: 'synthwave-webgl-audio',
    name: 'synthwave-webgl-audio',
    owner: 'retrowave-studios',
    githubUrl: 'https://github.com/retrowave-studios/synthwave-webgl-audio',
    lastCommitDate: '2023-04-05',
    commitCount: 44,
    stars: 620,
    primaryLanguage: 'JavaScript',
    languageColor: '#F1E05A',
    techStack: ['JavaScript', 'Three.js', 'Web Audio API', 'GLSL', 'Vite'],
    state: 'Unknown State',
    curatedCollection: 'stalled-gems',
    abandonmentReason: null, // SYSTEM GUARDRAIL TEST CASE!
    documentedGoal: 'Interactive 80s outrun-style neon grid with procedural wireframe terrain deformed dynamically by browser Web Audio FFT analysis.',
    observedEvidence: [
      'Custom Three.js vertex shader deforms plane geometry using real-time audio frequency data.',
      'Neon wireframe horizon with procedural sunset bloom shader renders at 60fps on desktop.',
      'Web Audio AnalyserNode setup hooks into microphone and HTML5 audio tags.',
    ],
    unfinishedGaps: [
      'Mobile Safari Web Audio context fails to unlock on user tap event.',
      'GLSL shaders crash on integrated Intel HD graphics due to non-standard float precision syntax.',
      'No track playlist management or pause/scrub playback controls.',
    ],
    recommendedPath: 'Change',
    revivalPlaybook: {
      Restart: 'Migrate to React Three Fiber (R3F) + Drei with modern postprocessing shaders.',
      Continue: 'Resolve iOS Web Audio resume unlock issue and normalize GLSL float precision qualifiers.',
      Change: 'Package the visualizer as a dynamic wallpaper generator or OBS studio streaming backdrop.',
      Repurpose: 'Extract the GLSL audio-reactive wireframe grid shader for use in music festival VJ setups.',
      Archive: 'Bundle repository as a standalone WebGL creative coding experiment demonstration.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Sensational visual aesthetics and fluid GLSL shaders. Audio reactivity works instantly in Chromium. Needs iOS WebAudio unlock patch and React Three Fiber modernization.',
    rawReadme: `# synthwave-webgl-audio

Retro aesthetic visualizer built with Three.js and Web Audio FFT.`,
    timelineEvents: [
      { date: '2023-01-10', title: 'Visualizer Core Launch', type: 'commit', detail: 'Audio reactive GLSL shader grid.' },
      { date: '2023-04-05', title: 'Sudden Activity Cease', type: 'commit', detail: 'No exit ticket logged.' },
    ],
  },
  {
    id: 'chrono-git-3d',
    name: 'chrono-git-3d',
    owner: 'temporal-viz',
    githubUrl: 'https://github.com/temporal-viz/chrono-git-3d',
    lastCommitDate: '2024-03-22',
    commitCount: 96,
    stars: 280,
    primaryLanguage: 'TypeScript',
    languageColor: '#3178C6',
    techStack: ['TypeScript', 'Three.js', 'D3.js', 'Git CLI', 'Electron'],
    state: 'Abandoned Hackathon MVP',
    curatedCollection: 'student',
    abandonmentReason: 'Built during HackMIT 2023. Winning team members received venture funding for an unrelated enterprise cybersecurity startup.',
    documentedGoal: '3D interactive topological solar system where git branches form planetary orbits and commits visualize as radiating energy pulses.',
    observedEvidence: [
      'Git CLI parser streams commit hashes, author metadata, and branch parentage into JSON DAG.',
      'Three.js scene renders 3D planetary orbits with proportional mass based on branch lifespan.',
      'OrbitControls camera allows rotating and flying through repository development history.',
    ],
    unfinishedGaps: [
      'Performance degrades severely on repositories with more than 1,000 commits (no instanced meshes).',
      'Git merge commits with multiple parents produce disjointed visual glitches.',
      'Electron wrapper binary size is 180MB due to unpruned dev dependencies.',
    ],
    recommendedPath: 'Repurpose',
    revivalPlaybook: {
      Restart: 'Rebuild as a zero-install web application using InstancedMesh and Web Workers to parse commit logs.',
      Continue: 'Fix multi-parent merge visualization geometry and optimize render loop with LOD (Level of Detail).',
      Change: 'Reposition as an interactive onboarding tool for engineering teams to understand legacy monorepo architectures.',
      Repurpose: 'Extract the Git DAG topological sorting parser into an independent npm library.',
      Archive: 'Record a high-definition 4K video walkthrough of the visualizer on Linux kernel and archive repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Mesmerizing 3D commit visualizer. The DAG parser is solid. Performance stalls because commits are rendered as individual meshes rather than an instanced buffer.',
    rawReadme: `# chrono-git-3d

Topological 3D representation of git branches as planetary systems.`,
    timelineEvents: [
      { date: '2023-09-16', title: 'HackMIT 2023 Submission', type: 'commit', detail: 'Built in 36-hour sprint.' },
      { date: '2024-03-22', title: 'Post-Hackathon Cleanup', type: 'commit', detail: 'Final commit tagged v0.5-mvp.' },
    ],
  },
  {
    id: 'neuro-draft-editor',
    name: 'neuro-draft-editor',
    owner: 'cognition-labs',
    githubUrl: 'https://github.com/cognition-labs/neuro-draft-editor',
    lastCommitDate: '2024-01-18',
    commitCount: 77,
    stars: 350,
    primaryLanguage: 'TypeScript',
    languageColor: '#3178C6',
    techStack: ['TypeScript', 'ProseMirror', 'ONNX Runtime Web', 'React', 'Tailwind'],
    state: 'Architecture Solid / UI Incomplete',
    curatedCollection: 'hackathon',
    abandonmentReason: 'Browser-based 120MB quantized language model caused high memory crashes on mobile browsers with under 4GB RAM.',
    documentedGoal: 'Privacy-first distraction-free markdown text editor with local client-side ONNX sentence completion running 100% offline.',
    observedEvidence: [
      'ProseMirror rich-text markdown editor with keyboard shortcuts and document serialization.',
      'ONNX Runtime Web initializes quantized MiniLM model and returns embeddings in 18ms on GPU.',
      'Local IndexedDB autosave engine preserves revisions with undo/redo tree.',
    ],
    unfinishedGaps: [
      'Low-end mobile devices trigger WebAssembly out-of-memory errors on initial model loading.',
      'Autocompletion tooltip conflicts with ProseMirror cursor positioning during rapid typing.',
      'Missing export options for PDF, EPUB, and Word DOCX formats.',
    ],
    recommendedPath: 'Continue',
    revivalPlaybook: {
      Restart: 'Swap client-side ONNX model with Chrome 126+ built-in `window.ai` Gemini Nano API for zero-memory footprint.',
      Continue: 'Add device RAM capability detection and gracefully disable local LLM on mobile devices under 4GB RAM.',
      Change: 'Pivot from creative writing into an offline code snippet docstring generator for developers.',
      Repurpose: 'Extract the local IndexedDB revision-history time travel engine into a standalone React hook.',
      Archive: 'Publish browser memory benchmarks for in-browser LLMs and freeze repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Exceptional local-first architecture. The ProseMirror integration and IndexedDB caching are production ready. Swapping local ONNX for native browser WebAI makes this viable immediately.',
    rawReadme: `# neuro-draft-editor

Offline-first AI assistive markdown editor running ONNX in WebAssembly.`,
    timelineEvents: [
      { date: '2023-10-04', title: 'Editor Foundation', type: 'commit', detail: 'ProseMirror markdown setup.' },
      { date: '2024-01-18', title: 'ONNX WebAssembly Integration', type: 'commit', detail: 'Model loading verified on desktop Chrome.' },
    ],
  },
  {
    id: 'solana-stream-escrow',
    name: 'solana-stream-escrow',
    owner: 'anchor-devs',
    githubUrl: 'https://github.com/anchor-devs/solana-stream-escrow',
    lastCommitDate: '2023-12-08',
    commitCount: 38,
    stars: 195,
    primaryLanguage: 'Rust',
    languageColor: '#DEA584',
    techStack: ['Rust', 'Solana Anchor', 'SPL Token', 'TypeScript', 'Web3.js'],
    state: 'Unknown State',
    curatedCollection: 'auth',
    abandonmentReason: null, // SYSTEM GUARDRAIL TEST CASE!
    documentedGoal: 'Decentralized per-second micro-streaming token escrow protocol allowing employers to stream payroll to contractors in real-time.',
    observedEvidence: [
      'Anchor program compiles cleanly with Rust 1.75 and passes local bankrun test suite.',
      'Token vesting math calculates per-second unlock rates using deterministic slot timestamps.',
      'Automated cancellation clause refunds unvested funds back to employer treasury.',
    ],
    unfinishedGaps: [
      'Frontend React application is an unstyled scaffold without phantom wallet auto-reconnect.',
      'Missing security audit on edge condition where slot drift occurs during validator re-elections.',
      'No batch-payout management for handling multiple contractor streams in a single transaction.',
    ],
    recommendedPath: 'Continue',
    revivalPlaybook: {
      Restart: 'Rewrite smart contract using modern Anchor 0.30 and pin account size allocations dynamically.',
      Continue: 'Build modern glassmorphic React dashboard and integrate Solana Mobile Wallet Adapter.',
      Change: 'Pivot protocol from payroll streaming to pay-per-second cloud GPU compute rental billing.',
      Repurpose: 'Extract the per-second linear vesting arithmetic module into an Anchor macro utility crate.',
      Archive: 'Publish formal verification proofs of the vesting arithmetic and archive repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: The smart contract program is bug-free and tested on local validator. Only stalled at the frontend client integration layer.',
    rawReadme: `# solana-stream-escrow

Linear per-second token vesting and escrow smart contract built on Anchor.`,
    timelineEvents: [
      { date: '2023-09-12', title: 'Anchor Program Draft', type: 'commit', detail: 'Vesting math and cancellation tests.' },
      { date: '2023-12-08', title: 'Final Contract Deployment', type: 'commit', detail: 'Devnet deployment successful. Project halted.' },
    ],
  },
  {
    id: 'offline-first-osm-vector',
    name: 'offline-first-osm-vector',
    owner: 'carto-forge',
    githubUrl: 'https://github.com/carto-forge/offline-first-osm-vector',
    lastCommitDate: '2024-02-28',
    commitCount: 110,
    stars: 480,
    primaryLanguage: 'C++',
    languageColor: '#F34B7D',
    techStack: ['C++', 'OpenGL ES', 'Protobuf', 'Mapbox Vector Tiles', 'SQLite'],
    state: 'Architecture Solid / UI Incomplete',
    curatedCollection: 'stalled-gems',
    abandonmentReason: 'Lead developer accepted senior graphics role at autonomous vehicle firm. Maintenance could not be sustained by community.',
    documentedGoal: 'Ultra-lightweight vector map rendering engine in modern C++ capable of rendering global OpenStreetMap protobuf tiles on embedded Linux devices.',
    observedEvidence: [
      'Protobuf vector tile parser decodes layer geometries in sub-2ms benchmarks.',
      'Tessellation engine converts vector polygons into OpenGL ES triangle strips.',
      'SQLite spatial database index enables spatial bounding box queries.',
    ],
    unfinishedGaps: [
      'Missing font glyph rasterizer; all street names and city labels are invisible.',
      'Projection matrix clips coordinates at extreme Northern/Southern latitudes (Mercator distortion).',
      'No multi-touch pinch-to-zoom gesture smoothing.',
    ],
    recommendedPath: 'Repurpose',
    revivalPlaybook: {
      Restart: 'Port graphics pipeline to WebGPU in Rust for ultra-portable web and native mobile execution.',
      Continue: 'Integrate FreeType font rasterization library to render road names and topological labels.',
      Change: 'Target maritime navigation and off-grid emergency responder tactical handhelds.',
      Repurpose: 'Extract the C++ Protobuf vector tile decoder into a standalone header-only library.',
      Archive: 'Release spatial indexing benchmarks and freeze repository with read-only notice.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Extraordinary graphics engineering. Vector tile parsing and polygon tessellation are production quality. Adding FreeType text rendering turns this into a complete offline Google Maps rival.',
    rawReadme: `# offline-first-osm-vector

High-speed OpenGL vector tile renderer for embedded Linux and tactical devices.`,
    timelineEvents: [
      { date: '2023-06-20', title: 'Tile Tessellation Engine', type: 'commit', detail: 'OpenGL ES polygon rendering.' },
      { date: '2024-02-28', title: 'Career Shift Freeze', type: 'commit', detail: 'Final commit before author joined AV company.' },
    ],
  },
  {
    id: 'whisper-edge-subtitles',
    name: 'whisper-edge-subtitles',
    owner: 'accessibility-mesh',
    githubUrl: 'https://github.com/accessibility-mesh/whisper-edge-subtitles',
    lastCommitDate: '2024-04-12',
    commitCount: 65,
    stars: 390,
    primaryLanguage: 'Python',
    languageColor: '#3572A5',
    techStack: ['Python', 'Faster-Whisper', 'WebSockets', 'PyQt6', 'CUDA'],
    state: 'Stalled Prototype',
    curatedCollection: 'student',
    abandonmentReason: 'Audio stream buffer overflow on non-NVIDIA GPUs caused application crash. Lead student author transitioned to masters thesis.',
    documentedGoal: 'Real-time live closed captioning overlay for university lectures that transcribes microphone input locally with zero external API fees.',
    observedEvidence: [
      'Faster-Whisper CTranslate2 backend generates accurate text tokens in 280ms on RTX 3060.',
      'Transparent PyQt6 desktop window stays pinned on top of presentations and slides.',
      'Local WebSocket server broadcasts live transcript to student phones connected to campus Wi-Fi.',
    ],
    unfinishedGaps: [
      'CPU inference latency is 1400ms (too slow for real-time speech without GPU).',
      'Hallucination loop occurs when microphone picks up silence or ambient HVAC air noise.',
      'No auto-installer or executable package for macOS and Windows non-technical professors.',
    ],
    recommendedPath: 'Continue',
    revivalPlaybook: {
      Restart: 'Rebuild client in Tauri + Rust with whisper.cpp for native CPU SIMD acceleration on all computers.',
      Continue: 'Add voice activity detection (VAD) using Silero to cut audio frames during silence.',
      Change: 'Adapt application for medical consultation transcribing in rural clinics without reliable internet.',
      Repurpose: 'Extract the local WebSocket broadcast server for synchronized multi-device subtitle streaming.',
      Archive: 'Publish speech recognition latency comparisons on university hardware and archive repository.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Exceptional accessibility tool. Transcribes speech accurately with zero cloud costs. Adding Silero VAD will eliminate hallucinations on silence.',
    rawReadme: `# whisper-edge-subtitles

Local edge closed captioning for university lectures and public speaking.`,
    timelineEvents: [
      { date: '2023-11-25', title: 'Campus Accessibility Hack', type: 'commit', detail: 'Proof of concept for deaf students.' },
      { date: '2024-04-12', title: 'Master Thesis Handover', type: 'commit', detail: 'Project paused as student began thesis.' },
    ],
  },
  {
    id: 'kernel-wasm-hypervisor',
    name: 'kernel-wasm-hypervisor',
    owner: 'micro-systems',
    githubUrl: 'https://github.com/micro-systems/kernel-wasm-hypervisor',
    lastCommitDate: '2023-10-29',
    commitCount: 88,
    stars: 520,
    primaryLanguage: 'C',
    languageColor: '#555555',
    techStack: ['C', 'WebAssembly', 'POSIX', 'Linux Kernel', 'QEMU'],
    state: 'Stalled Prototype',
    curatedCollection: 'stalled-gems',
    abandonmentReason: 'Context switching overhead between Linux kernel space and Wasm bytecode exceeded microsecond targets.',
    documentedGoal: 'Bare-metal x86_64 microkernel running WebAssembly sandboxed modules directly in Ring 0 without full virtualization overhead.',
    observedEvidence: [
      'x86_64 bootloader boots into protected mode and initialises serial UART output.',
      'Wasm bytecode interpreter executes integer arithmetic and basic stack operations.',
      'Virtual memory page table manager maps memory regions with write-xor-execute protections.',
    ],
    unfinishedGaps: [
      'No timer interrupt scheduler; cooperative multitasking hangs if a Wasm module loops indefinitely.',
      'Missing network card driver (e1000) prevents TCP/IP packet transmission.',
      'Zero support for multi-core SMP thread dispatching.',
    ],
    recommendedPath: 'Archive',
    revivalPlaybook: {
      Restart: 'Re-architect using Rust and the existing Wasmtime runtime rather than building a custom C interpreter.',
      Continue: 'Implement APIC timer interrupt handler to preempt runaway Wasm modules.',
      Change: 'Reposition from general cloud compute to secure hardware secure-enclave microkernels.',
      Repurpose: 'Extract the minimal x86_64 bootloader and serial driver for OS development tutorials.',
      Archive: 'Publish architectural post-mortem documenting performance tradeoffs of Ring 0 Wasm execution and freeze code.',
    },
    aiAutopsySummary: 'AUTOPSY VERDICT: Audacious systems engineering endeavor. Running Wasm bytecode in Ring 0 is fascinating, but lacking preemption interrupts makes it unstable for production.',
    rawReadme: `# kernel-wasm-hypervisor

Bare-metal WebAssembly microkernel executing sandboxed modules in Ring 0.`,
    timelineEvents: [
      { date: '2023-05-18', title: 'Bootloader Initialization', type: 'commit', detail: 'x86_64 protected mode setup.' },
      { date: '2023-10-29', title: 'Post-Mortem Whitepaper', type: 'commit', detail: 'Performance limits reached. Archived.' },
    ],
  },
];
