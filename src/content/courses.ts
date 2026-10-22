export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  file: string;
  concepts: string[];
};
export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: "shield" | "network";
  objectives: string[];
  modules: { title: string; lessons: Lesson[] }[];
};
export const courses: Course[] = [
  {
    id: "system-security",
    slug: "system-security",
    title: "System Security",
    subtitle: "Et sikkert fundament starter her",
    description:
      "Forstå truslerne. Beskyt systemerne. Lær at arbejde sikkert med Linux, brugere og adgangsrettigheder.",
    duration: "105 min læsning og repetition",
    icon: "shield",
    objectives: [
      "Forstå fortrolighed, integritet og tilgængelighed",
      "Anvende princippet om mindst mulige rettigheder",
      "Læse og ændre Linux-filrettigheder",
    ],
    modules: [
      {
        title: "Introduktion til systemsikkerhed",
        lessons: [
          {
            id: "sikkerhedens-tre-soejler",
            title: "Sikkerhedens tre søjler",
            minutes: 15,
            file: "cia",
            concepts: [
              "CIA",
              "fortrolighed",
              "integritet",
              "tilgængelighed",
              "risiko",
            ],
          },
        ],
      },
      {
        title: "Sikkerhedspolitikker og systemkonfiguration",
        lessons: [
          {
            id: "sikkerhedspolitikker",
            title: "Fra politik til kontrol",
            minutes: 10,
            file: "policies",
            concepts: ["policy", "procedure", "kontrol"],
          },
          {
            id: "hash-og-diskkryptering",
            title: "Hash og diskkryptering",
            minutes: 10,
            file: "integrity",
            concepts: ["SHA256", "hash", "kryptering", "integritet"],
          },
        ],
      },
      {
        title: "Linux-brugere, root og sudo",
        lessons: [
          {
            id: "mindste-privilegium",
            title: "Giv adgang med omtanke",
            minutes: 15,
            file: "privilege",
            concepts: ["least privilege", "sudo", "root", "brugere"],
          },
        ],
      },
      {
        title: "Forstå cyberangreb",
        lessons: [
          {
            id: "angreb-og-forsvar",
            title: "Fra angrebsflade til forsvar",
            minutes: 10,
            file: "attacks",
            concepts: ["CVE", "CWE", "angreb", "Samba"],
          },
        ],
      },
      {
        title: "Filrettigheder, RBAC og ACL",
        lessons: [
          {
            id: "linux-filrettigheder",
            title: "Hvem må læse din fil?",
            minutes: 15,
            file: "permissions",
            concepts: ["chmod", "Linux", "rwx", "RBAC", "ACL"],
          },
          {
            id: "rbac-og-acl",
            title: "Roller, ACL og den skjulte mask",
            minutes: 10,
            file: "acl",
            concepts: ["RBAC", "ACL", "mask", "getfacl"],
          },
        ],
      },
      {
        title: "Autentifikation, PAM og MFA",
        lessons: [
          {
            id: "konti-og-logning",
            title: "Konti, adgang og logning",
            minutes: 10,
            file: "accounts",
            concepts: ["passwd", "nologin", "SSH", "audit"],
          },
          {
            id: "pam-og-mfa",
            title: "PAM og multifaktor",
            minutes: 10,
            file: "mfa",
            concepts: ["PAM", "MFA", "TOTP", "WebAuthn"],
          },
        ],
      },
    ],
  },
  {
    id: "network-security",
    slug: "network-security",
    title: "Network & Communications Security",
    subtitle: "Se netværket med nye øjne",
    description:
      "Følg en pakke gennem netværket, forstå tillidsgrænser, og lær at begrænse et angrebs rækkevidde.",
    duration: "110 min læsning og repetition",
    icon: "network",
    objectives: [
      "Opstille en enkel trusselsmodel",
      "Forklare IP, porte og protokoller",
      "Planlægge et isoleret øvelsesmiljø",
    ],
    modules: [
      {
        title: "Trusselsmodellering og lab-opsætning",
        lessons: [
          {
            id: "trusselsmodellering",
            title: "Tænk som en forsvarer",
            minutes: 15,
            file: "threat",
            concepts: ["trussel", "risiko", "STRIDE", "lab", "Docker"],
          },
          {
            id: "docker-og-labmiljoe",
            title: "Docker og et afgrænset lab",
            minutes: 10,
            file: "docker",
            concepts: ["Docker", "container", "VM", "compose"],
          },
        ],
      },
      {
        title: "Netværksgrundlag og Wireshark",
        lessons: [
          {
            id: "netvaerkets-grundsten",
            title: "En pakkes rejse",
            minutes: 15,
            file: "network",
            concepts: ["IP", "TCP", "DNS", "Wireshark", "porte"],
          },
          {
            id: "trafiktyper",
            title: "Hvem modtager trafikken?",
            minutes: 10,
            file: "traffic",
            concepts: [
              "unicast",
              "multicast",
              "broadcast",
              "anycast",
              "IGMP",
              "MAC",
            ],
          },
          {
            id: "wireshark-og-beviser",
            title: "Wireshark: fra pakke til bevis",
            minutes: 10,
            file: "wireshark",
            concepts: ["Wireshark", "PCAP", "filtre", "DFIR"],
          },
        ],
      },
      {
        title: "Linklaget: ARP, DHCP og switching",
        lessons: [
          {
            id: "switching-og-arp",
            title: "Switching og ARP",
            minutes: 10,
            file: "arp",
            concepts: ["ARP", "MAC", "CAM", "DAI"],
          },
          {
            id: "dhcp-og-snooping",
            title: "DHCP og snooping",
            minutes: 10,
            file: "dhcp",
            concepts: ["DHCP", "DORA", "UDP", "snooping"],
          },
          {
            id: "radius-og-8021x",
            title: "RADIUS og 802.1X",
            minutes: 10,
            file: "radius",
            concepts: ["RADIUS", "802.1X", "EAPOL"],
          },
        ],
      },
      {
        title: "VLAN, STP og netværkssegmentering",
        lessons: [
          {
            id: "stp-og-loops",
            title: "STP: et netværk uden loops",
            minutes: 10,
            file: "stp",
            concepts: ["STP", "root", "bridge", "BPDU"],
          },
          {
            id: "vlan-og-trunks",
            title: "VLAN, PVID og trunks",
            minutes: 10,
            file: "vlan",
            concepts: ["VLAN", "PVID", "trunk", "802.1Q"],
          },
        ],
      },
    ],
  },
];
export const allLessons = courses.flatMap((course) =>
  course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      course,
      moduleTitle: module.title,
    })),
  ),
);
export function getLesson(id: string) {
  return allLessons.find((l) => l.id === id);
}
export const lab = {
  id: "linux-permissions",
  title: "Linux-filrettigheder",
  commands: [
    "mkdir -p security-lab",
    "cd security-lab",
    "touch secret.txt",
    "ls -l secret.txt",
    "chmod 600 secret.txt",
    "ls -l secret.txt",
  ],
};
