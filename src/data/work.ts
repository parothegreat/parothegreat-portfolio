export type WorkStatus =
  | 'active'
  | 'maintained'
  | 'completed'
  | 'experimental'
  | 'ongoing'
  | 'paused';

export type DocumentationLevel = 'quick-brief' | 'case-study' | 'deep-dive';

export type WorkAccent =
  | 'systems'
  | 'iot'
  | 'infrastructure'
  | 'observability'
  | 'security'
  | 'networking';

export type ArchitectureNodeType =
  | 'client'
  | 'network'
  | 'proxy'
  | 'service'
  | 'database'
  | 'storage'
  | 'hardware'
  | 'monitoring'
  | 'security'
  | 'external';

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  description: string;
  technology?: string;
  x: number;
  y: number;
  status?: 'active' | 'planned' | 'deprecated';
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  protocol?: string;
  direction: 'forward' | 'bidirectional';
  animated?: boolean;
}

export interface WorkSection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface WorkDecision {
  title: string;
  why: string;
  tradeOff: string;
}

export interface WorkTimelineItem {
  title: string;
  description: string;
  state: 'milestone' | 'issue' | 'current';
}

export interface WorkFact {
  label: string;
  value: string;
}

export interface EvidenceItem {
  id: string;
  type:
    | 'image'
    | 'diagram'
    | 'log'
    | 'code'
    | 'metric'
    | 'hardware'
    | 'document';
  title: string;
  description?: string;
  source: string;
  alt?: string;
  redacted?: boolean;
}

export interface WorkItem {
  id: string;
  slug: string;
  index: number;
  title: string;
  shortDescription: string;
  outcome: string;
  category: string;
  role: string[];
  stack: string[];
  status: WorkStatus;
  documentationLevel: DocumentationLevel;
  accent: WorkAccent;
  featured?: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
  caseStudyAvailable: boolean;
  environment: string[];
  sections: WorkSection[];
  ownership: {
    owned: string[];
    contributed: string[];
    boundaries: string[];
  };
  architecture: {
    title: string;
    summary: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  decisions: WorkDecision[];
  timeline: WorkTimelineItem[];
  operations: WorkFact[];
  security: WorkFact[];
  evidence: EvidenceItem[];
  currentState: string;
  lessons: string[];
}

export const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  active: 'Active',
  maintained: 'Maintained',
  completed: 'Completed',
  experimental: 'Experimental',
  ongoing: 'Ongoing',
  paused: 'Paused',
};

export const DOCUMENTATION_LEVEL_LABELS: Record<DocumentationLevel, string> = {
  'quick-brief': 'Quick brief',
  'case-study': 'Technical case study',
  'deep-dive': 'Deep dive',
};

