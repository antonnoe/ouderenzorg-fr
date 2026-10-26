// Controle van de bedragen in het dossier tegen peil/waarden.json, de kopie van de waarden uit Peil (het parameterregister van Communities Abroad).
// Draaien: node tests/peil.test.mjs (geen netwerk, geen afhankelijkheden).
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const lees = (...p) => fs.readFileSync(path.join(here, "..", ...p), "utf8");
const html = lees("if-dossier", "index.html");
const skelet = lees("if-dossier", "dossier-skelet.md");
const WAARDEN = JSON.parse(lees("peil", "waarden.json"));
const UITLEG_URL = "https://infofrankrijk.com/ons-manifest-hoe-wij-werken/";
const KAART_URL = "https://communitiesabroad.com/manifest/tool/ouderenzorg-fr";
const perId = new Map(WAARDEN.parameters.map((p) => [p.id, p]));

// ---- Peil-blok uit de pagina laden
const blok = /\/\/ PEIL-BEGIN([\s\S]*?)\/\/ PEIL-EINDE/.exec(html);
const fouten = [];
const fout = (m) => fouten.push(m);
if (!blok) { console.log("FOUT Peil-blok (PEIL-BEGIN tot PEIL-EINDE) niet gevonden in if-dossier/index.html."); process.exit(1); }
function laad(code) {
  const ctx = { document: { getElementById: () => null }, console };
  vm.createContext(ctx);
  vm.runInContext(code + "\n;globalThis.__p={PEIL_STAND,PEIL_LABEL_AAN,PEIL_UITLEG_URL,PEIL_KAART_URL,peilStandNl,peilStandKort,peilRegelHtml,peilVoetHtml};", ctx);
  return ctx.__p;
}
const P = laad(blok[1]);

// ---- Vaste onderdelen
const nl = P.peilStandNl(), kort = P.peilStandKort();
if (P.PEIL_LABEL_AAN !== true) fout("PEIL_LABEL_AAN moet true zijn.");
if (P.PEIL_UITLEG_URL !== UITLEG_URL) fout("De link gaat niet naar het manifest.");
if (!/^\d{4}-\d{2}-\d{2}$/.test(P.PEIL_STAND)) fout("PEIL_STAND is geen datum als JJJJ-MM-DD.");
if (WAARDEN.stand !== P.PEIL_STAND) fout(`stand in peil/waarden.json is ${WAARDEN.stand}, maar PEIL_STAND is ${P.PEIL_STAND}.`);
if (P.PEIL_STAND === "2026-10-20" && (nl !== "20 oktober 2026" || kort !== "20 okt 2026")) fout(`Datumopmaak klopt niet: '${nl}' en '${kort}'.`);
const h = P.peilRegelHtml();
if (!h.includes(`href="${KAART_URL}"`) || !h.includes('target="_blank"') || !h.includes('rel="noopener"')) fout("Stempel linkt niet naar de toolkaart met target _blank en rel noopener.");
if (!h.includes(`aria-label="Bedragen gecontroleerd tegen Peil, stand ${nl}, bekijk wat er gecontroleerd is"`)) fout("Stempel mist de aria-label met volledige datum.");
if (!h.includes("Gecontroleerd tegen Peil</span>") || !h.includes(`stand ${kort}<span class="peil-pijl" aria-hidden="true">&#8599;</span></span>`)) fout("Stempel mist de twee korte regels met pijltje.");
if ((h.match(/<a /g) || []).length !== 1 || !h.includes("<svg") || !h.includes('stroke="#800000"')) fout("Stempel moet één link met inline svg in #800000 zijn.");
const v = P.peilVoetHtml();
if (!v.startsWith('<span class="peil-merk"') || !v.includes("<strong>Over de bedragen in deze tool.</strong> Alle wettelijke tarieven, bedragen en grenzen komen uit Peil, het register waarin wij deze gegevens bijhouden. Elk daarvan is gecontroleerd bij de officiële bron, de laatste controle was op " + nl + ". Waar de tool met een aanname of schatting rekent, staat dat bij de uitkomst. <a href=\"" + UITLEG_URL + "\" target=\"_blank\" rel=\"noopener\">Lees in ons manifest hoe wij werken</a>")) fout("Voettekstalinea wijkt af van het goedgekeurde ontwerp.");
{
  const uit = laad(blok[1].replace("const PEIL_LABEL_AAN = true;", "const PEIL_LABEL_AAN = false;"));
  if (uit.peilRegelHtml() !== "" || uit.peilVoetHtml() !== "") fout("Met de schakelaar uit moet het Peil-label verdwijnen.");
}
if (!/id="peilStempel"/.test(html) || !/id="peilVoet"/.test(html)) fout("Plaatsen voor stempel (#peilStempel) en voettekst (#peilVoet) ontbreken.");
if (html.indexOf('id="peilStempel"') < html.indexOf("<strong>Disclaimer.</strong>")) fout("De stempel moet na de disclaimer staan.");
if (/antonnoe\.github\.io\/peil-nl-fr/.test(html)) fout("De pagina verwijst naar de openbare Peil-site.");
if (/(19|20) oktober 2026/.test(html)) fout("Er staat een vaste peildatum in de pagina; de datum mag alleen uit PEIL_STAND komen.");

