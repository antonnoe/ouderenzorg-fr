# CC Branch Ouderenzorg — Structuurvoorstel

> Uitbreiding van de bestaande branch "Gezondheid & Zorg" in Café Claude.
> Thematisch-institutioneel-financieel georganiseerd, niet chronologisch.

---

## Huidige structuur `zorgTree` (4 nodes)

```
zorg (Gezondheid & Zorg)
└── zorgverlening
    ├── arts (médecin traitant)
    ├── specialist
    ├── apotheek
    └── urgence (spoed)
```

---

## Voorgestelde uitbreiding: Ouderenzorg als tweede tak

```
zorg (Gezondheid & Zorg)
├── zorgverlening (bestaand — 4 nodes)
│   ├── arts
│   ├── specialist
│   ├── apotheek
│   └── urgence
│
└── ouderenzorg (NIEUW — ~20 nodes)
    │
    ├── orientatie
    │   ├── systeem-overzicht      "Hoe werkt ouderenzorg in Frankrijk?"
    │   ├── clic-vinden            "Waar vind ik mijn lokale zorgloket (CLIC)?"
    │   └── terugkeer-nl           "Kan ik later nog terug naar Nederland voor zorg?"
    │
    ├── thuis-blijven
    │   ├── aide-domicile          "Hulp aan huis (SAAD, aide ménagère)"
    │   ├── ssiad                  "Verpleging aan huis (SSIAD)"
    │   ├── hulpmiddelen           "Hulpmiddelen aanvragen (MDPH, aides techniques)"
    │   ├── woning-aanpassen       "Woning aanpassen (MaPrimeAdapt')"
    │   └── mantelzorg             "Ondersteuning voor mantelzorgers (répit, PFR)"
    │
    ├── woonvormen
    │   ├── residence-autonomie    "Résidence autonomie (zelfstandig met diensten)"
    │   ├── residence-services     "Résidence services seniors"
    │   ├── accueil-familial       "Accueil familial (gastgezin)"
    │   └── ehpad                  "EHPAD (verzorgingshuis met medische zorg)"
    │
    ├── financiering
    │   ├── apa                    "APA aanvragen (Allocation Personnalisée d'Autonomie)"
    │   ├── ash                    "ASH (Aide Sociale à l'Hébergement)"
    │   ├── credit-impot           "Crédit d'impôt services à la personne"
    │   └── kosten-ehpad           "Wat kost een EHPAD? (tarief, eigen bijdrage)"
    │
    ├── juridisch
    │   ├── personne-confiance     "Personne de confiance aanwijzen"
    │   ├── directives-anticipees  "Directives anticipées opstellen"
    │   ├── mandat-protection      "Mandat de protection future"
    │   └── tutelle-curatelle      "Tutelle en curatelle (beschermingsmaatregelen)"
    │
    └── levenseinde
        ├── soins-palliatifs       "Palliatieve zorg in Frankrijk"
        ├── sedation-profonde      "Sédation profonde (Claeys-Leonetti)"
        └── overlijden-praktisch   "Overlijden: praktische stappen"
```

---

## Totaal nieuwe nodes: 22

Verdeeld over 6 subcategorieën:
- Oriëntatie: 3
- Thuis blijven: 5
- Woonvormen: 4
- Financiering: 4
- Juridisch: 4
- Levenseinde: 3

---

## Bronhiërarchie per subcategorie

| Subcategorie | Primaire AAA-bronnen |
|--------------|---------------------|
| Oriëntatie | pour-les-personnes-agees.gouv.fr, zorginstituutnederland.nl |
| Thuis blijven | pour-les-personnes-agees.gouv.fr, service-public.fr |
| Woonvormen | pour-les-personnes-agees.gouv.fr (annuaires) |
| Financiering | service-public.fr, pour-les-personnes-agees.gouv.fr |
| Juridisch | service-public.fr, legifrance.gouv.fr |
| Levenseinde | has-sante.fr, service-public.fr |

---

## Intake-vragen (voorbeelden)

### aide-domicile
```typescript
intake: [
  {
    question: "Ontvangt u al APA?",
    options: ["Ja", "Nee", "Aanvraag loopt"],
    exclusive: true
  }
]
```

### ehpad
```typescript
intake: [
  {
    question: "Is de opname urgent of kunt u nog zoeken?",
    options: ["Urgent (binnen 1 maand)", "Niet urgent"],
    exclusive: true
  },
  {
    question: "In welk departement zoekt u?",
    options: ["Mijn eigen departement", "Elders in Frankrijk"],
    exclusive: true
  }
]
```

### apa
```typescript
intake: [
  {
    question: "Waar woont de persoon die APA nodig heeft?",
    options: ["Thuis", "In een EHPAD"],
    exclusive: true
  }
]
```

---

## Relatie met bestaande repos

| CC Node | Hergebruikt uit repo |
|---------|---------------------|
| clic-vinden | `Ouderenzorg` → annuaires.clic_zoeker |
| aide-domicile | `Ouderenzorg` → annuaires.aide_soins_domicile |
| ehpad | `Ouderenzorg` → annuaires.ehpad_zoeker + definitions.ehpad |
| apa | `Ouderenzorg` → definitions.apa |
| ssiad | `Ouderenzorg` → definitions.ssiad |
| mantelzorg | `Ouderenzorg` → definitions.PFR, contacten |
| kosten-ehpad | `zorgkompas-frankrijk` → scenario's (indien relevant) |
| Lexicon | `zorglexicon-frankrijk` → als referentie in prompts |

---

## Volgende stappen

1. [ ] Anton: akkoord op structuur?
2. [ ] Prompts schrijven (`lib/domains/prompts/ouderenzorg.ts`)
3. [ ] Tree.ts uitbreiden met nieuwe nodes
4. [ ] Cache-entries genereren per node
5. [ ] IF Dossier parallel ontwikkelen (apart document)