export const WORK_ACCENT_COLORS: Record<WorkAccent, string> = {
  systems: 'var(--circuit-500)',
  iot: 'var(--signal-500)',
  infrastructure: 'var(--circuit-600)',
  observability: 'var(--telemetry-500)',
  security: 'var(--fault-500)',
  networking: 'var(--circuit-400)',
};

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'team-it-work-order',
    slug: 'team-it-work-order',
    index: 1,
    title: 'Team IT Work Order System',
    shortDescription:
      'Operational workflow platform for school IT requests and technical work tracking.',
    outcome:
      'A deployable request workflow that keeps school IT work, ownership, and service status in one operational flow.',
    category: 'Systems',
    role: ['Backend', 'DevOps'],
    stack: ['Go', 'Gin', 'MariaDB', 'Docker Compose', 'Nginx'],
    status: 'active',
    documentationLevel: 'case-study',
    accent: 'systems',
    featured: true,
    caseStudyAvailable: true,
    environment: ['School IT operations', 'Linux server', 'Web application'],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'Turning technical requests into an operational workflow',
        paragraphs: [
          'Team IT handles requests that move through intake, assignment, technical work, and completion. The system gives that work a shared operational record instead of leaving status scattered across informal messages.',
          'Requesters need a clear submission path while operators need enough context to understand ownership and current state.',
        ],
        points: [
          'Primary users: school requesters and Team IT operators',
          'Environment: browser frontend with a separately deployed backend',
          'Constraint: the deployment must remain understandable to student operators',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Problem',
        title: 'The workflow needed one reliable source of state',
        paragraphs: [
          'A request can be received without being clearly assigned, updated, or closed. The backend therefore has to preserve request state and expose a predictable API to the frontend.',
          'Separating the frontend and API also introduced browser-origin constraints that had to be handled consistently rather than patched route by route.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'A small service stack with explicit boundaries',
        paragraphs: [
          'Go and Gin provide the HTTP API, MariaDB stores operational records, Docker Compose keeps the services repeatable, and Nginx forms the external routing boundary.',
          'CORS handling lives in shared API middleware so allowed browser origins, methods, and headers remain visible in one place.',
        ],
      },
    ],
    ownership: {
      owned: [
        'Go and Gin API structure',
        'MariaDB application integration',
        'Docker Compose deployment',
        'Nginx service routing',
      ],
      contributed: [
        'Requester and operator workflow design',
        'Frontend and API integration',
        'Operational troubleshooting',
      ],
      boundaries: [
        'The workflow follows real Team IT processes and permissions.',
        'The Rust time tracker remains a learning prototype, not part of the active service path.',
      ],
    },
    architecture: {
      title: 'Request and service flow',
      summary:
        'The active path runs from the browser through Nginx to the Go API and MariaDB. A Rust tracker is shown separately as planned work.',
      nodes: [
        {
          id: 'browser',
          label: 'Browser',
          type: 'client',
          description:
            'Requester and operator interface for creating and updating work orders.',
          x: 20,
          y: 138,
          status: 'active',
        },
        {
          id: 'nginx',
          label: 'Nginx',
          type: 'proxy',
          description:
            'Routes web traffic to the frontend and API service boundary.',
          technology: 'Nginx',
          x: 175,
          y: 138,
          status: 'active',
        },
        {
          id: 'api',
          label: 'Go / Gin API',
          type: 'service',
          description:
            'Handles routing, middleware, validation, and work-order operations.',
          technology: 'Go',
          x: 335,
          y: 138,
          status: 'active',
        },
        {
          id: 'database',
          label: 'MariaDB',
          type: 'database',
          description:
            'Persists request, status, and operational application data.',
          technology: 'MariaDB',
          x: 505,
          y: 138,
          status: 'active',
        },
        {
          id: 'tracker',
          label: 'Rust Tracker',
          type: 'service',
          description:
            'Learning prototype for lightweight time tracking; not in the active production path.',
          technology: 'Rust / Axum',
          x: 335,
          y: 260,
          status: 'planned',
        },
      ],
      edges: [
        {
          id: 'browser-nginx',
          source: 'browser',
          target: 'nginx',
          protocol: 'HTTPS',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'nginx-api',
          source: 'nginx',
          target: 'api',
          protocol: 'HTTP',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'api-database',
          source: 'api',
          target: 'database',
          protocol: 'SQL',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'api-tracker',
          source: 'api',
          target: 'tracker',
          label: 'planned',
          direction: 'forward',
        },
      ],
    },
    decisions: [
      {
        title: 'Use Go and Gin for the operational API',
        why: 'The service benefits from a small deployable binary, explicit request handling, and straightforward middleware.',
        tradeOff:
          'The team must maintain API contracts and validation instead of relying on a larger full-stack framework.',
      },
      {
        title: 'Package the service with Docker Compose',
        why: 'The API and database need a repeatable local and server deployment model.',
        tradeOff:
          'Container health and persistent database storage still require operational checks.',
      },
      {
        title: 'Centralize CORS policy',
        why: 'The browser frontend and API are deployed separately, so origin handling must remain consistent.',
        tradeOff:
          'Every new frontend origin must be deliberately added instead of being accepted by a wildcard.',
      },
    ],
    timeline: [
      {
        title: 'Workflow mapped',
        description:
          'Requester and operator states were translated into an API-oriented workflow.',
        state: 'milestone',
      },
      {
        title: 'Backend and database connected',
        description:
          'Go routes and MariaDB persistence formed the first working service path.',
        state: 'milestone',
      },
      {
        title: 'Browser integration exposed CORS mismatch',
        description:
          'The separate frontend origin required a shared middleware policy.',
        state: 'issue',
      },
      {
        title: 'Container and proxy deployment',
        description:
          'Docker Compose and Nginx made the service layout repeatable on Linux.',
        state: 'milestone',
      },
      {
        title: 'Active development',
        description:
          'Operational features and a separate time-tracking prototype continue to evolve.',
        state: 'current',
      },
    ],
    operations: [
      { label: 'Deployment', value: 'Docker Compose on Linux' },
      { label: 'Routing', value: 'Nginx reverse proxy' },
      { label: 'Persistence', value: 'MariaDB volume and application schema' },
      {
        label: 'Health',
        value:
          'Service readiness and database connectivity are checked during deployment; deeper monitoring is still being documented.',
      },
      {
        label: 'Logs',
        value: 'Container and Nginx logs support deployment troubleshooting.',
      },
    ],
    security: [
      {
        label: 'Browser boundary',
        value: 'Known frontend origins are handled through shared CORS policy.',
      },
      {
        label: 'Service boundary',
        value: 'Nginx is the public routing layer in front of the API.',
      },
      {
        label: 'Open documentation',
        value:
          'Authentication and authorization details are not published until they can be documented without exposing operational data.',
      },
    ],
    evidence: [
      {
        id: 'work-order-architecture',
        type: 'diagram',
        title: 'Current service architecture',
        description:
          'The interactive diagram documents the active request path and clearly marks the planned tracker.',
        source: '#architecture',
        alt: 'Browser to Nginx to Go API to MariaDB service flow',
      },
    ],
    currentState:
      'Active development. The core backend, database integration, and containerized service path exist; the separate Rust tracker remains a learning prototype.',
    lessons: [
      'A workflow API is easier to operate when state transitions are explicit.',
      'CORS belongs at a shared boundary, not inside individual handlers.',
      'Containerization improves repeatability but does not replace health and persistence checks.',
      'Planned services should remain visibly separate from the active architecture.',
    ],
  },
  {
    id: 'rfid-door-access',
    slug: 'rfid-door-access',
    index: 2,
    title: 'RFID Door Access System',
    shortDescription:
      'RFID-based access control connecting embedded hardware, backend validation, and operational alerts.',
    outcome:
      'A prototype access path that connects card reads, server-side verification, physical lock control, and operator notifications.',
    category: 'IoT',
    role: ['Embedded', 'Backend'],
    stack: ['ESP32-C6', 'MFRC522', 'Go', 'MariaDB', 'Telegram Bot API'],
    status: 'active',
    documentationLevel: 'case-study',
    accent: 'iot',
    featured: true,
    caseStudyAvailable: true,
    environment: [
      'Server-room access prototype',
      '12-volt magnetic lock',
      'Linux backend',
    ],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'Bridging a physical door and an auditable backend',
        paragraphs: [
          'The project explores controlled server-room access with an RFID reader, an ESP32-C6, a backend verification service, and a relay-driven magnetic lock.',
          'Access events also need an operator-facing path, so the design includes Telegram notifications and a planned camera expansion.',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Problem',
        title: 'Physical access needs more than a local card match',
        paragraphs: [
          'A microcontroller can read a card quickly, but authorization, event history, and operator visibility are stronger when decisions are connected to a backend record.',
          'The design also has to account for network loss, relay safety, and the fact that a card UID is an identifier rather than a cryptographic credential.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'Device input, service verification, and physical output',
        paragraphs: [
          'The MFRC522 reads the RFID card and the ESP32-C6 sends the identifier to a Go verification API backed by MariaDB. An accepted decision can drive the relay and magnetic lock while an event is sent through the Telegram Bot API.',
          'ESP32-CAM and ESP-NOW remain an expansion path for event images; they are marked as planned rather than part of the active access path.',
        ],
      },
    ],
    ownership: {
      owned: [
        'ESP32-C6 access-control logic',
        'MFRC522 reader integration',
        'Go verification service design',
        'MariaDB access data integration',
        'Relay and notification workflow',
      ],
      contributed: [
        'Physical access-flow design',
        '12-volt magnetic lock integration planning',
        'ESP32-CAM expansion design',
      ],
      boundaries: [
        'The project is an active prototype, not a certified commercial access-control product.',
        'Camera capture over ESP-NOW is still a learning and expansion item.',
      ],
    },
    architecture: {
      title: 'Access decision flow',
      summary:
        'The active path moves from card read to server verification and then to lock control and notification. Camera capture is planned.',
      nodes: [
        {
          id: 'card',
          label: 'RFID Card',
          type: 'hardware',
          description: 'Presents the card identifier to the reader.',
          x: 18,
          y: 145,
          status: 'active',
        },
        {
          id: 'reader',
          label: 'MFRC522',
          type: 'hardware',
          description: 'Reads the RFID card and passes its identifier.',
          technology: 'MFRC522',
          x: 158,
          y: 145,
          status: 'active',
        },
        {
          id: 'controller',
          label: 'ESP32-C6',
          type: 'hardware',
          description:
            'Coordinates card reads, backend requests, and relay output.',
          technology: 'ESP32-C6',
          x: 298,
          y: 145,
          status: 'active',
        },
        {
          id: 'api',
          label: 'Go API',
          type: 'service',
          description:
            'Verifies access data against the server-side application record.',
          technology: 'Go',
          x: 438,
          y: 55,
          status: 'active',
        },
        {
          id: 'database',
          label: 'MariaDB',
          type: 'database',
          description: 'Stores application and access-control records.',
          technology: 'MariaDB',
          x: 598,
          y: 30,
          status: 'active',
        },
        {
          id: 'relay',
          label: 'Relay / Lock',
          type: 'hardware',
          description:
            'Controls the 12-volt magnetic lock after an accepted decision.',
          x: 438,
          y: 235,
          status: 'active',
        },
        {
          id: 'telegram',
          label: 'Telegram',
          type: 'external',
          description: 'Delivers access events and operational notifications.',
          technology: 'Telegram Bot API',
          x: 598,
          y: 145,
          status: 'active',
        },
        {
          id: 'camera',
          label: 'ESP32-CAM',
          type: 'hardware',
          description:
            'Planned event-image capture triggered through an ESP-NOW expansion.',
          technology: 'ESP32-CAM',
          x: 598,
          y: 270,
          status: 'planned',
        },
      ],
      edges: [
        {
          id: 'card-reader',
          source: 'card',
          target: 'reader',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'reader-controller',
          source: 'reader',
          target: 'controller',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'controller-api',
          source: 'controller',
          target: 'api',
          protocol: 'HTTP',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'api-database',
          source: 'api',
          target: 'database',
          protocol: 'SQL',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'controller-relay',
          source: 'controller',
          target: 'relay',
          label: 'decision',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'api-telegram',
          source: 'api',
          target: 'telegram',
          label: 'event',
          direction: 'forward',
        },
        {
          id: 'controller-camera',
          source: 'controller',
          target: 'camera',
          protocol: 'ESP-NOW',
          direction: 'forward',
        },
      ],
    },
    decisions: [
      {
        title: 'Keep authorization in a backend service',
        why: 'Server-side verification supports a shared access record and future operational auditing.',
        tradeOff:
          'The access path must define a safe behavior when the network or backend is unavailable.',
      },
      {
        title: 'Use Telegram for operator visibility',
        why: 'Access events can reach an existing operational channel without building a second notification client.',
        tradeOff:
          'Notifications depend on external connectivity and must not be treated as the access decision itself.',
      },
      {
        title: 'Keep camera capture as a separate expansion',
        why: 'ESP-NOW can trigger a camera without putting image handling into the core reader loop.',
        tradeOff:
          'The extra device increases power, synchronization, privacy, and reliability concerns.',
      },
    ],
    timeline: [
      {
        title: 'Access flow defined',
        description:
          'Card read, verification, lock action, and notification were separated into clear stages.',
        state: 'milestone',
      },
      {
        title: 'Reader and controller integrated',
        description:
          'MFRC522 input was connected to the ESP32-C6 control path.',
        state: 'milestone',
      },
      {
        title: 'Backend verification added',
        description:
          'Go and MariaDB formed the server-side access decision path.',
        state: 'milestone',
      },
      {
        title: 'Failure assumptions identified',
        description:
          'Network loss, UID trust, and relay behavior require explicit operating rules.',
        state: 'issue',
      },
      {
        title: 'Camera expansion in progress',
        description:
          'ESP32-CAM and ESP-NOW remain planned additions to the active prototype.',
        state: 'current',
      },
    ],
    operations: [
      { label: 'Controller', value: 'ESP32-C6' },
      { label: 'Reader', value: 'MFRC522 RFID module' },
      { label: 'Decision service', value: 'Go API with MariaDB' },
      { label: 'Physical output', value: 'Relay-driven 12-volt magnetic lock' },
      {
        label: 'Operator signal',
        value: 'Telegram access-event notification',
      },
    ],
    security: [
      {
        label: 'Identity assumption',
        value:
          'A card UID identifies a card but is not treated as a cryptographic credential.',
      },
      {
        label: 'Authorization',
        value:
          'The active design checks access against a server-side record instead of a hard-coded local list.',
      },
      {
        label: 'Failure mode',
        value:
          'Network-loss and relay-safe behavior must be tested before production use.',
      },
      {
        label: 'Privacy',
        value:
          'Camera capture is planned and requires an explicit retention and access policy before activation.',
      },
    ],
    evidence: [
      {
        id: 'rfid-architecture',
        type: 'diagram',
        title: 'Access decision architecture',
        description:
          'The diagram separates active hardware and backend components from the planned camera path.',
        source: '#architecture',
        alt: 'RFID card through ESP32 and Go API to lock and Telegram flow',
      },
    ],
    currentState:
      'Active prototype. Card reading, backend verification, database integration, relay control, and notifications form the working direction; camera capture remains planned.',
    lessons: [
      'Physical access systems need explicit failure behavior, not only a successful happy path.',
      'A card UID should not be presented as stronger authentication than it is.',
      'Separating notification from authorization keeps external service failure from deciding access.',
      'Planned hardware should remain visibly distinct from active components.',
    ],
  },
  {
    id: 'school-cloud-service',
    slug: 'school-cloud-service',
    index: 3,
    title: 'School Cloud Service',
    shortDescription:
      'Self-hosted collaboration service operated behind a reverse proxy and secure tunnel.',
    outcome:
      'A self-hosted collaboration path exposed through a managed tunnel without opening direct inbound router ports.',
    category: 'Infrastructure',
    role: ['System Administration'],
    stack: [
      'Ubuntu Server',
      'Nextcloud',
      'Apache',
      'Nginx',
      'Cloudflare Tunnel',
    ],
    status: 'maintained',
    documentationLevel: 'case-study',
    accent: 'infrastructure',
    featured: true,
    caseStudyAvailable: true,
    environment: [
      'School Linux server',
      'Self-hosted collaboration',
      'Public service domain',
    ],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'A school collaboration service under local operational control',
        paragraphs: [
          'The service provides a self-hosted Nextcloud environment on Ubuntu Server for collaboration and file access.',
          'External access is routed through a managed domain and Cloudflare Tunnel while the application remains behind local web-server boundaries.',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Problem',
        title: 'Publish a useful service without exposing the server directly',
        paragraphs: [
          'The application needed a stable public route, TLS termination, and correct forwarded-host behavior without direct inbound port forwarding at the router.',
          'Nextcloud also needs trusted domain and proxy settings that match the actual request path or it will reject or misinterpret requests.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'Tunnel, reverse proxy, origin server, and application',
        paragraphs: [
          'Cloudflare Tunnel brings requests to Nginx, which provides the reverse-proxy boundary. Apache remains the Nextcloud origin server behind that boundary.',
          'Trusted proxy and domain configuration aligns Nextcloud with the public host, while UFW and Fail2ban reduce unnecessary host exposure and repeated authentication abuse.',
        ],
      },
    ],
    ownership: {
      owned: [
        'Ubuntu Server administration',
        'Nextcloud deployment and maintenance',
        'Nginx reverse-proxy configuration',
        'Cloudflare Tunnel service route',
        'Host firewall and abuse controls',
      ],
      contributed: [
        'Public domain routing',
        'Service troubleshooting',
        'Trusted proxy and domain alignment',
      ],
      boundaries: [
        'The service depends on the external tunnel for public reachability.',
        'User and storage policy details are intentionally not published.',
      ],
    },
    architecture: {
      title: 'Public request path',
      summary:
        'Requests enter through Cloudflare Tunnel, pass Nginx, and reach the Apache-hosted Nextcloud application and storage.',
      nodes: [
        {
          id: 'user',
          label: 'User',
          type: 'client',
          description: 'Accesses the school collaboration domain.',
          x: 18,
          y: 140,
          status: 'active',
        },
        {
          id: 'cloudflare',
          label: 'CF Tunnel',
          type: 'network',
          description:
            'Carries public traffic to the server without direct inbound port forwarding.',
          technology: 'Cloudflare Tunnel',
          x: 158,
          y: 140,
          status: 'active',
        },
        {
          id: 'nginx',
          label: 'Nginx',
          type: 'proxy',
          description:
            'Receives tunneled traffic and routes it to the origin service.',
          technology: 'Nginx',
          x: 305,
          y: 140,
          status: 'active',
        },
        {
          id: 'apache',
          label: 'Apache',
          type: 'service',
          description: 'Serves the local Nextcloud origin.',
          technology: 'Apache HTTP Server',
          x: 452,
          y: 140,
          status: 'active',
        },
        {
          id: 'nextcloud',
          label: 'Nextcloud',
          type: 'service',
          description:
            'Provides collaboration and file-service application features.',
          technology: 'Nextcloud',
          x: 598,
          y: 90,
          status: 'active',
        },
        {
          id: 'storage',
          label: 'Storage',
          type: 'storage',
          description: 'Holds application and user file data.',
          x: 598,
          y: 225,
          status: 'active',
        },
      ],
      edges: [
        {
          id: 'user-cloudflare',
          source: 'user',
          target: 'cloudflare',
          protocol: 'HTTPS',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'cloudflare-nginx',
          source: 'cloudflare',
          target: 'nginx',
          label: 'tunnel',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'nginx-apache',
          source: 'nginx',
          target: 'apache',
          protocol: 'HTTP',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'apache-nextcloud',
          source: 'apache',
          target: 'nextcloud',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'nextcloud-storage',
          source: 'nextcloud',
          target: 'storage',
          direction: 'bidirectional',
        },
      ],
    },
    decisions: [
      {
        title: 'Use Cloudflare Tunnel instead of direct port exposure',
        why: 'The service needed external access without opening inbound router ports.',
        tradeOff:
          'Public reachability now depends on the tunnel service and its local connector.',
      },
      {
        title: 'Keep Nginx in front of the Apache origin',
        why: 'Nginx provides a clear routing boundary while Apache continues to serve Nextcloud.',
        tradeOff:
          'Forwarded headers, trusted proxies, and host settings must stay aligned across both layers.',
      },
      {
        title: 'Add host-level UFW and Fail2ban controls',
        why: 'The Linux host should expose only required services and respond to repeated authentication abuse.',
        tradeOff:
          'Firewall and ban rules require maintenance to avoid blocking legitimate administration.',
      },
    ],
    timeline: [
      {
        title: 'Collaboration need identified',
        description:
          'A self-hosted platform was selected for school file and collaboration use.',
        state: 'milestone',
      },
      {
        title: 'Nextcloud origin deployed',
        description:
          'Ubuntu Server, Apache, and Nextcloud formed the local service.',
        state: 'milestone',
      },
      {
        title: 'Proxy trust mismatch resolved',
        description:
          'Trusted domain and proxy settings were aligned with the external request path.',
        state: 'issue',
      },
      {
        title: 'Tunnel and Nginx route established',
        description:
          'The service became reachable without direct inbound router exposure.',
        state: 'milestone',
      },
      {
        title: 'Maintained service',
        description:
          'Updates, logs, firewall policy, and availability remain operational responsibilities.',
        state: 'current',
      },
    ],
    operations: [
      { label: 'Host', value: 'Ubuntu Server' },
      { label: 'Application', value: 'Nextcloud on Apache' },
      { label: 'Ingress', value: 'Cloudflare Tunnel and Nginx' },
      { label: 'Host firewall', value: 'UFW' },
      { label: 'Abuse response', value: 'Fail2ban' },
    ],
    security: [
      {
        label: 'Network exposure',
        value: 'Public access uses a tunnel instead of direct inbound ports.',
      },
      {
        label: 'Application trust',
        value:
          'Nextcloud trusted domains and proxies match the deployed request path.',
      },
      {
        label: 'Host boundary',
        value: 'UFW limits service exposure on Ubuntu Server.',
      },
      {
        label: 'Authentication abuse',
        value: 'Fail2ban responds to repeated failed authentication patterns.',
      },
    ],
    evidence: [
      {
        id: 'school-cloud-architecture',
        type: 'diagram',
        title: 'Tunnel and reverse-proxy architecture',
        description:
          'The diagram documents the complete public request path without exposing host addresses or credentials.',
        source: '#architecture',
        alt: 'User through Cloudflare Tunnel and Nginx to Apache Nextcloud flow',
        redacted: true,
      },
    ],
    currentState:
      'Maintained. The Ubuntu, Nextcloud, Apache, Nginx, and Cloudflare Tunnel path is operated as a self-hosted school service.',
    lessons: [
      'Reverse-proxy trust settings are part of application correctness, not optional polish.',
      'A tunnel reduces direct exposure but introduces an external availability dependency.',
      'Layered web servers need a clearly documented request and header path.',
      'Host firewall and abuse controls remain ongoing operational work.',
    ],
  },
  {
    id: 'monitoring-stack',
    slug: 'monitoring-stack',
    index: 4,
    title: 'Monitoring Stack',
    shortDescription:
      'Linux infrastructure metrics collection and operational dashboards for school and lab systems.',
    outcome:
      'A practical metrics path that turns Linux host data into dashboards for operational inspection.',
    category: 'Observability',
    role: ['Infrastructure', 'Monitoring'],
    stack: ['Prometheus', 'Grafana', 'Node Exporter'],
    status: 'maintained',
    documentationLevel: 'quick-brief',
    accent: 'observability',
    caseStudyAvailable: true,
    environment: ['School monitoring', 'Linux servers', 'Home lab'],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'Make infrastructure state visible before troubleshooting',
        paragraphs: [
          'The monitoring stack collects Linux host metrics and presents them in Grafana so resource behavior can be inspected over time instead of inferred from a single command.',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Goal',
        title: 'Create a small, understandable metrics flow',
        paragraphs: [
          'Operators need enough history to compare CPU, memory, storage, and host availability while keeping the deployment simple enough to maintain.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'Exporter, collector, and dashboard',
        paragraphs: [
          'Node Exporter exposes host metrics, Prometheus collects the time series, and Grafana turns those metrics into operational dashboards.',
        ],
      },
    ],
    ownership: {
      owned: [
        'Prometheus metrics collection',
        'Node Exporter host integration',
        'Grafana dashboard setup',
      ],
      contributed: [
        'Metric selection',
        'Linux host troubleshooting',
        'Dashboard interpretation',
      ],
      boundaries: [
        'This brief does not claim a full alert-management or incident-response platform.',
      ],
    },
    architecture: {
      title: 'Metrics flow',
      summary:
        'Linux host metrics move through Node Exporter and Prometheus before being visualized in Grafana.',
      nodes: [
        {
          id: 'host',
          label: 'Linux Host',
          type: 'service',
          description: 'Produces the operating-system metrics being observed.',
          x: 35,
          y: 140,
          status: 'active',
        },
        {
          id: 'exporter',
          label: 'Node Exporter',
          type: 'monitoring',
          description: 'Exposes Linux host metrics for collection.',
          technology: 'Node Exporter',
          x: 210,
          y: 140,
          status: 'active',
        },
        {
          id: 'prometheus',
          label: 'Prometheus',
          type: 'monitoring',
          description: 'Scrapes and stores time-series metrics.',
          technology: 'Prometheus',
          x: 390,
          y: 140,
          status: 'active',
        },
        {
          id: 'grafana',
          label: 'Grafana',
          type: 'monitoring',
          description: 'Builds dashboards from the collected metrics.',
          technology: 'Grafana',
          x: 570,
          y: 140,
          status: 'active',
        },
      ],
      edges: [
        {
          id: 'host-exporter',
          source: 'host',
          target: 'exporter',
          direction: 'forward',
        },
        {
          id: 'exporter-prometheus',
          source: 'exporter',
          target: 'prometheus',
          protocol: 'HTTP scrape',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'prometheus-grafana',
          source: 'prometheus',
          target: 'grafana',
          direction: 'forward',
          animated: true,
        },
      ],
    },
    decisions: [
      {
        title: 'Use the Prometheus exporter model',
        why: 'It keeps Linux host collection visible and easy to inspect.',
        tradeOff:
          'Scrape targets and retention still need deliberate maintenance.',
      },
      {
        title: 'Keep visualization separate from collection',
        why: 'Grafana can change dashboards without changing how Prometheus stores metrics.',
        tradeOff:
          'The two services create separate configuration and availability responsibilities.',
      },
    ],
    timeline: [
      {
        title: 'Monitoring goal defined',
        description:
          'Host visibility was prioritized around resource and availability metrics.',
        state: 'milestone',
      },
      {
        title: 'Exporter and collector connected',
        description: 'Node Exporter targets were added to Prometheus.',
        state: 'milestone',
      },
      {
        title: 'Dashboards created',
        description:
          'Grafana became the operator-facing view of the collected data.',
        state: 'milestone',
      },
      {
        title: 'Maintained and refined',
        description:
          'Metric selection and dashboards continue to change with operational needs.',
        state: 'current',
      },
    ],
    operations: [
      { label: 'Collection', value: 'Prometheus scrape targets' },
      { label: 'Host metrics', value: 'Node Exporter' },
      { label: 'Visualization', value: 'Grafana dashboards' },
      {
        label: 'Purpose',
        value: 'Resource history and troubleshooting context',
      },
    ],
    security: [
      {
        label: 'Exposure',
        value:
          'Monitoring endpoints should remain limited to the infrastructure that needs them.',
      },
      {
        label: 'Published evidence',
        value:
          'Screenshots and target details are withheld until host identifiers can be sanitized.',
      },
    ],
    evidence: [
      {
        id: 'monitoring-architecture',
        type: 'diagram',
        title: 'Metrics collection path',
        description:
          'The diagram shows exporter, collector, and visualization responsibilities.',
        source: '#architecture',
        alt: 'Linux host to Node Exporter to Prometheus to Grafana flow',
      },
    ],
    currentState:
      'Maintained. Prometheus, Node Exporter, and Grafana provide the current monitoring path; alerting depth is not claimed in this brief.',
    lessons: [
      'A dashboard is useful only when the underlying metric and its operational question are clear.',
      'Collection, storage, and visualization are separate failure domains.',
      'Monitoring evidence needs redaction before public publication.',
    ],
  },
  {
    id: 'recon-engine',
    slug: 'recon-engine',
    index: 5,
    title: 'Recon Engine',
    shortDescription:
      'Automation workflow for scoped asset discovery, HTTP validation, crawling, and security checks.',
    outcome:
      'A repeatable authorized-recon workflow that preserves scope, separates stages, and keeps automated findings ready for manual validation.',
    category: 'Security',
    role: ['Security Automation'],
    stack: ['Node.js', 'Bash', 'Subfinder', 'httpx', 'Nuclei', 'Katana'],
    status: 'experimental',
    documentationLevel: 'case-study',
    accent: 'security',
    caseStudyAvailable: true,
    environment: [
      'Authorized security research',
      'Controlled labs',
      'Linux workstation',
    ],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'Make scoped reconnaissance repeatable and reviewable',
        paragraphs: [
          'The workflow coordinates passive discovery, DNS resolution, HTTP validation, crawling, port discovery, and template-based checks for authorized targets.',
          'Each stage keeps its own output so a result can be traced back instead of disappearing into one unstructured terminal stream.',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Problem',
        title: 'Automation can amplify noise as easily as evidence',
        paragraphs: [
          'Recon tools overlap, produce duplicates, and may return stale or false-positive results. Scope mistakes are also more serious when automation fans out across many commands.',
          'The workflow therefore treats scope, normalization, validation, and output organization as first-class steps.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'A staged pipeline with validation between tools',
        paragraphs: [
          'Subfinder, Assetfinder, and Amass provide discovery input. dnsx and httpx validate reachable assets before Katana, gau, waybackurls, Naabu, and Nuclei add endpoint, port, and check data.',
          'Node.js and Bash coordinate the stages. Findings remain candidates until evidence is reproduced and manually assessed.',
        ],
      },
    ],
    ownership: {
      owned: [
        'Recon workflow orchestration',
        'Tool-stage organization',
        'Output normalization',
        'Validation and false-positive review process',
      ],
      contributed: [
        'Authorized bug-bounty research',
        'Controlled lab verification',
        'Telegram workflow notifications',
      ],
      boundaries: [
        'Only explicitly authorized targets and labs belong in the workflow.',
        'Active target details, credentials, and sensitive evidence are not published.',
      ],
    },
    architecture: {
      title: 'Scoped reconnaissance pipeline',
      summary:
        'Scope enters discovery, resolution, and live-host validation before branching into endpoint, port, and security-check stages.',
      nodes: [
        {
          id: 'scope',
          label: 'Scope Input',
          type: 'security',
          description:
            'Defines the authorized domains and boundaries for the run.',
          x: 20,
          y: 140,
          status: 'active',
        },
        {
          id: 'discovery',
          label: 'Discovery',
          type: 'service',
          description:
            'Combines passive subdomain sources before deduplication.',
          technology: 'Subfinder / Amass',
          x: 165,
          y: 140,
          status: 'active',
        },
        {
          id: 'dns',
          label: 'DNS Validate',
          type: 'network',
          description: 'Resolves discovered names and removes invalid assets.',
          technology: 'dnsx',
          x: 310,
          y: 140,
          status: 'active',
        },
        {
          id: 'http',
          label: 'HTTP Probe',
          type: 'service',
          description:
            'Identifies live web services and records response metadata.',
          technology: 'httpx',
          x: 455,
          y: 140,
          status: 'active',
        },
        {
          id: 'urls',
          label: 'URLs / Crawl',
          type: 'service',
          description: 'Collects current and historical endpoints for review.',
          technology: 'Katana / gau',
          x: 600,
          y: 55,
          status: 'active',
        },
        {
          id: 'ports',
          label: 'Port Check',
          type: 'network',
          description: 'Adds scoped port-discovery context.',
          technology: 'Naabu',
          x: 600,
          y: 150,
          status: 'active',
        },
        {
          id: 'checks',
          label: 'Checks',
          type: 'security',
          description:
            'Runs selected templates; every result still requires validation.',
          technology: 'Nuclei',
          x: 600,
          y: 245,
          status: 'active',
        },
      ],
      edges: [
        {
          id: 'scope-discovery',
          source: 'scope',
          target: 'discovery',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'discovery-dns',
          source: 'discovery',
          target: 'dns',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'dns-http',
          source: 'dns',
          target: 'http',
          direction: 'forward',
          animated: true,
        },
        {
          id: 'http-urls',
          source: 'http',
          target: 'urls',
          direction: 'forward',
        },
        {
          id: 'http-ports',
          source: 'http',
          target: 'ports',
          direction: 'forward',
        },
        {
          id: 'http-checks',
          source: 'http',
          target: 'checks',
          direction: 'forward',
        },
      ],
    },
    decisions: [
      {
        title: 'Validate between discovery stages',
        why: 'Passive discovery output may be stale, duplicated, or non-resolving.',
        tradeOff: 'Extra validation adds runtime but reduces downstream noise.',
      },
      {
        title: 'Keep stage outputs separate',
        why: 'A finding should retain provenance and be reproducible without rerunning the entire pipeline.',
        tradeOff:
          'The workflow creates more artifacts that must be named, sanitized, and cleaned up.',
      },
      {
        title: 'Treat automated checks as leads',
        why: 'Template matches and takeover checks can produce false positives.',
        tradeOff:
          'Manual reproduction limits speed but protects report quality.',
      },
    ],
    timeline: [
      {
        title: 'Manual workflow mapped',
        description:
          'Repeated discovery and validation commands were separated into stages.',
        state: 'milestone',
      },
      {
        title: 'Passive discovery combined',
        description: 'Multiple sources improved coverage before deduplication.',
        state: 'milestone',
      },
      {
        title: 'Validation gates added',
        description:
          'DNS and HTTP checks reduced stale assets entering later stages.',
        state: 'milestone',
      },
      {
        title: 'False-positive handling tightened',
        description:
          'Automated output is kept as a lead until manual evidence confirms it.',
        state: 'issue',
      },
      {
        title: 'Experimental active workflow',
        description:
          'Output structure and tool selection continue to be refined in authorized contexts.',
        state: 'current',
      },
    ],
    operations: [
      { label: 'Orchestration', value: 'Node.js and Bash' },
      {
        label: 'Discovery',
        value: 'Subfinder, Assetfinder, and Amass',
      },
      { label: 'Validation', value: 'dnsx and httpx' },
      {
        label: 'Expansion',
        value: 'Katana, gau, waybackurls, and Naabu',
      },
      {
        label: 'Checks',
        value: 'Selected Nuclei templates with manual review',
      },
    ],
    security: [
      {
        label: 'Authorization',
        value:
          'The workflow is limited to explicit program scope and controlled labs.',
      },
      {
        label: 'Scope boundary',
        value:
          'Input scope is preserved as the first pipeline stage before tools fan out.',
      },
      {
        label: 'Evidence',
        value:
          'Findings are manually reproduced and sanitized before reporting.',
      },
      {
        label: 'Publication',
        value:
          'Target details, credentials, and sensitive output are intentionally excluded.',
      },
    ],
    evidence: [
      {
        id: 'recon-architecture',
        type: 'diagram',
        title: 'Sanitized workflow map',
        description:
          'The public diagram documents tool responsibilities without exposing a target or result.',
        source: '#architecture',
        alt: 'Scope through discovery, DNS, HTTP, URL, port, and security checks',
        redacted: true,
      },
    ],
    currentState:
      'Experimental and active in authorized contexts. The workflow organizes reconnaissance stages; every security result remains subject to manual validation.',
    lessons: [
      'Scope handling is a pipeline control, not a note added after execution.',
      'Validation between tools reduces both noise and wasted runtime.',
      'Output provenance makes findings easier to reproduce and sanitize.',
      'Automation can prioritize evidence but cannot decide impact by itself.',
    ],
  },
  {
    id: 'school-network-operations',
    slug: 'school-network-operations',
    index: 6,
    title: 'School Network Operations',
    shortDescription:
      'Ongoing wireless monitoring, segmentation, switching, and connectivity troubleshooting.',
    outcome:
      'An operational view of a multi-building school network across managed wireless, switching, VLANs, and routing boundaries.',
    category: 'Networking',
    role: ['Network Operations'],
    stack: [
      'TP-Link Omada',
      'MikroTik RouterOS',
      'Cisco IOS',
      'VLAN',
      'TCP/IP',
    ],
    status: 'ongoing',
    documentationLevel: 'quick-brief',
    accent: 'networking',
    caseStudyAvailable: true,
    environment: [
      'Multi-building school network',
      'Managed wireless',
      'Layer 2 switching and routing boundary',
    ],
    sections: [
      {
        id: 'context',
        eyebrow: 'Context',
        title: 'Operate connectivity across buildings and device roles',
        paragraphs: [
          'The school network includes managed Omada access points, Cisco switching, MikroTik routing boundaries, infrastructure services, and many client devices.',
          'Troubleshooting requires following a connection across wireless, VLAN, switching, addressing, DNS, and upstream routing layers.',
        ],
      },
      {
        id: 'problem',
        eyebrow: 'Constraints',
        title: 'Visibility and permissions vary across the network',
        paragraphs: [
          'Multi-building placement, client density, VLAN boundaries, and limited administrative permissions mean a symptom cannot be treated as proof of one failing device.',
          'The operating approach uses controller state, switch interfaces, IP configuration, and service checks to narrow the fault domain.',
        ],
      },
      {
        id: 'build',
        eyebrow: 'Operations',
        title: 'A layered troubleshooting path',
        paragraphs: [
          'Omada provides wireless and access-point visibility. Cisco IOS supports interface and VLAN inspection, while MikroTik defines routing and firewall boundaries.',
          'TCP/IP, DHCP, and DNS checks connect infrastructure state to the experience seen by a client.',
        ],
      },
    ],
    ownership: {
      owned: [
        'Wireless monitoring and first-line troubleshooting',
        'Connectivity diagnosis',
        'VLAN planning and documentation contributions',
      ],
      contributed: [
        'Omada controller operations',
        'Cisco switch inspection and configuration support',
        'MikroTik boundary analysis',
      ],
      boundaries: [
        'Administrative permissions are limited by school ownership and role.',
        'Changes outside the granted boundary require coordination and approval.',
      ],
    },
    architecture: {
      title: 'Network path and operational boundaries',
      summary:
        'Client traffic crosses managed wireless, switching, VLAN, and MikroTik boundaries before reaching school services or the internet.',
      nodes: [
        {
          id: 'clients',
          label: 'Clients',
          type: 'client',
          description:
            'Student, staff, and managed devices using school connectivity.',
          x: 20,
          y: 140,
          status: 'active',
        },
        {
          id: 'omada',
          label: 'Omada APs',
          type: 'network',
          description:
            'Managed wireless access points distributed across buildings.',
          technology: 'TP-Link Omada',
          x: 165,
          y: 140,
          status: 'active',
        },
        {
          id: 'switch',
          label: 'Cisco Switch',
          type: 'network',
          description:
            'Provides Layer 2 interfaces, trunks, and VLAN connectivity.',
          technology: 'Cisco IOS',
          x: 315,
          y: 140,
          status: 'active',
        },
        {
          id: 'vlans',
          label: 'VLAN Zones',
          type: 'security',
          description:
            'Separates infrastructure, access points, services, and clients.',
          technology: 'VLAN',
          x: 465,
          y: 140,
          status: 'active',
        },
        {
          id: 'mikrotik',
          label: 'MikroTik',
          type: 'network',
          description:
            'Forms the routing and firewall boundary between network zones.',
          technology: 'RouterOS',
          x: 615,
          y: 80,
          status: 'active',
        },
        {
          id: 'services',
          label: 'Services',
          type: 'service',
          description:
            'School infrastructure services reached through the appropriate zone.',
          x: 615,
          y: 225,
          status: 'active',
        },
      ],
      edges: [
        {
          id: 'clients-omada',
          source: 'clients',
          target: 'omada',
          protocol: 'Wi-Fi',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'omada-switch',
          source: 'omada',
          target: 'switch',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'switch-vlans',
          source: 'switch',
          target: 'vlans',
          label: 'tagged / access',
          direction: 'bidirectional',
          animated: true,
        },
        {
          id: 'vlans-mikrotik',
          source: 'vlans',
          target: 'mikrotik',
          direction: 'bidirectional',
        },
        {
          id: 'vlans-services',
          source: 'vlans',
          target: 'services',
          direction: 'bidirectional',
        },
      ],
    },
    decisions: [
      {
        title: 'Troubleshoot by layer and boundary',
        why: 'A client symptom can originate in wireless, switching, addressing, DNS, or routing.',
        tradeOff:
          'Layered checks take discipline but prevent premature device replacement or configuration changes.',
      },
      {
        title: 'Use VLANs to express operational zones',
        why: 'Infrastructure, access points, services, and clients need understandable boundaries.',
        tradeOff:
          'Trunks, access ports, DHCP, and routing must remain consistent across devices.',
      },
      {
        title: 'Respect the permission boundary',
        why: 'The network is school infrastructure with shared ownership and controlled administrative access.',
        tradeOff:
          'Some fixes require escalation instead of immediate direct change.',
      },
    ],
    timeline: [
      {
        title: 'Environment mapped',
        description:
          'Access points, switches, routing boundaries, and service zones were identified.',
        state: 'milestone',
      },
      {
        title: 'Controller monitoring adopted',
        description:
          'Omada became a primary source for wireless and access-point state.',
        state: 'milestone',
      },
      {
        title: 'Layered troubleshooting refined',
        description:
          'Switch, VLAN, addressing, DNS, and routing checks were connected into one process.',
        state: 'milestone',
      },
      {
        title: 'Permission constraints documented',
        description:
          'Changes outside the granted role are escalated instead of bypassed.',
        state: 'issue',
      },
      {
        title: 'Ongoing operations',
        description:
          'Wireless visibility, connectivity incidents, and segmentation planning continue.',
        state: 'current',
      },
    ],
    operations: [
      {
        label: 'Wireless',
        value: 'TP-Link Omada controller and access points',
      },
      { label: 'Switching', value: 'Cisco IOS and Catalyst 3560 context' },
      { label: 'Boundary', value: 'MikroTik RouterOS' },
      { label: 'Segmentation', value: 'VLAN planning and validation' },
      {
        label: 'Diagnosis',
        value: 'TCP/IP, DHCP, DNS, interface, and client-path checks',
      },
    ],
    security: [
      {
        label: 'Segmentation',
        value:
          'VLANs separate infrastructure, access points, services, and client environments.',
      },
      {
        label: 'Change control',
        value:
          'Configuration changes follow the permissions available to the school role.',
      },
      {
        label: 'Published evidence',
        value:
          'Addresses, credentials, and internal topology details are omitted from the public diagram.',
      },
    ],
    evidence: [
      {
        id: 'school-network-architecture',
        type: 'diagram',
        title: 'Sanitized network path',
        description:
          'The diagram shows operational layers while withholding internal addresses and sensitive device details.',
        source: '#architecture',
        alt: 'Clients through Omada, Cisco switch, VLAN, MikroTik, and school services',
        redacted: true,
      },
    ],
    currentState:
      'Ongoing operations. Wireless monitoring, connectivity diagnosis, and segmentation work continue within the permissions granted by the school environment.',
    lessons: [
      'A client symptom should be traced across layers before changing infrastructure.',
      'VLAN design is only useful when switch, DHCP, routing, and documentation agree.',
      'Controller visibility accelerates diagnosis but does not replace physical and protocol checks.',
      'Permission boundaries are part of responsible network operations.',
    ],
  },
];

export const FEATURED_WORK = WORK_ITEMS.filter((item) => item.featured);

export const getWorkBySlug = (slug: string) =>
  WORK_ITEMS.find((item) => item.slug === slug);
