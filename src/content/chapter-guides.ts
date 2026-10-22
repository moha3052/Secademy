export const chapterGuides: Record<
  string,
  { intro: string; terms: [string, string][] }[]
> = {
  "system-security": [
    {
      intro:
        "Start her: Lær, hvad vi beskytter, og hvorfor. Du behøver ingen teknisk erfaring.",
      terms: [
        [
          "Fortrolighed",
          "Kun de personer, der har lov, skal kunne læse oplysningerne.",
        ],
        [
          "Integritet",
          "Oplysninger skal være korrekte og beskyttet mod uønskede ændringer.",
        ],
        [
          "Tilgængelighed",
          "Du skal kunne bruge oplysninger og systemer, når du har brug for dem.",
        ],
      ],
    },
    {
      intro:
        "Lær at omsætte en sikkerhedsregel til noget, du kan gøre og kontrollere i praksis.",
      terms: [
        [
          "Politik",
          "En regel om, hvad der skal beskyttes, og hvem der har ansvaret.",
        ],
        [
          "Hash",
          "Et digitalt fingeraftryk, der kan bruges til at opdage ændringer i en fil.",
        ],
        [
          "Kryptering",
          "En måde at gøre data ulæselige uden den rigtige nøgle.",
        ],
      ],
    },
    {
      intro:
        "Forstå forskellen på en almindelig bruger og en administrator, før du ændrer et system.",
      terms: [
        [
          "Linux",
          "Et operativsystem, som blandt andet bruges på mange servere.",
        ],
        ["root", "Linux-kontoen med meget omfattende adgang til systemet."],
        [
          "sudo",
          "En kommando, der kan give tilladelse til at udføre en opgave som en anden bruger, ofte administratoren.",
        ],
      ],
    },
    {
      intro:
        "Følg et angreb trin for trin, og se, hvor et forsvar kan stoppe det.",
      terms: [
        ["Sårbarhed", "En svaghed i et system, som kan udnyttes."],
        [
          "Angrebsflade",
          "De steder, hvor nogen kan forsøge at påvirke et system, for eksempel en åben netværkstjeneste.",
        ],
      ],
    },
    {
      intro:
        "Find ud af, hvem der må læse, ændre eller køre en fil. Start med de almindelige filrettigheder.",
      terms: [
        [
          "chmod",
          "En Linux-kommando, der ændrer en fils almindelige adgangsrettigheder.",
        ],
        [
          "RBAC",
          "Adgang efter rolle: En medarbejders opgaver bestemmer, hvilke rettigheder rollen får.",
        ],
        [
          "ACL",
          "En adgangsliste, som kan give bestemte brugere og grupper mere detaljerede rettigheder.",
        ],
      ],
    },
    {
      intro:
        "Lær, hvordan et system kontrollerer, hvem du er, og hvordan du beskytter en konto.",
      terms: [
        [
          "Autentifikation",
          "Kontrol af de legitimationsmidler, du bruger til at logge ind.",
        ],
        [
          "MFA",
          "Login med flere forskellige faktortyper, for eksempel en adgangskode og en sikkerhedsnøgle.",
        ],
        [
          "PAM",
          "Et system af moduler, som Linux-tjenester kan bruge til blandt andet login og kontokontrol.",
        ],
      ],
    },
  ],
  "network-security": [
    {
      intro:
        "Start med at forstå, hvad der kan gå galt. Bagefter gør du et afgrænset øvelsesmiljø klar.",
      terms: [
        [
          "Trusselsmodel",
          "En oversigt over, hvad du vil beskytte, hvad der kan gå galt, og hvordan du vil håndtere det.",
        ],
        [
          "Lab",
          "Et øvelsesmiljø, hvor du kan undersøge teknikken på systemer, du må arbejde med.",
        ],
        [
          "Container",
          "Et afgrænset miljø til at køre et program og dets afhængigheder.",
        ],
      ],
    },
    {
      intro:
        "Følg data fra én computer til en anden. Du lærer adresserne at kende, før du undersøger trafikken.",
      terms: [
        [
          "IP-adresse",
          "En adresse, der bruges til at sende data mellem enheder og netværk.",
        ],
        [
          "Pakke",
          "En lille portion data med oplysninger om blandt andet afsender og modtager.",
        ],
        [
          "Wireshark",
          "Et værktøj, der viser optaget netværkstrafik, så du kan undersøge pakkerne.",
        ],
      ],
    },
    {
      intro:
        "Lær, hvordan enheder finder hinanden på det lokale netværk og får deres netværksindstillinger.",
      terms: [
        [
          "Switch",
          "En enhed, der videresender trafik mellem forbindelser i et lokalt netværk.",
        ],
        [
          "ARP",
          "En protokol, der finder den lokale MAC-adresse, som hører til en IPv4-adresse.",
        ],
        [
          "DHCP",
          "En protokol, der kan give en enhed en IP-adresse og andre netværksindstillinger.",
        ],
      ],
    },
    {
      intro:
        "Se, hvordan du opdeler et netværk, og hvorfor forbindelser i ring kan give problemer.",
      terms: [
        [
          "VLAN",
          "En logisk opdeling af et netværk i separate grupper på linklaget.",
        ],
        [
          "STP",
          "En protokol, der hjælper switches med at undgå aktive forbindelser i ring.",
        ],
        [
          "PVID",
          "Det VLAN-nummer, en port normalt tildeler indkommende trafik uden VLAN-tag.",
        ],
      ],
    },
  ],
};
