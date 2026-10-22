# Designretning — Education

Mobbin MCP er brugt til at søge efter Education-kataloger, læsevisninger, læringsdashboards og Education-sektioner. De returnerede skærmbilleder er undersøgt visuelt. MCP-søgningen har ikke et separat kategorifilter; Education er angivet i søgningerne.

Konkrete referencer:

- [Codecademy: emneinddeling](https://mobbin.com/screens/40ab902e-4567-4f3b-8ade-45d1883c2eba): hurtig adgang til fagbegreber.
- [Uxcel: kursuskatalog](https://mobbin.com/screens/35cb1f7d-b9d0-4d4a-a130-1fa4d3919e8c): illustrationer og tydeligt metadatahierarki.
- [Coursera: lektion](https://mobbin.com/screens/24efcb48-835b-4dc8-acc4-a502cff8078a): vedvarende kursusnavigation og et centralt læseområde.
- [Codecademy: læringsfremgang](https://mobbin.com/screens/597bbefb-e6cf-401c-abc6-47789b29e5b7): fremgang knyttet til emner.
- [MasterClass: kapiteloversigt](https://mobbin.com/screens/eeaba88c-51dc-44b0-8c15-cf8775b9c361): grupperede aktiviteter og tydelig rækkefølge.
- [Canva Education](https://mobbin.com/sites/sections/2b679fed-41d8-4415-b02b-db9f0cc294b8): undervisning som konkret aktivitet og visuelt indhold.

Secademy bruger sit eget layout, dansk indhold og originale SVG-diagrammer. Ingen referencebilleder er indlejret i produktet. Papirfarvet baggrund, mørk tekst, gul markering, mintgrøn og lavendel gør fag og aktiviteter genkendelige. Inter bruges til både læsning og navigationshierarki.

Forsidens rettighedsøvelse er interaktiv: ændring af r/w/x opdaterer chmod-værdien. Kursuskortene illustrerer filadgang og netværkssegmentering. Søgningen har emnegenveje. Kursus- og lektionsvisninger viser reel, lokal fremgang. Læseoversigten viser kun egne lokale resultater.

Alle hovedsider deler navigation, farver, kort, knapper og typografi. Mobilvisningen får en udfoldelig kursusoversigt. Kodeblokke kan fokuseres og scrolles med tastatur. Lyst/mørkt tema og reduceret bevægelse er understøttet.

Farvetokens og layouts ligger i `src/app/globals.css`. Skærmbilleder i `docs/screenshots` dokumenterer den implementerede version.

## Kompakt kursusoversigt

Begge fag bruger nu en kapitelvælger med fag- og kapitelikoner. Kun det valgte kapitels lektioner vises, og navigationen skifter indhold uden at hoppe ned ad siden. Desktopvisningen er kontrolleret ved 1366 × 768 uden lodret scrolling for samtlige kapitler. Mobil bruger en kompakt kapitelmenu og tillader naturlig scrolling på små skærme og ved tekstforstørrelse.

[Systemsikkerhed](screenshots/system-security-overview.png) · [Netværkssikkerhed](screenshots/network-security-overview.png)