// ---- Bedragen: formaat als in de tekst (1.043,59 en 12.000)
const eur = (n) => Number(n).toLocaleString("nl-NL", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
const heeft = (tekst, s) => tekst.includes(s);
function controleer(id, wat, ok) { if (!ok) fout(`${id} (${perId.get(id)?.naam}): ${wat}`); }
const vereist = (id) => { const p = perId.get(id); if (!p) { fout(`${id}: staat niet in peil/waarden.json.`); return null; } return p.waarde; };

{ const w = vereist("p.fr.apa.bedrag_per_maand");
  if (w) for (const g of ["gir1", "gir2", "gir3", "gir4"]) controleer("p.fr.apa.bedrag_per_maand", `dossier mist €${eur(w[g])} (${g})`, heeft(html, `€${eur(w[g])}`));
  if (w) controleer("p.fr.apa.bedrag_per_maand", "samenvattingstabel noemt €811 en €2.080", heeft(skelet, `€${eur(Math.floor(w.gir4))} – €${eur(Math.floor(w.gir1))}/maand`)); }
{ const w = vereist("p.fr.aspa.maximum_alleenstaand");
  if (w) { controleer("p.fr.aspa.maximum_alleenstaand", `dossier mist €${eur(w)}`, heeft(html, `<td>Alleenstaand</td><td>€${eur(w)}</td>`));
    controleer("p.fr.aspa.maximum_alleenstaand", `dossier-skelet.md mist 'Tot €${eur(w)}/maand'`, heeft(skelet, `Tot €${eur(w)}/maand (alleenstaand)`));
    controleer("p.fr.aspa.maximum_alleenstaand", "dossier-skelet.md noemt nog het oude bedrag 1.012", !/1\.012/.test(skelet) && !/1\.012/.test(html)); } }
{ const w = vereist("p.fr.ir.credit_hulp_aan_huis_plafond");
  if (w) { const p = (n) => `€${eur(n)}`;
    controleer("p.fr.ir.credit_hulp_aan_huis_plafond", "tabel mist standaard 12.000 en teruggave 6.000", heeft(html, `<td>Standaard</td><td>${p(w.basis)}</td><td>${p(w.basis / 2)}</td>`));
    controleer("p.fr.ir.credit_hulp_aan_huis_plafond", "tabel mist verhoging tot 15.000 en teruggave 7.500", heeft(html, `<td>tot ${p(w.max_met_verhogingen)}</td><td>tot ${p(w.max_met_verhogingen / 2)}</td>`) && heeft(html, `${p(w.verhoging_per_kind_of_65plus)} per persoon`));
    controleer("p.fr.ir.credit_hulp_aan_huis_plafond", "tabel mist eerste jaar 15.000 tot 18.000", heeft(html, `<td>${p(w.eerste_jaar_basis)}, met verhogingen tot ${p(w.eerste_jaar_max)}</td>`));
    controleer("p.fr.ir.credit_hulp_aan_huis_plafond", "tabel mist invaliditeit 20.000 en 10.000", heeft(html, `<td>Invaliditeit derde categorie (u zelf of een persoon ten laste in uw huishouden) of een kind ten laste met complément AEEH</td><td>${p(w.invaliditeit)}</td><td>${p(w.invaliditeit / 2)}</td>`));
    controleer("p.fr.ir.credit_hulp_aan_huis_plafond", "dossier-skelet.md noemt het uitgavenplafond niet", heeft(skelet, `Uitgavenplafond ${p(w.basis)}`) && !/Max €6\.000-€10\.000/.test(skelet)); } }
{ const w = vereist("p.fr.ir.credit_hulp_aan_huis_percentage");
  if (w !== null) controleer("p.fr.ir.credit_hulp_aan_huis_percentage", `dossier noemt niet ${w * 100}%`, heeft(html, `${w * 100}% belastingteruggave`) && heeft(skelet, `${w * 100}% kosten terug`)); }
{ const w = vereist("p.fr.renov.maprimeadapt_maximum");
  if (w !== null) controleer("p.fr.renov.maprimeadapt_maximum", `dossier noemt niet ${w}%`, heeft(html, `tot ${w}% van de werkkosten`) && heeft(skelet, `Tot ${w}% van kosten`) && heeft(html, "€22.000 HT")); }

for (const p of WAARDEN.parameters) console.log(`ok   ${p.id}`);
if (fouten.length) { console.log(`\n${fouten.length} afwijking(en):`); fouten.forEach((m) => console.log(`FOUT ${m}`)); process.exit(1); }
console.log(`\nAlle ${WAARDEN.parameters.length} parameters komen overeen met peil/waarden.json (stand ${P.PEIL_STAND}).`);
