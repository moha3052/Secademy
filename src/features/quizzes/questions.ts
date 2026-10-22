export type Question = {
  prompt: string;
  options: string[];
  type: "multiple_choice" | "true_false";
};
export const questions: Record<string, Question[]> = {
  "sikkerhedens-tre-soejler": [
    {
      prompt:
        "En uvedkommende læser private karakterer. Hvilket mål er direkte brudt?",
      options: ["Tilgængelighed", "Fortrolighed", "Integritet"],
      type: "multiple_choice",
    },
    {
      prompt:
        "En backup kan hjælpe med tilgængelighed, men gør ikke i sig selv data fortrolige.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "mindste-privilegium": [
    {
      prompt: "Hvad betyder princippet om mindst mulige rettigheder?",
      options: [
        "Alle får administratoradgang",
        "Brugere får kun den adgang, opgaven kræver",
        "Alle filer gøres offentlige",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "Du bør automatisk bruge sudo, hver gang en kommando fejler.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "linux-filrettigheder": [
    {
      prompt:
        "Hvad giver chmod 600 secret.txt gennem de almindelige rettighedsbits?",
      options: [
        "Alle kan læse filen",
        "Ejeren kan læse og skrive; gruppe og andre har ingen adgang",
        "Kun gruppen kan skrive",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "chmod 600 krypterer indholdet af filen.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  trusselsmodellering: [
    {
      prompt: "Hvilket eksempel er en tillidsgrænse?",
      options: [
        "En overskrift skifter farve",
        "Data sendes fra browser til server",
        "To afsnit i samme dokument",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Et bruger-id fra browseren er tilstrækkeligt til at autorisere en ændring.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "netvaerkets-grundsten": [
    {
      prompt: "Hvilken opgave løser DNS?",
      options: [
        "Krypterer HTTP-indhold",
        "Slår navne op, blandt andet til IP-adresser",
        "Garanterer levering af IP-pakker",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Trafik på port 443 er altid sikker, uanset hvilken protokol der bruges.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
};

Object.assign(questions, {
  sikkerhedspolitikker: [
    {
      prompt: "Hvilken formulering er en målbar kontrol?",
      options: [
        "Vi tager sikkerhed seriøst",
        "Alle bærbare har aktiveret diskkryptering",
        "Brugerne bør være forsigtige",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "En procedure og en politik har altid samme formål.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "hash-og-diskkryptering": [
    {
      prompt:
        "En fil og dens hash kommer fra samme kompromitterede side. Hvad ved du?",
      options: [
        "Filen er ægte",
        "Filen er krypteret",
        "Et match alene beviser ikke ægtheden",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Diskkryptering beskytter automatisk mod malware, mens brugeren er logget ind.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "angreb-og-forsvar": [
    {
      prompt: "Hvad er en angrebsflade?",
      options: [
        "De steder et system kan påvirkes udefra",
        "Et bestemt CVE-nummer",
        "Kun brugerens skærm",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Opdatering af en sårbar tjeneste kan bryde et led i en angrebskæde.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "rbac-og-acl": [
    {
      prompt:
        "En navngiven gruppe har rwx, men ACL-masken er r-x. Hvad er effektivt?",
      options: ["rwx", "r-x", "---"],
      type: "multiple_choice",
    },
    {
      prompt: "En default ACL ændrer automatisk alle eksisterende filer.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "konti-og-logning": [
    {
      prompt: "Hvad gør låsning af en adgangskode typisk?",
      options: [
        "Lukker alle sessioner",
        "Tilbagekalder alle API-nøgler",
        "Blokerer adgangskodegodkendelse for kontoen",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Offboarding bør omfatte aktive sessioner og nøgler, ikke kun password.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "pam-og-mfa": [
    {
      prompt: "Hvilket par bruger to forskellige faktortyper?",
      options: [
        "Password og PIN",
        "Password og fysisk sikkerhedsnøgle",
        "To passwords",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "Alle former for MFA er lige modstandsdygtige over for phishing.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "docker-og-labmiljoe": [
    {
      prompt: "Hvad betyder portmapping 127.0.0.1:8080:80?",
      options: [
        "Kun localhost port 8080 videresendes til containerens 80",
        "Alle værtsporte åbnes",
        "Containeren bliver en virtuel maskine",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "En container deler normalt værtsmiljøets kernel frem for at have sin egen gæstekerne.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  trafiktyper: [
    {
      prompt:
        "En pakke skal til et andet subnet. Hvilken MAC bruges typisk på det lokale link?",
      options: [
        "Den endelige servers MAC",
        "Default gatewayens MAC",
        "DNS-serverens MAC",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "IGMP snooping er i sig selv en adgangskontrolpolitik.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "wireshark-og-beviser": [
    {
      prompt: "Hvad er forskellen på capture- og displayfilter?",
      options: [
        "Ingen forskel",
        "Capture begrænser indsamling; display begrænser visning",
        "Display sletter altid pakker fra filen",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Ingen synlig pakke i en optagelse beviser altid, at den aldrig blev sendt.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "switching-og-arp": [
    {
      prompt: "Hvilket felt lærer switchen normalt sin MAC-tabel fra?",
      options: ["Destinationens IP", "Kildens MAC", "UDP-porten"],
      type: "multiple_choice",
    },
    {
      prompt:
        "En ARP-tabel og en switchs MAC-tabel indeholder samme slags opslag.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "dhcp-og-snooping": [
    {
      prompt: "Hvilke UDP-porte bruger DHCPv4 normalt?",
      options: ["53 og 53", "80 og 443", "67 på serveren og 68 på klienten"],
      type: "multiple_choice",
    },
    {
      prompt: "En 169.254-adresse er alene bevis på en ondsindet DHCP-server.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "radius-og-8021x": [
    {
      prompt: "Hvem står normalt mellem supplicant og RADIUS-server?",
      options: [
        "Authenticator, fx switch eller access point",
        "DNS-resolveren",
        "En teksteditor",
      ],
      type: "multiple_choice",
    },
    {
      prompt:
        "Et lab med HTTP fra klient til authenticator simulerer ikke nødvendigvis EAPOL på linklaget.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "stp-og-loops": [
    {
      prompt: "Hvordan vælges root bridge i et simpelt STP-net?",
      options: [
        "Højeste IP vinder",
        "Laveste bridge ID vinder",
        "Flest tilsluttede klienter vinder",
      ],
      type: "multiple_choice",
    },
    {
      prompt: "BPDU Guard og Root Guard har præcis samme opgave.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
  "vlan-og-trunks": [
    {
      prompt:
        "En untagged ramme ankommer på en port med PVID 20. Hvor placeres den normalt?",
      options: ["VLAN 20", "Alle VLAN", "VLAN 1 uanset konfiguration"],
      type: "multiple_choice",
    },
    {
      prompt:
        "To VLAN er altid fuldstændigt isolerede, selv om en router frit videresender mellem dem.",
      options: ["Sandt", "Falsk"],
      type: "true_false",
    },
  ],
});
