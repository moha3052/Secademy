# Pensum og undervisningsmateriale

De 19 lektioner er originale danske forklaringer, organiseret efter de emner, brugeren har vedhæftet. De er læsehjælp og repetition, ikke en ordret gengivelse af slides eller et officielt facit til afleveringer.

| Vedhæftet materiale            | Emner i Secademy                                       |
| ------------------------------ | ------------------------------------------------------ |
| SystemSik_01 (1).pdf           | CIA, risiko og sikkerhedsmål                           |
| SystemSik_02.pdf               | Politik, procedure, kontrol, hash og diskkryptering    |
| SystemSik_03.pdf               | Linux-brugere, root, sudo og mindst mulige rettigheder |
| SystemSik_04_Attacks.pdf       | Angrebsflader, sårbarheder, angrebskæder og forsvar    |
| SystemSik_05_Files_ACL.pdf     | Unix-bits, RBAC, ACL-mask og default ACL               |
| SystemSik_06_User_Auth_MFA.pdf | Konti, passwordlåsning, PAM, faktorer og MFA           |
| NCS-Lecture-1.pdf              | Trusselsmodellering og labmiljø                        |
| NCS-Lecture-2.pdf              | Protokoller, adressering, trafiktyper og Wireshark     |
| NCS-Lecture-3.pdf              | Switching, ARP, DHCP, snooping og 802.1X               |
| NCS- Lecture 4 - VLANS.pdf     | STP, VLAN, PVID, tagging og segmentering               |
| docker-mini-exercise.zip       | Image/container og localhost-portmapping               |
| LAB-SETUP-FIles.zip            | Lokalt lab og afgrænsning                              |
| lecture2-lab-exercises.zip     | Wireshark-observationer og sporbare beviser            |
| lecture3-lab.zip               | Linklag og ARP/DHCP-observationer                      |
| lecture3.1-lab.zip             | Roller og afgrænsning i RADIUS/802.1X-simulationen     |
| lecture-4-lab.zip              | VLAN- og STP-observationer                             |

PDF-tekst og øvelsesbeskrivelser er gennemgået; arkivernes indhold er inspiceret. Angrebsscripts er ikke kørt. PCAP-filer er ikke analyseret, så der påstås ingen konkrete fund fra dem. Docker- og Linux-øvelserne er vejledninger; kommandoerne er ikke udført på brugerens vært som del af implementeringen.

Private udtræk ligger kun i den ignorerede mappe `.study-sources/`. Originale slides, arkiver, credentials og scripts indgår ikke i appens public-mappe eller distribution.

## Faglige præciseringer

- DHCPv4 bruger serverport UDP 67 og klientport UDP 68, ikke DNS-port 53. Reference: [RFC 2131](https://www.rfc-editor.org/rfc/rfc2131).
- PAM står for Pluggable Authentication Modules.
- En hash beviser ikke ægthed, hvis referenceværdien også er kompromitteret.
- Passwordlåsning er ikke det samme som at lukke SSH-nøgler, tokens og aktive sessioner. Reference: [passwd(1)](https://man7.org/linux/man-pages/man1/passwd.1.html).
- ACL-masken begrænser gruppeklassen; default ACL virker ved oprettelse. Reference: [acl(5)](https://man7.org/linux/man-pages/man5/acl.5.html).
- RADIUS-labbets HTTP-baserede kontrolflow er ikke en fuld implementering af EAPOL på Ethernet.
- VLAN-medlemskab, PVID og egress-tagging behandles separat.
- Password- og MFA-eksempler følger nuancerne i [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html).

Hver lektion har et konkret eksempel og to quizspørgsmål med forklaringer. De nye lektioner har desuden udfoldelige løsningsforslag. Øvelserne omfatter Linux-rettigheder, Docker på localhost, PCAP-læsning og en interaktiv VLAN-model.
