import "server-only";
export const answers: Record<
  string,
  { correct: number[]; explanations: string[] }
> = {
  "sikkerhedens-tre-soejler": {
    correct: [1, 0],
    explanations: [
      "Fortrolighed begrænser, hvem der kan læse data. Uautoriseret læsning er et brud på dette mål.",
      "En backup kan gendanne data, men skal selv beskyttes med adgangskontrol og eventuelt kryptering.",
    ],
  },
  "mindste-privilegium": {
    correct: [1, 1],
    explanations: [
      "Begrænset adgang reducerer den skade, en fejl eller kompromitteret konto kan forårsage.",
      "Undersøg fejlen først. Sudo skal kun bruges, når opgaven faktisk kræver højere rettigheder.",
    ],
  },
  "linux-filrettigheder": {
    correct: [1, 1],
    explanations: [
      "6 er læse (4) plus skrive (2) for ejeren. Nullerne fjerner gruppe- og andres adgang gennem disse bits.",
      "chmod ændrer adgangsrettigheder. Det ændrer ikke filens indhold til krypterede data.",
    ],
  },
  trusselsmodellering: {
    correct: [1, 1],
    explanations: [
      "Serveren skal validere data fra browseren, fordi browseren kontrolleres af klienten.",
      "Identiteten skal komme fra en verificeret session, og serveren skal kontrollere ejerskab.",
    ],
  },
  "netvaerkets-grundsten": {
    correct: [1, 1],
    explanations: [
      "DNS slår navne op. IP håndterer adressering og videresendelse, mens TLS beskytter forbindelsen.",
      "Et portnummer er en konvention, ikke et sikkerhedsbevis. Protokol og certifikatvalidering er afgørende.",
    ],
  },
};

Object.assign(answers, {
  sikkerhedspolitikker: {
    correct: [1, 1],
    explanations: [
      "En kontrol kan undersøges konkret. En politik angiver retningen, og proceduren beskriver trinene.",
      "Politikken angiver krav og ansvar. Proceduren beskriver, hvordan kravet gennemføres.",
    ],
  },
  "hash-og-diskkryptering": {
    correct: [2, 1],
    explanations: [
      "En angriber kan udskifte begge dele. Sammenlign med en værdi eller signatur fra en betroet kilde.",
      "Når disken er låst op, kan processer med adgang læse data. Kryptering er især relevant for data i hvile.",
    ],
  },
  "angreb-og-forsvar": {
    correct: [0, 0],
    explanations: [
      "Åbne tjenester, konti og inputfelter er eksempler på eksponerede kontaktpunkter.",
      "Et forsvar kan stoppe kæden, selv om det ikke fjerner alle andre risici.",
    ],
  },
  "rbac-og-acl": {
    correct: [1, 1],
    explanations: [
      "Masken begrænser navngivne brugere og gruppeklassens rettigheder. Skriveadgang bortfalder her.",
      "Default ACL bruges ved oprettelse af nye objekter. Eksisterende filer skal behandles særskilt.",
    ],
  },
  "konti-og-logning": {
    correct: [2, 0],
    explanations: [
      "Andre adgangsveje som SSH-nøgler og eksisterende sessioner skal vurderes særskilt.",
      "En konto kan have flere uafhængige adgangsveje. De skal alle håndteres.",
    ],
  },
  "pam-og-mfa": {
    correct: [1, 1],
    explanations: [
      "Password er noget, du ved. En sikkerhedsnøgle er noget, du har.",
      "TOTP kan phishes. Korrekt anvendt WebAuthn binder godkendelsen til tjenestens origin.",
    ],
  },
  "docker-og-labmiljoe": {
    correct: [0, 0],
    explanations: [
      "Værtsadressen begrænser den publicerede port til loopback. Det er ikke i sig selv komplet isolation.",
      "En VM har en gæstekerne; containere bruger kernel-isolation. Docker Desktop kører ofte en Linux-VM under motorhjelmen.",
    ],
  },
  trafiktyper: {
    correct: [1, 1],
    explanations: [
      "IP-destinationen kan være fjern, mens Ethernet-rammen adresserer det lokale næste hop.",
      "Snooping hjælper switchen med at begrænse multicast-forwarding. Det autentificerer ikke modtagere.",
    ],
  },
  "wireshark-og-beviser": {
    correct: [1, 1],
    explanations: [
      "Pakker fravalgt ved capture er ikke i optagelsen. Displayfilteret ændrer blot det viste udsnit.",
      "Optagepunkt, tidsrum, filter og pakkedrop kan skjule trafikken.",
    ],
  },
  "switching-og-arp": {
    correct: [1, 1],
    explanations: [
      "Switchen knytter rammens kilde-MAC til ingressport og VLAN. Destinationens MAC bruges ved videresendelse.",
      "ARP knytter IPv4-adresse til linkadresse. MAC-tabellen knytter MAC og VLAN til en switchport.",
    ],
  },
  "dhcp-og-snooping": {
    correct: [2, 1],
    explanations: [
      "DNS bruger typisk 53. DHCPv4 bruger serverport 67 og klientport 68.",
      "En link-local adresse kan skyldes, at klienten ikke fik et lease. Der er flere mulige årsager.",
    ],
  },
  "radius-og-8021x": {
    correct: [0, 0],
    explanations: [
      "Authenticator styrer netadgangen og kommunikerer med autentifikationsserveren.",
      "En kontrolflow-simulation kan illustrere roller uden at implementere rigtig 802.1X på Ethernet.",
    ],
  },
  "stp-og-loops": {
    correct: [1, 1],
    explanations: [
      "Bridge ID omfatter prioritet og identifikator. Path cost bruges efterfølgende til at vælge veje til root.",
      "BPDU Guard reagerer på BPDUs på en edge-port. Root Guard skal forhindre en port i at introducere en overlegen root.",
    ],
  },
  "vlan-og-trunks": {
    correct: [0, 1],
    explanations: [
      "PVID klassificerer normalt untagged ingress. Egress-tagging er en separat indstilling.",
      "Routing forbinder segmenterne. Firewallregler eller ACL bestemmer, hvilken trafik der tillades.",
    ],
  },
});
