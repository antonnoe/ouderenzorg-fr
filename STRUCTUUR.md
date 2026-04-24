# Ouderenzorg FR — Projectstructuur

> Dossier ouderenzorg voor Nederlandstaligen in Frankrijk.  
> Onderdeel van: Café Claude + Infofrankrijk.com

---

## Levenslooproute (6 fasen)

| Fase | Kernvraag gebruiker | Status |
|------|---------------------|--------|
| **0** | Blijf ik hier of ga ik terug naar NL? | 📝 In uitwerking |
| **1** | Ik red het niet meer alleen thuis | ⏳ Gepland |
| **2** | Ik heb lichamelijke verzorging nodig | ⏳ Gepland |
| **3** | Ik kan niet meer thuis wonen | ⏳ Gepland |
| **4** | Ik heb intensieve verzorging nodig (EHPAD) | ⏳ Gepland |
| **5** | Ik ga overlijden (palliatief/hospice) | ⏳ Gepland |

---

## Repos in dit ecosysteem

| Repo | Doel |
|------|------|
| `antonnoe/ouderenzorg-fr` | Dit project — structuur, fases, bronnen |
| `antonnoe/cafeclaude` | CC codebase — zorg.ts uitbreiden |
| `antonnoe/anton-ai-werkwijze` | Werkafspraken, huisstijl, bronverificatie |

---

## Bronhiërarchie

| Tier | Bronnen |
|------|---------|
| **AAA** | pour-les-personnes-agees.gouv.fr, service-public.fr, legifrance.gouv.fr, has-sante.fr, ameli.fr |
| **AA** | zorginstituutnederland.nl (voor NL-vergelijking), svb.nl |
| **A** | infofrankrijk.com |

---

## IF-artikelen (te consolideren)

9 bestaande artikelen → doel: 5-6 pagina's

1. ouderenzorg-in-frankrijk/
2. ouder-worden-in-frankrijk-dossier-2026/
3. thuishulp-voor-ouderen-in-frankrijk/
4. franse-bewindvoering-bij-ouderenzorg-wat-familie-vooraf-en-achteraf-juridisch-kan-regelen/
5. einde-van-het-leven-in-frankrijk-de-juridische-realiteit/
6. ouderenzorg-thuiszorg-nederlanders-frankrijk-regels/
7. zorg-ouderen-frankrijk/
8. persoonlijke-hulp-aan-huis-in-frankrijk-contract-goed-nalezen/
9. hulpmiddel-verzoeken-in-frankrijk/

---

## Mappenstructuur

```
ouderenzorg-fr/
├── STRUCTUUR.md          ← dit bestand
├── README.md             ← korte intro
├── fases/
│   ├── fase-0-orientatie.md
│   ├── fase-1-hulp-thuis.md
│   ├── fase-2-verzorging.md
│   ├── fase-3-begeleid-wonen.md
│   ├── fase-4-ehpad.md
│   └── fase-5-palliatief.md
├── bronnen/
│   └── bronnenlijst.md
└── if-consolidatie/
    └── artikelanalyse.md
```

---

## Werkafspraken

- Git commits als `antonnoe / antonnoe@yahoo.com`
- Feitelijke claims verifiëren tegen AAA-bronnen
- Nooit op één bron vertrouwen bij bedragen/termijnen
- Zie `antonnoe/anton-ai-werkwijze` voor volledige regels
