# FASE 0: Oriëntatie — Blijf ik hier of ga ik terug?

## Doelgroep

Gezonde Nederlandstalige senioren (60-75 jaar) in Frankrijk die nog géén acute zorgvraag hebben, maar vooruit willen kijken. Ze willen weten:

1. Wat kan ik verwachten als ik hier oud word?
2. Wat als ik zorg nodig krijg — hoe werkt dat in FR vs NL?
3. Moet ik nu al iets regelen?
4. Wanneer wordt terugkeer naar NL onmogelijk of onverstandig?

---

## Kennisvraag: Wat wil de gebruiker weten?

### A. Het Franse zorgstelsel begrijpen (vóór je het nodig hebt)

| Vraag | Onderliggende zorg |
|-------|-------------------|
| Hoe werkt ouderenzorg in Frankrijk? | Ik ken het systeem niet |
| Wat is APA, CLIC, EHPAD? | De afkortingen zeggen me niets |
| Betaalt mijn zorgverzekering dit? | Financiële onzekerheid |
| Kan ik in het Nederlands geholpen worden? | Taalbarrière-angst |
| Wat als mijn partner eerder zorg nodig heeft? | Mantelzorg-scenario |

### B. Vergelijking FR vs NL

| Vraag | Onderliggende zorg |
|-------|-------------------|
| Is de zorg in FR beter of slechter dan NL? | Kwaliteitsvergelijking |
| Wat kost een EHPAD vs verpleeghuis NL? | Financiële vergelijking |
| Heb ik in NL nog recht op Wlz als ik terugkom? | Rechten kwijtraken |
| Kan ik in NL zorg krijgen als ik 20 jaar weg ben? | Wachttijden |
| Waar heb ik nog familie/netwerk? | Sociale factor |

### C. Nu al regelen

| Vraag | Onderliggende zorg |
|-------|-------------------|
| Moet ik mijn huis aanpassen? | Anticiperen op beperkingen |
| Kan ik een mandat de protection future tekenen? | Wilsbekwaamheid |
| Moet ik een personne de confiance aanwijzen? | Medische beslissingen |
| Wat moet ik regelen voor mijn testament? | Erfrecht FR vs NL |

---

## Kennisaanbod: Wat bieden de AAA-bronnen?

### Frankrijk (AAA)

| Bron | Relevante secties | Taal |
|------|-------------------|------|
| **pour-les-personnes-agees.gouv.fr** | "Préserver son autonomie" → anticiperen, logement aanpassen, aides techniques | FR |
| **service-public.fr** | /N392 → overzicht allocations/aides personnes âgées | FR |
| **has-sante.fr** | Kwaliteitsnormen EHPAD, soins palliatifs | FR |

**Opvallend:** De Franse bronnen richten zich op mensen die al "perte d'autonomie" hebben of anticiperen. Er is weinig vergelijkende informatie FR↔NL.

### Nederland (AA)

| Bron | Relevante secties | Taal |
|------|-------------------|------|
| **zorginstituutnederland.nl** | Remigreren/immigreren Wlz — wachttijden, voorwaarden | NL |
| **nederlandwereldwijd.nl** | Stappenplan terugkeer, zorgverzekering | NL |
| **svb.nl** | AOW bij emigratie/remigratie | NL |

**Opvallend:** Nederlandse bronnen behandelen remigratie, maar focussen op bureaucratie (BRP, verzekering), niet op zorginhoud.

### Grijze zone (A / geen tier)

| Bron | Relevante secties | Betrouwbaarheid |
|------|-------------------|-----------------|
| **nihb.nl** | Ervaringsverhalen terugkeer | Beperkt (geen officiële bron) |
| **stichtinggoed.nl** | Signalering problematiek, geen advies | Beperkt |
| **terugkeernederland.nl** | Praktische tips, geen officiële status | Beperkt |

---

## Gap-analyse: Wat ontbreekt?

### Wat geen enkele AAA-bron biedt:

1. **Vergelijking FR↔NL zorgkwaliteit** — subjectief, geen officiële metrics
2. **Beslisboom: blijven of terugkeren** — te persoonlijk
3. **Kostenvergelijking EHPAD FR vs verpleeghuis NL** — data versnipperd
4. **NL-talige uitleg Frans systeem** — dát is precies de IF/CC-niche

### Wat IF/CC kan bieden (unieke waarde):

| Onderwerp | Type content | Bron |
|-----------|--------------|------|
| **Wat is APA/CLIC/EHPAD — in het Nederlands** | Uitleg + verwijzing AAA | CC domein |
| **Keuzehulp: blijven of terug** | Vragen stellen, geen advies geven | IF artikel |
| **Wlz-wachttijd bij terugkeer** | Feiten uit zorginstituut.nl | IF artikel |
| **Checklist: nu regelen** | Actielijst + bronnen | IF artikel / CC |
| **Mandat de protection future** | Uitleg + notarisstap | IF artikel (juridisch) |

---

## Voorstel IF-consolidatie: Fase 0

Van de 9 huidige IF-artikelen horen bij Fase 0 (oriëntatie):

- `ouderenzorg-in-frankrijk/` — **hoofdartikel oriëntatie** (te breed nu)
- `ouder-worden-in-frankrijk-dossier-2026/` — **mogelijk duplicaat**, checken
- `franse-bewindvoering-bij-ouderenzorg...` — **deels**, mandat de protection future

### Voorstel nieuwe structuur Fase 0:

**1 IF-artikel:** "Oud worden in Frankrijk — wat je nu al moet weten"

Inhoud:
1. Het Franse ouderenzorgstelsel in vogelvlucht (terminologie)
2. Wanneer terugkeer naar NL (on)mogelijk wordt (Wlz-wachttijd)
3. Drie dingen die je nu al kunt regelen
4. Waar je terecht kunt voor vragen (CLIC, CC)

**Geen apart artikel voor:** 
- Vergelijking FR↔NL (te subjectief, veroudert snel)
- "Moet ik terug?" (beslishulp, past beter in tool/CC)

---

## Voorstel CC-domein: Fase 0 entry

In `tree.ts` onder "Ouderenzorg" een eerste tak:

```typescript
{
  id: "orientatie",
  label: "Ik wil vooruitdenken",
  description: "Nog geen zorgvraag, wel vragen over de toekomst",
  children: [
    {
      id: "systeem-fr",
      label: "Hoe werkt ouderenzorg in Frankrijk?",
      promptKey: "ouderenzorg.orientatie.systeem"
    },
    {
      id: "terugkeer-nl",
      label: "Kan ik later nog terug naar Nederland?",
      promptKey: "ouderenzorg.orientatie.terugkeer"
    },
    {
      id: "nu-regelen",
      label: "Wat kan ik nu al regelen?",
      promptKey: "ouderenzorg.orientatie.voorbereiden"
    }
  ]
}
```

---

## Openstaande vragen

1. **Dossier 2026** — is dit een jaarlijkse update van het hoofdartikel of een apart stuk?
2. **Bewindvoering-artikel** — splitsen naar juridisch domein of behouden in ouderenzorg?
3. **Prioriteit CC vs IF** — eerst prompts schrijven (CC) of eerst IF-artikelen herstructureren?

---

## Volgende stap

Als je akkoord bent met deze Fase 0 opzet:
→ IF-artikelen laten exporteren zodat ik overlap kan beoordelen
→ CC promptKey `ouderenzorg.orientatie.*` uitschrijven
