// Controle van de herstelde teksten en het rekenvoorbeeld in het dossier (geen netwerk).
// Draaien: node tests/rekenwijze.test.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, "..", "if-dossier", "index.html"), "utf8");
const fouten = [];
const moet = (naam, tekst) => { if (!html.includes(tekst)) fouten.push(`${naam}: ontbreekt "${tekst}"`); };
const mag_niet = (naam, tekst) => { if (html.includes(tekst)) fouten.push(`${naam}: staat nog "${tekst}"`); };

// 1. ASH: kleinkinderen vrijgesteld (L132-6 3° CASF)
moet("ASH", "Kleinkinderen zijn sinds april 2024 vrijgesteld van de onderhoudsplicht voor de ASH");
mag_niet("ASH", "Kinderen en kleinkinderen kunnen worden aangesproken");
// 2. Crédit d'impôt: eerste jaar alleen emploi direct (art. 199 sexdecies 3 CGI, BOFiP §150)
moet("Krediet eerste jaar", "alleen als u zelf iemand in dienst neemt (emploi direct");
moet("Krediet eerste jaar", "niet bij hulp via een SAAD");
// 3. Handicap: alleen invaliditeit derde categorie of kind met complément AEEH (BOFiP §170)
moet("Handicap", "Invaliditeit derde categorie");
moet("Handicap", "complément AEEH");
mag_niet("Handicap", "<td>Handicap in huishouden</td>");
// 4. Wlz-wachttijd (art. 3.4.1 en 3.4.2 Besluit langdurige zorg)
moet("Wlz 13.2", "alleen als u bij terugkeer al Wlz-zorg nodig heeft of binnen een half jaar nodig zult hebben");
moet("Wlz 14.2", "Was u langer dan twaalf jaar weg, dan geldt de volle 12 maanden");
moet("Wlz 14.2", "Wie gezond terugkeert, heeft geen wachttijd");
mag_niet("Wlz", "Bij 12+ jaar verdragsrecht: vaak geen wachttijd");
// 5. Rekenvoorbeeld sectie 28 volgens R232-11
{
  const kosten = 15 * 4.33 * 25;                       // 1.623,75
  const plan = 1215.99;
  const p = 256.29;                                    // R232-11 / CNSA tableau 4, inkomen 1.800, plan 1.215,99
  const apa = Math.round((plan - p) * 100) / 100;
  const rest = Math.round((kosten - apa) * 100) / 100;
  const krediet = Math.round(rest * 0.5 * 12 * 100) / 100;
  const netto = Math.round((rest - krediet / 12) * 100) / 100;
  if (apa !== 959.7 || rest !== 664.05 || krediet !== 3984.3 || netto !== 332.02) fouten.push(`rekenketen: ${apa} ${rest} ${krediet} ${netto}`);
}
moet("Sectie 28", "€256,29");
moet("Sectie 28", "€1.215,99 − €256,29 = €959,70");
moet("Sectie 28", "€1.623,75 − €959,70 = €664,05");
moet("Sectie 28", "€3.984,30/jaar = €332,03/maand");
moet("Sectie 28", "<strong>Netto maandlasten Marie: €664,05 − €332,03 = €332,02</strong>");
mag_niet("Sectie 28", "circa 20%");
mag_niet("Sectie 28", "€325");
// 6. Mantelzorger: D232-9-2
moet("Mantelzorger", "met ten hoogste €1.159,32 per opname, bovenop het plafond");
mag_niet("Mantelzorger", "tijdelijk worden verhoogd (majoration pour hospitalisation de l'aidant) tot €1.159,32");
// 7. ASPA: paar met één ontvanger (D815-2)
moet("ASPA", "Echtpaar, maar één partner krijgt ASPA");
moet("ASPA", "Krijgt maar één partner ASPA, dan is het maximum €1.043,59");
// 8. MaPrimeAdapt' (service-public F37501)
moet("MaPrimeAdapt", "van 70 jaar en ouder, of van 60 tot 69 jaar met een GIR-indeling");
mag_niet("MaPrimeAdapt", "glijdende periode");
mag_niet("MaPrimeAdapt", "60+ met GIR 1-4");

if (fouten.length) { console.error(fouten.join("\n")); process.exit(1); }
console.log("rekenwijze: alles groen");
