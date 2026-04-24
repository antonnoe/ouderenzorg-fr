# Inventaris bestaande ouderenzorg-assets in GitHub

## Overzicht repos

| Repo | Type | Inhoud | Status |
|------|------|--------|--------|
| `Ouderenzorg` | Next.js app | Categorieën, definities, contacten, annuaires | Volledig |
| `infographic-ouderenzorg` | Statische HTML | Stap-voor-stap infographic + audio | Volledig |
| `zorglexicon-frankrijk` | Statische HTML | Lexicon NL↔FR zorgtermen | Volledig |
| `zorgkompas-frankrijk` | JS-app | Scenario's zorgkosten (griep, fysio, hernia, onco) | Volledig |
| `ouderenzorg-fr` | Documentatie | Levenslooproute, consolidatieplan | **Nieuw** |

---

## `Ouderenzorg` (Next.js) — zorgdata.json

### Categorieën
1. **Respijtzorg & Mantelzorg** — PFR, dagopvang, tijdelijk verblijf
2. **Wonen & Medische Zorg** — EHPAD, SSIAD
3. **Rechten & Financiën** — APA

### Definities (NL↔FR)
- `PFR` — Plateformes d'accompagnement et de répit
- `adj` — Accueil de jour (dagopvang)
- `ehpad` — EHPAD
- `apa` — APA
- `ssiad` — SSIAD
- `heb_temp` — Hébergement temporaire

### Contacten (hulplijnen)
- Noodnummers: SAMU (15), 112, 17, 18
- Maltraitance: 39 77
- Mantelzorg: Instants aidants, Avec nos proches, Au bout du fil
- Handicap: 0 800 360 360
- Eenzaamheid: Solitud'écoute

### Annuaires (links naar pour-les-personnes-agees.gouv.fr)
- EHPAD-zoeker met prijsvergelijker
- CLIC/PIL-zoeker per departement
- PFR per departement
- SAAD/SSIAD/SPASAD-zoeker

---

## `infographic-ouderenzorg` — Visuele stappen

HTML-infographic met:
- Stap-voor-stap uitleg ouderenzorg FR
- Audio-bestand (13MB MP3): "NL-FR-ouder-worden-we-allemaal"
- Huisstijl: #800000, Poppins/Mulish

---

## `zorglexicon-frankrijk` — Woordenlijst

Lexicon met zorgtermen NL↔FR, georganiseerd per categorie.
Huisstijl toegepast.

---

## `zorgkompas-frankrijk` — Kostencalculator

Scenario-engine voor zorgkosten:
- Griep/luchtweginfectie
- Rugklachten (20x fysio)
- Hernia-operatie
- Oncologisch traject (6 mnd)

Inclusief:
- BRSS-tarieven 2024/2025
- Secteur 1/2 verschillen
- ALD-impact
- Franchises

---

## Mapping naar levenslooproute

| Fase | Relevante bestaande assets |
|------|---------------------------|
| **0 - Oriëntatie** | `infographic-ouderenzorg` (overzicht), `zorglexicon-frankrijk` (terminologie) |
| **1 - Hulp thuis** | `Ouderenzorg/zorgdata.json` (SAAD, aide à domicile, APA) |
| **2 - Verzorging** | `Ouderenzorg/zorgdata.json` (SSIAD), `zorgkompas-frankrijk` (kosten) |
| **3 - Begeleid wonen** | `Ouderenzorg/zorgdata.json` (dagopvang, tijdelijk verblijf) |
| **4 - EHPAD** | `Ouderenzorg/zorgdata.json` (EHPAD-definitie, annuaire) |
| **5 - Palliatief** | ❌ Ontbreekt |

---

## Conclusie

**Wat al bestaat:**
- Definities, contacten, annuaires → `Ouderenzorg` repo
- Visueel overzicht → `infographic-ouderenzorg`
- Lexicon → `zorglexicon-frankrijk`
- Kostencalculator (curatieve zorg) → `zorgkompas-frankrijk`

**Wat ontbreekt:**
- Fase 0 content (oriëntatie, blijven vs terugkeer)
- Fase 5 content (palliatief, hospice)
- Juridisch (mandat de protection future, tutelle)
- Consolidatie IF-artikelen

**Volgende stap:**
Deze inventaris toevoegen aan `ouderenzorg-fr` repo en linken in STRUCTUUR.md
