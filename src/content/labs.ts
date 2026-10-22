export const practiceLabs = [
  {
    id: "docker-local",
    title: "En webserver på localhost",
    description: "Start en container, undersøg portmapping, og luk den igen.",
    lesson: "docker-og-labmiljoe",
    requirements: "Docker med Compose. Brug en ny mappe til øvelsen.",
    steps: [
      {
        title: "Skriv konfigurationen",
        text: "Gem følgende som compose.yaml i en ny mappe. Port 8080 på loopback forbindes med port 80 i containeren.",
        code: 'services:\n  web:\n    image: nginx:stable-alpine\n    ports:\n      - "127.0.0.1:8080:80"',
      },
      {
        title: "Start og undersøg",
        text: "Kør kommandoerne i mappen. Åbn http://127.0.0.1:8080. Du bør se Nginx' velkomstside. Image-download kræver internet, og tagget kan ændre sig over tid.",
        code: "docker compose up -d\ndocker compose ps\ncurl http://127.0.0.1:8080",
      },
      {
        title: "Forklar og ryd op",
        text: "Hvorfor skriver browseren 8080, når webserveren lytter på 80? Compose oversætter mellem værtens og containerens porte. Luk øvelsen; siden bør derefter være utilgængelig.",
        code: "docker compose down",
      },
    ],
    reflection:
      "Forklar forskellen mellem image og container, og hvilken adresse porten er bundet til.",
  },
  {
    id: "pcap-reading",
    title: "Læs en optagelse som et bevis",
    description:
      "Lav en begrundet observation i Wireshark uden at gætte på manglende trafik.",
    lesson: "wireshark-og-beviser",
    requirements:
      "Wireshark og en af undervisningens PCAP-filer, som du har tilladelse til at undersøge. Filerne uploades ikke her.",
    steps: [
      {
        title: "Beskriv optagelsen",
        text: "Notér filnavn, tidsrum og kendt optagepunkt. Bevar originalfilen. Notér hvilke oplysninger du ikke har.",
      },
      {
        title: "Undersøg ét spørgsmål",
        text: "Vælg eksempelvis: Hvem spørger efter en IPv4-adresses MAC? Brug displayfilteret arp. Find operation, sender IP/MAC og target IP. Skriv frame-nummer og tidspunkt, så observationen kan efterprøves.",
        code: "arp",
      },
      {
        title: "Afgræns konklusionen",
        text: "Et ARP-request viser en forespørgsel, ikke i sig selv et angreb. Et svar kan underbygge en adressekobling på optagetidspunktet. Undersøg modstridende svar og kontekst, før du foreslår en årsag. Manglende svar kan også skyldes optagepunkt eller tab.",
      },
    ],
    reflection:
      "Skriv tre linjer: observation med frame-nummer, fortolkning, og en alternativ forklaring.",
  },
  {
    id: "vlan-observation",
    title: "Følg en untagged ramme",
    description:
      "Undersøg hvorfor to ender af et link kan placere samme ramme i forskellige VLAN.",
    lesson: "vlan-og-trunks",
    requirements:
      "Papir og blyant. Modellen her beskriver ingressklassifikation; den kører ingen netværkskommandoer.",
    steps: [
      {
        title: "Tegn linket",
        text: "Tegn switch A og B med et link imellem. Antag, at medlemskab tillader trafikken, og at A sender VLAN 20 untagged over linket.",
      },
      {
        title: "Følg modtagelsen",
        text: "Sæt PVID på B til 30. Rammen har intet VLAN-tag, når den ankommer. B klassificerer den derfor i VLAN 30. A's interne VLAN-nummer følger ikke automatisk med en untagged ramme.",
      },
      {
        title: "Ret én antagelse",
        text: "Lad A sende tag 20, og lad B acceptere VLAN 20 på linket. Nu bevares VLAN-identiteten via tagget. Alternativt skal untagged/native konfigurationen være konsistent. Kontrollér både medlemskab, ingress og egress.",
      },
    ],
    reflection:
      "Hvorfor er PVID og egress-tagging to forskellige indstillinger? Tegn begge retninger.",
  },
];
